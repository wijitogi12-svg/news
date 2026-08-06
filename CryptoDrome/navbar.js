document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-menu-toggle]").forEach(function (toggle) {
    var nav = toggle.closest("nav");
    if (!nav) return;
    var overlay = nav.querySelector("[data-menu-overlay]");
    if (!overlay) return;
    var topLine = toggle.querySelector('[data-menu-line="top"]');
    var bottomLine = toggle.querySelector('[data-menu-line="bottom"]');
    var open = false;
    function render() {
      overlay.style.clipPath = open
        ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
      overlay.classList.toggle("pointer-events-none", !open);
      overlay.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (topLine) topLine.style.transform = open ? "rotate(45deg)" : "translateY(-0.25rem)";
      if (bottomLine) bottomLine.style.transform = open ? "rotate(-45deg)" : "translateY(0.25rem)";
    }
    toggle.addEventListener("click", function () {
      open = !open;
      render();
    });
    overlay.querySelectorAll("[data-menu-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        open = false;
        render();
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && open) {
        open = false;
        render();
      }
    });
    render();
  });
});
