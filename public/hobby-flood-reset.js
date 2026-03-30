(function () {
  var CFG = window.HOBBY_FLOOD_RESET;
  if (!CFG || !CFG.keys || !CFG.secondSrc) return;

  var FPS = 60;
  var FIRST_HOLD_FRAMES = 60;
  var OTHER_HOLD_FRAMES = 20;
  var BLEND_FRAMES = 55;
  var LOGO = '/images/flood/01-logo.png';

  function framesToMs(frames) {
    return (frames / FPS) * 1000;
  }

  function clearKeys() {
    CFG.keys.forEach(function (k) {
      try {
        localStorage.removeItem(k);
      } catch (e) {}
    });
  }

  function run() {
    var titleEl = document.querySelector('[data-hobby-flood-title]');
    if (!titleEl) return;

    titleEl.addEventListener('click', function () {
      if (document.querySelector('.hh-flood-overlay-root')) return;

      clearKeys();

      var reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        window.location.reload();
        return;
      }

      var blendMs = framesToMs(BLEND_FRAMES);
      document.documentElement.style.setProperty('--hh-flood-blend-ms', blendMs + 'ms');

      var root = document.createElement('div');
      root.className = 'hh-flood-overlay-root';
      root.setAttribute('aria-hidden', 'true');
      root.innerHTML =
        '<div class="hh-flood-shell">' +
        '<div class="hh-flood-stage">' +
        '<img class="hh-flood-img hh-flood-base" alt="" decoding="async" src="' +
        LOGO +
        '" />' +
        '<img class="hh-flood-img hh-flood-overlay" alt="" decoding="async" src="" />' +
        '</div></div>';

      document.body.appendChild(root);

      if (CFG.desktopBackdrop) {
        root.style.setProperty('--hh-flood-desktop-bg', CFG.desktopBackdrop);
      }

      var baseEl = root.querySelector('.hh-flood-base');
      var overlayEl = root.querySelector('.hh-flood-overlay');
      if (!baseEl || !overlayEl) {
        root.remove();
        window.location.reload();
        return;
      }

      function crossfadeThen(then) {
        overlayEl.src = CFG.secondSrc;
        overlayEl.classList.remove('hh-flood-overlay-in');
        void overlayEl.offsetWidth;
        overlayEl.classList.add('hh-flood-overlay-in');
        window.setTimeout(function () {
          baseEl.src = CFG.secondSrc;
          overlayEl.classList.remove('hh-flood-overlay-in');
          then();
        }, blendMs + 80);
      }

      window.setTimeout(function () {
        crossfadeThen(function () {
          window.setTimeout(function () {
            root.remove();
            window.location.reload();
          }, framesToMs(OTHER_HOLD_FRAMES));
        });
      }, framesToMs(FIRST_HOLD_FRAMES));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
