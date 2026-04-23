/* ============================================================
   modal.js — Modal de detalles de books
   Solo se carga en index.html
   ============================================================ */

const modal       = document.getElementById('book-modal');
const modalTitle  = document.getElementById('modal-title');
const modalPrice  = document.getElementById('modal-price');
const modalDesc   = document.getElementById('modal-description');
const closeBtn    = document.querySelector('.close');

if (modal) {

  /* Abrir modal */
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const book = e.target.closest('.book');
      modalTitle.textContent = book.dataset.title       || '';
      modalPrice.textContent = book.dataset.price       || '';
      modalDesc.textContent  = book.dataset.description || '';
      modal.style.display    = 'flex';
      document.body.style.overflow = 'hidden'; // evita scroll de fondo
    });
  });

  /* Cerrar */
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  /* Cerrar con ESC */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

}
