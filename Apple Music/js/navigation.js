(function(){
  const links=[...document.querySelectorAll('aside nav a[data-path]')];
  const tabs=[...document.querySelectorAll('main[data-tab]')];
  const nav=links[0].closest('nav');
  const activeCls=nav.dataset.activeClasses.split(' ');
  const inactive=links.find(l=>!l.hasAttribute('aria-current'));
  const inactiveCls=inactive.className.split(' ');
  const activeFull=links.find(l=>l.hasAttribute('aria-current')).className.split(' ');
  function show(id){
    tabs.forEach(m=>{m.hidden=m.dataset.tab!==id;});
    links.forEach(l=>{
      const on=l.dataset.path===id;
      l.className=(on?activeFull:inactiveCls).join(' ');
      if(on) l.setAttribute('aria-current','page'); else l.removeAttribute('aria-current');
    });
    window.scrollTo(0,0);
    if(location.hash!=='#'+id) history.replaceState(null,'','#'+id);
  }
  links.forEach(l=>l.addEventListener('click',e=>{e.preventDefault();show(l.dataset.path);}));
  const start=location.hash.slice(1);
  show(tabs.some(m=>m.dataset.tab===start)?start:'listen-now');
})();
