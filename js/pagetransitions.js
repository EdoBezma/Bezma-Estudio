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

    /* Ignorar:
       - anclas (#)
       - mailto / tel
       - enlaces de WhatsApp
       - enlaces externos
       - target="_blank"
       - el botón Agendar del modal
    */
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('https://wa.me') ||
      link.hasAttribute('target') ||
      link.id === 'modal-whatsapp' ||
      link.hostname !== window.location.hostname
    ) {
      return;
    }

    link.addEventListener('click', e => {
      e.preventDefault();
      const dest = link.href;
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = dest;
      }, 500);
    });
  });

});
