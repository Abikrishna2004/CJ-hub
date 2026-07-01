// Compile Journey Hub - Contact Page Specific Scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Real-Time Contact Form Validation
  initFormValidation();
});

/* ==========================================================================
   1. REAL-TIME CONTACT FORM VALIDATION
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
      input.removeAttribute("aria-invalid");
    } else if (isValid) {
      input.className = "form-input is-valid";
      feedbackEl.className = "feedback-msg success";
      feedbackEl.textContent = "Field looks correct.";
      validationStates[stateKey] = true;
      input.setAttribute("aria-invalid", "false");
    } else {
      input.className = "form-input is-invalid";
      feedbackEl.className = "feedback-msg error";
      feedbackEl.textContent = getErrorMessage(stateKey);
      validationStates[stateKey] = false;
      input.setAttribute("aria-invalid", "true");
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
      if (inp) {
        inp.className = "form-input";
        inp.removeAttribute("aria-invalid");
      }
    });
    document.querySelectorAll(".feedback-msg").forEach(fb => {
      fb.className = "feedback-msg";
      fb.textContent = "";
    });

    Object.keys(validationStates).forEach(k => validationStates[k] = false);
    submitBtn.disabled = true;
  });
}
