/* ══ LOADER ══ */
window.addEventListener('load', () => {
  // Trigger animations instantly behind the loader curtain
  triggerHero();
  initReveal();
  
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    document.body.classList.add('loaded');
  }, 1000); // 1-second delay ensures elements are 100% finished animating when revealed
});

/* ══ HERO ENTRANCE ══ */
function triggerHero() {
  const bg = document.querySelector('.hero-bg-name');
  const tag = document.querySelector('.hero-tagline');
  const scroll = document.querySelector('.hero-scroll');
  const particles = document.getElementById('tsparticles');
  if (bg) setTimeout(() => bg.classList.add('on'), 100);
  if (tag) setTimeout(() => tag.classList.add('on'), 400);
  if (scroll) setTimeout(() => scroll.classList.add('on'), 600);
  if (particles) setTimeout(() => particles.classList.add('on'), 800);
  
  if (typeof tsParticles !== 'undefined') {
    initParticles();
  }
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

/* ══ PARTICLES BACKGROUND ══ */
function initParticles() {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ["#2b6de8", "#222222", "#666666"] },
      links: {
        enable: true,
        color: "#aaaaaa",
        distance: 140,
        opacity: 0.35,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out"
      },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.6 }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" }
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.7, color: "#2b6de8" } }
      }
    },
    detectRetina: true
  });
}
