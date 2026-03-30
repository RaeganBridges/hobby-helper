/**
 * Hard / soft full page reload → send user to the splash (index.html).
 * First navigation (link, address bar) is unaffected.
 * Hobby hub pages (week grid + title flood reset) and standalone *-video pages stay on the
 * same URL when reloaded — including clean URLs without a .html suffix (e.g. /car-repair).
 */
(function () {
  var path = typeof location !== 'undefined' && location.pathname ? location.pathname : '';
  var seg = path.split('/').pop() || '';
  var base = seg.replace(/\.html$/i, '').toLowerCase();

  var stayOnReload = [
    'sewing',
    'games',
    'reading',
    'car-repair',
    'sewing-video',
    'games-video',
    'reading-video',
    'car-repair-video',
  ];
  if (stayOnReload.indexOf(base) !== -1) {
    return;
  }

  var reload = false;
  try {
    var entries = performance.getEntriesByType && performance.getEntriesByType('navigation');
    if (entries && entries.length > 0 && entries[0].type === 'reload') {
      reload = true;
    }
  } catch (e) {}
  if (!reload && typeof performance !== 'undefined' && performance.navigation) {
    try {
      if (performance.navigation.type === 1) {
        reload = true;
      }
    } catch (e2) {}
  }
  if (reload) {
    window.location.replace('index.html');
  }
})();
