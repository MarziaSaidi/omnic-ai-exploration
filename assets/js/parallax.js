/**
 * Omnic.AI — parallax
 *
 * Used exactly once, on the backdrop of the Forge statement, at a low
 * amplitude. JS only writes a `--parallax` custom property; CSS decides what
 * to do with it, which keeps the transform in one place and lets reduced
 * motion cancel the effect without touching this file.
 */
Omnic.register('parallax', function () {
  var layers = Omnic.all('[data-parallax]');
  if (!layers.length || Omnic.reducedMotion()) return;

  Omnic.onScroll(function (s) {
    layers.forEach(function (layer) {
      var host = layer.parentElement;
      var rect = host.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > s.h) return;         // off-screen: skip

      var amount = parseFloat(layer.getAttribute('data-parallax')) || 60;
      var centre = rect.top + rect.height / 2;
      var offset = (centre - s.h / 2) / s.h;                 // -1 … 1
      layer.style.setProperty('--parallax', (offset * amount).toFixed(1) + 'px');
    });
  });
});
