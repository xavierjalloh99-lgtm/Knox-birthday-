(function () {
  var rig = document.getElementById('rig');
  var btn = document.getElementById('open');
  var letter = document.getElementById('letter');
  var photo = document.getElementById('photo');
  var title = document.querySelector('.title');
  var hint = document.getElementById('hint');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Optional photo: drop a file at assets/knox.jpg and it appears at the end of the letter.
  var probe = new Image();
  probe.onload = function () { photo.hidden = false; };
  probe.src = 'assets/knox.jpg';

  // Title and hint sit outside .rig, so mirror the state on them.
  function set(state) {
    rig.classList.add(state);
    if (state === 'is-out') { title.style.opacity = 0; title.style.transform = 'translateY(-8px)'; }
  }

  btn.addEventListener('pointerdown', function () { rig.classList.add('is-press'); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (e) {
    btn.addEventListener(e, function () { rig.classList.remove('is-press'); });
  });

  function finish() {
    letter.setAttribute('aria-hidden', 'false');
    letter.focus({ preventScroll: true });
  }

  btn.addEventListener('click', function () {
    btn.disabled = true;
    hint.style.opacity = 0;
    if (reduced) {
      ['is-released', 'is-open', 'is-out', 'is-read'].forEach(set);
      title.style.opacity = 0;
      finish();
      return;
    }
    set('is-released');                       // seal lets go
    setTimeout(function () { set('is-open'); }, 550);   // flap swings back
    setTimeout(function () { set('is-out'); }, 1650);   // letter rises out of the pocket
    setTimeout(function () { set('is-read'); }, 2900);  // envelope settles, letter unfolds
    setTimeout(finish, 3400);
  });
})();
