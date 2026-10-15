'use strict';

(() => {
  const stateKey = 'petrovinaNavigation';
  const pendingKey = 'petrovinaNavigationPending';
  const root = document.documentElement;
  const navigationType = performance.getEntriesByType('navigation')[0]?.type;
  const previousState = history.state?.[stateKey];
  let restoring = false;
  let restoreVersion = 0;
  let saveTimer = 0;

  // Run in the head, before the browser can restore an obsolete scroll offset.
  history.scrollRestoration = 'manual';

  function readPending() {
    try {
      const pending = JSON.parse(sessionStorage.getItem(pendingKey));
      sessionStorage.removeItem(pendingKey);
      return pending?.to === location.href && Date.now() - pending.time < 30000 ? pending : null;
    } catch { return null; }
  }

  function createState(back = null) {
    return {id: crypto.randomUUID(), x: 0, y: 0, back};
  }

  const pending = readPending();
  let current = previousState || createState(pending ? {url: pending.from, steps: 1} : null);

  function writeState() {
    history.replaceState({...history.state, [stateKey]: current}, '');
  }

  function savePosition() {
    clearTimeout(saveTimer);
    saveTimer = 0;
    if (restoring) return;
    current = {...current, x: window.scrollX, y: window.scrollY};
    writeState();
  }

  writeState();
  const domReady = new Promise(resolve => {
    if (document.readyState !== 'loading') resolve();
    else document.addEventListener('DOMContentLoaded', resolve, {once: true});
  });

  async function restorePosition(saved) {
    const version = ++restoreVersion;
    restoring = true;
    root.classList.add('is-restoring-scroll');
    await domReady;
    await document.fonts.ready;
    requestAnimationFrame(() => {
      if (version !== restoreVersion) return;
      window.scrollTo({left: saved.x, top: saved.y, behavior: 'instant'});
      requestAnimationFrame(() => {
        if (version !== restoreVersion) return;
        window.scrollTo({left: saved.x, top: saved.y, behavior: 'instant'});
        restoring = false;
        root.classList.remove('is-restoring-scroll');
        savePosition();
      });
    });
  }

  if (previousState && (navigationType === 'back_forward' || navigationType === 'reload')) {
    restorePosition(current);
  }

  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      current = history.state?.[stateKey] || current;
      restorePosition(current);
    }
  });
  window.addEventListener('popstate', event => {
    const saved = event.state?.[stateKey];
    if (saved) {
      current = saved;
      restorePosition(saved);
    } else {
      // A native anchor navigation creates a new entry in this document.
      const back = current.back ? {...current.back, steps: current.back.steps + 1} : null;
      current = createState(back);
      writeState();
    }
  });
  window.addEventListener('scroll', () => {
    if (!restoring && !saveTimer) saveTimer = setTimeout(savePosition, 500);
  }, {passive: true});
  window.addEventListener('pagehide', savePosition);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') savePosition();
  });

  domReady.then(() => {
    const backLink = document.querySelector('.page-back');
    if (backLink && current.back) {
      backLink.setAttribute('aria-label', 'Voltar à página anterior');
    }
  });

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin) return;

    savePosition();
    if (link.matches('.page-back') && current.back) {
      event.preventDefault();
      history.go(-current.back.steps);
      return;
    }

    if (destination.pathname === location.pathname && destination.search === location.search) return;
    try {
      sessionStorage.setItem(pendingKey, JSON.stringify({from: location.href, to: destination.href, time: Date.now()}));
    } catch { /* The existing href remains a working fallback without storage. */ }
  });
})();
