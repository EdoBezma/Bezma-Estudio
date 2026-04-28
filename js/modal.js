/* ============================================================
   modal.js — Modal de detalles de books
   Solo se carga en index.html
   ============================================================ */

const modal       = document.getElementById('book-modal');
const modalTitle  = document.getElementById('modal-title');
const modalPrice  = document.getElementById('modal-price');
const modalDesc   = document.getElementById('modal-description');
const closeBtn    = document.querySelector('.close');
const whatsappBtn = document.getElementById('modal-whatsapp');

const WS_NUMBER = '56978979883';

if (modal) {

  /* Abrir modal — desde botón o desde imagen */
  document.querySelectorAll('.details-btn, .book img').forEach(trigger => {
    trigger.addEventListener('click', e => {
      const book  = e.target.closest('.book');
      const title = book.dataset.title || '';

      modalTitle.textContent = title;
      modalPrice.textContent = book.dataset.price || '';

      /* Lista de ítems separados por • */
      const items = (book.dataset.description || '')
        .split('•')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      modalDesc.innerHTML = items.length
        ? '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>'
        : '';

      /* Link WhatsApp */
      const message = encodeURIComponent(`Hola, estoy interesad@ en contratar ${title}`);
      whatsappBtn.href = `https://wa.me/${WS_NUMBER}?text=${message}`;

      /* Mostrar con animación — sin ocultar scrollbar */
      modal.style.display = 'flex';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => modal.classList.add('is-open'));
      });
    });
  });

  /* Cerrar */
  function closeModal() {
    modal.classList.remove('is-open');
    setTimeout(() => { modal.style.display = 'none'; }, 350);
  }

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

}