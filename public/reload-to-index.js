/**
 * Hard / soft full page reload → send user to the splash (index.html).
 * First navigation (link, address bar) is unaffected.
 * Hobby hub pages (week grid + title flood reset) stay on the same URL when reloaded.
 */
(function () {
  var path = typeof location !== 'undefined' && location.pathname ? location.pathname : '';
  var file = path.split('/').pop() || '';
  var hobbyHubStay = [
    'sewing.html',
    'games.html',
    'reading.html',
    'car-repair.html',
  ];
  if (hobbyHubStay.indexOf(file) !== -1) {
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
