// Typewriter and parallax mouse animation logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Role Typewriter Effect
  const roles = [
    "Full-Stack Web Developer",
    "Laravel Backend Specialist",
    "React.js UI Developer",
    "Node.js API Developer",
    "AI Agent Developer"
  ];
  let i = 0, j = 0, currentRole = "", isDeleting = false;
  const typeTarget = document.getElementById("roleText");

  function typeEffect() {
    if (!typeTarget) return;

    if (i < roles.length) {
      if (!isDeleting && j <= roles[i].length) {
        currentRole = roles[i].substring(0, j++);
        typeTarget.textContent = currentRole;
      } else if (isDeleting && j >= 0) {
        currentRole = roles[i].substring(0, j--);
        typeTarget.textContent = currentRole;
      }

      if (j === roles[i].length + 1) {
        isDeleting = true;
        // Pause at full word
        setTimeout(typeEffect, 1500);
        return;
      }
      
      if (j === 0 && isDeleting) {
        isDeleting = false;
        i = (i + 1) % roles.length;
        // Pause at empty before next word
        setTimeout(typeEffect, 400);
        return;
      }

      setTimeout(typeEffect, isDeleting ? 40 : 100);
    }
  }

  typeEffect();

  // 2. Parallax Mousemove on Hero Image
  const heroImg = document.getElementById("heroImg");
  const heroContainer = document.getElementById("Home");

  if (heroImg && heroContainer) {
    heroContainer.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      heroImg.style.transform = `translate(${x}px, ${y}px)`;
    });

    heroContainer.addEventListener("mouseleave", () => {
      heroImg.style.transform = "translate(0px, 0px)";
      heroImg.style.transition = "transform 0.5s ease";
    });

    heroContainer.addEventListener("mouseenter", () => {
      heroImg.style.transition = "none";
    });
  }
});
