/* ============================================================
   editorial.js — Carrusel infinito fluido
   Desktop : auto-avance + control por posición del mouse
   Móvil   : auto-avance + drag/swipe táctil
   Solo se carga en index.html
   ============================================================ */

const wrapper = document.querySelector('.editorial-wrapper');
const track   = document.querySelector('.editorial-track');

if (wrapper && track) {

  let baseSpeed  = 0.4;
  let speed      = baseSpeed;
  let offsetX    = 0;
  let mouseX     = 0;
  let isHovering = false;

  /* ── Duplicar tarjetas para loop infinito ── */
  Array.from(track.children).forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  /* ── Helper ── */
  const isMobile = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  /* ════════════════════════════════════════════
     TOUCH — swipe táctil
  ════════════════════════════════════════════ */
  let touchStartX   = 0;
  let touchLastX    = 0;
  let touchStartY   = 0;
  let touchVelocity = 0;
  let isTouching    = false;
  let isHorizSwipe  = null; // null = aún no decidido, true/false = bloqueado
  let momentumId    = null;

  wrapper.addEventListener('touchstart', e => {
    isTouching    = true;
    isHorizSwipe  = null;
    touchStartX   = e.touches[0].clientX;
    touchStartY   = e.touches[0].clientY;
    touchLastX    = touchStartX;
    touchVelocity = 0;

    if (momentumId) {
      cancelAnimationFrame(momentumId);
      momentumId = null;
    }
  }, { passive: true });

  wrapper.addEventListener('touchmove', e => {
    if (!isTouching) return;

    const x    = e.touches[0].clientX;
    const y    = e.touches[0].clientY;
    const dx   = x - touchStartX;
    const dy   = y - touchStartY;

    /* Primera vez: decidir si es gesto horizontal o vertical */
    if (isHorizSwipe === null) {
      isHorizSwipe = Math.abs(dx) > Math.abs(dy);
    }

    /* Si es scroll vertical, no interceptar */
    if (!isHorizSwipe) return;

    /* Es horizontal: bloquear scroll vertical de la página */
    e.preventDefault();

    const delta   = x - touchLastX;
    touchVelocity = delta;
    touchLastX    = x;

    offsetX += delta;

    const limit = track.scrollWidth / 2;
    if (offsetX <= -limit) offsetX += limit;
    if (offsetX >= 0)      offsetX -= limit;

    track.style.transform = `translate3d(${offsetX}px, 0, 0)`;

  }, { passive: false }); /* passive:false para poder llamar preventDefault */

  wrapper.addEventListener('touchend', () => {
    if (!isTouching) return;
    isTouching   = false;
    isHorizSwipe = null;

    let vel = touchVelocity * 0.85;

    function momentum() {
      if (Math.abs(vel) < 0.3) {
        /* Inercia terminada — retomar auto-avance */
        speed = baseSpeed;
        return;
      }

      offsetX += vel;
      vel     *= 0.92;

      const limit = track.scrollWidth / 2;
      if (offsetX <= -limit) offsetX += limit;
      if (offsetX >= 0)      offsetX -= limit;

      track.style.transform = `translate3d(${offsetX}px, 0, 0)`;
      momentumId = requestAnimationFrame(momentum);
    }

    momentumId = requestAnimationFrame(momentum);
  }, { passive: true });


  /* ════════════════════════════════════════════
     MOUSE (desktop)
  ════════════════════════════════════════════ */
  wrapper.addEventListener('mouseenter', () => isHovering = true);
  wrapper.addEventListener('mouseleave', () => isHovering = false);
  document.addEventListener('mousemove', e => { mouseX = e.clientX; }, { passive: true });


  /* ════════════════════════════════════════════
     LOOP DE ANIMACIÓN
  ════════════════════════════════════════════ */
  function animateCarousel() {
    /* Si el usuario está arrastrando, el touchmove mueve el track */
    if (!isTouching) {
      const rect      = wrapper.getBoundingClientRect();
      let targetSpeed = baseSpeed;

      if (!isMobile() && isHovering) {
        const zone = rect.width * 0.25;
        if      (mouseX < rect.left  + zone) targetSpeed = -1.2;
        else if (mouseX > rect.right - zone) targetSpeed =  1.2;
        else                                  targetSpeed =  0;
      }

      speed   += (targetSpeed - speed) * 0.04;
      offsetX -= speed;

      const limit = track.scrollWidth / 2;
      if (offsetX <= -limit) offsetX += limit;
      if (offsetX >= 0)      offsetX -= limit;

      track.style.transform = `translate3d(${offsetX}px, 0, 0)`;
    }

    requestAnimationFrame(animateCarousel);
  }

  animateCarousel();
}
