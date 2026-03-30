/**
 * Circular ring that depletes from full to empty over 60 minutes (wall time).
 * Start time is stored in sessionStorage per video page path so returning in the same tab continues the hour.
 */
(function () {
  var wrap = document.querySelector('.video-hour-ring');
  if (!wrap) return;

  var HOUR_MS = 60 * 60 * 1000;
  var storageKey = 'hh-video-hour-start:' + location.pathname;
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

  var color = wrap.getAttribute('data-ring-color') || '#ffffff';
  var r = 43;
  var c = 2 * Math.PI * r;

  wrap.innerHTML =
    '<svg class="vhr-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
    '<circle class="vhr-glow" cx="50" cy="50" r="' +
    (r + 7) +
    '" fill="rgba(0,0,0,0.55)" />' +
    '<circle class="vhr-track" cx="50" cy="50" r="' +
    r +
    '" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="5.5" />' +
    '<circle class="vhr-progress" cx="50" cy="50" r="' +
    r +
    '" fill="none" stroke="' +
    color +
    '" stroke-width="5.5" stroke-linecap="round" transform="rotate(-90 50 50)" ' +
    'stroke-dasharray="' +
    c +
    '" stroke-dashoffset="0" />' +
    '</svg>';

  var prog = wrap.querySelector('.vhr-progress');
  if (!prog) return;

  function tick() {
    var elapsed = Date.now() - start;
    var t = Math.min(1, Math.max(0, elapsed / HOUR_MS));
    prog.setAttribute('stroke-dashoffset', String(c * t));
    if (t < 1) {
      requestAnimationFrame(tick);
    }
  }

  tick();
})();
