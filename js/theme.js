/* Theme toggle — zen-wu.social
   - Auto: dark 8pm–6am local time, light otherwise
   - Persists via localStorage
   - Respects system prefers-color-scheme changes (when no stored pref) */
(function () {
  var KEY = 'theme';

  function getAutoTheme() {
    var h = new Date().getHours();
    return (h >= 20 || h < 6) ? 'dark' : 'light';
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
  }

  function setTheme(t) {
    applyTheme(t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
  }

  /* Wire up button after DOM is ready */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  });

  /* Respond to OS-level changes (only when user hasn't stored a pref) */
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      try {
        if (!localStorage.getItem(KEY)) applyTheme(e.matches ? 'dark' : 'light');
      } catch (e) {}
    });
  }
})();
