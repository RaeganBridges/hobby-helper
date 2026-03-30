/**
 * Open a full-screen embedded MP4 player on the current page (no navigation).
 * Usage: openHobbyVideoEmbed({ src: '/games.mp4', closeStroke: '#dd3d4d' });
 */
(function () {
  var root, video, wrap, shell, frame, closeBtn, pathEl;
  var layoutApply = function () {};
  var hourRaf = null;
  var onKeyDown = function (e) {
    if (e.key === 'Escape') closeHobbyVideoEmbed();
  };

  function stopHourRing() {
    if (hourRaf != null) {
      cancelAnimationFrame(hourRaf);
      hourRaf = null;
    }
  }

  /** Light tint of accent hex for the disc behind the ring (replaces flat black). */
  function fillForAccent(hex) {
    if (!hex || typeof hex !== 'string') {
      return 'rgba(255, 250, 252, 0.9)';
    }
    var h = hex.trim().replace(/^#/, '');
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    if (h.length !== 6 || !/^[a-f0-9]+$/i.test(h)) {
      return 'rgba(255, 250, 252, 0.9)';
    }
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    var t = 0.55;
    r = Math.round(r + (255 - r) * t);
    g = Math.round(g + (255 - g) * t);
    b = Math.round(b + (255 - b) * t);
    return 'rgba(' + r + ',' + g + ',' + b + ',0.88)';
  }

  function startHourRing(ringColor) {
    stopHourRing();
    if (!root) return;
    var prog = root.querySelector('.hve-hour-progress');
    if (!prog) return;
    if (ringColor) prog.setAttribute('stroke', ringColor);
    var back = root.querySelector('.hve-hour-back');
    if (back) back.setAttribute('fill', fillForAccent(ringColor || '#ffffff'));

    var HOUR_MS = 60 * 60 * 1000;
    var c = 2 * Math.PI * 43;
    var storageKey = 'hh-video-hour-start:hve:' + location.pathname;
    var now = Date.now();
    var start;
    try {
      var raw = sessionStorage.getItem(storageKey);
      var parsed = raw ? parseInt(raw, 10) : NaN;
      if (!isFinite(parsed) || parsed > now) {
        start = now;
        sessionStorage.setItem(storageKey, String(start));
      } else {
        start = parsed;
      }
    } catch (e) {
      start = now;
    }

    function tick() {
      if (!root || !root.classList.contains('hve-visible')) {
        hourRaf = null;
        return;
      }
      var elapsed = Date.now() - start;
      var t = Math.min(1, Math.max(0, elapsed / HOUR_MS));
      prog.setAttribute('stroke-dashoffset', String(c * t));
      if (t < 1) {
        hourRaf = requestAnimationFrame(tick);
      } else {
        hourRaf = null;
      }
    }
    hourRaf = requestAnimationFrame(tick);
  }

  function tryPlayVideo() {
    if (!video) return;
    function tryPlay() {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          video.setAttribute('controls', '');
        });
      }
    }
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener('canplay', tryPlay, { once: true });
  }

  function ensureDom() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'hobby-video-embed';
    root.className = 'hve-root';
    root.setAttribute('aria-hidden', 'true');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Video');
    root.innerHTML =
      '<div class="hve-page-wrap">' +
      '<div class="hve-shell">' +
      '<div class="hve-frame">' +
      '<video id="hve-video" autoplay loop muted playsinline webkit-playsinline preload="auto" aria-label="Video">' +
      '<source type="video/mp4" />' +
      '</video>' +
      '<div class="hve-overlay-layer">' +
      '<div class="hve-hour-ring" aria-hidden="true">' +
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<circle class="hve-hour-back" cx="50" cy="50" r="50" fill="rgba(255,250,252,0.9)"/>' +
      '<circle cx="50" cy="50" r="43" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="5.5"/>' +
      '<circle class="hve-hour-progress" cx="50" cy="50" r="43" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" transform="rotate(-90 50 50)" stroke-dasharray="270.18" stroke-dashoffset="0"/>' +
      '</svg></div></div>' +
      '<button type="button" class="hve-close" aria-label="Close video">' +
      '<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" overflow="visible">' +
      '<path class="hve-close-path" d="M 10 10 L 46 46 M 46 10 L 10 46" fill="none" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>' +
      '</svg>' +
      '</button>' +
      '</div></div></div>';

    document.body.appendChild(root);
    video = document.getElementById('hve-video');
    wrap = root.querySelector('.hve-page-wrap');
    shell = root.querySelector('.hve-shell');
    frame = root.querySelector('.hve-frame');
    closeBtn = root.querySelector('.hve-close');
    pathEl = root.querySelector('.hve-close-path');

    closeBtn.addEventListener('click', function () {
      closeHobbyVideoEmbed();
    });
  }

  function wirePlayback() {
    var v = video;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    v.addEventListener('error', function () {
      v.setAttribute('controls', '');
    });

    function applyLayout() {
      if (!wrap || !shell || !frame) return;
      if (window.matchMedia('(min-width: 768px)').matches) {
        shell.style.removeProperty('height');
        shell.style.removeProperty('min-height');
        shell.style.removeProperty('max-height');
        frame.style.removeProperty('height');
        frame.style.removeProperty('min-height');
        return;
      }
      var h = wrap.getBoundingClientRect().height;
      if (h < 2) h = window.innerHeight;
      shell.style.boxSizing = 'border-box';
      shell.style.height = h + 'px';
      shell.style.minHeight = h + 'px';
      shell.style.maxHeight = h + 'px';
      frame.style.height = h + 'px';
      frame.style.minHeight = h + 'px';
      try {
        var playP = v.play();
        if (playP && typeof playP.catch === 'function') playP.catch(function () {});
      } catch (ePlay) {}
    }
    layoutApply = applyLayout;

    applyLayout();
    window.addEventListener('resize', applyLayout);
    window.addEventListener('orientationchange', function () {
      setTimeout(applyLayout, 350);
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', applyLayout);
    }
    requestAnimationFrame(function () {
      applyLayout();
      setTimeout(applyLayout, 100);
    });
    v.addEventListener('loadedmetadata', function () {
      requestAnimationFrame(applyLayout);
    });
    v.addEventListener('loadeddata', function () {
      requestAnimationFrame(applyLayout);
    });
  }

  var playbackWired = false;

  window.openHobbyVideoEmbed = function (opts) {
    opts = opts || {};
    var src = opts.src;
    if (!src) return;
    ensureDom();

    if (pathEl && opts.closeStroke) {
      pathEl.setAttribute('stroke', opts.closeStroke);
    }

    var ringColor = opts.hourRingColor || opts.closeStroke || '#ffffff';
    startHourRing(ringColor);

    if (!playbackWired) {
      wirePlayback();
      playbackWired = true;
    }

    var srcEl = video.querySelector('source');
    if (srcEl) srcEl.setAttribute('src', src);
    video.load();

    var isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      video.addEventListener(
        'loadedmetadata',
        function () {
          try {
            if (video.readyState >= 1) video.currentTime = 0.05;
          } catch (eT) {}
        },
        { once: true }
      );
    }

    tryPlayVideo();

    root.classList.add('hve-visible');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    requestAnimationFrame(function () {
      layoutApply();
    });
  };

  window.closeHobbyVideoEmbed = function () {
    if (!root) return;
    stopHourRing();
    try {
      video.pause();
    } catch (e) {}
    root.classList.remove('hve-visible');
    root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  };
})();
