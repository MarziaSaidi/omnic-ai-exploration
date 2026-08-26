/**
 * Omnic.AI — marquee
 *
 * Clones the track once so the CSS translate(-50%) loop is seamless. The clone
 * is aria-hidden and its images are removed from the accessibility tree, so
 * screen readers hear the five titles exactly once.
 *
 * Duplication happens here rather than in the markup: one source of truth for
 * the list, and nothing to keep in sync when a title is added.
 */
Omnic.register('marquee', function () {
  Omnic.all('.marquee').forEach(function (marquee) {
    var track = marquee.querySelector('.marquee__track');
    if (!track || track.dataset.cloned === 'true') return;

    var clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    Omnic.all('img', clone).forEach(function (img) { img.alt = ''; });
    Omnic.all('a, button', clone).forEach(function (el) { el.setAttribute('tabindex', '-1'); });

    // Both halves live inside the single animated element the -50% loop needs.
    Array.prototype.slice.call(clone.children).forEach(function (child) {
      track.appendChild(child);
    });
    track.dataset.cloned = 'true';

    // Constant velocity (~46px/s) regardless of how many titles are listed,
    // measured after cloning so the gaps are included.
    var half = track.scrollWidth / 2;
    if (half > 0) {
      marquee.style.setProperty('--marquee-duration', Math.max(20, Math.round(half / 46)) + 's');
    }
  });
});
