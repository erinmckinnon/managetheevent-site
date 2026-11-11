const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
if (btn && nav) btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
