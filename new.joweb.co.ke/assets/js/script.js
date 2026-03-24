// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.style.display === 'flex';
    siteNav.style.display = open ? 'none' : 'flex';
    navToggle.setAttribute('aria-expanded', String(!open));
  });
}

// Simple reveal-on-scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
},{ threshold: 0.1 });

// Find elements that exist on the page
const revealElements = document.querySelectorAll('.card, .hero h1, .cta-inner, .page-header h1');
if (revealElements.length > 0) {
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  
  // Guard: only run carousel code if carousel elements exist
  if (!track) return;
  
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const dotsNav = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
  });
  const dots = Array.from(dotsNav.children);

  function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel(currentIndex);
    });
  });

  // Auto-play (optional)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
  }, 5000);
});
