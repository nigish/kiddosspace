/* My First 100 Foods — theme-art loader (per-theme, on demand) */
window.THEME_TEMPLATES = window.THEME_TEMPLATES || { classic: null };
window.THEME_TEMPLATES_LANDSCAPE = window.THEME_TEMPLATES_LANDSCAPE || {};
(function () {
  var files = {}; // src -> Promise (dedupe)
  function loadFile(src) {
    if (!files[src]) {
      files[src] = new Promise(function (res, rej) {
        var s = document.createElement('script');
        s.src = src; s.async = true;
        s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    return files[src];
  }
  // Loads a theme's portrait art (+ landscape if asked); resolves when ready.
  window.loadThemeArt = function (key, landscape) {
    if (!key || key === 'classic') return Promise.resolve();
    var jobs = [ loadFile('art/' + key + '.js').catch(function () {}) ];
    if (landscape) jobs.push(loadFile('art/' + key + '.l.js').catch(function () {}));
    return Promise.all(jobs);
  };
})();
