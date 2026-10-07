    // Copy Promo Code function with tactile feedback
    function copyPromo(code, btn) {
      navigator.clipboard.writeText(code).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span><span>Copied!</span>';
        btn.classList.add('bg-primary-container', 'text-on-primary');
        
        // Trigger Toast
        const toast = document.getElementById('copyToast');
        const toastMsg = document.getElementById('toastMessage');
        toastMsg.textContent = 'Code "' + code + '" copied to clipboard!';
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('bg-primary-container', 'text-on-primary');
        }, 2000);

        setTimeout(() => {
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('translate-y-24', 'opacity-0');
        }, 2800);
      }).catch(err => {
        console.error('Could not copy', err);
      });
    }

    // Dynamic Filter Tabs Interaction
    const filterButtons = document.querySelectorAll('.filter-tab');
    const dealCards = document.querySelectorAll('.deal-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
          b.classList.add('bg-surface-container-low', 'text-secondary');
        });
        btn.classList.remove('bg-surface-container-low', 'text-secondary');
        btn.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');

        const cat = btn.getAttribute('data-cat');
        dealCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Real-time Search Filter
    const searchInput = document.getElementById('offerSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        dealCards.forEach(card => {
          const content = card.textContent.toLowerCase();
          if (content.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    // Savings Calculator Slider
    const spendSlider = document.getElementById('tripSpendSlider');
    const spendLabel = document.getElementById('spendLabel');
    const savingsLabel = document.getElementById('savingsLabel');

    if (spendSlider && spendLabel && savingsLabel) {
      spendSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        spendLabel.textContent = '$' + val.toLocaleString();
        const saved = Math.round(val * 0.25);
        savingsLabel.textContent = '$' + saved.toLocaleString();
      });
    }

    // FAQ Accordion Toggle
    function toggleFaq(button) {
      const content = button.nextElementSibling;
      const chevron = button.querySelector('.faq-chevron');
      const isHidden = content.classList.contains('hidden');

      // Close all first
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-chevron').forEach(ch => ch.classList.remove('rotate-180'));

      if (isHidden) {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      }
    }

    // Synchronized Countdown Timer Simulation
    let totalSeconds = 8 * 3600 + 42 * 60 + 19;
    function updateCountdown() {
      if (totalSeconds <= 0) totalSeconds = 48 * 3600;
      totalSeconds--;
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      
      const str = `${hours}h : ${minutes}m : ${seconds}s`;
      const cardTimer = document.getElementById('cardCountdown');
      const headerTimer = document.getElementById('headerTimer');
      if (cardTimer) cardTimer.textContent = str;
      if (headerTimer) headerTimer.textContent = 'Expires in ' + str;
    }
    setInterval(updateCountdown, 1000);
  
