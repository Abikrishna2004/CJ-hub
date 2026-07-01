// Compile Journey Hub - Homepage Specific Scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Scroll-Triggered Statistics Counters
  initStatCounters();

  // 2. Initialize Featured Paths Slider Carousel
  initPathsCarousel();
});

/* ==========================================================================
   1. SCROLL-TRIGGERED STATS TICKER COUNTER
   ========================================================================== */
function initStatCounters() {
  const statElements = document.querySelectorAll(".stat-number");
  if (statElements.length === 0) return;

  const runCounterAnimation = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const speed = 1500; // Animation duration in ms
    const increment = target / (speed / 16); // ~60fps ticks
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };

    updateCounter();
  };

  // Setup Intersection Observer to trigger counting when visible
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounterAnimation(entry.target);
        obs.unobserve(entry.target); // Run animation only once
      }
    });
  }, observerOptions);

  statElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. FEATURED PATH CAROUSEL SLIDER
   ========================================================================== */
function initPathsCarousel() {
  const slider = document.querySelector(".paths-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".path-slide");
  const prevBtn = slider.querySelector(".slider-arrow.prev");
  const nextBtn = slider.querySelector(".slider-arrow.next");
  const dotsContainer = document.querySelector(".slider-dots");
  
  if (slides.length === 0) return;

  let activeIndex = 0;
  let autoplayTimer = null;

  // Create sliding indicators (dots)
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : [];

  const updateSlideStates = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev-slide", "next-slide", "hidden-slide");
      if (dots[i]) dots[i].classList.remove("active");
      
      if (i === activeIndex) {
        slide.classList.add("active");
        if (dots[i]) dots[i].classList.add("active");
      } else if (i === (activeIndex - 1 + slides.length) % slides.length) {
        slide.classList.add("prev-slide");
      } else if (i === (activeIndex + 1) % slides.length) {
        slide.classList.add("next-slide");
      } else {
        slide.classList.add("hidden-slide");
      }
    });
  };

  const goToSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    updateSlideStates();
  };

  const nextSlide = () => {
    goToSlide(activeIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(activeIndex - 1);
  };

  // Bind controls
  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevSlide(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); resetAutoplay(); });

  // Bind side card click for fast sliding
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      if (slide.classList.contains("prev-slide")) {
        prevSlide();
        resetAutoplay();
      } else if (slide.classList.contains("next-slide")) {
        nextSlide();
        resetAutoplay();
      }
    });
  });

  // Autoplay
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000); // Cycle every 5 seconds
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  // Initialize
  updateSlideStates();
  startAutoplay();
}
