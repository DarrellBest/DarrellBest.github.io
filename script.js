document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger-inner');
  const overlay = document.getElementById('sidebar-overlay');

  if (mobileNavToggle && sidebar) {
    mobileNavToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
    });

    // Hide sidebar when a link is clicked in mobile mode
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          sidebar.classList.remove('active');
          hamburger.classList.remove('active');
          overlay.classList.remove('active');
        }
      });
    });
  }

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

  // Get all sections except blog post content
  const sections = document.querySelectorAll('.section:not(#blog-post-content):not(#blog-post-header)');

  // Initialize each section with a hidden state (default hidden-down)
  sections.forEach(section => {
    section.classList.add('hidden-down');
  });

  // Intersection Observer for sections - lower threshold for quicker animations
  const observerOptions = {
    root: null,
    threshold: 0.05, // trigger when just 5% is visible for faster response
    rootMargin: '0px 0px -100px 0px' // Start animation slightly before section comes into view
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

  // Make sure blog post content sections are visible by default
  document.querySelectorAll('#blog-post-content, #blog-post-header').forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // TypeWriter effect for hero title
  function typeWriter(element, text, speed) {
    let i = 0;
    const cursor = '<span class="cursor">|</span>';
    element.innerHTML = cursor;

    function type() {
      if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + cursor;
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  const heroTitle = document.getElementById('hero-title');
  const textToType = "Senior AI Research Engineer";
  const typingSpeed = 100; // milliseconds per character

  if (heroTitle) {
    typeWriter(heroTitle, textToType, typingSpeed);
  }

  // Parallax effect for background images (lighter effect)
  window.addEventListener('scroll', function() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const scrollPosition = window.pageYOffset;

    parallaxBgs.forEach(bg => {
      const parent = bg.parentElement;
      const parentTop = parent.offsetTop;
      const speed = 0.2; // Reduced for a more subtle parallax effect
      
      // Only apply parallax within a reasonable range to avoid extreme movement
      if (scrollPosition > parentTop - window.innerHeight && 
          scrollPosition < parentTop + parent.offsetHeight) {
        // Calculate new background position with a more gentle effect
        const yPos = -(scrollPosition - parentTop) * speed;
        bg.style.transform = `translateY(${yPos}px)`;
      }
    });
  });

  // Animate skill bars when they come into view
  const skillLevels = document.querySelectorAll('.skill-level');

  // Create a new Intersection Observer for skill bars
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the width from the style attribute and apply it
        const width = entry.target.style.width;
        entry.target.style.width = '0';

        // Trigger reflow to ensure the animation works
        entry.target.offsetWidth;

        // Set the width back to animate it
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);

        // Unobserve after animation is triggered
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  // Observe all skill levels
  skillLevels.forEach(skill => {
    skillObserver.observe(skill);
  });
});
