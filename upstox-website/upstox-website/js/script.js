// --- Home interactions ---

  // Simple micro-interaction for row selection highlight
  document.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('click', function() {
      document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('bg-surface-container-high/60'));
      this.classList.add('bg-surface-container-high/60');
    });
  });


// --- Trading Terminal interactions ---

  // Interactive Toggle for BUY / SELL Mode
  const btnBuy = document.getElementById('btn-buy');
  const btnSell = document.getElementById('btn-sell');
  const executeBtn = document.getElementById('execute-btn');
  const btnText = document.getElementById('btn-text');
  const qtyInput = document.getElementById('order-qty');
  const priceInput = document.getElementById('order-price');
  const marginReq = document.getElementById('margin-req');

  let currentSide = 'BUY';

  function updateTicketUI() {
    const qty = parseInt(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const totalMargin = (qty * price * 0.2).toFixed(2); // 20% margin for MIS/Delivery proxy

    marginReq.textContent = '₹' + Number(totalMargin).toLocaleString('en-IN', { minimumFractionDigits: 2 });

    if (currentSide === 'BUY') {
      btnBuy.className = "py-2.5 rounded-lg font-headline-md text-headline-md font-bold transition-all shadow-md bg-secondary-container text-on-secondary-container flex items-center justify-center gap-1.5";
      btnSell.className = "py-2.5 rounded-lg font-headline-md text-headline-md font-bold transition-all text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1.5";
      
      executeBtn.className = "w-full py-3.5 px-4 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-headline-md text-headline-md font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 group";
      btnText.textContent = `BUY ${qty} RELIANCE @ ₹${price.toFixed(2)}`;
    } else {
      btnSell.className = "py-2.5 rounded-lg font-headline-md text-headline-md font-bold transition-all shadow-md bg-primary-container text-on-primary-container flex items-center justify-center gap-1.5";
      btnBuy.className = "py-2.5 rounded-lg font-headline-md text-headline-md font-bold transition-all text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1.5";
      
      executeBtn.className = "w-full py-3.5 px-4 rounded-xl bg-primary-container hover:bg-on-primary-fixed text-on-primary-container font-headline-md text-headline-md font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 group";
      btnText.textContent = `SELL ${qty} RELIANCE @ ₹${price.toFixed(2)}`;
    }
  }

  btnBuy.addEventListener('click', () => {
    currentSide = 'BUY';
    updateTicketUI();
  });

  btnSell.addEventListener('click', () => {
    currentSide = 'SELL';
    updateTicketUI();
  });

  qtyInput.addEventListener('input', updateTicketUI);
  priceInput.addEventListener('input', updateTicketUI);

  // Micro-interaction on execute button
  executeBtn.addEventListener('click', () => {
    const originalText = btnText.textContent;
    btnText.textContent = "ORDER TRANSMITTED ✓";
    executeBtn.classList.add('scale-[0.98]');
    setTimeout(() => {
      btnText.textContent = originalText;
      executeBtn.classList.remove('scale-[0.98]');
    }, 1200);
  });


// --- Portfolio & Holdings interactions ---

  // Simple Toggle interaction for the allocation drawer on smaller / responsive viewports
  const toggleBtn = document.getElementById('toggle-analytics-btn');
  const allocPanel = document.getElementById('allocation-panel');
  if (toggleBtn && allocPanel) {
    toggleBtn.addEventListener('click', () => {
      allocPanel.classList.toggle('hidden');
      if (allocPanel.classList.contains('hidden')) {
        toggleBtn.classList.remove('bg-surface-container-high');
        toggleBtn.classList.add('bg-surface-container');
      } else {
        toggleBtn.classList.add('bg-surface-container-high');
        toggleBtn.classList.remove('bg-surface-container');
      }
    });
  }

// --- Logo: use the bundled copy if the hosted PulseTRX logo cannot be loaded ---
document.querySelectorAll('img[alt="PulseTRX Logo"]').forEach(img => {
  img.addEventListener('error', () => {
    if (!img.dataset.fallback) { img.dataset.fallback = '1'; img.src = 'assets/images/logo.svg'; }
  });
});
