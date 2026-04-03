/* ══ LOADER ══ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    document.body.classList.add('loaded');
    triggerHero();
    initReveal();
  }, 1000);
});

/* ══ HERO ENTRANCE ══ */
function triggerHero() {
  const bg = document.querySelector('.hero-bg-name');
  const tag = document.querySelector('.hero-tagline');
  const scroll = document.querySelector('.hero-scroll');
  if (bg) setTimeout(() => bg.classList.add('on'), 100);
  if (tag) setTimeout(() => tag.classList.add('on'), 400);
  if (scroll) setTimeout(() => scroll.classList.add('on'), 600);
}

/* ══ MENU ══ */
const menuBtn = document.getElementById('menuBtn');
const menuLabel = document.getElementById('menuLabel');
const menuDrop = document.getElementById('menuDropdown');
const menuDots = document.getElementById('menuDotsIcon');
const menuX = document.getElementById('menuXIcon');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  menuDrop.classList.add('open');
  menuDrop.setAttribute('aria-hidden', 'false');
  menuLabel.textContent = 'Close';
  menuBtn.classList.add('menu-open');
}
function closeMenu() {
  menuOpen = false;
  menuDrop.classList.remove('open');
  menuDrop.setAttribute('aria-hidden', 'true');
  menuLabel.textContent = 'Menu';
  menuBtn.classList.remove('menu-open');
}
menuBtn.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', closeMenu);
});
document.addEventListener('click', e => {
  if (menuOpen && !document.getElementById('menuWrap').contains(e.target)) closeMenu();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) closeMenu(); });

/* ── Close menu automatically on scroll ── */
window.addEventListener('scroll', () => { if (menuOpen) closeMenu(); }, { passive: true });

/* ══ SCROLL REVEAL ══ */
function initReveal() {
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══ NAV SCROLL ══ */
const nav = document.getElementById('nav');
let pY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 50);
  nav.classList.toggle('nav-up', y > pY && y > 150);
  pY = y;
}, { passive: true });

/* ══ HERO BG PARALLAX ══ */
const heroBg = document.querySelector('.hero-bg-name');
window.addEventListener('scroll', () => {
  if (heroBg) heroBg.style.translate = `0 ${window.scrollY * 0.18}px`;
}, { passive: true });

/* ══ ROTATING TAGLINE WORD ══ */
const rotWord = document.getElementById('rotatingWord');
const rdWords = ["future.", "vision.", "success.", "stories.", "systems."];
let rwIdx = 0;
setInterval(() => {
  rotWord.classList.add('out');
  setTimeout(() => {
    rwIdx = (rwIdx + 1) % rdWords.length;
    rotWord.textContent = rdWords[rwIdx];
    rotWord.classList.remove('out');
    rotWord.classList.add('in');
    void rotWord.offsetWidth; // force browser layout reflow instantly
    rotWord.classList.remove('in');
  }, 500);
}, 3000);
