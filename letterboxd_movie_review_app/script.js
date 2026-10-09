const films=[
{id:"dune",title:"Dune: Part Two",year:2024,director:"Denis Villeneuve",genre:"Science Fiction",rating:"4.7",poster:"poster-dune"},
{id:"past",title:"Past Lives",year:2023,director:"Celine Song",genre:"Drama",rating:"4.5",poster:"poster-past"},
{id:"whip",title:"Whiplash",year:2014,director:"Damien Chazelle",genre:"Drama",rating:"4.6",poster:"poster-whip"},
{id:"spider",title:"Spider-Man: Into the Spider-Verse",year:2018,director:"Bob Persichetti",genre:"Animation",rating:"4.5",poster:"poster-spider"},
{id:"barbie",title:"Barbie",year:2023,director:"Greta Gerwig",genre:"Comedy",rating:"3.8",poster:"poster-barbie"},
{id:"parasite",title:"Parasite",year:2019,director:"Bong Joon Ho",genre:"Thriller",rating:"4.6",poster:"poster-parasite"},
{id:"godfather",title:"The Godfather",year:1972,director:"Francis Ford Coppola",genre:"Drama",rating:"4.7",poster:"poster-godfather"},
{id:"her",title:"Her",year:2013,director:"Spike Jonze",genre:"Drama",rating:"4.3",poster:"poster-her"}
];

function card(f){return `<a class="movie-card" href="film.html?id=${f.id}"><div class="poster ${f.poster}"></div><h3>${f.title}</h3><p>${f.year} · ${f.director}</p><div class="rating">★★★★★ <span>${f.rating}</span></div></a>`}
const trend=document.getElementById("trendingGrid");
if(trend) trend.innerHTML=films.slice(0,4).map(card).join("");
const all=document.getElementById("allFilms");
const filter=document.getElementById("genreFilter");
function renderFilms(){if(all){const g=filter.value;all.innerHTML=films.filter(f=>g==="all"||f.genre===g).map(card).join("")}}
if(all){renderFilms();filter.addEventListener("change",renderFilms)}

const params=new URLSearchParams(location.search);
const selected=films.find(f=>f.id===params.get("id"))||films[0];
const filmHero=document.getElementById("filmHero");
if(filmHero) filmHero.innerHTML=`<div class="film-info"><p class="eyebrow">${selected.genre.toUpperCase()}</p><h1>${selected.title}</h1><p class="film-meta">${selected.year} · ${selected.director} · ${selected.rating}/5 average rating</p><p>${selected.title} is a featured film in the FilmLog community. Log it, rate it and share your thoughts with other movie lovers.</p><div class="rating">★★★★★</div></div>`;

let chosenRating=0;
const stars=document.getElementById("stars");
if(stars){stars.addEventListener("click",()=>{chosenRating=chosenRating===5?0:chosenRating+1;stars.textContent="★".repeat(chosenRating)+"☆".repeat(5-chosenRating)})}
const logBtn=document.getElementById("logBtn");
if(logBtn) logBtn.addEventListener("click",()=>{document.getElementById("saveMessage").textContent=chosenRating?"Film logged with "+chosenRating+"/5 rating!":"Film logged to your diary!"});

const follow=document.getElementById("followBtn");
if(follow) follow.addEventListener("click",()=>{follow.textContent=follow.textContent==="Follow"?"Following":"Follow"});

const login=document.getElementById("loginForm");
if(login) login.addEventListener("submit",e=>{e.preventDefault();document.getElementById("loginMessage").textContent="Demo sign-in successful!";setTimeout(()=>location.href="index.html",700)});

const modal=document.getElementById("searchModal");
const searchBtn=document.getElementById("searchBtn");
const closeSearch=document.getElementById("closeSearch");
if(searchBtn&&modal){searchBtn.addEventListener("click",()=>modal.classList.remove("hidden"));closeSearch.addEventListener("click",()=>modal.classList.add("hidden"));modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")})}
const searchInput=document.getElementById("searchInput");
const searchResults=document.getElementById("searchResults");
if(searchInput) searchInput.addEventListener("input",()=>{const q=searchInput.value.toLowerCase();searchResults.innerHTML=films.filter(f=>(f.title+" "+f.genre+" "+f.year).toLowerCase().includes(q)).slice(0,5).map(f=>`<div class="search-result"><a href="film.html?id=${f.id}"><b>${f.title}</b> <span class="muted">${f.year} · ${f.genre}</span></a></div>`).join("")||"<p class='muted'>No films found.</p>"});
