// Smooth reveal on scroll
(function () {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// Theme toggle
(function () {
  const storageKey = "saayan-theme";
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const label = document.getElementById("themeLabel");

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };

  const applyTheme = (theme) => {
    body.setAttribute("data-theme", theme);
    if (label) {
      label.textContent = theme === "light" ? "Light" : "Dark";
    }
  };

  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem(storageKey, nextTheme);
    });
  }
})();
