// Main application initialization & Forms handling
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hire Me Modal Logic
  const hireBtn = document.getElementById('hireBtn');
  const contactBtnHero = document.getElementById('contactBtnHero');
  const modal = document.getElementById('hireModal');
  const closeModal = document.getElementById('closeModal');
  const modalBox = document.getElementById('modalBox');

  const openModal = () => {
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeModalFunc = () => {
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  };

  if (hireBtn) hireBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (contactBtnHero) contactBtnHero.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (closeModal) closeModal.addEventListener('click', closeModalFunc);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (modalBox && !modalBox.contains(e.target)) {
        closeModalFunc();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModalFunc();
    });
  }

  // 2. Forms submission handling
  const setupFormSubmission = (formId, statusId) => {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);

    if (form && status) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        status.textContent = "Sending...";
        status.className = "text-center text-sm mt-2 text-indigo-600 dark:text-indigo-400";

        try {
          const response = await fetch("https://formspree.io/f/mgvwgazv", {
            method: "POST",
            headers: { 'Accept': 'application/json' },
            body: formData
          });

          if (response.ok) {
            status.textContent = "Thank you! Your message has been sent successfully.";
            status.className = "text-center text-sm mt-2 text-green-600 dark:text-green-400";
            form.reset();
            if (formId === 'hireForm') {
              setTimeout(closeModalFunc, 2000);
            }
          } else {
            status.textContent = "Oops! Something went wrong. Please try again.";
            status.className = "text-center text-sm mt-2 text-red-600 dark:text-red-400";
          }
        } catch (error) {
          status.textContent = "Network error. Please check your connection.";
          status.className = "text-center text-sm mt-2 text-red-600 dark:text-red-400";
        }
      });
    }
  };

  setupFormSubmission('hireForm', 'hireFormStatus');
  setupFormSubmission('contact-form', 'form-status');

  // Welcome console logs
  console.log("%cHi, I'm Prahlad Chaudhary!", "color: #6366f1; font-size: 18px; font-weight: bold;");
  console.log("%cFull Stack Developer Portfolio Redesigned (SaaS Style) 🚀", "color: #a855f7; font-size: 14px;");
});
