// Light/Dark Theme management
(function () {
  // Read theme from localStorage, default is light theme
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      
      // Dispatch a custom event to alert other modules if needed
      window.dispatchEvent(new CustomEvent('theme-changed', {
        detail: { isDark: document.documentElement.classList.contains('dark') }
      }));
    });
  });
});
