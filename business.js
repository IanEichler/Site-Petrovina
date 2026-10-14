'use strict';

const businessTrigger = document.querySelector('.nav-trigger');
const businessDropdown = document.querySelector('.nav-dropdown');
function closeBusinessMenu(returnFocus = false) {
  if (!businessTrigger || !businessDropdown) return;
  const wasOpen = businessTrigger.getAttribute('aria-expanded') === 'true';
  businessTrigger.setAttribute('aria-expanded', 'false');
  businessDropdown.hidden = true;
  if (returnFocus && wasOpen) businessTrigger.focus();
}
businessTrigger?.addEventListener('click', () => {
  const open = businessTrigger.getAttribute('aria-expanded') !== 'true';
  businessTrigger.setAttribute('aria-expanded', String(open));
  businessDropdown.hidden = !open;
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-group')) closeBusinessMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeBusinessMenu(true);
});
document.querySelector('.nav-group')?.addEventListener('focusout', event => {
  if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeBusinessMenu();
});
document.querySelector('.menu-toggle')?.addEventListener('click', () => closeBusinessMenu());
window.matchMedia('(max-width:1100px)').addEventListener('change', () => closeBusinessMenu());

document.querySelectorAll('.desktop-nav a,.mobile-nav a').forEach(link => {
  if (!link.hash && new URL(link.href).pathname === location.pathname) {
    link.setAttribute('aria-current', 'page');
    if (link.closest('.nav-dropdown')) businessTrigger?.classList.add('is-current');
  }
});
if (location.pathname.endsWith('/negocios-solucoes.html')) businessTrigger?.classList.add('is-current');

const cultureNames = {soja:'soja',milho:'milho',sorgo:'sorgo',algodao:'algodão',brachiaria:'brachiaria'};
const requestedCulture = new URLSearchParams(location.search).get('cultura');
const quoteForm = document.querySelector('.quote-form');
function updateQuoteCulture() {
  const selected = quoteForm.querySelector('input[name="cultura"]:checked')?.value || 'soja';
  quoteForm.querySelector('[data-quote-name]').textContent = cultureNames[selected];
  quoteForm.querySelector('[data-quote-portfolio]').href = `./?cultura=${selected}#sementes`;
}
if (quoteForm) {
  if (Object.hasOwn(cultureNames, requestedCulture)) quoteForm.querySelector(`input[value="${requestedCulture}"]`).checked = true;
  quoteForm.addEventListener('change', updateQuoteCulture);
  quoteForm.addEventListener('submit', event => event.preventDefault());
  updateQuoteCulture();
}
if (document.querySelector('.crop-dialog') && Object.hasOwn(cultureNames, requestedCulture)) {
  document.querySelector(`[data-crop="${requestedCulture}"]`)?.click();
}

document.querySelector('[data-load-market]')?.addEventListener('click', event => {
  const button = event.currentTarget;
  const panel = button.closest('.market-panel');
  const frame = document.createElement('iframe');
  frame.title = 'Painel de preços de soja — Nexar Agro';
  frame.src = button.dataset.src;
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.setAttribute('aria-label', frame.title);
  panel.replaceChildren(frame);
});
