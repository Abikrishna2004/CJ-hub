// Compile Journey Hub - Phase 2 Interactivity Orchestrator
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Universal Theme Customizer (Independent Background and Accents)
  initThemeCustomizer();

  // 2. Initialize Responsive Mobile Hamburger Navigation
  initMobileMenu();

  // 3. Initialize Floating Back-to-Top Button
  initBackToTop();

  // 4. Initialize Scroll-Triggered Statistics Counters (if stats exist on page)
  initStatCounters();

  // 5. Initialize Homepage Featured Paths Slider Carousel (if slider exists)
  initPathsCarousel();

  // 6. Initialize Interactive Modal Popup (if triggers exist)
  initPopupModal();

  // 7. Initialize Real-Time Contact Form Validation (if form exists)
  initFormValidation();

  // 8. Initialize Weather Dashboard Widget (if widget exists on page)
  initWeatherDashboard();

  // 9. Initialize Task Tracker Todo Widget (if widget exists on page)
  initTaskTracker();
});

/* ==========================================================================
   1. UNIVERSAL THEME CUSTOMIZER (BACKGROUND & ACCENTS)
   ========================================================================== */
function initThemeCustomizer() {
  const settingsBtn = document.getElementById("theme-settings-btn");
  const panel = document.getElementById("theme-customizer-panel");
  if (!settingsBtn || !panel) return;

  // Load and apply stored theme configurations
  const storedBg = localStorage.getItem("theme-bg") || "obsidian";
  const storedAcc = localStorage.getItem("theme-acc") || "cyan";

  applyThemeBg(storedBg);
  applyThemeAcc(storedAcc);

  // Helper to apply background theme class
  function applyThemeBg(bg) {
    document.body.classList.remove("bg-obsidian", "bg-midnight", "bg-sepia", "bg-light");
    document.body.classList.add(`bg-${bg}`);
    localStorage.setItem("theme-bg", bg);

    // Update active state in panel UI
    panel.querySelectorAll(".bg-opt").forEach(btn => {
      if (btn.getAttribute("data-bg") === bg) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Helper to apply accent theme class
  function applyThemeAcc(acc) {
    document.body.classList.remove("acc-cyan", "acc-magenta", "acc-emerald", "acc-amber");
    document.body.classList.add(`acc-${acc}`);
    localStorage.setItem("theme-acc", acc);

    // Update active state in panel UI
    panel.querySelectorAll(".acc-opt").forEach(btn => {
      if (btn.getAttribute("data-acc") === acc) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Toggle settings panel open/close
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = panel.classList.toggle("open");
    settingsBtn.classList.toggle("active", isOpen);
    settingsBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (panel.classList.contains("open") && !panel.contains(e.target) && !settingsBtn.contains(e.target)) {
      panel.classList.remove("open");
      settingsBtn.classList.remove("active");
      settingsBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Prevent closing when clicking inside the panel itself
  panel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Bind click handlers to background options
  panel.querySelectorAll(".bg-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const bg = btn.getAttribute("data-bg");
      applyThemeBg(bg);
    });
  });

  // Bind click handlers to accent options
  panel.querySelectorAll(".acc-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const acc = btn.getAttribute("data-acc");
      applyThemeAcc(acc);
    });
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuTrigger = document.getElementById("mobile-menu-trigger");
  const navMenu = document.getElementById("nav-menu-box");

  if (menuTrigger && navMenu) {
    menuTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("open");
      menuTrigger.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && e.target !== menuTrigger) {
        navMenu.classList.remove("open");
        menuTrigger.classList.remove("active");
      }
    });

    // Close menu when clicking on page links (useful for mobile overlay)
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuTrigger.classList.remove("active");
      });
    });
  }
}

/* ==========================================================================
   3. FLOATING BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   4. SCROLL-TRIGGERED STATS TICKER COUNTER
   ========================================================================== */
