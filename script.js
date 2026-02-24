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

  // ── Draggable sushi pieces ──
  const sushis = document.querySelectorAll('.sushi-drag');

  sushis.forEach(sushi => {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    const startDrag = (clientX, clientY) => {
      isDragging = true;
      sushi.classList.add('dragging');
      const rect = sushi.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      sushi.style.left = rect.left + 'px';
      sushi.style.top = rect.top + 'px';
      sushi.style.right = 'auto';
    };

    const moveDrag = (clientX, clientY) => {
      if (!isDragging) return;
      sushi.style.left = (clientX - offsetX) + 'px';
      sushi.style.top = (clientY - offsetY) + 'px';
    };

    const endDrag = () => {
      isDragging = false;
      sushi.classList.remove('dragging');
    };

    sushi.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    sushi.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        e.preventDefault();
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  });

});
