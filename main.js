const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = `<i class="fa ${open ? 'fa-times' : 'fa-bars'}"></i>`;
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.innerHTML = '<i class="fa fa-bars"></i>';
}));

const header = document.querySelector('.site-header');
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const sections = [...document.querySelectorAll('main section[id]')];
const desktopNav = [...document.querySelectorAll('.nav-links a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    desktopNav.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const slides = [...document.querySelectorAll('.certificate-slide')];
const dots = [...document.querySelectorAll('.certificate-dots button')];
let currentSlide = 0;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}
document.querySelector('#cert-prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('#cert-next')?.addEventListener('click', () => showSlide(currentSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

let slideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
const certificateShell = document.querySelector('.certificate-shell');
certificateShell?.addEventListener('mouseenter', () => clearInterval(slideTimer));
certificateShell?.addEventListener('mouseleave', () => {
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
});

// Respect reduced-motion preferences.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduce-motion');
}
