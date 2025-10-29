(() => {
  const body = document.body;
  const themeButtons = document.querySelectorAll('#themeToggle, #themeToggleTeam');
  const pageWrap = document.getElementById('pageWrap');

  // Load saved theme
  const saved = localStorage.getItem('t7_theme');
  if (saved === 'light') body.classList.add('light');

  // Toggle theme
  function setTheme(light) {
    if (light) body.classList.add('light');
    else body.classList.remove('light');
    localStorage.setItem('t7_theme', light ? 'light' : 'dark');
    themeButtons.forEach(b => b.setAttribute('aria-pressed', light ? 'true' : 'false'));
    themeButtons.forEach(b => b.textContent = light ? '☀️' : '🌙');
  }

  themeButtons.forEach(btn => {
    btn?.addEventListener('click', () => setTheme(!body.classList.contains('light')));
  });

  // Page fade-in
  gsap.from(pageWrap, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' });

  // Smooth page transitions
  document.querySelectorAll('a.btn-primary').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = btn.getAttribute('href');

      if (pageWrap) {
        gsap.to(pageWrap, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power1.in',
          onComplete: () => window.location.href = url
        });
      } else {
        window.location.href = url;
      }
    });
  });

  // Tilt effect
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -8;
      const ry = (px - 0.5) * 10;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
})();
