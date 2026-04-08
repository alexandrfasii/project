/* ============================================
   MAIN.JS
   1. Header scroll state
   2. Mobile nav
   3. Scroll reveal (IntersectionObserver)
   ============================================ */

'use strict';


/* ---- 1. TYPEWRITER ---- */
(function initTypewriter() {
  const el      = document.getElementById('heroTypewriter');
  if (!el) return;

  const textEl  = el.querySelector('.typewriter__text');
  const cursor  = el.querySelector('.typewriter__cursor');
  const word    = '/f.dev';

  // Reduced motion — show instantly, no cursor
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textEl.innerHTML = '<span class="tw-slash">/</span>f.dev';
    cursor.style.display = 'none';
    return;
  }

  let i = 0;

  function renderText(str) {
    if (!str.length) { textEl.innerHTML = ''; return; }
    const slash = str[0] === '/' ? '<span class="tw-slash">/</span>' : '';
    const rest  = str[0] === '/' ? str.slice(1) : str;
    textEl.innerHTML = slash + rest;
  }

  function type() {
    if (i < word.length) {
      i++;
      renderText(word.slice(0, i));
      const delay = i === 1 ? 320 : 160;
      setTimeout(type, delay);
    } else {
      // Typing done — trigger shimmer, cursor keeps blinking
      el.classList.add('is-typed');
    }
  }

  // Start after a short initial pause
  setTimeout(type, 450);
})();


/* ---- 2. GROW WORD ---- */
(function initGrowWord() {
  const el = document.querySelector('.word-grow');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let explodeTimer = null;

  function reset() {
    clearTimeout(explodeTimer);
    explodeTimer = null;
    el.classList.remove('is-shaking', 'is-exploding');
  }

  el.addEventListener('mouseenter', () => {
    reset();
    el.classList.add('is-shaking');
    explodeTimer = setTimeout(() => {
      el.classList.remove('is-shaking');
      el.classList.add('is-exploding');
      setTimeout(() => el.classList.remove('is-exploding'), 550);
    }, 1500);
  });

  el.addEventListener('mouseleave', () => {
    reset();
    el.classList.add('is-rippling');
    setTimeout(() => el.classList.remove('is-rippling'), 800);
  });
})();


/* ---- 3. HEADER SCROLL ---- */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function update() {
    header.classList.toggle('scrolled', window.scrollY > 16);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ---- 4. MOBILE NAV ---- */
(function initMobileNav() {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  function open() {
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    menu.classList.contains('open') ? close() : open();
  });

  // Close on any link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) close();
  });
})();


/* ---- 5. SCROLL REVEAL ---- */
(function initScrollReveal() {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const THRESHOLD = 0.12;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: THRESHOLD });

  // Observe individual animated elements
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // Observe stagger group containers
  document.querySelectorAll('[data-animate-group]').forEach(el => {
    observer.observe(el);
  });
})();
