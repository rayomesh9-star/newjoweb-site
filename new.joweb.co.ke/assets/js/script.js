// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Dynamic active nav state
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Remove existing active states
  document.querySelectorAll('.site-nav a').forEach(link => {
    link.removeAttribute('aria-current');
  });
  
  // Set active for simple links
  document.querySelectorAll('.site-nav a[href]').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
  
  // Special handling for Services dropdown
  const servicesDropdown = document.querySelector('.dropdown a[href="services.html"]');
  if (servicesDropdown && currentPath === 'services.html') {
    servicesDropdown.parentElement.classList.add('active-dropdown');
    servicesDropdown.setAttribute('aria-current', 'page');
  }
});

// Mobile nav toggle
(function () {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (!navToggle || !siteNav) return;

  // Ensure consistent starting state
  if (window.matchMedia('(max-width: 980px)').matches) {
    // CSS controls visibility; keep JS in sync with inline style only when needed
    if (!siteNav.style.display) siteNav.style.display = 'none';
  }

  navToggle.addEventListener('click', () => {
    // Hard toggle regardless of computed/CSS rules.
    // Ensure the nav becomes visible and interactive.
    const isOpen = siteNav.getAttribute('data-open') === 'true';

    if (isOpen) {
      siteNav.style.display = 'none';
      siteNav.style.pointerEvents = 'none';
      siteNav.setAttribute('data-open', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
      return;
    }

    // closing any other opened state (if needed)
    siteNav.style.display = 'flex';
    siteNav.style.pointerEvents = 'auto';
    siteNav.setAttribute('data-open', 'true');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('active');
  });
})();

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

// Portfolio filter (portfolio.html only)
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("portfolioSearch");
  const grid = document.getElementById("portfolioGrid");
  if (!search || !grid) return;

  const cards = Array.from(grid.querySelectorAll(".portfolio-card"));
  const chips = Array.from(document.querySelectorAll(".portfolio-chips .chip"));

  let activeChip = "all";

  function normalize(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function applyFilters() {
    const query = normalize(search.value);

    cards.forEach(card => {
      const filterTag = card.getAttribute("data-filter-tags") || "";
      const tags = card.getAttribute("data-tags") || "";
      const tagsNorm = normalize(tags);

      const chipMatch = activeChip === "all" || filterTag === activeChip;
      const searchMatch = !query || tagsNorm.includes(query) || normalize(card.textContent).includes(query) || normalize(card.getAttribute("href")).includes(query);

      const show = chipMatch && searchMatch;
      card.style.display = show ? "block" : "none";
    });
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      activeChip = chip.getAttribute("data-filter") || "all";
      applyFilters();
    });
  });

  search.addEventListener("input", () => {
    applyFilters();
  });

  // Initial filter
  applyFilters();
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
