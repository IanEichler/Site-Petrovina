'use strict';

(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const storageKey = `petrovinaMotion:${location.pathname}`;
  let seen;
  try { seen = new Set(JSON.parse(sessionStorage.getItem(storageKey)) || []); }
  catch { seen = new Set(); }
  let storageTimer;
  const units = new Map();
  const returning = document.documentElement.classList.contains('is-restoring-scroll');

  function storeSeen() {
    clearTimeout(storageTimer);
    try { sessionStorage.setItem(storageKey, JSON.stringify([...seen])); }
    catch { /* Motion still works when browser storage is unavailable. */ }
  }

  function reveal(unit, instant = false) {
    if (!unit || unit.done) return;
    unit.done = true;
    unit.elements.forEach(element => {
      if (instant) element.classList.add('motion-instant');
      element.classList.remove('motion-pending');
      element.classList.add('is-revealed');
    });
    observer.unobserve(unit.target);
    seen.add(unit.key);
    clearTimeout(storageTimer);
    storageTimer = setTimeout(storeSeen, 120);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) reveal(units.get(entry.target));
    });
  }, {threshold: .12, rootMargin: '0px 0px -6% 0px'});

  function register(target, kind, index, elements = [target]) {
    const key = `${kind}:${index}`;
    const unit = {target, key, elements, done: false};
    target.dataset.motion = kind;
    elements.forEach(element => element.classList.add('motion-pending'));
    units.set(target, unit);
    const bounds = target.getBoundingClientRect();
    if (seen.has(key) || bounds.bottom <= 0 || (returning && bounds.top < window.innerHeight)) reveal(unit, true);
    else observer.observe(target);
  }

  // Keep the author's explicit line breaks and original colored text intact.
  // Lines can still wrap naturally at every responsive breakpoint.
  document.querySelectorAll('main h2').forEach((heading, index) => {
    const lines = [[]];
    [...heading.childNodes].forEach(node => {
      if (node.nodeName === 'BR') lines.push([]);
      else {
        if (node.nodeType === Node.ELEMENT_NODE && getComputedStyle(node).display === 'block' && lines[lines.length - 1].some(part => part.textContent.trim())) lines.push([]);
        lines[lines.length - 1].push(node);
      }
    });
    const originalText = heading.innerText.replace(/\s+/g, ' ').trim();
    const fragment = document.createDocumentFragment();
    lines.filter(nodes => nodes.some(node => node.textContent.trim())).forEach((nodes, lineIndex) => {
      const line = document.createElement('span');
      const text = document.createElement('span');
      line.className = 'motion-line';
      text.className = 'motion-line-inner';
      text.style.setProperty('--line-delay', `${lineIndex * 85}ms`);
      nodes.forEach(node => text.append(node));
      line.append(text);
      fragment.append(line, document.createTextNode(' '));
    });
    heading.replaceChildren(fragment);
    heading.setAttribute('aria-label', originalText);
    heading.classList.add('motion-title');
    const elements = [heading];
    let next = heading.nextElementSibling;
    while (next?.tagName === 'P') {
      next.classList.add('motion-copy');
      next.style.setProperty('--motion-delay', `${190 + (elements.length - 1) * 65}ms`);
      elements.push(next);
      next = next.nextElementSibling;
    }
    register(heading, 'title', index, elements);
  });

  const cardSelector = '.crop-card,.service-tile,.article,.business-card,.quote-crop,.service-features > article';
  document.querySelectorAll(`main :is(${cardSelector})`).forEach((card, index) => {
    const siblings = [...card.parentElement.children].filter(child => child.matches(cardSelector));
    const columns = getComputedStyle(card.parentElement).gridTemplateColumns.split(/\s+/).length;
    const delay = window.matchMedia('(max-width: 680px)').matches ? 0 : (siblings.indexOf(card) % columns) * 65;
    card.classList.add('motion-card');
    card.style.setProperty('--motion-delay', `${delay}ms`);
    register(card, 'card', index);
  });

  document.querySelectorAll('.eco-product-visual,.primepro-hero-visual').forEach((visual, index) => {
    const mask = document.createElement('span');
    mask.className = 'motion-media-mask';
    mask.append(...visual.childNodes);
    visual.append(mask);
    visual.classList.add('motion-media');
    // Keep the observed box unmasked, including when the mobile banner stacks.
    register(visual, 'media', index);
  });

  function revealAtRestoredPosition() {
    units.forEach(unit => {
      if (unit.target.getBoundingClientRect().top < window.innerHeight) reveal(unit, true);
    });
  }
  window.addEventListener('petrovina:scroll-restored', revealAtRestoredPosition);
  window.addEventListener('pageshow', event => {
    if (event.persisted) revealAtRestoredPosition();
  });
  window.addEventListener('pagehide', storeSeen);
  document.addEventListener('focusin', event => {
    const pending = event.target.closest('.motion-pending');
    if (pending) reveal(units.get(pending), true);
  });
  preference.addEventListener('change', event => {
    if (event.matches) units.forEach(unit => reveal(unit, true));
  });
})();
