(function () {
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Notch: tap to open on touch, closes on outside tap / Escape / mouse leave; clock in Seoul time.
(function () {
  var notch = document.querySelector('[data-notch]');
  if (!notch) return;
  var toggle = notch.querySelector('[data-notch-toggle]');
  function set(open) {
    notch.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  }
  toggle.addEventListener('click', function () { set(!notch.classList.contains('is-open')); });
  notch.addEventListener('mouseleave', function () { set(false); });
  document.addEventListener('click', function (e) { if (!notch.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); } });

  var clock = notch.querySelector('[data-notch-clock]');
  var fmt = new Intl.DateTimeFormat('ko-KR', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Seoul' });
  function tick() { clock.textContent = fmt.format(new Date()); }
  tick();
  setInterval(tick, 15000);
})();
