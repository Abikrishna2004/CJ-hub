import React, { useState } from 'react';
import '../../css/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, message: false });

  // Field validation rules
  const validateName = (val) => val.length > 0;
  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val) => /^\+?[0-9]{10,15}$/.test(val.replace(/[\s\-\(\)]/g, ''));
  const validateMessage = (val) => val.length >= 10;

  const isNameValid = validateName(formData.name);
  const isEmailValid = validateEmail(formData.email);
  const isPhoneValid = validatePhone(formData.phone);
  const isMessageValid = validateMessage(formData.message);

  const getFieldState = (value, isValid, isTouched) => {
    if (!isTouched || value === '') return { inputClass: 'form-input', msgClass: 'feedback-msg', msg: '', ariaInvalid: null };
    if (isValid) return { inputClass: 'form-input is-valid', msgClass: 'feedback-msg success', msg: 'Field looks correct.', ariaInvalid: 'false' };
    return { inputClass: 'form-input is-invalid', msgClass: 'feedback-msg error', msg: null, ariaInvalid: 'true' };
  };

  const nameState = getFieldState(formData.name, isNameValid, touched.name);
  const emailState = getFieldState(formData.email, isEmailValid, touched.email);
  const phoneState = getFieldState(formData.phone, isPhoneValid, touched.phone);
  const messageState = getFieldState(formData.message, isMessageValid, touched.message);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid && isMessageValid;

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    alert(`Thank you, ${formData.name}! Your message has been validated and submitted successfully.`);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTouched({ name: false, email: false, phone: false, message: false });
  };

  return (
    <main id="main-content">
      {/* CONTACT US SECTION */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">
              Have questions, suggestions, or collaboration ideas? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-panel">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 'var(--space-sm)' }}>
                Contact Information
              </h2>
              <p className="contact-info-desc">
                Feel free to reach out through any of these social channels or drop an email directly. We strive to reply
                within 24-48 hours.
              </p>

              <div className="contact-details-list">
                {/* Email */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Email Address</span>
                    <span className="contact-detail-value">
                      <a href="mailto:compilejourney@gmail.com">compilejourney@gmail.com</a>
                    </span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">LinkedIn Profile</span>
                    <span className="contact-detail-value">
                      <a
                        href="https://www.linkedin.com/in/abikrishna-p-21195b304"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile (opens in a new tab)"
                      >
                        abikrishna-p-21195b304
                      </a>
                    </span>
                  </div>
                </div>

                {/* GitHub */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">GitHub Profile</span>
                    <span className="contact-detail-value">
                      <a
                        href="https://github.com/Abikrishna2004"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile (opens in a new tab)"
                      >
                        Abikrishna2004
                      </a>
                    </span>
                  </div>
                </div>

                {/* Instagram */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Instagram Community</span>
                    <span className="contact-detail-value">
                      <a
                        href="https://instagram.com/compile.journey"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Profile (opens in a new tab)"
                      >
                        @compile.journey
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card form-card">
              <h3 className="form-title">Send a Message</h3>

              <form onSubmit={handleSubmit} id="contact-form-realtime" aria-label="Contact Form">
                <div className="form-group">
                  <label htmlFor="form-name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={nameState.inputClass}
                    placeholder="e.g. Alex"
                    aria-required="true"
                    aria-invalid={nameState.ariaInvalid}
                    required
                  />
                  <span className={nameState.msgClass} id="name-feedback" aria-live="polite">
                    {nameState.msg !== null ? nameState.msg : 'Name field cannot be empty.'}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="form-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={emailState.inputClass}
                    placeholder="e.g. alex@gmail.com"
                    aria-required="true"
                    aria-invalid={emailState.ariaInvalid}
                    required
                  />
                  <span className={emailState.msgClass} id="email-feedback" aria-live="polite">
                    {emailState.msg !== null ? emailState.msg : "Please enter a valid email address containing '@' and domain."}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="form-phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={phoneState.inputClass}
                    placeholder="e.g. 9876543210"
                    aria-required="true"
                    aria-invalid={phoneState.ariaInvalid}
                    required
                  />
                  <span className={phoneState.msgClass} id="phone-feedback" aria-live="polite">
                    {phoneState.msg !== null ? phoneState.msg : 'Phone number must be valid (minimum 10 digits).'}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="form-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={messageState.inputClass}
                    placeholder="Write your message details..."
                    aria-required="true"
                    aria-invalid={messageState.ariaInvalid}
                    required
                  />
                  <span className={messageState.msgClass} id="message-feedback" aria-live="polite">
                    {messageState.msg !== null ? messageState.msg : 'Message is too short (minimum 10 characters required).'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