function initStatCounters() {
  const statElements = document.querySelectorAll(".stat-number");
  if (statElements.length === 0) return;

  const runCounterAnimation = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const speed = 1500; // Total animation duration in ms
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
   5. HOMEPAGE FEATURED PATH CAROUSEL SLIDER
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

/* ==========================================================================
   6. INTERACTIVE MODAL DIALOG POPUP
   ========================================================================== */
function initPopupModal() {
  const modalOverlay = document.getElementById("info-modal");
  const openModalBtns = document.querySelectorAll("[data-open-modal]");
  
  if (!modalOverlay || openModalBtns.length === 0) return;

  const openModal = () => {
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable scroll when modal is open
  };

  const closeModal = () => {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = ""; // Restore scroll
  };

  openModalBtns.forEach(btn => btn.addEventListener("click", openModal));

  // Hook all Close Buttons inside modal
  modalOverlay.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  // Close when clicking outside content area
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. REAL-TIME CONTACT FORM VALIDATION
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById("contact-form-realtime");
  if (!form) return;

  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const phoneInput = document.getElementById("form-phone");
  const messageInput = document.getElementById("form-message");
  const submitBtn = form.querySelector("button[type='submit']");

  const validationStates = {
    name: false,
    email: false,
    phone: false,
    message: false
  };

  const validateField = (input, validatorFunc, feedbackEl, stateKey) => {
    const value = input.value.trim();
    const isValid = validatorFunc(value);

    // Apply colors and error notices
    if (value === "") {
      input.className = "form-input";
      feedbackEl.className = "feedback-msg";
      feedbackEl.textContent = "";
      validationStates[stateKey] = false;
    } else if (isValid) {
      input.className = "form-input is-valid";
      feedbackEl.className = "feedback-msg success";
      feedbackEl.textContent = "Field looks correct.";
      validationStates[stateKey] = true;
    } else {
      input.className = "form-input is-invalid";
      feedbackEl.className = "feedback-msg error";
      feedbackEl.textContent = getErrorMessage(stateKey);
      validationStates[stateKey] = false;
    }

    checkFormValidity();
  };

  const getErrorMessage = (key) => {
    switch (key) {
      case "name": return "Name field cannot be empty.";
      case "email": return "Please enter a valid email address containing '@' and domain.";
      case "phone": return "Phone number must be valid (minimum 10 digits).";
      case "message": return "Message is too short (minimum 10 characters required).";
      default: return "Invalid input.";
    }
  };

  // Validators
  const validateName = (val) => val.length > 0;
  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val) => /^\+?[0-9]{10,15}$/.test(val.replace(/[\s\-\(\)]/g, ""));
  const validateMessage = (val) => val.length >= 10;

  const checkFormValidity = () => {
    const isFormValid = Object.values(validationStates).every(state => state === true);
    submitBtn.disabled = !isFormValid;
  };

  // Bind listeners
  if (nameInput) {
    const feedback = document.getElementById("name-feedback");
    nameInput.addEventListener("input", () => validateField(nameInput, validateName, feedback, "name"));
  }
  if (emailInput) {
    const feedback = document.getElementById("email-feedback");
    emailInput.addEventListener("input", () => validateField(emailInput, validateEmail, feedback, "email"));
  }
  if (phoneInput) {
    const feedback = document.getElementById("phone-feedback");
    phoneInput.addEventListener("input", () => validateField(phoneInput, validatePhone, feedback, "phone"));
  }
  if (messageInput) {
    const feedback = document.getElementById("message-feedback");
    messageInput.addEventListener("input", () => validateField(messageInput, validateMessage, feedback, "message"));
  }

  // Intercept submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Thank you, ${nameInput.value}! Your message has been validated and submitted successfully.`);
    form.reset();
    
    // Reset inputs styles
    [nameInput, emailInput, phoneInput, messageInput].forEach(inp => {
      if (inp) inp.className = "form-input";
    });
    document.querySelectorAll(".feedback-msg").forEach(fb => {
      fb.className = "feedback-msg";
      fb.textContent = "";
    });

    Object.keys(validationStates).forEach(k => validationStates[k] = false);
    submitBtn.disabled = true;
  });
}

