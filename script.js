document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const header = document.getElementById('header');

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // Toggle header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});
