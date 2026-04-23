/* ============================================================
   editorial.js — Carrusel infinito fluido
   Solo se carga en index.html
   ============================================================ */

const wrapper = document.querySelector('.editorial-wrapper');
const track   = document.querySelector('.editorial-track');

if (wrapper && track) {

  let baseSpeed   = 0.4;
  let speed       = baseSpeed;
  let offsetX     = 0;
  let mouseX      = 0;
  let isHovering  = false;

  /* Duplicar tarjetas para loop infinito */
  Array.from(track.children).forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  wrapper.addEventListener('mouseenter', () => isHovering = true);
  wrapper.addEventListener('mouseleave', () => isHovering = false);
  document.addEventListener('mousemove', e => { mouseX = e.clientX; }, { passive: true });

  function animateCarousel() {
    const rect        = wrapper.getBoundingClientRect();
    let targetSpeed   = baseSpeed;

    if (isHovering) {
      const zone = rect.width * 0.25;
      if      (mouseX < rect.left  + zone) targetSpeed = -1.2;
      else if (mouseX > rect.right - zone) targetSpeed =  1.2;
      else                                  targetSpeed =  0;
    }

    /* Suavizado de velocidad */
    speed   += (targetSpeed - speed) * 0.04;
    offsetX -= speed;

    /* Loop infinito */
    const limit = track.scrollWidth / 2;
    if (offsetX <= -limit) offsetX += limit;
    if (offsetX >= 0)      offsetX -= limit;

    track.style.transform = `translate3d(${offsetX}px, 0, 0)`;
    requestAnimationFrame(animateCarousel);
  }

  animateCarousel();
}
