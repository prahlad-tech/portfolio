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

  // 3. Spotlight Card Radial Glow & 3D Parallax Tilt Tracker
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation
      const width = rect.width;
      const height = rect.height;

      // Calculate rotation angle relative to center: max rotation of 10 degrees
      const rotateX = ((height / 2 - y) / (height / 2)) * 10;
      const rotateY = ((x - width / 2) / (width / 2)) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      // Smooth spring-back transform reset
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseenter', () => {
      // Snappy tracking transition on hover active
      card.style.transition = 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
    });
  });

  // 4. Conic Border Beam & Parallax Liquid Blobs Mouse Tracker
  const glowCards = document.querySelectorAll('.glow-card-wrapper');

  glowCards.forEach(card => {
    const blob1 = card.querySelector('.blob-1');
    const blob2 = card.querySelector('.blob-2');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate offset distances from center to apply a subtle parallax scale
      const dx = x - rect.width / 2;
      const dy = y - rect.height / 2;

      if (blob1) {
        // Blob 1 follows the cursor directly
        blob1.style.transform = `translate3d(${x - 64}px, ${y - 64}px, 0)`;
      }

      if (blob2) {
        // Blob 2 moves with a parallax lag relative to center, creating fluid depth
        const lagX = dx * 0.2;
        const lagY = dy * 0.2;
        blob2.style.transform = `translate3d(${x - 64 + lagX}px, ${y - 64 + lagY}px, 0) scale(1.15)`;
      }
    });
  });
});
