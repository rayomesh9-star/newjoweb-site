/**
 * Web3Forms Email Integration
 *
 * SETUP:
 * 1. Go to https://web3forms.com/
 * 2. Enter your email address to get a free access key
 * 3. Replace WEB3FORMS_ACCESS_KEY below with your actual key
 */

const WEB3FORMS_ACCESS_KEY = "a3bf8dae-cebd-42b9-80d8-df5115ed3c3e";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const DESTINATION_EMAIL = "omegor6@gmail.com";

/**
 * Send form data via Web3Forms
 * @param {Object} formData - Form data to send
 * @returns {Promise}
 */
function sendEmail(formData) {
  const companyName = formData.company || "Unknown Company";
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    email_to: DESTINATION_EMAIL,
    name: formData.name || formData.contact || "",
    email: formData.email || "",
    phone: formData.phone || "",
    subject: "New Quote Request from " + companyName,
    company: formData.company || "",
    services: formData.services || "",
    budget: formData.budget || "",
    message: formData.message || formData.details || "",
  };

  return fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(function (response) {
    return response.json().then(function (data) {
      if (!data.success) {
        throw new Error(data.message || "Form submission failed");
      }
      return data;
    });
  });
}

/**
 * Handle form submission
 * @param {HTMLFormElement} form - The form element
 */
function handleFormSubmit(form) {
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn ? btn.textContent : "";

  let statusEl = form.parentElement.querySelector(".form-status");
  if (!statusEl) {
    statusEl = document.createElement("p");
    statusEl.className = "form-status";
    statusEl.style.cssText = "margin-top:10px;font-weight:600;";
    form.parentElement.insertBefore(statusEl, form);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {};
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach(function (input) {
      if (input.name && input.type !== "hidden") {
        formData[input.name] = input.value;
      }
    });

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }
    statusEl.textContent = "";

    sendEmail(formData)
      .then(function () {
        statusEl.textContent =
          "Thank you! Your request has been submitted successfully. We'll contact you soon.";
        statusEl.style.color = "#2ecc71";
        form.reset();
      })
      .catch(function (error) {
        console.error("Web3Forms Error:", error);
        statusEl.textContent =
          "Oops! Something went wrong. Please try again later.";
        statusEl.style.color = "#e74c3c";
      })
      .finally(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      });
  });
}

// Auto-initialize forms when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");
  forms.forEach(function (form) {
    if (form.hasAttribute("data-netlify")) return;
    handleFormSubmit(form);
  });
});
