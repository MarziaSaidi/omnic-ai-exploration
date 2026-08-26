/**
 * Omnic.AI — scroll reveal
 *
 * One IntersectionObserver drives every entrance on the page. Elements opt in
 * with `.reveal` + `data-reveal="up|mask|scale|fade"`; a parent marked
 * `data-stagger` hands its children an index so they arrive in sequence.
 *
 * Elements are unobserved after entering: reveals play once, never on the way
 * back up, because re-animating on reverse scroll reads as noise.
 */
Omnic.register('reveal', function () {
  var targets = Omnic.all('.reveal');
  if (!targets.length) return;

  Omnic.all('[data-stagger]').forEach(function (group) {
    Omnic.all('.reveal', group).forEach(function (child, i) {
      child.style.setProperty('--i', i);
    });
  });

  if (Omnic.reducedMotion()) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  Omnic.observe(targets, function (el, io) {
    el.classList.add('is-in');
    if (io) io.unobserve(el);
  });
});
