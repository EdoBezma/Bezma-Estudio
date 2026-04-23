/* ============================================================
   home.js — Slideshow + Hero adaptativo
   Solo se carga en index.html
   ============================================================ */

const slides   = document.querySelectorAll('.slideshow img');
const heroText = document.querySelector('.adaptive-text');
let current    = 0;


/* ============================================================
   Preload de imágenes del slideshow
   ============================================================ */

function preloadSlides() {
  slides.forEach(img => {
    const pre = new Image();
    pre.src = img.src;
  });
}


/* ============================================================
   Detección de brillo para texto adaptativo
   Requiere crossorigin="anonymous" en las <img>
   ============================================================ */

function getBrightness(image) {
  try {
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d');
    // Muestrear a tamaño reducido por performance
    canvas.width  = 100;
    canvas.height = 60;
    ctx.drawImage(image, 0, 0, 100, 60);
    const data = ctx.getImageData(0, 0, 100, 60).data;
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
    }
    return sum / (data.length / 4);
  } catch (e) {
    // CORS bloqueado — devolver brillo medio (texto oscuro por defecto)
    return 100;
  }
}

function updateColors(image) {
  const menu       = document.querySelector('.menu');
  const brightness = getBrightness(image);
  const isDark     = brightness > 127;

  heroText.classList.toggle('light', !isDark);
  heroText.classList.toggle('dark',   isDark);

  if (menu) {
    menu.classList.toggle('light', !isDark);
    menu.classList.toggle('dark',   isDark);
  }
}


/* ============================================================
   Slideshow
   ============================================================ */

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
  if (window.scrollY < window.innerHeight) {
    updateColors(slides[current]);
  }
}

if (slides.length > 0) {
  setInterval(nextSlide, 7000);
}


/* ============================================================
   Parallax hero al hacer scroll
   ============================================================ */

const homeSection = document.querySelector('#home');

if (homeSection && heroText) {
  let lastScrollY = 0;

  function animateHero() {
    const h = homeSection.offsetHeight;
    if (lastScrollY <= h) {
      heroText.style.transform =
        `translate(-50%, calc(-50% + ${lastScrollY * 0.3}px))`;
    }
    requestAnimationFrame(animateHero);
  }

  window.addEventListener('scroll', () => { lastScrollY = window.scrollY; }, { passive: true });
  animateHero();
}


/* ============================================================
   Inicialización al cargar
   ============================================================ */

window.addEventListener('load', () => {
  preloadSlides();
  if (slides.length > 0) updateColors(slides[current]);
});
