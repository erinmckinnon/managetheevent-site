// Mobile menu
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
if (btn && nav) btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});

// The follow spot: one light that tracks the pointer across the hero and closing curtain.
// On load it sweeps in from stage left; with reduced motion it simply sits still.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const stages = [...document.querySelectorAll("[data-spotlight]")];
const root = document.documentElement.style;
const set = (x, y) => { root.setProperty("--x", x + "px"); root.setProperty("--y", y + "px"); };
let tx = innerWidth * 0.32, ty = innerHeight * 0.55, cx = -innerWidth * 0.2, cy = innerHeight * 0.4;
if (reduce) { cx = tx; cy = ty; }
function frame() {
  cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
  set(cx, cy);
  if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) requestAnimationFrame(frame); else running = false;
}
let running = stages.length > 0;
if (running) requestAnimationFrame(frame);
if (!reduce && matchMedia("(pointer: fine)").matches) {
  addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; if (!running) { running = true; requestAnimationFrame(frame); } }, { passive: true });
}
