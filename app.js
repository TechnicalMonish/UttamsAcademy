// Molecular Background Animation
function createMolecularBackground() {
  const bg = document.getElementById("molecularBg");
  const count = 50;

  for (let i = 0; i < count; i++) {
    const molecule = document.createElement("div");
    molecule.className = "molecule";
    const x = Math.random() * window.innerWidth;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 10;

    molecule.style.left = x + "px";
    molecule.style.animation = `float-molecule ${duration}s linear infinite`;
    molecule.style.animationDelay = delay + "s";
    bg.appendChild(molecule);
  }
}

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.opacity = "0";
    loadingOverlay.style.transform = "scale(0.8)";
    setTimeout(() => {
      loadingOverlay.style.display = "none";
    }, 800);
  }, 2000);
});

// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  const btn = document.querySelector(".mobile-menu");
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    btn.innerHTML = "✕";
    btn.style.transform = "rotate(180deg) scale(1.2)";
    btn.style.background = "linear-gradient(45deg, #FF6B6B, #FF8E8E)";
  } else {
    btn.innerHTML = "☰";
    btn.style.transform = "rotate(0deg) scale(1)";
    btn.style.background = "linear-gradient(45deg, #FFD700, #FFA500)";
  }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Close mobile menu after clicking
    const menu = document.getElementById("navMenu");
    const btn = document.querySelector(".mobile-menu");
    menu.classList.remove("active");
    btn.innerHTML = "☰";
    btn.style.transform = "rotate(0deg) scale(1)";
    btn.style.background = "linear-gradient(45deg, #FFD700, #FFA500)";
  });
});

// Header Background Change on Scroll & Progress Bar
let headerBackground =
  "linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 50%, rgba(30, 60, 114, 0.95) 100%)";

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  // Update scroll progress bar
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + "%";

    // Add pulse effect when near completion
    if (scrollPercent > 95) {
      scrollProgress.style.animation =
        "shimmer 3s ease-in-out infinite, pulse-progress 1s ease-in-out infinite";
    } else {
      scrollProgress.style.animation = "shimmer 3s ease-in-out infinite";
    }
  }

  // Enhanced floating header effect
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "linear-gradient(135deg, rgba(30,60,114,0.98) 0%, rgba(42,82,152,0.98) 50%, rgba(30,60,114,0.98) 100%)";
      header.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.2)";
      header.style.backdropFilter = "blur(25px)";
      header.style.transform = "translateY(0)";
    } else {
      header.style.background = headerBackground;
      header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
      header.style.backdropFilter = "blur(20px)";
      header.style.transform = "translateY(0)";
    }
  }
});

// Animated Statistics Counter
function animateStats() {
  const stats = [
    {
      element: document.getElementById("stat1"),
      target: 25,
      suffix: "L+",
      duration: 2500,
    },
    {
      element: document.getElementById("stat2"),
      target: 1500,
      suffix: "+",
      duration: 3000,
    },
    {
      element: document.getElementById("stat3"),
      target: 150,
      suffix: "+",
      duration: 2000,
    },
    {
      element: document.getElementById("stat4"),
      target: 99,
      suffix: "%",
      duration: 2200,
    },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stat = stats.find((s) => s.element === entry.target);
        if (stat && !stat.animated) {
          stat.animated = true;
          let current = 0;
          const increment = stat.target / (stat.duration / 16);

          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
              current = stat.target;
              clearInterval(timer);
            }
            stat.element.textContent = Math.floor(current) + stat.suffix;
            stat.element.style.textShadow = `0 0 ${
              20 + Math.sin(current / 10) * 10
            }px rgba(255,215,0,0.8)`;
          }, 16);
        }
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat.element));
}

// Intersection Observer for Animations
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
        }, index * 100);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// 3D Card Effects
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
    this.style.boxShadow = "0 30px 60px rgba(30,60,114,0.3)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
    this.style.boxShadow = "0 15px 40px rgba(30,60,114,0.1)";
  });

  card.addEventListener("click", function (e) {
    this.style.transform = "perspective(1000px) scale(0.95)";
    setTimeout(() => {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(20px) scale(1.05)";
    }, 150);
    createRipple(this, e);
  });
});

// Ripple Effect
function createRipple(element, event) {
  const ripple = document.createElement("div");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.style.position = "absolute";
  ripple.style.background =
    "radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s linear";
  ripple.style.pointerEvents = "none";

  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// Initialize Everything on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  createMolecularBackground();
  animateStats();

  // Setup intersection observer for cards
  document
    .querySelectorAll(
      ".category-card, .feature-card, .contact-item, .video-card"
    )
    .forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(50px) scale(0.9)";
      element.style.transition =
        "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      animationObserver.observe(element);
    });

  // Initial page load animation
  setTimeout(() => {
    document.body.style.opacity = "1";
    document.body.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 2500);
});
