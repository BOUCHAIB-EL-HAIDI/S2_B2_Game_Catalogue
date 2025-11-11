

// creating the navbar//

// index.js
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const searchInput = document.querySelector('input[type="text"]');
const searchIcon = document.querySelector('.fa-magnifying-glass');

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("hidden");
    // Focus the input if it's now visible
  if (!searchInput.classList.contains("hidden")) {
    searchInput.focus();
  }
});