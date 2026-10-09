/* Per-tab interactions. Each tab's original script only sees elements inside its own tab. */
function scopedDocument(root){
  return {
    getElementById:id=>root.querySelector('#'+CSS.escape(id)),
    querySelector:s=>root.querySelector(s),
    querySelectorAll:s=>root.querySelectorAll(s),
    addEventListener:(t,f)=>{ if(t==='DOMContentLoaded') f(); else document.addEventListener(t,f); }
  };
}
/* ---- home tab ---- */
(function(document){
(function() {
      // 1. Trending Categories Carousel Scrolling
      const track = document.getElementById('cat-track');
      const prevBtn = document.getElementById('cat-prev-btn');
      const nextBtn = document.getElementById('cat-next-btn');

      if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          track.scrollBy({ left: -260, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
          track.scrollBy({ left: 260, behavior: 'smooth' });
        });
      }

      // 2. Curated Arrivals Filter Switching
      const tabs = document.querySelectorAll('#filter-tabs button');
      const products = document.querySelectorAll('#arrivals-grid > div');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Reset styles
          tabs.forEach(t => {
            t.className = 'px-space-md py-2 font-label-caps text-label-caps uppercase tracking-wider bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer';
          });
          // Set active style
          tab.className = 'px-space-md py-2 font-label-caps text-label-caps uppercase tracking-wider bg-primary text-on-primary shadow-sm transition-colors cursor-pointer filter-tab-active';

          const filter = tab.getAttribute('data-filter');
          products.forEach(p => {
            const gender = p.getAttribute('data-gender');
            if (filter === 'all' || filter === 'trending' || gender === filter) {
              p.style.display = 'flex';
            } else {
              p.style.display = 'none';
            }
          });
        });
      });
    })();
})(scopedDocument(document.getElementById('tab-home')));
/* ---- catalog tab ---- */
(function(document){
// Simple micro-interactions for grid view toggling and wishlist visual update
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    const compactBtn = document.getElementById('view-compact-btn');
    const spaciousBtn = document.getElementById('view-spacious-btn');

    if (compactBtn && spaciousBtn && grid) {
      compactBtn.addEventListener('click', () => {
        grid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-space-sm md:gap-x-gutter-desktop gap-y-space-xl';
        compactBtn.classList.add('bg-surface', 'text-on-surface', 'shadow-xs');
        compactBtn.classList.remove('text-on-surface-variant');
        spaciousBtn.classList.remove('bg-surface', 'text-on-surface', 'shadow-xs');
        spaciousBtn.classList.add('text-on-surface-variant');
      });

      spaciousBtn.addEventListener('click', () => {
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-x-gutter-desktop gap-y-space-xl';
        spaciousBtn.classList.add('bg-surface', 'text-on-surface', 'shadow-xs');
        spaciousBtn.classList.remove('text-on-surface-variant');
        compactBtn.classList.remove('bg-surface', 'text-on-surface', 'shadow-xs');
        compactBtn.classList.add('text-on-surface-variant');
      });
    }

    // Toggle Wishlist micro-interaction
    const wishlistBtns = document.querySelectorAll('button[aria-label*="wishlist"]');
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
          const isFilled = icon.style.fontVariationSettings.includes("'FILL' 1");
          if (isFilled) {
            icon.style.fontVariationSettings = "'FILL' 0";
            btn.classList.remove('text-secondary');
            btn.classList.add('text-on-surface');
          } else {
            icon.style.fontVariationSettings = "'FILL' 1";
            btn.classList.add('text-secondary');
            btn.classList.remove('text-on-surface');
          }
        }
      });
    });

    // Swatch selection styling
    const swatches = document.querySelectorAll('article button[title]');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const parent = swatch.parentElement;
        if (parent) {
          parent.querySelectorAll('button').forEach(s => {
            s.classList.remove('ring-1', 'ring-offset-1', 'ring-primary', 'scale-110');
          });
          swatch.classList.add('ring-1', 'ring-offset-1', 'ring-primary', 'scale-110');
        }
      });
    });
  });
})(scopedDocument(document.getElementById('tab-catalog')));
/* ---- pdp tab ---- */
(function(document){
// Accordion Toggle
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.material-symbols-outlined');
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });

    // Color Swatches Selection
    const colorLabel = document.getElementById('selected-color-label');
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch-btn').forEach(b => {
          b.classList.remove('ring-2', 'ring-primary');
          b.classList.add('hover:ring-1', 'hover:ring-outline-variant');
        });
        btn.classList.add('ring-2', 'ring-primary');
        btn.classList.remove('hover:ring-1', 'hover:ring-outline-variant');
        if (colorLabel) {
          colorLabel.textContent = btn.getAttribute('data-color-name');
        }
      });
    });

    // Size Selection
    const sizeBtns = document.querySelectorAll('.size-btn');
    const sizeStatus = document.getElementById('size-status-msg');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary');
          b.classList.add('bg-surface-container-low', 'text-on-surface');
        });
        btn.classList.add('bg-primary', 'text-on-primary');
        btn.classList.remove('bg-surface-container-low', 'text-on-surface');
        
        const size = btn.getAttribute('data-size');
        if (size === 'XL') {
          sizeStatus.innerHTML = '<span class="w-2 h-2 rounded-full bg-secondary inline-block"></span> Only 2 pieces left in size Extra Large.';
        } else {
          sizeStatus.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span> Size ${size} is currently in stock ready to dispatch.`;
        }
      });
    });

    // Add To Bag Confirmation Feedback
    const addBagBtn = document.getElementById('add-bag-btn');
    const bagBtnText = document.getElementById('bag-btn-text');
    if (addBagBtn) {
      addBagBtn.addEventListener('click', () => {
        const originalText = bagBtnText.textContent;
        bagBtnText.textContent = 'Added to Shopping Bag ✓';
        addBagBtn.classList.add('bg-surface-container-highest', 'text-on-surface');
        addBagBtn.classList.remove('bg-primary', 'text-on-primary');
        
        setTimeout(() => {
          bagBtnText.textContent = originalText;
          addBagBtn.classList.remove('bg-surface-container-highest', 'text-on-surface');
          addBagBtn.classList.add('bg-primary', 'text-on-primary');
        }, 1800);
      });
    }

    // Wishlist Toggle
    const wishlistBtn = document.getElementById('wishlist-btn');
    const wishlistIcon = document.getElementById('wishlist-icon');
    const wishlistText = document.getElementById('wishlist-text');
    let isWishlisted = false;
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        isWishlisted = !isWishlisted;
        if (isWishlisted) {
          wishlistIcon.textContent = 'favorite';
          wishlistIcon.style.fontVariationSettings = "'FILL' 1";
          wishlistIcon.classList.add('text-secondary');
          wishlistText.textContent = 'Saved to Wishlist';
        } else {
          wishlistIcon.textContent = 'favorite_border';
          wishlistIcon.style.fontVariationSettings = "'FILL' 0";
          wishlistIcon.classList.remove('text-secondary');
          wishlistText.textContent = 'Save to Wishlist';
        }
      });
    }

    // Modal behavior (Size Guide & FitFinder)
    const modal = document.getElementById('pdp-modal');
    const modalClose = document.getElementById('pdp-modal-close');
    const modalConfirm = document.getElementById('modal-confirm-btn');
    const sizeGuideOpen = document.getElementById('size-guide-open');
    const fitFinderOpen = document.getElementById('fit-finder-open');

    function openModal() {
      if (modal) modal.classList.remove('hidden');
    }
    function closeModal() {
      if (modal) modal.classList.add('hidden');
    }

    if (sizeGuideOpen) sizeGuideOpen.addEventListener('click', openModal);
    if (fitFinderOpen) fitFinderOpen.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalConfirm) modalConfirm.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
})(scopedDocument(document.getElementById('tab-pdp')));
