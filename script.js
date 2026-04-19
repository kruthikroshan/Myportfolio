const roles = [
  "Full-Stack Development",
  "Java Full-Stack Development",
];

document.documentElement.classList.add("js");

const roleNode = document.getElementById("role-text");
let roleIndex = 0;

function rotateRoles() {
  if (!roleNode) {
    return;
  }

  roleNode.style.opacity = "0";
  roleNode.style.transform = "translateY(4px)";

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleNode.textContent = roles[roleIndex];
    roleNode.style.opacity = "1";
    roleNode.style.transform = "translateY(0)";
  }, 220);
}

if (roleNode) {
  roleNode.style.transition = "opacity 0.22s ease, transform 0.22s ease";
  setInterval(rotateRoles, 2200);
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearNode = document.getElementById("current-year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}