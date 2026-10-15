'use strict';

const solutionsUnderlay = document.querySelector('#solutions-panel');
if (solutionsUnderlay) {
  function sizeSolutionsUnderlay() {
    // Let a tall section finish scrolling before its successor covers it.
    const top = Math.min(0, window.innerHeight - solutionsUnderlay.offsetHeight);
    solutionsUnderlay.style.setProperty('--solutions-pin-top', `${top}px`);
    solutionsUnderlay.classList.add('is-scroll-underlay');
  }
  sizeSolutionsUnderlay();
  window.addEventListener('resize', sizeSolutionsUnderlay, {passive: true});
  if ('ResizeObserver' in window) {
    const solutionsSizeObserver = new ResizeObserver(sizeSolutionsUnderlay);
    solutionsSizeObserver.observe(solutionsUnderlay);
  }
}

const header = document.querySelector('.header');
const backTop = document.querySelector('.back-top');
let scrollPending = false;
function updateScroll() {
  // The header is always compact; scrolling only updates the back-to-top button.
  backTop.hidden = window.scrollY < 650;
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { window.requestAnimationFrame(updateScroll); scrollPending = true; }
}, {passive: true});
updateScroll();
backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));

const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.hidden = !open;
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.addEventListener('click', event => { if (!header.contains(event.target)) setMenu(false); });
window.matchMedia('(min-width:1101px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

const crops = window.PetrovinaPortfolio.cultures;
const dialog = document.querySelector('.crop-dialog');
let cropOpener;
let dialogExit;
function closeCropDialog() {
  if (!dialog?.open || dialogExit) return;
  window.PetrovinaPortfolioView.closing();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !dialog.animate) {
    dialog.close();
    return;
  }
  dialog.classList.add('is-closing');
  dialogExit = dialog.animate([
    {opacity: 1, transform: 'translateY(0) scale(1)'},
    {opacity: 0, transform: 'translateY(8px) scale(.985)'}
  ], {duration: 180, easing: 'cubic-bezier(.4,0,1,1)'});
  dialogExit.finished.catch(() => {}).then(() => {
    dialog.close();
    dialogExit = null;
  });
}
document.querySelectorAll('[data-crop]').forEach(button => {
  button.addEventListener('click', () => {
    const crop = crops[button.dataset.crop];
    if (!crop) return;
    cropOpener = button;
    dialog.querySelector('h2').textContent = crop.name;
    const image = dialog.querySelector('.dialog-image img');
    image.src = crop.image;
    const base = crop.image.replace('-hd.webp', '');
    image.srcset = `${base}-480.webp 480w, ${base}-800.webp 800w, ${crop.image} 1122w`;
    image.sizes = '(max-width: 680px) calc(100vw - 30px), 385px';
    image.alt = `Cultura de ${crop.name.toLowerCase()}`;
    const mobilePhoto = dialog.querySelector('.catalog-mobile-photo img');
    mobilePhoto.src = image.src;
    mobilePhoto.srcset = image.srcset;
    dialog.querySelector('.dialog-description').textContent = crop.description;
    dialog.querySelector('.dialog-portfolio').href = `https://petrovinasementes.com.br/${crop.path}`;
    dialog.querySelector('.dialog-portfolio').setAttribute('aria-label', `Ver portfólio completo de ${crop.name}`);
    window.PetrovinaPortfolioView.render(button.dataset.crop);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    window.PetrovinaPortfolioView.opened();
  });
});
dialog?.querySelector('.dialog-close').addEventListener('click', closeCropDialog);
dialog?.addEventListener('cancel', event => { event.preventDefault(); closeCropDialog(); });
dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeCropDialog();
});
dialog?.addEventListener('close', () => { dialog.classList.remove('is-closing'); document.body.classList.remove('dialog-open'); cropOpener?.focus({preventScroll:true}); });

// Keep navigation state independent from content motion.
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`.desktop-nav a[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, {rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('#sementes,#solucoes,#essencia,#conteudos').forEach(el => navObserver.observe(el));
}
