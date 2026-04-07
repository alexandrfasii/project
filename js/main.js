/* ============================================
   MAIN.JS
   1. Header scroll state
   2. Mobile nav toggle
   3. Before/After drag slider
   ============================================ */


/* ---- 1. HEADER SCROLL ---- */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ---- 2. MOBILE NAV ---- */
(function initMobileNav() {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on any nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
})();


/* ---- 3. BEFORE / AFTER SLIDER ---- */
(function initBASlider() {
  const slider = document.getElementById('baSlider');
  const before = slider?.querySelector('.ba-before');
  const handle = document.getElementById('baHandle');
  if (!slider || !before || !handle) return;

  let isDragging = false;

  function getPercent(clientX) {
    const rect = slider.getBoundingClientRect();
    const raw  = (clientX - rect.left) / rect.width;
    return Math.min(Math.max(raw, 0.03), 0.97);
  }

  function setPosition(clientX) {
    const pct = getPercent(clientX);
    before.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
    handle.style.left     = `${pct * 100}%`;
  }

  // Mouse events
  handle.addEventListener('mousedown', e => {
    isDragging = true;
    e.preventDefault();
  });

  slider.addEventListener('mousedown', e => {
    isDragging = true;
    setPosition(e.clientX);
  });

  window.addEventListener('mousemove', e => {
    if (isDragging) setPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events
  handle.addEventListener('touchstart', () => {
    isDragging = true;
  }, { passive: true });

  slider.addEventListener('touchstart', e => {
    isDragging = true;
    if (e.touches[0]) setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (isDragging && e.touches[0]) setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
})();
