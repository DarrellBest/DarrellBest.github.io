document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const sidebar = document.getElementById('sidebar');

  mobileNavToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Hide sidebar when a link is clicked in mobile mode
  const sidebarLinks = document.querySelectorAll('#sidebar a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        sidebar.classList.remove('active');
      }
    });
  });

  // Detect scroll direction
  let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
  let scrollDirection = "down"; // default

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScroll) {
      scrollDirection = "down";
    } else {
      scrollDirection = "up";
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Get all sections
  const sections = document.querySelectorAll('.section');

  // Initialize each section with a hidden state (default hidden-down)
  sections.forEach(section => {
    section.classList.add('hidden-down');
  });

  // Intersection Observer for sections
  const observerOptions = {
    root: null,
    threshold: 0.15 // trigger when 15% is visible
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove any hidden classes and add animate
        entry.target.classList.remove('hidden-down', 'hidden-up');
        entry.target.classList.add('animate');
      } else {
        // Remove animate and add the appropriate hidden class based on scroll direction
        entry.target.classList.remove('animate');
        if (scrollDirection === "up") {
          entry.target.classList.add('hidden-down');
          entry.target.classList.remove('hidden-up');
        } else {
          entry.target.classList.add('hidden-up');
          entry.target.classList.remove('hidden-down');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});
