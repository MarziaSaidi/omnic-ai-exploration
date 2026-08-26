/**
 * Omnic.AI — "What is the Omnic Forge?" statement
 *
 * The answer paragraph lights word by word as it crosses the viewport. This is
 * the one place on the page where motion carries meaning rather than polish:
 * it forces the sentence to be read, at the exact moment the visitor is trying
 * to work out what the product does.
 *
 * The copy is wrapped at runtime so the source markup stays a plain paragraph
 * — readable, translatable, and correct with JavaScript disabled.
 */
Omnic.register('forge', function () {
  var para = document.querySelector('[data-word-reveal]');
  if (!para) return;
  if (Omnic.reducedMotion()) return;

  // Wrap each word, preserving the original spacing.
  var words = para.textContent.trim().split(/\s+/);
  para.textContent = '';
  var spans = words.map(function (word, i) {
    var span = document.createElement('span');
    span.className = 'w';
    span.textContent = word;
    para.appendChild(span);
    if (i < words.length - 1) para.appendChild(document.createTextNode(' '));
    return span;
  });

  var lit = 0;
  Omnic.onScroll(function (s) {
    var rect = para.getBoundingClientRect();
    // 0 when the paragraph's top reaches 78% of the viewport,
    // 1 once its bottom has passed 32%.
    var start = s.h * 0.78;
    var end = s.h * 0.32;
    var progress = Omnic.clamp((start - rect.top) / Math.max(1, (start - end) + rect.height * 0.5), 0, 1);
    var target = Math.round(progress * spans.length);
    if (target === lit) return;

    for (var i = 0; i < spans.length; i++) {
      spans[i].classList.toggle('is-lit', i < target);
    }
    lit = target;
  });
});
