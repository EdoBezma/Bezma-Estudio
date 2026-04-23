/* ============================================================
   pagetransitions.js — Fade in/out entre páginas
   Se carga en todas las páginas
   ============================================================ */

/* Fade IN al mostrar la página (incluyendo navegación con botón Atrás) */
window.addEventListener('pageshow', () => {
  document.body.classList.remove('is-loading', 'fade-out');
});

/* Fade OUT al hacer clic en enlaces internos */
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');

    /* Ignorar: anclas, externos, target="_blank", vacíos */
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        link.hostname !== window.location.hostname ||
        link.hasAttribute('target')) {
      return;
    }

    link.addEventListener('click', e => {
      e.preventDefault();
      const dest = link.href;

      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = dest;
      }, 500); // debe coincidir con transition: opacity 0.5s en body
    });
  });

});
