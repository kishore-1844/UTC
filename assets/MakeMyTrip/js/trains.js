    // Tab switching interactivity
    const serviceTabs = document.querySelectorAll('.service-tab-btn');
    serviceTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        serviceTabs.forEach(t => {
          t.className = 'service-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-md-medium text-body-md-medium transition-all';
        });
        btn.className = 'service-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-body-md-medium text-body-md-medium shadow-sm transition-all';
      });
    });

    // Swap Origin and Destination logic
    const swapBtn = document.getElementById('swap-stations-btn');
    const originText = document.getElementById('origin-station-text');
    const destText = document.getElementById('dest-station-text');

    if (swapBtn && originText && destText) {
      swapBtn.addEventListener('click', () => {
        const temp = originText.textContent;
        originText.textContent = destText.textContent;
        destText.textContent = temp;
      });
    }

    // Quick PNR Demo check
    function checkPNRDemo() {
      const pnrField = document.getElementById('pnr-input');
      if (!pnrField || !pnrField.value) {
        alert("Please enter a valid 10-digit Indian Railways PNR number to fetch real-time chart status.");
        return;
      }
      alert(`Fetching NTES status for PNR: ${pnrField.value}... Current Status: CONFIRMED (Coach B4, Seat 22, Lower Berth).`);
    }
  
