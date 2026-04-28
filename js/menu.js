/* ============================================================
   menu.js — Menú adaptativo (home) y estático (páginas internas)
   Se carga en todas las páginas
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const menu = document.querySelector('.menu');
  if (!menu) return;

  const isHome  = document.body.classList.contains('home-page');
  const isInner = document.body.classList.contains('about-page') ||
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

    window.addEventListener('scroll', updateMenuStyle, { passive: true });
    window.addEventListener('load', updateMenuStyle);
    updateMenuStyle();
  }


  /* ============================================================
     Scroll suave para enlaces internos (#sección)
     ============================================================ */

  const MENU_HEIGHT = 56; // altura del menú fijo en px

  document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      if (targetId === 'books') {
        /* Scroll especial para Books:
           Queremos que el título "Books" quede visible justo
           debajo del menú y la card Polas centrada en pantalla.
           offsetTop del section - menú - pequeño margen visual */
        const scrollTo = target.offsetTop - MENU_HEIGHT + 165;
        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
