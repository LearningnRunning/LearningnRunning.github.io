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

// Top bar menu on small screens: closes on outside tap, Escape or following a link.
(function () {
  var bar = document.querySelector('[data-topbar]');
  if (!bar) return;
  var toggle = bar.querySelector('[data-menu-toggle]');
  function set(open) {
    bar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function () { set(!bar.classList.contains('is-open')); });
  document.addEventListener('click', function (e) {
    if (!bar.contains(e.target) || e.target.closest('#site-nav a')) set(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
