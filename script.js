const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');

function cerrarMenu() {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const abierto = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!abierto));
  nav.classList.toggle('open', !abierto);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', cerrarMenu);
});

// Cerrar el menu al tocar fuera
document.addEventListener('click', (e) => {
  if (!nav || !nav.classList.contains('open')) return;
  if (nav.contains(e.target) || menuButton.contains(e.target)) return;
  cerrarMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 950) cerrarMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarMenu();
});

// Revelado al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Anio actual
document.querySelectorAll('.anio').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
