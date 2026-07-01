// Compile Journey Hub - Global Interactivity Orchestrator
document.addEventListener("DOMContentLoaded", async () => {
  // 0. Parse Environment configurations dynamically and initialize Firebase
  const env = await loadEnv();
  window.envConfig = env;
  initFirebase(env);

  // 1. Initialize Universal Theme Customizer (Independent Background and Accents)
  initThemeCustomizer();

  // 2. Initialize Responsive Mobile Hamburger Navigation
  initMobileMenu();

  // 3. Initialize Floating Back-to-Top Button
  initBackToTop();

  // 4. Initialize Interactive Modal Popup (if triggers exist on the page)
  initPopupModal();
});

/* ==========================================================================
   0. CONFIG & FIREBASE INITIALIZATION
   ========================================================================== */
async function loadEnv() {
  const config = {
    WEATHER_API_KEY: "224cca4c70123acc7c84ef439e0842f2",
    FIREBASE_API_KEY: "AIzaSyBtc6-wffi3bThmlBObJN3y4YM88HVkRVc",
    FIREBASE_AUTH_DOMAIN: "compilejourney-hub.firebaseapp.com",
    FIREBASE_PROJECT_ID: "compilejourney-hub",
    FIREBASE_STORAGE_BUCKET: "compilejourney-hub.firebasestorage.app",
    FIREBASE_MESSAGING_SENDER_ID: "378084211033",
    FIREBASE_APP_ID: "1:378084211033:web:cf5b8b3e9d6000950f7448",
    FIREBASE_MEASUREMENT_ID: "G-5TGDN1FYPX"
  };

  try {
    const response = await fetch(".env");
    if (response.ok) {
      const text = await response.text();
      const lines = text.split("\n");
      lines.forEach(line => {
        const parts = line.split("=");
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join("=").trim();
          if (key && val) {
            config[key] = val;
          }
        }
      });
    }
  } catch (e) {
    // Graceful fallback
  }
  return config;
}

async function initFirebase(env) {
  try {
    const firebaseConfig = {
      apiKey: env.FIREBASE_API_KEY,
      authDomain: env.FIREBASE_AUTH_DOMAIN,
      projectId: env.FIREBASE_PROJECT_ID,
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
      appId: env.FIREBASE_APP_ID,
      measurementId: env.FIREBASE_MEASUREMENT_ID
    };

    // Dynamically load SDKs from CDN
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
    const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js");

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log("Firebase & Analytics loaded and initialized successfully.");
  } catch (err) {
    console.warn("Firebase could not be initialized (might be run locally via file:/// or offline):", err);
  }
}

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
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-checked", "false");
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
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-checked", "false");
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
      const isOpen = navMenu.classList.toggle("open");
      menuTrigger.classList.toggle("active", isOpen);
      menuTrigger.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && e.target !== menuTrigger) {
        navMenu.classList.remove("open");
        menuTrigger.classList.remove("active");
        menuTrigger.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when clicking on page links
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuTrigger.classList.remove("active");
        menuTrigger.setAttribute("aria-expanded", "false");
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
   4. INTERACTIVE MODAL DIALOG POPUP
   ========================================================================== */
function initPopupModal() {
  const modalOverlay = document.getElementById("info-modal");
  const openModalBtns = document.querySelectorAll("[data-open-modal]");
  
  if (!modalOverlay || openModalBtns.length === 0) return;

  const openModal = () => {
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable scroll
    modalOverlay.setAttribute("aria-hidden", "false");
    
    // Focus the close button for accessibility
    const closeBtn = modalOverlay.querySelector(".modal-close-btn");
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = ""; // Restore scroll
    modalOverlay.setAttribute("aria-hidden", "true");
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
