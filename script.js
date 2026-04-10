/* ══ THEME ══ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') html.setAttribute('data-theme', 'dark');

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

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

/* ══════════════════════════════════════════════════════════════════
   PREMIUM INTERACTIONS
   ══════════════════════════════════════════════════════════════════ */

/* ── 1. CUSTOM SPRING CURSOR ──────────────────────────────────────── */
(function initCursor() {
  // Only on devices with a fine pointer (mouse/trackpad)
  if (!matchMedia('(pointer: fine)').matches) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = -100, my = -100; // mouse  position
  let rx = -100, ry = -100; // ring   position (lagged)

  // Move dot instantly, ring with spring lag
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Spring-physics ring follows with lag
  (function rafLoop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(rafLoop);
  })();

  // Expand ring on interactive elements
  const hoverEls = 'a, button, .proj-card, .stag, .scard, .menu-item, .nav-logo';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Shrink dot on click
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  // Hide when leaving window
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '0.5'; });
})();


/* ── 2. SCROLL PROGRESS BAR ───────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100).toFixed(2) + '%';
  }, { passive: true });
})();


/* ── 3. VANILLA-TILT 3D on project cards ─────────────────────────── */
window.addEventListener('load', () => {
  if (typeof VanillaTilt === 'undefined') return;

  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    // Inject glow layer inside each card
    const glow = document.createElement('div');
    glow.className = 'tilt-glow';
    card.appendChild(glow);

    // Track mouse inside card to update glow position
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const py = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      glow.style.setProperty('--x', px);
      glow.style.setProperty('--y', py);
    });
  });

  VanillaTilt.init(document.querySelectorAll('.proj-card'), {
    max:           8,
    speed:         600,
    glare:         false,
    scale:         1.02,
    perspective:   1200,
    transition:    true,
    gyroscope:     false,
  });
});


/* ── 4 (removed: Magnetic Buttons) ─────────────────────────────── */


/* ── 5. SKILL TAG RIPPLE ──────────────────────────────────────────── */
(function initRipple() {
  document.querySelectorAll('.stag').forEach(tag => {
    tag.addEventListener('click', e => {
      const r    = tag.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const x    = e.clientX - r.left - size / 2;
      const y    = e.clientY - r.top  - size / 2;
      const rip  = document.createElement('span');
      rip.className = 'stag-ripple';
      rip.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      tag.appendChild(rip);
      rip.addEventListener('animationend', () => rip.remove());
    });
  });
})();


/* ── 6. SCROLL TO TOP BUTTON ──────────────────────────────────────── */
(function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
