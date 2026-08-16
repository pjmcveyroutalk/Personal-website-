const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* MOBILE MENU */

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");


function openMenu() {
  if (!menuButton || !mobileMenu) return;

  menuButton.classList.add("is-open");
  mobileMenu.classList.add("is-open");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

  mobileMenu.setAttribute("aria-hidden", "false");
}


function closeMenu() {
  if (!menuButton || !mobileMenu) return;

  menuButton.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

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


/* BACKGROUND VIDEO RELIABILITY */

const backgroundVideos =
  document.querySelectorAll(".background-video");


function prepareVideo(video) {

  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;

}


function playVideo(video) {

  if (!video) return;

  prepareVideo(video);

  const playAttempt = video.play();

  if (
    playAttempt &&
    typeof playAttempt.catch === "function"
  ) {

    playAttempt.catch(() => {
      /*
      Android browsers can temporarily reject playback
      while the page is loading or changing visibility.
      Later recovery events retry playback.
      */
    });

  }

}


function startBackgroundVideos() {

  backgroundVideos.forEach((video) => {
    playVideo(video);
  });

}


backgroundVideos.forEach((video) => {

  prepareVideo(video);


  video.addEventListener(
    "loadedmetadata",
    () => {
      playVideo(video);
    }
  );


  video.addEventListener(
    "canplay",
    () => {

      if (video.paused) {
        playVideo(video);
      }

    }
  );


  video.addEventListener(
    "pause",
    () => {

      if (!document.hidden) {

        window.setTimeout(() => {

          if (video.paused) {
            playVideo(video);
          }

        }, 250);

      }

    }
  );

});


if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    startBackgroundVideos,
    { once: true }
  );

} else {

  startBackgroundVideos();

}


window.addEventListener(
  "load",
  startBackgroundVideos
);


document.addEventListener(
  "visibilitychange",
  () => {

    if (!document.hidden) {
      startBackgroundVideos();
    }

  }
);


window.addEventListener(
  "pageshow",
  startBackgroundVideos
);


/*
Some mobile browsers allow autoplay only after the first
interaction even when the video is muted. This provides a
one-time fallback without requiring a visible control.
*/

function interactionVideoRecovery() {

  startBackgroundVideos();

  document.removeEventListener(
    "touchstart",
    interactionVideoRecovery
  );

  document.removeEventListener(
    "pointerdown",
    interactionVideoRecovery
  );

}


document.addEventListener(
  "touchstart",
  interactionVideoRecovery,
  {
    passive: true,
    once: true
  }
);


document.addEventListener(
  "pointerdown",
  interactionVideoRecovery,
  {
    passive: true,
    once: true
  }
);
