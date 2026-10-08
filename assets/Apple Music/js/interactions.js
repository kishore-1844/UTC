/* from listen-now */
document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
/* from browse */
(function() {
    // Carousel interactive hint
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        nextBtn.classList.add('bg-primary-container', 'text-on-primary-container');
        setTimeout(() => {
          nextBtn.classList.remove('bg-primary-container', 'text-on-primary-container');
        }, 180);
      });
      prevBtn.addEventListener('click', () => {
        prevBtn.classList.add('bg-primary-container', 'text-on-primary-container');
        setTimeout(() => {
          prevBtn.classList.remove('bg-primary-container', 'text-on-primary-container');
        }, 180);
      });
    }
  })();
/* from library */
// Simple micro-interaction for toggleable favorite icons within library rows
  document.querySelectorAll('#library-track-list button[aria-label="Add to favorites"], #library-track-list button[aria-label="Favorited"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('.material-symbols-outlined');
      const isFavorited = btn.getAttribute('aria-label') === 'Favorited';
      if (isFavorited) {
        btn.setAttribute('aria-label', 'Add to favorites');
        btn.className = 'w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors';
        icon.style.fontVariationSettings = "'FILL' 0";
      } else {
        btn.setAttribute('aria-label', 'Favorited');
        btn.className = 'w-7 h-7 rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform';
        icon.style.fontVariationSettings = "'FILL' 1";
      }
    });
  });
