/* CREX - behaviour moved unchanged from the inline <script> blocks of the original index.html */

function switchInnings(team) {
    const indContainer = document.getElementById('innings-india');
    const ausContainer = document.getElementById('innings-australia');
    const indBtn = document.getElementById('inn-btn-ind');
    const ausBtn = document.getElementById('inn-btn-aus');

    if (team === 'ind') {
      indContainer.classList.remove('hidden');
      indContainer.classList.add('flex');
      ausContainer.classList.add('hidden');
      ausContainer.classList.remove('flex');

      indBtn.className = "px-space-md py-2 rounded-lg font-label-md text-label-md bg-surface-container-highest text-on-surface font-bold transition-colors";
      ausBtn.className = "px-space-md py-2 rounded-lg font-label-md text-label-md text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-1.5";
    } else {
      ausContainer.classList.remove('hidden');
      ausContainer.classList.add('flex');
      indContainer.classList.add('hidden');
      indContainer.classList.remove('flex');

      ausBtn.className = "px-space-md py-2 rounded-lg font-label-md text-label-md bg-surface-container-highest text-on-surface font-bold transition-colors flex items-center gap-1.5";
      indBtn.className = "px-space-md py-2 rounded-lg font-label-md text-label-md text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors";
    }
  }

  function switchTab(tab) {
    const tabs = ['summary', 'scorecard', 'commentary', 'squads', 'points'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (btn) {
        if (t === tab) {
          btn.className = "px-space-md py-2 rounded-lg font-label-lg text-label-lg bg-primary-container text-on-primary-container transition-colors shadow-sm";
        } else {
          btn.className = "px-space-md py-2 rounded-lg font-label-lg text-label-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors";
        }
      }
    });
  }

document.addEventListener('DOMContentLoaded', () => {
      const searchInput = document.getElementById('playerSearchInput');
      const cards = document.querySelectorAll('.grid > .bg-surface-container');

      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const val = e.target.value.toLowerCase().trim();
          cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(val)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      }

      // Keyboard shortcut CMD+K
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          if (searchInput) searchInput.focus();
        }
      });
    });

document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (!id || id === '#') return;
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', id);
  }
});
