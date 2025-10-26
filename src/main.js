// Navigation
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("visible");
  });
}

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.querySelector("body");

if (themeToggle && body) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
  });
}

// Form
const form = document.querySelector(".newsletter__form");

if (form) {
  const successMessage = form.querySelector(".success-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (successMessage && form.checkValidity()) {
      successMessage.classList.add("active");
    }
  });

  form.addEventListener("");
}
