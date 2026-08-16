const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");


function openMenu() {
  if (!menuButton || !mobileMenu) return;

  menuButton.classList.add("is-open");
  mobileMenu.classList.add("is-open");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation menu");

  mobileMenu.setAttribute("aria-hidden", "false");
}


function closeMenu() {
  if (!menuButton || !mobileMenu) return;

  menuButton.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");

  mobileMenu.setAttribute("aria-hidden", "true");
}


function toggleMenu() {
  if (!menuButton) return;

  const isOpen =
    menuButton.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}


if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });


  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


  document.addEventListener("click", (event) => {

    if (
      !mobileMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }

  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeMenu();
    }

  });

}
