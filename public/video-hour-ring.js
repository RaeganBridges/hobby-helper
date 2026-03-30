/**
 * Bottom bar timer: empties over 60 minutes (wall time on this page).
 * Expects .video-hour-bar with .video-hour-bar-fill; optional data-bar-accent="#hex" on .video-hour-bar.
 */
(function () {
  var wrap = document.querySelector('.video-hour-bar');
  if (!wrap) return;
  var fill = wrap.querySelector('.video-hour-bar-fill');
  if (!fill) return;

  var accent = wrap.getAttribute('data-bar-accent');
  if (accent) wrap.style.setProperty('--vhr-bar-accent', accent);

  var HOUR_MS = 60 * 60 * 1000;
  var start = Date.now();

  function tick() {
    var elapsed = Date.now() - start;
    var t = Math.min(1, Math.max(0, elapsed / HOUR_MS));
    fill.style.transform = 'scaleX(' + (1 - t) + ')';
    if (t < 1) requestAnimationFrame(tick);
  }

  tick();
})();
