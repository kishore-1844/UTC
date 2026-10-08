    const tabLower = document.getElementById('tab-lower');
    const tabUpper = document.getElementById('tab-upper');
    if (tabLower && tabUpper) {
      tabLower.addEventListener('click', () => {
        tabLower.className = "px-space-md py-1 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm";
        tabUpper.className = "px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors";
      });
      tabUpper.addEventListener('click', () => {
        tabUpper.className = "px-space-md py-1 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm";
        tabLower.className = "px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors";
      });
    }
  
