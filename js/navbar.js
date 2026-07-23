// Navigation and Navbar scroll handling
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');

  const handleNavbarScroll = () => {
    const navInner = header.firstElementChild;
    if (!navInner) return;
    if (window.scrollY > 20) {
      navInner.classList.add('shadow-md');
      navInner.classList.remove('shadow-sm');
      header.classList.remove('top-4');
      header.classList.add('top-2');
    } else {
      navInner.classList.remove('shadow-md');
      navInner.classList.add('shadow-sm');
      header.classList.remove('top-2');
      header.classList.add('top-4');
    }
  };

  // 2. Active section link highlighting
  const highlightNavLinks = () => {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      // Highlight exact section match
      if (href && href.substring(1) === currentSection) {
        link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
        link.classList.remove('text-slate-600', 'dark:text-slate-400');
      } else {
        link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
        link.classList.add('text-slate-600', 'dark:text-slate-400');
      }
    });
  };

  // 3. Hamburger menu events
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // Bind scroll listeners
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightNavLinks();
  });

  // Run initial state
  handleNavbarScroll();
  highlightNavLinks();
});
