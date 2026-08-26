/**
 * Omnic.AI — masthead
 *
 * Two behaviours:
 *   1. condense onto a blurred plate once the hero starts to leave;
 *   2. hover-or-focus dropdowns on desktop, an accordion drawer on mobile.
 *
 * Keyboard parity is deliberate: every dropdown opens on focus and closes on
 * Escape, and the drawer traps nothing — it is a plain in-page region.
 */
Omnic.register('nav', function () {
  var masthead = document.querySelector('.masthead');
  if (!masthead) return;

  /* -- 1: condense on scroll --------------------------------------------- */
  // The masthead stays put rather than auto-hiding: "Sign Up Now" is the one
  // conversion path on the page, and the sticky capability index below needs a
  // fixed anchor to park against.
  var CONDENSE_AT = 40;

  Omnic.onScroll(function (s) {
    masthead.classList.toggle('is-condensed', s.y > CONDENSE_AT);
  });

  /* -- 2: desktop dropdowns ---------------------------------------------- */
  var items = Omnic.all('.navset__item--has-panel');

  function closeAll(except) {
    items.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      var trigger = item.querySelector('.navset__link');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach(function (item) {
    var trigger = item.querySelector('.navset__link');
    var closeTimer = null;

    function open() {
      window.clearTimeout(closeTimer);
      closeAll(item);
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function close(delay) {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(function () {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, delay || 0);
    }

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', function () { close(120); });
    item.addEventListener('focusin', open);
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) close(0);
    });
    trigger.addEventListener('click', function (e) {
      // On touch, the first tap reveals the panel instead of navigating.
      if (window.matchMedia('(hover: none)').matches && !item.classList.contains('is-open')) {
        e.preventDefault();
        open();
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });

  /* -- 3: mobile drawer --------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('nav-drawer');
  if (!toggle || !drawer) return;

  function setDrawer(open) {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-locked', open);
  }

  toggle.addEventListener('click', function () {
    setDrawer(!drawer.classList.contains('is-open'));
  });

  drawer.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (link) setDrawer(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      setDrawer(false);
      toggle.focus();
    }
  });

  // Leaving the mobile breakpoint should never strand the drawer open.
  Omnic.onResize(function () {
    if (window.innerWidth >= 1120 && drawer.classList.contains('is-open')) setDrawer(false);
  });
});
