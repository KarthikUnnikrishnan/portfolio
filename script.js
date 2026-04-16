/* ══ THEME ══ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
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
  // Skip 3D tilt entirely on touch / mobile devices
  if (!matchMedia('(pointer: fine)').matches) return;
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


/* ══════════════════════════════════════════════════════════════════
   DATA PULSE WAVEFORM — Enhanced Cursor Interactions
   ══════════════════════════════════════════════════════════════════ */
(function initWaveform() {
  // Skip entirely on touch / mobile — no mouse, no RAF overhead
  if (!matchMedia('(pointer: fine)').matches) return;

  const canvas  = document.getElementById('waveformCanvas');
  if (!canvas) return;

  const ctx     = canvas.getContext('2d');
  const heroEl  = document.getElementById('hero');

  /* ── Wave layer definitions ──────────────────────────────────── */
  const waves = [
    { amplitude: 55, frequency: 0.011, speed: 0.006, baseSpeed: 0.006, phase: 0,   opacity: 0.55, width: 1.5 },
    { amplitude: 32, frequency: 0.017, speed: 0.010, baseSpeed: 0.010, phase: 2.1, opacity: 0.30, width: 1.0 },
    { amplitude: 18, frequency: 0.026, speed: 0.004, baseSpeed: 0.004, phase: 4.4, opacity: 0.15, width: 0.7 },
  ];

  /* ── State ───────────────────────────────────────────────────── */
  let W = 0, H = 0;

  // Mouse position (canvas-relative)
  let mouseX = -999, mouseY = -999;
  let prevMouseX = -999, prevMouseY = -999;

  // Lerped values — everything is smoothed to avoid jerks
  let amplitudeCurrent  = 1.0;   // lerped amplitude multiplier
  let amplitudeTarget   = 1.0;
  let centerYCurrent    = 0.5;   // lerped vertical center (0–1 fraction of canvas H)
  let centerYTarget     = 0.5;
  let speedMult         = 1.0;   // lerped speed multiplier from velocity
  let speedMultTarget   = 1.0;
  let rippleStrength    = 0.0;   // lerped ripple intensity
  let rippleTarget      = 0.0;
  let glowAlpha         = 0.0;   // lerped cursor halo opacity

  // Floating particles array
  const particles = [];
  const MAX_PARTICLES = 40;

  let rafId = null;
  let isVisible = false;
  let inCanvas = false; // cursor is over the canvas region

  /* ── Resize ──────────────────────────────────────────────────── */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width  * window.devicePixelRatio;
    H = canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  /* ── Mouse tracking ──────────────────────────────────────────── */
  heroEl.addEventListener('mousemove', e => {
    const r   = canvas.getBoundingClientRect();
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    // Convert to canvas-local coords
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    mouseX = cx;
    mouseY = cy;

    inCanvas = cx >= 0 && cx <= r.width && cy >= 0 && cy <= r.height;

    if (inCanvas) {
      // 1. Amplitude boost — closer to left edge of canvas → bigger boost
      const proximity   = Math.max(0, 1 - cx / (r.width * 1.4));
      amplitudeTarget   = 1.0 + proximity * 0.9;

      // 2. Vertical centerline — cursor Y shifts wave center (±15%)
      centerYTarget = 0.5 + ((cy / r.height) - 0.5) * 0.3;

      // 3. Velocity → speed multiplier (gentle — no dramatic surges)
      const vx = cx - prevMouseX;
      const vy = cy - prevMouseY;
      const vel = Math.sqrt(vx * vx + vy * vy);
      speedMultTarget = 1.0 + Math.min(vel * 0.02, 0.8); // cap at 1.8×

      // 4. Ripple intensity — very subtle
      rippleTarget = Math.min(vel * 0.08, 6);

      // 5. Glow halo — barely visible
      glowAlpha = 0.04 + proximity * 0.06;

      // 6. Spawn a particle at cursor position (throttled)
      if (particles.length < MAX_PARTICLES && Math.random() < 0.45) {
        particles.push({
          x:       cx + (Math.random() - 0.5) * 20,
          y:       cy,
          vx:      (Math.random() - 0.5) * 0.8,
          vy:      -(Math.random() * 1.2 + 0.4),  // drift upward
          radius:  Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          life:    0,
          maxLife: Math.floor(Math.random() * 50 + 50), // 50–100 frames
        });
      }
    } else {
      // Cursor left canvas area — gently reset
      amplitudeTarget  = 1.0;
      centerYTarget    = 0.5;
      speedMultTarget  = 1.0;
      rippleTarget     = 0.0;
      glowAlpha        = 0.0;
    }
  }, { passive: true });

  heroEl.addEventListener('mouseleave', () => {
    inCanvas        = false;
    amplitudeTarget = 1.0;
    centerYTarget   = 0.5;
    speedMultTarget = 1.0;
    rippleTarget    = 0.0;
    glowAlpha       = 0.0;
  }, { passive: true });

  /* ── Draw cursor glow halo ───────────────────────────────────── */
  function drawCursorGlow(cssW, cssH) {
    if (glowAlpha < 0.01 || !inCanvas) return;
    const r = Math.min(cssW, cssH) * 0.22;
    const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, r);
    grad.addColorStop(0,   `rgba(43, 109, 232, ${(glowAlpha * 0.55).toFixed(3)})`);
    grad.addColorStop(0.4, `rgba(43, 109, 232, ${(glowAlpha * 0.18).toFixed(3)})`);
    grad.addColorStop(1,   'rgba(43, 109, 232, 0)');
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.restore();
  }

  /* ── Draw floating particles ─────────────────────────────────── */
  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.x  += p.vx;
      p.y  += p.vy;
      p.vx += (Math.random() - 0.5) * 0.1; // slight horizontal wander

      const progress = p.life / p.maxLife;
      const alpha    = p.opacity * (1 - progress) * (1 - progress); // easeOut fade

      if (p.life >= p.maxLife || alpha < 0.01) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * (1 - progress * 0.5), 0, Math.PI * 2);
      ctx.fillStyle   = `rgba(43, 109, 232, ${alpha.toFixed(3)})`;
      ctx.shadowColor = 'rgba(43, 109, 232, 0.8)';
      ctx.shadowBlur  = 6;
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Draw a single wave layer ────────────────────────────────── */
  function drawWave(wave, cssW, cssH) {
    const midY = cssH * centerYCurrent; // follows cursor Y
    const pts  = [];

    for (let x = 0; x <= cssW; x += 2) {
      // Base sine motion
      let y = midY
        + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude * amplitudeCurrent
        + Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.3) * (wave.amplitude * 0.35) * amplitudeCurrent;

      // Cursor ripple distortion — Gaussian envelope centred at mouseX
      if (inCanvas && rippleStrength > 0.5) {
        const dx       = x - mouseX;
        const sigma    = 80;                                         // ripple spread radius
        const envelope = Math.exp(-(dx * dx) / (2 * sigma * sigma)); // Gaussian
        const ripple   = Math.sin(dx * 0.12) * rippleStrength * envelope;
        y += ripple;
      }

      pts.push({ x, y });
    }

    // Horizontal gradient — transparent → solid → transparent
    const grad = ctx.createLinearGradient(0, 0, cssW, 0);
    grad.addColorStop(0,    'rgba(43, 109, 232, 0)');
    grad.addColorStop(0.12, `rgba(43, 109, 232, ${(wave.opacity * 0.4).toFixed(3)})`);
    grad.addColorStop(0.45, `rgba(43, 109, 232, ${wave.opacity.toFixed(3)})`);
    grad.addColorStop(0.78, `rgba(43, 109, 232, ${(wave.opacity * 0.6).toFixed(3)})`);
    grad.addColorStop(1,    'rgba(43, 109, 232, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const cpx  = (prev.x + pts[i].x) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cpx, (prev.y + pts[i].y) / 2);
    }
    ctx.strokeStyle = grad;
    ctx.lineWidth   = wave.width + (amplitudeCurrent - 1) * 0.5; // line thickens slightly on boost
    ctx.shadowColor = 'rgba(43, 109, 232, 0.7)';
    ctx.shadowBlur  = (10 + rippleStrength * 0.4) * amplitudeCurrent;
    ctx.stroke();

    // Data dots — only on primary wave, more appear during interaction
    if (wave.width > 1) {
      const dotCount = Math.floor(8 + amplitudeCurrent * 6);
      const step     = Math.floor(pts.length / dotCount);
      if (step < 1) { ctx.restore(); return; } // safety: avoid step=0 infinite loop
      for (let i = 0; i < pts.length; i += step) {
        const pt  = pts[i];
        const opc = (wave.opacity * 0.85 * amplitudeCurrent).toFixed(3);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.8 + (amplitudeCurrent - 1) * 0.8, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(43, 109, 232, ${opc})`;
        ctx.shadowBlur  = 6 + rippleStrength * 0.2;
        ctx.fill();
      }
    }
    ctx.restore();
  }

  /* ── Main animation loop ─────────────────────────────────────── */
  function animate() {
    if (!isVisible) { rafId = null; return; }

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;

    // Guard: canvas is hidden (e.g. display:none on resize) — skip draw, keep loop alive
    if (cssW === 0 || cssH === 0) {
      rafId = requestAnimationFrame(animate);
      return;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    // Smooth lerp all interactive state (different speeds for feel)
    amplitudeCurrent  += (amplitudeTarget   - amplitudeCurrent)  * 0.06;
    centerYCurrent    += (centerYTarget     - centerYCurrent)    * 0.04; // slow drift feels organic
    speedMult         += (speedMultTarget   - speedMult)         * 0.08;
    rippleStrength    += (rippleTarget      - rippleStrength)    * 0.10;
    glowAlpha         += (((inCanvas ? glowAlpha : 0) || 0)     - glowAlpha) * 0.06;

    // Decay speed and ripple back to baseline when cursor is idle
    speedMultTarget  += (1.0 - speedMultTarget) * 0.07;
    rippleTarget     += (0.0 - rippleTarget)    * 0.08;

    // Draw layers — back to front
    drawCursorGlow(cssW, cssH);

    waves.forEach(wave => {
      wave.phase += wave.baseSpeed * speedMult;
      drawWave(wave, cssW, cssH);
    });

    updateParticles();

    rafId = requestAnimationFrame(animate);
  }

  /* ── IntersectionObserver ────────────────────────────────────── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible = true;
        canvas.classList.add('on');
        if (!rafId) rafId = requestAnimationFrame(animate);
      } else {
        isVisible = false;
        canvas.classList.remove('on');
      }
    });
  }, { threshold: 0.05 });

  resize();
  io.observe(heroEl);
})();
