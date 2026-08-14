const mobileFix = document.createElement("link");

mobileFix.rel = "stylesheet";
mobileFix.href = "mobile-fix.css";

document.head.appendChild(mobileFix);

document.getElementById("year").textContent =
  new Date().getFullYear();
