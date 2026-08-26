/**
 * Omnic.AI — core
 *
 * Tiny module registry + shared scroll/resize loop. Every behaviour on the
 * page registers here, so there is exactly one scroll listener and one
 * requestAnimationFrame loop for the whole site.
 *
 * No build step and no dependencies: the files load with `defer` in order,
 * which means this prototype runs from the filesystem as well as from a
 * server. Modules are plain functions rather than ES modules for that reason.
 */
(function (window, document) {
  'use strict';

  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  var scrollSubs = [];
  var resizeSubs = [];
  var ticking = false;

  function readScroll() {
    return {
      y: window.scrollY || window.pageYOffset || 0,
      h: window.innerHeight,
      max: Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    };
  }

  function flush() {
    var state = readScroll();
    for (var i = 0; i < scrollSubs.length; i++) scrollSubs[i](state);
    ticking = false;
  }

  function onScrollEvent() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(flush);
  }

  var resizeTimer = null;
  function onResizeEvent() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      var state = readScroll();
      for (var i = 0; i < resizeSubs.length; i++) resizeSubs[i](state);
      flush();
    }, 150);
  }

  var Omnic = {
    modules: {},

    /** Register a module. `fn` runs once on DOM ready. */
    register: function (name, fn) {
      this.modules[name] = fn;
    },

    /** True when the visitor has asked for less motion. */
    reducedMotion: function () {
      return reduceQuery.matches;
    },

    /** Subscribe to the shared scroll loop. */
    onScroll: function (fn) {
      scrollSubs.push(fn);
      fn(readScroll());
    },

    /** Subscribe to the shared (debounced) resize loop. */
    onResize: function (fn) {
      resizeSubs.push(fn);
    },

    scrollState: readScroll,

    /** querySelectorAll → real array. */
    all: function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    },

    /** Clamp helper used by the progress indicators. */
    clamp: function (n, min, max) {
      return n < min ? min : n > max ? max : n;
    },

    /** Create an IntersectionObserver with a sensible shared default. */
    observe: function (elements, onEnter, options) {
      if (!('IntersectionObserver' in window)) {
        elements.forEach(function (el) { onEnter(el, null); });
        return null;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) onEnter(entry.target, io, entry);
        });
      }, Object.assign({ rootMargin: '0px 0px -12% 0px', threshold: 0.12 }, options || {}));
      elements.forEach(function (el) { io.observe(el); });
      return io;
    }
  };

  window.addEventListener('scroll', onScrollEvent, { passive: true });
  window.addEventListener('resize', onResizeEvent, { passive: true });

  // Mobile browsers change innerHeight as the URL bar collapses; freeze the
  // hero height to the value measured on load so the layout does not jump.
  function lockViewportUnit() {
    document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
  }
  lockViewportUnit();
  window.addEventListener('orientationchange', lockViewportUnit);

  if (reduceQuery.matches) document.documentElement.classList.add('no-motion');
  reduceQuery.addEventListener('change', function (e) {
    document.documentElement.classList.toggle('no-motion', e.matches);
  });

  window.Omnic = Omnic;
})(window, document);
