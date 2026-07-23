// Scroll control and back to top button functionality
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('btn-back-to-top');

  if (backToTopBtn) {
    // Show button when scrolling down 300px
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll for all anchor links in page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Scroll-driven Word Reveal Animation ---
  const aboutTextContainer = document.getElementById('about-text-container');
  if (aboutTextContainer) {
    // Enable JS-enabled style to default text to low opacity
    document.body.classList.add('js-enabled');

    // Recursively wraps text node words in spans
    const wrapTextInSpans = (element) => {
      const children = Array.from(element.childNodes);
      children.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.nodeValue;
          // Split by whitespace
          const words = text.split(/(\s+)/);
          const fragment = document.createDocumentFragment();
          
          words.forEach(word => {
            if (word.trim().length > 0) {
              const span = document.createElement('span');
              span.className = 'reveal-word';
              span.textContent = word;
              fragment.appendChild(span);
            } else {
              fragment.appendChild(document.createTextNode(word));
            }
          });
          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (!node.classList.contains('reveal-word')) {
            wrapTextInSpans(node);
          }
        }
      });
    };

    // Execute wrapping
    wrapTextInSpans(aboutTextContainer);

    // Collect wrapped words
    const words = aboutTextContainer.querySelectorAll('.reveal-word');

    // Update highlights based on scroll position of container relative to viewport
    const handleScrollReveal = () => {
      const containerRect = aboutTextContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Reveal is triggered by the scroll position of the top of the container
      // Start revealing when the top of the text is 85% of viewport height from the top
      // Finish revealing when the top of the text reaches the header region (10% of viewport height)
      const startThreshold = viewportHeight * 0.85;
      const endThreshold = viewportHeight * 0.10;
      
      const totalRange = startThreshold - endThreshold;
      let progress = (startThreshold - containerRect.top) / totalRange;
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      const totalWords = words.length;
      // Map progress to the current active word index
      const activeIndex = Math.floor(progress * totalWords);
      
      // Set highlight window spread size (number of words highlighted around the scroll index)
      const highlightWindow = 6;
      
      for (let i = 0; i < totalWords; i++) {
        const word = words[i];
        if (i < activeIndex - highlightWindow) {
          // Past words (already read)
          word.classList.add('past');
          word.classList.remove('active');
        } else if (i > activeIndex + highlightWindow) {
          // Future words (yet to read)
          word.classList.remove('past', 'active');
        } else {
          // Currently active / reading focus words
          word.classList.add('active');
          word.classList.remove('past');
        }
      }
    };
    
    // Initial reveal calculation
    setTimeout(handleScrollReveal, 100);

    // Listen to scroll events
    window.addEventListener('scroll', handleScrollReveal, { passive: true });
    window.addEventListener('resize', handleScrollReveal, { passive: true });
    window.addEventListener('load', handleScrollReveal);
  }
});
