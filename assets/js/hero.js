/**
 * Omnic.AI — hero
 *
 * Load choreography + a facade for the "Story of the Forge" loop.
 *
 * The live site ships the YouTube player in the initial markup. Here the
 * poster frame (Omnic's own story_of_the_forge.webp) paints immediately and
 * the iframe is injected only after load, during idle time — the first
 * meaningful paint costs one image instead of ~600KB of player.
 */
Omnic.register('hero', function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  /* -- entrance ----------------------------------------------------------- */
  // rAF x2 so the initial styles are committed before the class flips.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('is-loaded');
    });
  });

  /* -- the hero recedes as the page moves past it ------------------------- */
  var inner = hero.querySelector('.hero__inner');
  if (inner && !Omnic.reducedMotion()) {
    Omnic.onScroll(function (s) {
      if (s.y > s.h) return;                       // stop work once off-screen
      var p = Omnic.clamp(s.y / (s.h * 0.85), 0, 1);
      inner.style.transform = 'translate3d(0,' + (p * -56).toFixed(1) + 'px,0)';
      inner.style.opacity = (1 - p * 0.9).toFixed(3);
    });
  }

  /* -- deferred player ---------------------------------------------------- */
  var mount = hero.querySelector('.hero__frame');
  if (!mount) return;

  var videoId = mount.getAttribute('data-video-id');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (!videoId || saveData || Omnic.reducedMotion()) return;  // poster is enough

  function mountPlayer() {
    var params = [
      'autoplay=1', 'mute=1', 'loop=1', 'playlist=' + videoId,
      'start=0', 'end=8', 'controls=0', 'modestbranding=1',
      'iv_load_policy=3', 'playsinline=1', 'rel=0', 'disablekb=1'
    ];
    if (window.location.protocol.indexOf('http') === 0) {
      params.push('origin=' + encodeURIComponent(window.location.origin));
    }

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?' + params.join('&');
    iframe.title = 'Story of the Forge';
    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('aria-hidden', 'true');   // decorative: the poster carries meaning
    iframe.setAttribute('frameborder', '0');
    iframe.addEventListener('load', function () {
      window.setTimeout(function () { mount.classList.add('is-playing'); }, 260);
    });
    mount.appendChild(iframe);
  }

  function whenIdle(fn) {
    if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout: 2500 });
    else window.setTimeout(fn, 900);
  }

  if (document.readyState === 'complete') whenIdle(mountPlayer);
  else window.addEventListener('load', function () { whenIdle(mountPlayer); });
});
