const products=[
{id:1,name:'Zinger Burger',cat:'Burgers',price:199,desc:'Crispy chicken fillet, fresh lettuce and signature sauce.',img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80'},
{id:2,name:'Chicken Bucket',cat:'Buckets',price:649,desc:'A sharing bucket packed with crispy chicken favourites.',img:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80'},
{id:3,name:'Hot & Crispy Chicken',cat:'Chicken',price:299,desc:'Golden, crunchy chicken with a delicious spicy kick.',img:'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=700&q=80'},
{id:4,name:'Chicken Popcorn',cat:'Snacks',price:179,desc:'Bite-sized crispy chicken pieces, perfect for snacking.',img:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80'},
{id:5,name:'Family Feast',cat:'Combos',price:899,desc:'A generous combo made for the whole family.',img:'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=700&q=80'},
{id:6,name:'Chicken Rice Bowl',cat:'Combos',price:249,desc:'Tender chicken, seasoned rice and fresh sides.',img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80'},
{id:7,name:'French Fries',cat:'Snacks',price:99,desc:'Crispy golden fries with just the right seasoning.',img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80'},
{id:8,name:'Pepsi',cat:'Beverages',price:79,desc:'Chilled fizzy cola to complete your meal.',img:'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=700&q=80'}
];
let cart=JSON.parse(localStorage.getItem('kfcCart')||'[]');let currentCat='All';
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
function money(n){return '₹'+n.toLocaleString('en-IN')}
function productCard(p){return `<article class="product"><div class="product-img" style="background-image:url('${p.img}')"></div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart(${p.id})">+ Add</button></div></div></article>`}
function renderHome(){ $('#homeProducts').innerHTML=products.slice(0,4).map(productCard).join('') }
function renderMenu(){let list=currentCat==='All'?products:products.filter(p=>p.cat===currentCat);$('#menuProducts').innerHTML=list.map(productCard).join('')}
function renderCats(){let cats=['All',...new Set(products.map(p=>p.cat))];$('#categories').innerHTML=cats.map(c=>`<button class="category ${c===currentCat?'active':''}" onclick="setCategory('${c}')">${c}</button>`).join('')}
function setCategory(c){currentCat=c;renderCats();renderMenu()}
function addToCart(id){let found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({id,qty:1});save();toast('Added to your cart');}
function changeQty(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save();toast('Item removed')}
function save(){localStorage.setItem('kfcCart',JSON.stringify(cart));renderCart();updateCount()}
function updateCount(){let n=cart.reduce((a,x)=>a+x.qty,0);$('#cartCount').textContent=n;$('#menuCartCount').textContent=n}
function renderCart(){let el=$('#cartList');if(!cart.length){el.innerHTML='<div class="empty"><h2>Your cart is empty</h2><p>Add some KFC favourites from the menu.</p><button class="btn primary" data-tab="menu">Browse Menu</button></div>';bindTabs();$('#subtotal').textContent='₹0';$('#total').textContent='₹40';return}el.innerHTML=cart.map(x=>{let p=products.find(p=>p.id===x.id);return `<div class="cart-item"><div class="cart-img" style="background-image:url('${p.img}')"></div><div><h3>${p.name}</h3><p>${p.desc}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div><button class="remove" onclick="removeItem(${p.id})">Remove</button></div><b class="item-price">${money(p.price*x.qty)}</b></div>`}).join('');let sub=cart.reduce((a,x)=>a+products.find(p=>p.id===x.id).price*x.qty,0);$('#subtotal').textContent=money(sub);$('#total').textContent=money(sub+(sub?40:40));bindTabs()}
function showTab(tab){$$('.page').forEach(p=>p.classList.remove('active-page'));$('#'+tab).classList.add('active-page');$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));window.scrollTo({top:0,behavior:'smooth'});$('#mobileMenu').previousElementSibling.classList.remove('open');if(tab==='cart')renderCart()}
function bindTabs(){$$('[data-tab]').forEach(b=>{b.onclick=()=>showTab(b.dataset.tab)})}
function toast(msg){let t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1800)}
$('#mobileMenu').onclick=()=>$('#mobileMenu').previousElementSibling.classList.toggle('open');$('#placeOrder').onclick=()=>{if(!cart.length){toast('Your cart is empty');return}toast('Order placed successfully!');cart=[];save();showTab('profile')};
renderHome();renderCats();renderMenu();renderCart();updateCount();bindTabs();
