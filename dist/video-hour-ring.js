/**
 * Circular ring that depletes from full to empty over 60 minutes (wall time on this page).
 */
(function () {
  var wrap = document.querySelector('.video-hour-ring');
  if (!wrap) return;

  var HOUR_MS = 60 * 60 * 1000;
  var start = Date.now();

  var color = wrap.getAttribute('data-ring-color') || '#ffffff';
  var r = 32;
  var sw = 8;
  var c = 2 * Math.PI * r;

  wrap.innerHTML =
    '<svg class="vhr-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
    '<circle class="vhr-track" cx="50" cy="50" r="' +
    r +
    '" fill="none" stroke="rgba(255,255,255,0.82)" stroke-width="' +
    sw +
    '" />' +
    '<circle class="vhr-progress" cx="50" cy="50" r="' +
    r +
    '" fill="none" stroke="' +
    color +
    '" stroke-width="' +
    sw +
    '" stroke-linecap="round" transform="rotate(-90 50 50)" ' +
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
