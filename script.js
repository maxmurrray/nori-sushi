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

  // ── Draggable sushi pieces in landing image ──
  const pieces = document.querySelectorAll('.sushi-piece');
  const wrap = document.querySelector('.landing-image-wrap');

  pieces.forEach(piece => {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    const startDrag = (clientX, clientY) => {
      isDragging = true;
      piece.classList.add('dragging');
      const rect = piece.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      // Switch from % to px positioning relative to wrap
      piece.style.left = (rect.left - wrapRect.left) + 'px';
      piece.style.top = (rect.top - wrapRect.top) + 'px';
      piece.style.width = rect.width + 'px';
    };

    const moveDrag = (clientX, clientY) => {
      if (!isDragging) return;
      const wrapRect = wrap.getBoundingClientRect();
      piece.style.left = (clientX - wrapRect.left - offsetX) + 'px';
      piece.style.top = (clientY - wrapRect.top - offsetY) + 'px';
    };

    const endDrag = () => {
      isDragging = false;
      piece.classList.remove('dragging');
    };

    piece.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    piece.addEventListener('touchstart', (e) => {
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
