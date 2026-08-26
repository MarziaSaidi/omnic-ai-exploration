/**
 * Omnic.AI — capability index
 *
 * The seven Forge capabilities make a long section. A sticky index bar names
 * the capability currently in view, counts position (03 / 07) and fills a
 * hairline progress rule. It answers "where am I and how much is left" without
 * a single extra pixel of decoration.
 *
 * Falls back silently: with no IntersectionObserver the bar simply shows the
 * first entry, and with reduced motion the progress rule still updates because
 * it is information, not animation.
 */
Omnic.register('caps', function () {
  var section = document.querySelector('.caps');
  if (!section) return;

  var bar = section.querySelector('.caps__index');
  var titleEl = section.querySelector('.caps__index-title');
  var countEl = section.querySelector('.caps__index-count');
  var items = Omnic.all('.cap', section);
  if (!bar || !items.length) return;

  var total = items.length;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var current = -1;

  function setCurrent(i) {
    if (i === current) return;
    current = i;
    var cap = items[i];
    if (titleEl) titleEl.textContent = cap.getAttribute('data-cap-title') || '';
    if (countEl) countEl.textContent = pad(i + 1) + ' / ' + pad(total);
  }

  setCurrent(0);

  // Which capability owns the band just below the sticky bar?
  Omnic.onScroll(function (s) {
    var line = s.h * 0.34;
    var active = 0;
    for (var i = 0; i < total; i++) {
      if (items[i].getBoundingClientRect().top <= line) active = i;
    }
    setCurrent(active);

    var rect = section.getBoundingClientRect();
    var travelled = Omnic.clamp(-rect.top + s.h * 0.5, 0, rect.height);
    bar.style.setProperty('--caps-progress', (travelled / Math.max(1, rect.height)).toFixed(4));
  });
});
