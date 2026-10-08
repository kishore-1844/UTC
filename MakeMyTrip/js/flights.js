  // Dynamic price slider readout micro-interaction
  const priceSlider = document.getElementById('price-range');
  const priceOutput = document.getElementById('price-output');
  if (priceSlider && priceOutput) {
    priceSlider.addEventListener('input', function(e) {
      priceOutput.textContent = '$' + Number(e.target.value).toLocaleString();
    });
  }

  // Mobile filter sidebar toggle
  const toggleBtn = document.getElementById('toggle-filter-mobile');
  const filterSidebar = document.getElementById('filter-sidebar');
  if (toggleBtn && filterSidebar) {
    toggleBtn.addEventListener('click', function() {
      filterSidebar.classList.toggle('hidden');
    });
  }
