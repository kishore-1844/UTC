(function(){
  /* pages the header/footer links lead to */
  var TAB_OF={home:'home',women:'catalog',bag:'bag'};
  /* which top-nav item looks active on each page (as in the original screens) */
  var NAV_ACTIVE={home:'home',catalog:'women',pdp:'women',bag:null};
  var tabs=Array.prototype.slice.call(document.querySelectorAll('main[data-tab]'));
  var navLinks=Array.prototype.slice.call(document.querySelectorAll('header nav[data-active-classes] a[data-path]'));
  var idle={}, activeFull='';
  navLinks.forEach(function(l){ if(l.hasAttribute('aria-current')) activeFull=l.className; else idle[l.dataset.path]=l.className; });
  idle.home=idle.women; /* Home link has the same idle look as Women */
  function show(id){
    tabs.forEach(function(m){ m.hidden=m.dataset.tab!==id; });
    var act=NAV_ACTIVE[id];
    navLinks.forEach(function(l){
      var p=l.dataset.path;
      if(p===act){ l.className=activeFull; l.setAttribute('aria-current','page'); }
      else { l.className=idle[p]; l.removeAttribute('aria-current'); }
    });
    window.scrollTo(0,0);
    if(location.hash!=='#'+id) history.replaceState(null,'','#'+id);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-path]');
    if(a && TAB_OF[a.dataset.path]){ e.preventDefault(); show(TAB_OF[a.dataset.path]); return; }
    /* clicking a product card in the catalog opens the product detail page */
    var card=e.target.closest('main[data-tab="catalog"] article');
    if(card && !e.target.closest('button')){ e.preventDefault(); show('pdp'); }
  });
  var start=location.hash.slice(1);
  show(tabs.some(function(m){return m.dataset.tab===start;})?start:'home');
})();
