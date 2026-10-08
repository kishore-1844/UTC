    function toggleMapModal() {
      const modal = document.getElementById('mapModal');
      if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    }

    function resetFilters() {
      const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
      checkboxes.forEach(cb => cb.checked = false);
      const range = document.querySelector('aside input[type="range"]');
      if (range) {
        range.value = 1500;
        document.getElementById('priceDisplay').innerText = '$100 – $1,500+';
      }
    }

    // Toggle Amenity Filter Active Pills
    document.querySelectorAll('.amenity-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        this.classList.toggle('bg-primary-container');
        this.classList.toggle('text-on-primary');
        this.classList.toggle('bg-surface-container');
        this.classList.toggle('text-on-surface');
      });
    });
  
