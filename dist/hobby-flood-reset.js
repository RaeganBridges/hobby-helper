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

/** Week 4 only: fade in flood.png (or fallback), run onOpaque at peak, fade out, then onDone. */
(function () {
  var FADE_MS = 640;
  var HOLD_MS = 480;

  window.runHobbyCloseFloodTransition = function (opts) {
    opts = opts || {};
    var onOpaque = typeof opts.onOpaque === 'function' ? opts.onOpaque : function () {};
    var onDone = typeof opts.onDone === 'function' ? opts.onDone : function () {};

    var HOBBY = window.HOBBY_FLOOD_RESET;
    var VC = window.HOBBY_VIDEO_CLOSE;

    if (document.querySelector('.hh-flood-close-root')) {
      onOpaque();
      onDone();
      return;
    }

    var reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      onOpaque();
      onDone();
      return;
    }

    var desk =
      opts.desktopBackdrop ||
      (VC && VC.desktopBackdrop) ||
      (HOBBY && HOBBY.desktopBackdrop) ||
      '';

    var primary =
      opts.imageSrc ||
      (VC && VC.floodImageSrc) ||
      '/images/flood/flood.png';
    var fb = (VC && VC.secondSrc) || (HOBBY && HOBBY.secondSrc) || '';

    document.documentElement.style.setProperty('--hh-flood-close-fade-ms', FADE_MS + 'ms');

    var root = document.createElement('div');
    root.className = 'hh-flood-close-root';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div class="hh-flood-shell">' +
      '<div class="hh-flood-stage">' +
      '<img class="hh-flood-img hh-flood-close-img" alt="" decoding="async" src="" />' +
      '</div></div>';

    document.body.appendChild(root);

    if (desk) {
      root.style.setProperty('--hh-flood-desktop-bg', desk);
    }

    var img = root.querySelector('.hh-flood-close-img');
    if (!img) {
      root.remove();
      onOpaque();
      onDone();
      return;
    }

    var triedFb = false;
    img.addEventListener('error', function () {
      if (triedFb || !fb) return;
      triedFb = true;
      img.src = fb;
    });
    img.src = primary;

    var timers = [];
    var finished = false;
    function cleanup() {
      if (finished) return;
      finished = true;
      timers.forEach(function (id) {
        clearTimeout(id);
      });
      if (root.parentNode) {
        root.remove();
      }
      onDone();
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('hh-flood-close-visible');
      });
    });

    timers.push(
      window.setTimeout(function () {
        onOpaque();
        timers.push(
          window.setTimeout(function () {
            root.classList.remove('hh-flood-close-visible');
            timers.push(window.setTimeout(cleanup, FADE_MS + 60));
          }, HOLD_MS + 40)
        );
      }, FADE_MS + 50)
    );
  };
})();