/* ==========================================================================
   8. DEVELOPER WEATHER DASHBOARD WIDGET
   ========================================================================== */
function initWeatherDashboard() {
  const cityInput = document.getElementById("weather-city-input");
  const searchBtn = document.getElementById("weather-search-btn");
  const displayContainer = document.getElementById("weather-display-area");

  if (!cityInput || !searchBtn || !displayContainer) return;

  const fallbackKey = "224cca4c70123acc7c84ef439e0842f2";

  // Dynamic environment variable parser from .env file
  async function getApiKey() {
    try {
      const response = await fetch(".env");
      if (response.ok) {
        const text = await response.text();
        const match = text.match(/WEATHER_API_KEY\s*=\s*([a-zA-Z0-9]+)/);
        if (match && match[1]) {
          return match[1].trim();
        }
        const matchAlt = text.match(/OPENWEATHER_API_KEY\s*=\s*([a-zA-Z0-9]+)/);
        if (matchAlt && matchAlt[1]) {
          return matchAlt[1].trim();
        }
      }
    } catch (e) {
      // Gracefully catch fetch blocks and fallback
    }
    return fallbackKey;
  }

  async function searchWeather(city) {
    if (!city) return;

    // Render loading state
    displayContainer.innerHTML = `
      <div class="todo-item-empty" style="animation: none;">
        <svg style="animation: spin 1.5s linear infinite; width: 32px; height: 32px; stroke: var(--color-cyan); stroke-width: 2.5; fill: none;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="var(--border-color)"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <p>Fetching weather data for "${city}"...</p>
      </div>
    `;

    try {
      const apiKey = await getApiKey();
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? "City not found. Please check spelling." : "Weather service is currently unavailable.");
      }

      const data = await response.json();

      // Save last successful city
      localStorage.setItem("weather-city", city);

      // Extract details
      const temp = Math.round(data.main.temp);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const cityName = data.name;
      const countryCode = data.sys.country;

      // Render weather details
      displayContainer.innerHTML = `
        <div class="weather-card">
          <div class="weather-header">
            <span class="weather-city-name">${cityName}</span>
            <span class="weather-country">${countryCode}</span>
          </div>
          
          <div class="weather-temp-block">
            <span class="weather-temp">${temp}°C</span>
            <div class="weather-icon-container">
              <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${desc}" class="weather-icon-img">
            </div>
          </div>
          
          <div class="weather-desc">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
            <span>${desc}</span>
          </div>
          
          <div class="weather-details-grid">
            <div class="weather-detail-item">
              <div class="weather-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"></path></svg>
              </div>
              <div class="weather-detail-info">
                <span class="weather-detail-label">Humidity</span>
                <span class="weather-detail-value">${humidity}%</span>
              </div>
            </div>
            <div class="weather-detail-item">
              <div class="weather-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
              </div>
              <div class="weather-detail-info">
                <span class="weather-detail-label">Wind Speed</span>
                <span class="weather-detail-value">${windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      // Render clean error card
      displayContainer.innerHTML = `
        <div class="weather-error-card">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div style="display:flex; flex-direction:column;">
            <div class="weather-error-title">Search Failed</div>
            <div class="weather-error-desc">${error.message || "An unexpected error occurred."}</div>
          </div>
        </div>
      `;
    }
  }

  // Trigger search on click
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      searchWeather(city);
    }
  });

  // Trigger search on enter key press
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const city = cityInput.value.trim();
      if (city) {
        searchWeather(city);
      }
    }
  });

  // Automatically load last search
  const cachedCity = localStorage.getItem("weather-city");
  if (cachedCity) {
    cityInput.value = cachedCity;
    searchWeather(cachedCity);
  }
}

/* ==========================================================================
   9. STUDENT GOAL & TASK TRACKER (TODO LIST) WIDGET
   ========================================================================== */
function initTaskTracker() {
  const taskInput = document.getElementById("todo-task-input");
  const addBtn = document.getElementById("todo-add-btn");
  const container = document.getElementById("todo-list-container");

  if (!taskInput || !addBtn || !container) return;

  // Read tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("workspace-tasks")) || [];
  let currentFilter = "all";

  // Escape HTML helper
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Save to local storage
  function saveTasks() {
    localStorage.setItem("workspace-tasks", JSON.stringify(tasks));
  }

  // Render tasks list
  function renderTasks() {
    let filtered = tasks;
    if (currentFilter === "active") {
      filtered = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
      filtered = tasks.filter(t => t.completed);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="todo-item-empty">
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <p>${
            currentFilter === "all"
              ? "No tasks registered. Add one above!"
              : currentFilter === "active"
              ? "No active tasks. Good job!"
              : "No completed tasks yet."
          }</p>
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    filtered.forEach(task => {
      const li = document.createElement("li");
      li.className = `todo-item ${task.completed ? "completed" : ""}`;
      li.setAttribute("data-id", task.id);

      if (task.editing) {
        li.innerHTML = `
          <input type="text" class="todo-edit-input" value="${escapeHtml(task.text)}" aria-label="Edit Task">
          <div class="todo-actions">
            <button class="todo-act-btn save" title="Save changes" aria-label="Save Task Changes">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="todo-act-btn cancel" title="Cancel edit" aria-label="Cancel Changes">
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        `;
      } else {
        li.innerHTML = `
          <span class="todo-text" title="${escapeHtml(task.text)}">${escapeHtml(task.text)}</span>
          <div class="todo-actions">
            <button class="todo-act-btn complete" title="Complete task" aria-label="Toggle Complete">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="todo-act-btn edit" title="Edit text" aria-label="Edit text">
              <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="todo-act-btn delete" title="Delete task" aria-label="Delete row">
              <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        `;
      }

      bindRowEvents(li, task);
      container.appendChild(li);
    });
  }

  // Bind individual task events
  function bindRowEvents(li, task) {
    if (!task.editing) {
      const completeBtn = li.querySelector(".todo-act-btn.complete");
      const editBtn = li.querySelector(".todo-act-btn.edit");
      const deleteBtn = li.querySelector(".todo-act-btn.delete");

      completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      editBtn.addEventListener("click", () => {
        // Reset edit flag for all other tasks
        tasks.forEach(t => t.editing = false);
        task.editing = true;
        renderTasks();
      });

      deleteBtn.addEventListener("click", () => {
        li.style.transform = "translateX(40px)";
        li.style.opacity = "0";
        setTimeout(() => {
          tasks = tasks.filter(t => t.id !== task.id);
          saveTasks();
          renderTasks();
        }, 200);
      });
    } else {
      const saveBtn = li.querySelector(".todo-act-btn.save");
      const cancelBtn = li.querySelector(".todo-act-btn.cancel");
      const editInput = li.querySelector(".todo-edit-input");

      editInput.focus();

      const saveEdit = () => {
        const val = editInput.value.trim();
        if (val) {
          task.text = val;
          task.editing = false;
          saveTasks();
          renderTasks();
        }
      };

      saveBtn.addEventListener("click", saveEdit);
      cancelBtn.addEventListener("click", () => {
        task.editing = false;
        renderTasks();
      });

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        } else if (e.key === "Escape") {
          task.editing = false;
          renderTasks();
        }
      });
    }
  }

  // Add a new task item
  const addTask = () => {
    const val = taskInput.value.trim();
    if (val) {
      const newTask = {
        id: Date.now(),
        text: val,
        completed: false,
        editing: false
      };
      tasks.push(newTask);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  };

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Set up filters
  const filterBtns = document.querySelectorAll(".todo-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderTasks();
    });
  });

  // Initial draw
  renderTasks();
}
