/**
 * Hard / soft full page reload → send user to the splash (index.html).
 * First navigation (link, address bar) is unaffected.
 */
(function () {
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
