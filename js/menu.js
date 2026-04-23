/* ============================================================
   menu.js — Menú adaptativo (home) y estático (páginas internas)
   Se carga en todas las páginas
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const menu = document.querySelector('.menu');
  if (!menu) return;

  const isHome    = document.body.classList.contains('home-page');
  const isInner   = document.body.classList.contains('about-page') ||
                    document.body.classList.contains('contact-page');


  /* ============================================================
     Páginas internas — menú fijo oscuro
     ============================================================ */

  if (isInner) {
    menu.classList.add('dark');
  }


  /* ============================================================
     Home — menú cambia según sección activa
     ============================================================ */

  if (isHome) {
    const sections = document.querySelectorAll('section');

    function updateMenuStyle() {
      const triggerY = window.scrollY + window.innerHeight * 0.12;

      sections.forEach(section => {
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (triggerY >= top && triggerY < bottom) {
          const isDark = section.classList.contains('dark-section');
          menu.classList.toggle('light',  isDark);
          menu.classList.toggle('dark',  !isDark);
        }
      });
    }

    /* Un único listener de scroll */
    window.addEventListener('scroll', updateMenuStyle, { passive: true });

    /* Ejecutar también al cargar (espera imágenes para calcular alturas correctas) */
    window.addEventListener('load', updateMenuStyle);
    updateMenuStyle();
  }


  /* ============================================================
     Scroll suave para enlaces internos (#sección)
     ============================================================ */

  document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
