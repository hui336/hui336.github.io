const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const statNumbers = document.querySelectorAll(".stat-number");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    const nextValue = expanded ? "false" : "true";
    menuToggle.setAttribute("aria-expanded", nextValue);
    if (expanded) {
      navLinks.classList.remove("open");
    } else {
      navLinks.classList.add("open");
    }
  });

  navAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });
}

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting === false) {
        return;
      }
      const id = entry.target.getAttribute("id");
      navAnchors.forEach(function (anchor) {
        const isActive = anchor.getAttribute("href") === "#" + id;
        if (isActive) {
          anchor.classList.add("active");
        } else {
          anchor.classList.remove("active");
        }
      });
    });
  },
  {
    threshold: 0.3,
    rootMargin: "-10% 0px -55% 0px"
  }
);

document.querySelectorAll("main section[id]").forEach(function (section) {
  sectionObserver.observe(section);
});

function formatNumber(value, target) {
  if (target >= 100) {
    return String(value) + "+";
  }
  return String(value);
}

const numberObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting === false) {
        return;
      }
      const node = entry.target;
      const target = Number(node.dataset.target || 0);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        node.textContent = formatNumber(value, target);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          node.textContent = formatNumber(target, target);
        }
      }

      requestAnimationFrame(tick);
      observer.unobserve(node);
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(function (node) {
  numberObserver.observe(node);
});
