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
