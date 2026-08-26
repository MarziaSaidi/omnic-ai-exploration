/**
 * Omnic.AI — bootstrap
 *
 * Runs every registered module once the DOM is parsed. Each module is wrapped
 * so a failure in one never takes the rest of the page down — a static
 * marketing site should degrade to plain HTML, never to a blank screen.
 */
(function () {
  'use strict';

  function start() {
    Object.keys(Omnic.modules).forEach(function (name) {
      try {
        Omnic.modules[name]();
      } catch (err) {
        // Surfaced for debugging; the rest of the page continues to work.
        if (window.console) console.warn('[omnic] module "' + name + '" failed:', err);
      }
    });
    document.documentElement.classList.add('js-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
