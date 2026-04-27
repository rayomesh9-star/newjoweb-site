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
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .hero h1, .cta-inner, .page-header h1, .about-card').forEach(el => {
   observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    if (!track) return;
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const dotsNav = document.querySelector(".carousel-dots");

    let currentIndex = 0;

    function updateCarousel(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dotsNav.appendChild(dot);
    });
    const dots = Array.from(dotsNav.children);

    // Navigation buttons
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

    // Initialize carousel
    updateCarousel(0);

    // Auto-play with pause on hover
    const carousel = document.querySelector(".carousel");
    let autoPlay = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel(currentIndex);
    }, 5000);

    if (carousel) {
      carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
      carousel.addEventListener("mouseleave", () => {
        autoPlay = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel(currentIndex);
        }, 5000);
      });
    }
});
