/* ============================================
   Nori Sushi — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Scroll arrow — click to go to next section
  const scrollArrow = document.getElementById('scrollArrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      const mastery = document.getElementById('mastery');
      if (mastery) {
        mastery.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Menu tab navigation — scroll to category
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Scroll to section
      const category = tab.dataset.category;
      const section = document.getElementById('cat-' + category);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
