    // Smooth Horizontal Scroll Handler for Discovery Rails
    function scrollRow(rowId, offset) {
      const row = document.getElementById(rowId);
      if (row) {
        row.scrollBy({ left: offset, behavior: 'smooth' });
      }
    }

    // Dynamic Modal Handlers
    function openMediaModal(title, synopsis, rating, year, duration, maturity, genre, cast, audio) {
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-synopsis').textContent = synopsis;
      document.getElementById('modal-rating-badge').textContent = '★ ' + rating + ' RATING';
      document.getElementById('modal-year').textContent = year;
      document.getElementById('modal-duration').textContent = duration;
      document.getElementById('modal-maturity').textContent = maturity;
      document.getElementById('modal-genre').textContent = genre;
      document.getElementById('modal-cast').textContent = cast;
      
      const modal = document.getElementById('media-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeMediaModal() {
      const modal = document.getElementById('media-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    // Modal click-outside backdrop dismiss
    document.getElementById('media-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeMediaModal();
      }
    });

    // Toast Notifications
    function showToast(message, icon = 'check_circle') {
      const toast = document.getElementById('toast-notify');
      const toastMsg = document.getElementById('toast-msg');
      const toastIcon = document.getElementById('toast-icon');
      
      toastMsg.textContent = message;
      toastIcon.textContent = icon;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }

    // Watchlist Quick-Toggle Action
    function toggleWatchlist(btn, title) {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon.textContent === 'bookmark_add' || icon.textContent === 'bookmark') {
        icon.textContent = 'bookmark_added';
        btn.classList.add('text-primary');
        showToast(`Saved '${title}' to My List`, 'bookmark_added');
      } else {
        icon.textContent = 'bookmark';
        btn.classList.remove('text-primary');
        showToast(`Removed '${title}' from My List`, 'bookmark_remove');
      }
    }

    function toggleModalWatchlist(btn) {
      const icon = btn.querySelector('.material-symbols-outlined');
      const title = document.getElementById('modal-title').textContent;
      if (icon.textContent === 'bookmark_add') {
        icon.textContent = 'bookmark_added';
        btn.classList.add('text-primary');
        showToast(`Saved '${title}' to My List`, 'bookmark_added');
      } else {
        icon.textContent = 'bookmark_add';
        btn.classList.remove('text-primary');
        showToast(`Removed '${title}' from My List`, 'bookmark_remove');
      }
    }

    function toggleLike(btn) {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon.style.fontVariationSettings.includes("'FILL' 1")) {
        icon.style.fontVariationSettings = "'FILL' 0";
        btn.classList.remove('text-primary');
      } else {
        icon.style.fontVariationSettings = "'FILL' 1";
        btn.classList.add('text-primary');
        showToast('Feedback noted: We will recommend more like this', 'thumb_up');
      }
    }

    function simulatePlayback() {
      const title = document.getElementById('modal-title').textContent;
      closeMediaModal();
      showToast(`Initializing 4K Master stream for '${title}'...`, 'stream');
    }

    // Quick Genre Filter Pill Interactions
    function filterGenre(genre) {
      const pills = document.querySelectorAll('.genre-pill');
      pills.forEach(pill => {
        pill.classList.remove('bg-primary-container', 'text-on-primary-container');
        pill.classList.add('bg-surface-container', 'text-on-surface-variant');
      });

      const activeEventPill = window.event ? window.event.currentTarget : null;
      if (activeEventPill) {
        activeEventPill.classList.remove('bg-surface-container', 'text-on-surface-variant');
        activeEventPill.classList.add('bg-primary-container', 'text-on-primary-container');
      }

      showToast(`Showing titles filtered by: ${genre.toUpperCase()}`, 'filter_list');
    }
  

  // Comprehensive Movie Catalog Data
  const moviesCatalog = [
    {
      id: "m1",
      title: "The Neon Alchemist",
      year: "2024",
      genre: "Sci-Fi",
      rating: "9.2",
      popularity: 99,
      imageAlt: "Futuristic neon-drenched cityscape with an alchemist in glowing chrome goggles brewing luminous quantum formulas in rain, dark cinematic tone",
      synopsis: "In a decaying megacity run on synthetic neurotransmitters, an unlicensed bio-chemist unearths an organic formula that can rewrite human consciousness—making him the target of both sovereign mega-corps and augmented syndicate syndics.",
      cast: "Cillian Zhao, Tessa Miller, David Kaluuya"
    },
    {
      id: "m2",
      title: "Silent Echo",
      year: "2024",
      genre: "Thriller",
      rating: "8.9",
      popularity: 94,
      imageAlt: "Dark acoustic isolation chamber with intense moody amber spot lighting and sound visualizer waves on monolithic charcoal walls",
      synopsis: "A deaf cryptanalyst stationed in an arctic listening post detects an encrypted sonic broadcast originating from beneath three miles of sub-glacial bedrock.",
      cast: "Anya Taylor, Joel Kinnaman, Mads Mikkelsen"
    },
    {
      id: "m3",
      title: "Velocity Zero",
      year: "2023",
      genre: "Action",
      rating: "8.8",
      popularity: 91,
      imageAlt: "Hyper-speed hypercar racing through an abandoned salt flat at dusk with supersonic red vapor trails and heat mirages",
      synopsis: "When a zero-emission experimental kinetic engine is stolen, a dishonored tactical pilot has 18 hours across the Eurasian highway spine to intercept the courier.",
      cast: "Idris Elba, Michelle Rodriguez, Sung Kang"
    },
    {
      id: "m4",
      title: "The Architect's Dilemma",
      year: "2024",
      genre: "Drama",
      rating: "9.1",
      popularity: 96,
      imageAlt: "Brutalist glass and concrete sky-pavilion overlooking misty pine mountains under twilight with cold minimal architecture lighting",
      synopsis: "Commissioned to design an impenetrable subterranean fortress for the planet's wealthiest elite, an eccentric architect hides an inescapable flaw within the blueprints.",
      cast: "Jeremy Strong, Rebecca Ferguson, Alexander Skarsgard"
    },
    {
      id: "m5",
      title: "Crimson Peak: Dawn",
      year: "2023",
      genre: "Horror",
      rating: "8.6",
      popularity: 88,
      imageAlt: "Gothic snowy mountain peak under a blood red moon with fog rolling through ancient blackened stone ruins and dim lantern light",
      synopsis: "A high-altitude scientific expedition uncovers the petrified remains of a prehistoric entity that feeds on fear and collective memory.",
      cast: "Mia Goth, Willem Dafoe, Bill Skarsgard"
    },
    {
      id: "m6",
      title: "Quantum Drift",
      year: "2024",
      genre: "Sci-Fi",
      rating: "9.0",
      popularity: 95,
      imageAlt: "Cosmic space rift with swirling purple and golden relativistic matter bending light around a sleek titanium explorer ship",
      synopsis: "A rogue warp-drive test strand strands five astro-physicists in a fractured dimension where each choice spawns physical duplicates of their ship.",
      cast: "Oscar Isaac, Gemma Chan, Hiroyuki Sanada"
    },
    {
      id: "m7",
      title: "The Last Ronin",
      year: "2024",
      genre: "Action",
      rating: "9.3",
      popularity: 98,
      imageAlt: "Cyberpunk armored samurai standing on a neon rain soaked steel pagoda overlooking a futuristic metropolis skyline with electric katanas",
      synopsis: "In 2099 Neo-Kyoto, the last bio-mechanically enhanced honor guard undertakes a solitary vendetta against the autonomous AI tribunal that betrayed his master.",
      cast: "Ken Watanabe, Karen Fukuhara, Lewis Tan"
    },
    {
      id: "m8",
      title: "Interstellar Rift",
      year: "2023",
      genre: "Adventure",
      rating: "8.7",
      popularity: 89,
      imageAlt: "Deep space nebula showing an ancient colossal ring gate orbiting an alien gas giant planet with radiant violet atmospheric rings",
      synopsis: "Deep salvage operatives stumble upon a dormant wormhole beacon dating back three billion years, suddenly activating towards unknown galaxy clusters.",
      cast: "Pedro Pascal, Florence Pugh, Daniel Kaluuya"
    },
    {
      id: "m9",
      title: "Midnight Velocity",
      year: "2024",
      genre: "Action",
      rating: "8.5",
      popularity: 84,
      imageAlt: "Subway tunnel with high speed maglev train leaving light trails under red emergency lighting and sparks flying from rail tracks",
      synopsis: "A federal marshal trapped inside a runaway automated freight train must neutralize seven competing mercenary squads before it impacts the central station.",
      cast: "John Boyega, Karl Urban, Mary Elizabeth Winstead"
    },
    {
      id: "m10",
      title: "Ghost Protocol 7",
      year: "2023",
      genre: "Thriller",
      rating: "8.8",
      popularity: 90,
      imageAlt: "Overhead surveillance drone view of an illuminated European plaza in darkness with laser scopes and tactical shadows",
      synopsis: "A black-budget cyber espionage team discovers their own AI defense algorithm has initiated a preemptive blackout on global financial centers.",
      cast: "Michael Fassbender, Ana de Armas, Mark Strong"
    },
    {
      id: "m11",
      title: "Cyber Knight",
      year: "2024",
      genre: "Animation",
      rating: "8.9",
      popularity: 92,
      imageAlt: "Stylized animation frame of a chrome-plated knight in neo-gothic armor wielding a plasma blade against a mechanical dragon under acid rain",
      synopsis: "An animated epic where medieval legends are re-imagined in a retro-future kingdom where knights wield cold fusion armaments against self-replicating leviathans.",
      cast: "Steven Yeun, Hailee Steinfeld, Giancarlo Esposito"
    }
  ];

  // Active filter state
  let currentGenre = "All";
  let currentSearch = "";
  let currentSort = "popularity";

  // DOM Elements
  const gridContainer = document.getElementById("moviesGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const movieModal = document.getElementById("movieModal");

  // Initial render
  renderMovies();

  function renderMovies() {
    let filtered = moviesCatalog.filter(movie => {
      const matchGenre = currentGenre === "All" || movie.genre.toLowerCase() === currentGenre.toLowerCase();
      const matchSearch = movie.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                          movie.genre.toLowerCase().includes(currentSearch.toLowerCase());
      return matchGenre && matchSearch;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (currentSort === "popularity") return b.popularity - a.popularity;
      if (currentSort === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
      if (currentSort === "release") return parseInt(b.year) - parseInt(a.year);
      if (currentSort === "az") return a.title.localeCompare(b.title);
      return 0;
    });

    // Update Counter
    resultsCount.textContent = `Showing ${filtered.length} movie${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      gridContainer.innerHTML = "";
      emptyState.classList.remove("hidden");
      emptyState.classList.add("flex");
      return;
    }

    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");

    gridContainer.innerHTML = filtered.map(movie => `
      <div 
        class="group relative flex flex-col bg-surface-container rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-surface-container-high cursor-pointer"
        onclick="openMovieDetails('${escapeJsString(movie.title)}')">
        
        <!-- Poster Thumbnail (2:3 Aspect ratio container) -->
        <div class="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
          <img 
            src="placeholder" 
            data-alt="${escapeHtml(movie.imageAlt)}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt="${escapeHtml(movie.title)} poster"
          />
          
          <!-- Rating Spec Pill -->
          <div class="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <span>${movie.rating}</span>
          </div>

          <!-- Quality Badge -->
          <div class="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase">
            4K UHD
          </div>

          <!-- Hover Overlay with Actions -->
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-space-md">
            <div class="flex items-center gap-2 mb-2">
              <button 
                type="button" 
                onclick="event.stopPropagation(); playMovieAction('${escapeJsString(movie.title)}')"
                class="flex-1 flex items-center justify-center gap-1 py-1.5 rounded bg-on-primary-container text-surface-container-lowest font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                <span>Play</span>
              </button>
              
              <button 
                type="button" 
                onclick="event.stopPropagation(); toggleToast('Added &quot;${escapeJsString(movie.title)}&quot; to My List')"
                title="Add to My List"
                class="w-8 h-8 rounded bg-surface-container-high/90 text-on-surface hover:text-primary hover:bg-surface-container-highest flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Meta Details Section -->
        <div class="p-space-sm flex flex-col flex-1 justify-between gap-1">
          <div>
            <div class="flex items-center justify-between text-outline font-label-sm text-label-sm">
              <span>${movie.year}</span>
              <span class="text-on-surface-variant">${movie.genre}</span>
            </div>
            <h4 class="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate mt-0.5 group-hover:text-primary transition-colors">
              ${escapeHtml(movie.title)}
            </h4>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Genre Filter Handler
  function filterGenre(genre, btnElem) {
    currentGenre = genre;
    
    // Update button visual styles
    document.querySelectorAll(".genre-btn").forEach(btn => {
      btn.className = "genre-btn shrink-0 px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high";
    });

    if (btnElem) {
      btnElem.className = "genre-btn shrink-0 px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all bg-primary-container text-on-primary-container shadow-md";
    } else {
      // Find matching button if triggered programmatically
      const found = Array.from(document.querySelectorAll(".genre-btn")).find(b => b.textContent.trim().toLowerCase() === genre.toLowerCase());
      if (found) {
        found.className = "genre-btn shrink-0 px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all bg-primary-container text-on-primary-container shadow-md";
      }
    }

    renderMovies();
  }

  // Search Input Handler
  function handleMovieSearch(query) {
    currentSearch = query;
    renderMovies();
  }

  // Sort Dropdown Handler
  function handleSortChange(sortKey) {
    currentSort = sortKey;
    renderMovies();
  }

  // Reset Filters
  function resetFilters() {
    currentGenre = "All";
    currentSearch = "";
    currentSort = "popularity";
    document.getElementById("movieSearchInput").value = "";
    document.getElementById("sortSelect").value = "popularity";
    
    const allBtn = document.querySelector(".genre-btn");
    filterGenre('All', allBtn);
  }

  // Modal Open Handler
  function openMovieDetails(title) {
    const movie = moviesCatalog.find(m => m.title.toLowerCase() === title.toLowerCase()) || moviesCatalog[0];
    
    document.getElementById("modalTitle").textContent = movie.title;
    document.getElementById("modalYear").textContent = movie.year;
    document.getElementById("modalGenre").textContent = movie.genre;
    document.getElementById("modalRating").textContent = movie.rating;
    document.getElementById("modalSynopsis").textContent = movie.synopsis;
    document.getElementById("modalCast").textContent = movie.cast;

    const modalBg = document.getElementById("modalPosterBg");
    modalBg.style.backgroundImage = "url('placeholder')";
    modalBg.setAttribute("data-alt", movie.imageAlt);

    movieModal.classList.remove("hidden");
    movieModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  // Modal Close Handler
  function closeMovieModal() {
    movieModal.classList.add("hidden");
    movieModal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  // Close modal when clicking backdrop
  movieModal.addEventListener("click", function(e) {
    if (e.target === movieModal) {
      closeMovieModal();
    }
  });

  // Action feedback Toast
  let toastTimer = null;
  function toggleToast(message) {
    const toast = document.getElementById("toastNotification");
    const msgEl = document.getElementById("toastMessage");
    msgEl.textContent = message;

    clearTimeout(toastTimer);
    toast.classList.remove("translate-y-16", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    toastTimer = setTimeout(() => {
      toast.classList.add("translate-y-16", "opacity-0");
      toast.classList.remove("translate-y-0", "opacity-100");
    }, 2800);
  }

  function playMovieAction(title) {
    const targetTitle = title || document.getElementById("modalTitle").textContent;
    toggleToast(`Streaming "${targetTitle}" in Dolby Vision 4K...`);
  }

  // Escape helper for safe innerHTML injection
  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function escapeJsString(str) {
    return String(str).replace(/'/g, "\\'");
  }

  function scrollRail(id, distance) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollBy({ left: distance, behavior: 'smooth' });
    }
  }

  function filterGenre(genreName, btnElement) {
    document.querySelectorAll('.genre-pill').forEach(btn => {
      btn.classList.remove('bg-primary-container', 'text-on-primary-container');
      btn.classList.add('bg-surface-container', 'text-on-surface-variant');
    });
    btnElement.classList.add('bg-primary-container', 'text-on-primary-container');
    btnElement.classList.remove('bg-surface-container', 'text-on-surface-variant');
  }

  function toggleMyList(btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    const text = btn.querySelector('span:not(.material-symbols-outlined)');
    if (icon.innerText === 'add') {
      icon.innerText = 'check';
      btn.classList.add('bg-primary-container', 'text-on-primary-container');
      btn.classList.remove('bg-surface-container-high/80', 'text-on-surface');
      if (text) text.innerText = 'Added to My List';
    } else {
      icon.innerText = 'add';
      btn.classList.remove('bg-primary-container', 'text-on-primary-container');
      btn.classList.add('bg-surface-container-high/80', 'text-on-surface');
      if (text) text.innerText = 'Add to My List';
    }
  }

  function toggleCardList(btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    if (icon.innerText === 'add' || icon.innerText === 'bookmark_add') {
      icon.innerText = 'check';
      btn.classList.add('text-primary');
    } else {
      icon.innerText = 'add';
      btn.classList.remove('text-primary');
    }
  }

  function openSeriesModal(title, season, rating, age, genre, totalSeasons) {
    const modal = document.getElementById('seriesModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalRating').innerText = '⭐ ' + rating;
    document.getElementById('modalAge').innerText = age;
    document.getElementById('modalGenre').innerText = genre;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeSeriesModal() {
    const modal = document.getElementById('seriesModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function switchSeason(seasonNum) {
    const list = document.getElementById('episodesList');
    // Subtle visual change to indicate new episodes loaded
    list.style.opacity = '0.4';
    setTimeout(() => {
      list.style.opacity = '1';
    }, 150);
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSeriesModal();
    }
  });

  // Close modal when clicking outside box
  document.getElementById('seriesModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'seriesModal') {
      closeSeriesModal();
    }
  });

  (function initWatchlistInteractions() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.media-card');
    const removeButtons = document.querySelectorAll('.btn-remove-item');
    const clearBtn = document.getElementById('btn-clear-watchlist');
    const emptyState = document.getElementById('empty-state');
    const mediaGrid = document.getElementById('media-grid');
    const restoreBtn = document.getElementById('btn-restore-sample');

    function checkEmptyStatus() {
      const visibleCards = Array.from(cards).filter(c => !c.classList.contains('hidden') && c.style.display !== 'none');
      const totalNonDeleted = Array.from(cards).filter(c => !c.dataset.removed);
      if (totalNonDeleted.length === 0) {
        mediaGrid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
      } else {
        mediaGrid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
      }
    }

    // Filter Tab Switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('bg-primary-container', 'text-on-primary-container');
          t.classList.add('bg-surface-container-high', 'text-on-surface');
        });
        tab.classList.remove('bg-surface-container-high', 'text-on-surface');
        tab.classList.add('bg-primary-container', 'text-on-primary-container');

        const filter = tab.getAttribute('data-filter');

        cards.forEach(card => {
          if (card.dataset.removed) return;
          if (filter === 'all') {
            card.style.display = 'flex';
          } else if (filter === 'film') {
            card.style.display = card.getAttribute('data-category') === 'film' ? 'flex' : 'none';
          } else if (filter === 'series') {
            card.style.display = card.getAttribute('data-category') === 'series' ? 'flex' : 'none';
          } else if (filter === 'downloaded') {
            card.style.display = card.getAttribute('data-downloaded') === 'true' ? 'flex' : 'none';
          }
        });
        checkEmptyStatus();
      });
    });

    // Remove single item with fade
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.media-card');
        if (!card) return;
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
          card.dataset.removed = "true";
          checkEmptyStatus();
        }, 300);
      });
    });

    // Clear All Watchlist
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your entire watchlist?')) {
          cards.forEach(card => {
            card.dataset.removed = "true";
            card.style.display = 'none';
          });
          checkEmptyStatus();
        }
      });
    }

    // Restore library demo
    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => {
        cards.forEach(card => {
          delete card.dataset.removed;
          card.style.opacity = '1';
          card.style.transform = 'none';
          card.style.display = 'flex';
        });
        // reset tab to All
        const allTab = document.querySelector('[data-filter="all"]');
        if (allTab) allTab.click();
        checkEmptyStatus();
      });
    }

    // Sort select handler
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        const currentCards = Array.from(cards);
        if (value === 'title') {
          currentCards.sort((a, b) => {
            const tA = a.querySelector('h2').textContent.trim();
            const tB = b.querySelector('h2').textContent.trim();
            return tA.localeCompare(tB);
          });
          currentCards.forEach(c => mediaGrid.appendChild(c));
        }
      });
    }
  })();

(function(){
  const tabs = ["home","movies","tv","mylist"];
  function setActive(tab){
    if(!tabs.includes(tab)) tab="home";
    document.querySelectorAll(".spa-page").forEach(p => p.classList.toggle("active", p.id==="page-"+tab));
    document.querySelectorAll(".spa-nav-link").forEach(el => {
      el.classList.toggle("active", el.dataset.tab===tab);
    });
    window.scrollTo({top:0, behavior:"smooth"});
    history.replaceState(null,"","#"+tab);
  }
  document.addEventListener("click", function(e){
    const nav=e.target.closest("[data-tab]");
    if(nav){
      e.preventDefault();
      setActive(nav.dataset.tab);
    }
  });
  function init(){
    const hash=location.hash.replace("#","");
    setActive(tabs.includes(hash)?hash:"home");
    // Make logo/home links work
    document.querySelectorAll('[data-path="home"]').forEach(el=>{
      el.addEventListener("click", function(e){e.preventDefault();setActive("home");});
    });
  }
  window.addEventListener("hashchange", ()=>setActive(location.hash.replace("#","")));
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();
