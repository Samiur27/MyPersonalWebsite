const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const themeToggle = document.querySelector("#themeToggle");


// ===============================
// Mobile Menu
// ===============================

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});


// ===============================
// Navigation + Smooth Scrolling
// ===============================

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");

    // Only handle internal section links
    if (!targetId || !targetId.startsWith("#")) return;

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      console.log("Section not found:", targetId);
      return;
    }

    // Stop the browser's default jump
    e.preventDefault();

    // Close mobile menu
    nav.classList.remove("open");

    // Scroll to the selected section
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Update URL
    history.pushState(null, "", targetId);
  });
});


// ===============================
// Dark / Light Mode
// ===============================

themeToggle?.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☾" : "☼";

  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("dark")
      ? "dark"
      : "light"
  );
});


// Load saved theme
if (localStorage.getItem("portfolio-theme") === "dark") {
  document.body.classList.add("dark");

  if (themeToggle) {
    themeToggle.textContent = "☾";
  }
}


// ===============================
// Active Navigation State
// ===============================

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        links.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );

        });

      }

    });

  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach(section => observer.observe(section));