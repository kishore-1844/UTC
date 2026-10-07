import { Category, Product, Review, Deal, UserProfile, Address, Order, CartItem, AdminStats } from '../src/types/index.ts';

// Initial Categories
export const initialCategories: Category[] = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics', description: 'Audio, smart devices, computing and high-fidelity tech', icon: 'Headphones', imageUrl: '/src/assets/images/category_electronics_1791222493395.jpg', displayOrder: 1 },
  { id: 'mobiles', name: 'Mobiles', slug: 'mobiles', description: 'Latest flagship smartphones, foldable devices and 5G gadgets', icon: 'Smartphone', imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg', displayOrder: 2 },
  { id: 'fashion', name: 'Fashion', slug: 'fashion', description: 'Curated Indian ethnic wear, contemporary streetwear and footwear', icon: 'Shirt', imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg', displayOrder: 3 },
  { id: 'home-kitchen', name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Smart kitchen appliances, cookware and modern home essentials', icon: 'Home', imageUrl: '/src/assets/images/category_home_kitchen_1791222516162.jpg', displayOrder: 4 },
  { id: 'beauty', name: 'Beauty', slug: 'beauty', description: 'Ayurvedic formulations, dermatological skincare and luxury fragrances', icon: 'Sparkles', imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg', displayOrder: 5 },
  { id: 'sports', name: 'Sports & Fitness', slug: 'sports', description: 'Cricket gear, yoga accessories, weights and performance athletic wear', icon: 'Activity', imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg', displayOrder: 6 },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Handcrafted leather goods, chronographs, eyewear and travel essentials', icon: 'Watch', imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg', displayOrder: 7 },
  { id: 'grocery', name: 'Gourmet & Grocery', slug: 'grocery', description: 'Kashmiri saffron, cold-pressed oils, premium dry fruits and artisanal coffee', icon: 'ShoppingBag', imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg', displayOrder: 8 }
];

// Initial 32 Products across 8 Categories
export const initialProducts: Product[] = [
  // Electronics
  {
    id: 'prod-el-1',
    categoryId: 'electronics',
    categoryName: 'Electronics',
    name: 'Nova Studio Wireless ANC Headphones',
    slug: 'nova-studio-wireless-anc-headphones',
    brand: 'Nova Acoustics',
    description: 'Flagship over-ear wireless headphones with active noise cancellation, 40mm beryllium drivers, LDAC high-res audio, and 45-hour battery life.',
    price: 8999,
    mrp: 14999,
    discount: 40,
    stock: 28,
    rating: 4.8,
    reviewCount: 412,
    imageUrl: '/src/assets/images/category_electronics_1791222493395.jpg',
    isFeatured: true,
    isDeal: true,
    specifications: { 'Driver Size': '40mm Beryllium', 'Battery Life': '45 Hours', 'Noise Cancellation': 'Hybrid ANC up to 42dB', 'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-el-2',
    categoryId: 'electronics',
    categoryName: 'Electronics',
    name: 'EchoBeat 360 Portable Bluetooth Speaker',
    slug: 'echobeat-360-portable-bluetooth-speaker',
    brand: 'EchoBeat',
    description: 'IP67 waterproof outdoor speaker featuring dual passive radiators, 24W punchy bass, party stereo sync, and 20 hours playtime.',
    price: 2999,
    mrp: 4999,
    discount: 40,
    stock: 54,
    rating: 4.6,
    reviewCount: 285,
    imageUrl: '/src/assets/images/category_electronics_1791222493395.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Output': '24W RMS', 'Water Resistance': 'IP67 Rated', 'Playtime': '20 Hours', 'Charging': 'USB-C Fast Charge' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-el-3',
    categoryId: 'electronics',
    categoryName: 'Electronics',
    name: 'Vortex RGB Mechanical Gaming Keyboard',
    slug: 'vortex-rgb-mechanical-gaming-keyboard',
    brand: 'Vortex',
    description: 'Hot-swappable custom red switches, CNC aircraft-grade aluminium top plate, PBT double-shot keycaps, and per-key RGB backlighting.',
    price: 4499,
    mrp: 6999,
    discount: 36,
    stock: 18,
    rating: 4.7,
    reviewCount: 198,
    imageUrl: '/src/assets/images/category_electronics_1791222493395.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Switch Type': 'Hot-Swappable Linear Red', 'Layout': 'Tenkeyless (87 Keys)', 'Cable': 'Detachable Braided USB-C' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-el-4',
    categoryId: 'electronics',
    categoryName: 'Electronics',
    name: 'Aura 55-inch 4K Ultra HD Smart QLED TV',
    slug: 'aura-55-inch-4k-qled-tv',
    brand: 'Aura Vision',
    description: 'Quantum dot display with Dolby Vision HDR10+, 120Hz refresh rate, Google TV OS, and built-in 40W soundbar with Dolby Atmos.',
    price: 39999,
    mrp: 59999,
    discount: 33,
    stock: 12,
    rating: 4.9,
    reviewCount: 530,
    imageUrl: '/src/assets/images/category_electronics_1791222493395.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Resolution': '4K UHD (3840 x 2160)', 'Refresh Rate': '120Hz Native', 'Audio': '40W Dolby Atmos', 'OS': 'Google TV' },
    createdAt: new Date().toISOString()
  },

  // Mobiles
  {
    id: 'prod-mob-1',
    categoryId: 'mobiles',
    categoryName: 'Mobiles',
    name: 'Nova Pro 5G Smartphone (12GB RAM, 256GB)',
    slug: 'nova-pro-5g-smartphone',
    brand: 'Nova Mobile',
    description: 'Flagship Snapdragon 8 Gen 3 chipset, 6.7-inch 1.5K 120Hz AMOLED display, 50MP Sony LYT-808 OIS primary camera, 100W SuperVOOC charge.',
    price: 34999,
    mrp: 42999,
    discount: 19,
    stock: 35,
    rating: 4.8,
    reviewCount: 620,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: true,
    specifications: { 'Processor': 'Snapdragon 8 Gen 3', 'RAM / Storage': '12GB LPDDR5X / 256GB UFS 4.0', 'Camera': '50MP + 50MP + 64MP Telephoto', 'Battery': '5400mAh (100W Charger in Box)' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-mob-2',
    categoryId: 'mobiles',
    categoryName: 'Mobiles',
    name: 'Aero Z Fold 5G Dual Screen Phone',
    slug: 'aero-z-fold-5g-phone',
    brand: 'Aero Tech',
    description: 'Revolutionary zero-gap titanium hinge, 7.8-inch foldable dynamic LTPO panel, triple 50MP Hasselblad camera system, and stylus support.',
    price: 89999,
    mrp: 119999,
    discount: 25,
    stock: 8,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Inner Display': '7.82-inch 2K LTPO3 120Hz', 'Cover Screen': '6.31-inch OLED 120Hz', 'Frame': 'Grade 5 Aerospace Titanium' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-mob-3',
    categoryId: 'mobiles',
    categoryName: 'Mobiles',
    name: 'Pixelis Prime 5G (8GB RAM, 128GB)',
    slug: 'pixelis-prime-5g',
    brand: 'Pixelis',
    description: 'Clean Android experience with 5 years of OS updates, computational photography AI, 5000mAh battery, and IP68 dust and water resistance.',
    price: 24999,
    mrp: 29999,
    discount: 17,
    stock: 42,
    rating: 4.6,
    reviewCount: 389,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: false,
    specifications: { 'Display': '6.4-inch FHD+ 90Hz OLED', 'Camera': '50MP GN2 Main + 12MP Ultra-wide', 'Security': 'Titan M2 Chip' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-mob-4',
    categoryId: 'mobiles',
    categoryName: 'Mobiles',
    name: 'Apex Lite 5G Budget Gaming Phone',
    slug: 'apex-lite-5g-budget-gaming-phone',
    brand: 'Apex Mobile',
    description: 'Dimensity 7200 processor with vapor chamber cooling, 120Hz smooth display, dual stereo speakers, and 67W fast charging brick included.',
    price: 15999,
    mrp: 19999,
    discount: 20,
    stock: 60,
    rating: 4.5,
    reviewCount: 510,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Processor': 'MediaTek Dimensity 7200 Ultra', 'Display': '6.67-inch FHD+ 120Hz AMOLED', 'Fast Charging': '67W Turbo Charge' },
    createdAt: new Date().toISOString()
  },

  // Fashion
  {
    id: 'prod-fas-1',
    categoryId: 'fashion',
    categoryName: 'Fashion',
    name: 'Hand-Spun Pure Khadi Cotton Kurta Set',
    slug: 'hand-spun-pure-khadi-cotton-kurta-set',
    brand: 'Virasat Heritage',
    description: 'Artisanal handwoven cotton kurta with mandarin collar, paired with tailored breathable churidar pyjama. Perfect for festive and formal Indian occasions.',
    price: 2499,
    mrp: 4499,
    discount: 44,
    stock: 25,
    rating: 4.7,
    reviewCount: 310,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: true,
    isDeal: true,
    specifications: { 'Fabric': '100% Handloom Khadi Cotton', 'Pattern': 'Solid with subtle weave texture', 'Fit': 'Regular Comfort Fit', 'Care': 'Gentle Hand Wash' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-fas-2',
    categoryId: 'fashion',
    categoryName: 'Fashion',
    name: 'Raw Selvedge Denim Trucker Jacket',
    slug: 'raw-selvedge-denim-trucker-jacket',
    brand: 'Indigo & Co.',
    description: '14oz Japanese selvedge denim, antique brass rivets, custom felled seams, designed to develop a distinct personalized fading pattern over years.',
    price: 4299,
    mrp: 6999,
    discount: 39,
    stock: 15,
    rating: 4.8,
    reviewCount: 145,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Denim Weight': '14 oz Heavyweight Selvedge', 'Color': 'Deep Indigo Raw', 'Hardware': 'Solid Brass Shank Buttons' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-fas-3',
    categoryId: 'fashion',
    categoryName: 'Fashion',
    name: 'Handcrafted Full-Grain Leather Oxford Shoes',
    slug: 'handcrafted-leather-oxford-shoes',
    brand: 'Regal Craft',
    description: 'Blake-stitched construction with genuine Argentine leather uppers, cushioned cork footbed, and Goodyear rubber protective heel tap.',
    price: 3899,
    mrp: 5999,
    discount: 35,
    stock: 20,
    rating: 4.9,
    reviewCount: 184,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: false,
    isDeal: false,
    specifications: { 'Upper': 'Argentine Full-Grain Cowhide', 'Sole': 'Channel-Stitched Leather with Rubber Pad', 'Lining': 'Breathable Soft Calfskin' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-fas-4',
    categoryId: 'fashion',
    categoryName: 'Fashion',
    name: 'Breezy French Linen Casual Shirt',
    slug: 'breezy-french-linen-casual-shirt',
    brand: 'Coastline Studio',
    description: 'Pre-washed 100% Normandy flax linen shirt, tailored relaxed fit, mother-of-pearl buttons, moisture-wicking and ultra-soft feel in summer heat.',
    price: 1899,
    mrp: 2999,
    discount: 37,
    stock: 38,
    rating: 4.5,
    reviewCount: 220,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Material': '100% Normandy Flax Linen', 'Collar': 'Casual Spread Collar', 'Sleeve': 'Long Sleeve with Roll-Up Tab' },
    createdAt: new Date().toISOString()
  },

  // Home & Kitchen
  {
    id: 'prod-hk-1',
    categoryId: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    name: 'CrispAir Digital Smart Air Fryer 5.5L',
    slug: 'crispair-digital-smart-air-fryer-55l',
    brand: 'Nova Home',
    description: '360 rapid air circulation technology, 8 one-touch presets, ceramic non-stick basket, and mobile Wi-Fi app recipe integration.',
    price: 4999,
    mrp: 8999,
    discount: 44,
    stock: 30,
    rating: 4.8,
    reviewCount: 480,
    imageUrl: '/src/assets/images/category_home_kitchen_1791222516162.jpg',
    isFeatured: true,
    isDeal: true,
    specifications: { 'Capacity': '5.5 Litres', 'Wattage': '1700W Rapid Heating', 'Coating': 'PTFE/PFOA-Free Ceramic', 'Presets': '8 Pre-Programmed Modes' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-hk-2',
    categoryId: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    name: 'Enameled Cast Iron Dutch Oven (4.2L)',
    slug: 'enameled-cast-iron-dutch-oven',
    brand: 'Artisan Cookware',
    description: 'Heavyweight cast iron for superior heat retention and uniform braising, glossy porcelain enamel interior, oven-safe up to 260°C.',
    price: 3299,
    mrp: 5499,
    discount: 40,
    stock: 18,
    rating: 4.9,
    reviewCount: 215,
    imageUrl: '/src/assets/images/category_home_kitchen_1791222516162.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Capacity': '4.2 Litres', 'Compatibility': 'Gas, Induction, Ceramic, Oven Safe', 'Lid': 'Self-Basting Condensation Bumps' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-hk-3',
    categoryId: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    name: 'PurePress Cold Press Masticating Juicer',
    slug: 'purepress-cold-press-juicer',
    brand: 'Vitality Kitchen',
    description: 'Slow 50 RPM masticating auger yields up to 90% juice with minimal oxidation, preserves delicate nutrients and enzymes, whisper-quiet motor.',
    price: 6499,
    mrp: 9999,
    discount: 35,
    stock: 14,
    rating: 4.7,
    reviewCount: 162,
    imageUrl: '/src/assets/images/category_home_kitchen_1791222516162.jpg',
    isFeatured: false,
    isDeal: false,
    specifications: { 'Speed': '50 RPM Slow Mastication', 'Feed Chute': '80mm Wide Mouth', 'Pulp Ejection': 'Automatic Continuous' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-hk-4',
    categoryId: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    name: 'Ceramic Ultrasonic Aroma Mist Diffuser',
    slug: 'ceramic-ultrasonic-aroma-diffuser',
    brand: 'ScentCraft',
    description: 'Handmade fluted ceramic cover, 300ml water tank with ambient warm amber night light, auto shut-off, and whisper-quiet ultrasonic atomization.',
    price: 1499,
    mrp: 2499,
    discount: 40,
    stock: 45,
    rating: 4.6,
    reviewCount: 290,
    imageUrl: '/src/assets/images/category_home_kitchen_1791222516162.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Tank Capacity': '300 ml', 'Mist Coverage': 'Up to 350 sq.ft.', 'Timer Modes': '1H / 3H / 6H / Continuous' },
    createdAt: new Date().toISOString()
  },

  // Beauty
  {
    id: 'prod-bt-1',
    categoryId: 'beauty',
    categoryName: 'Beauty',
    name: 'Kumkumadi Ayurvedic Miracle Face Oil (30ml)',
    slug: 'kumkumadi-ayurvedic-miracle-face-oil',
    brand: 'Veda Naturals',
    description: 'Authentic blend of pure Kashmiri saffron, sandalwood, and 26 precious Himalayan herbs. Clinically proven to brighten complexion and diminish pigmentation.',
    price: 1699,
    mrp: 2499,
    discount: 32,
    stock: 50,
    rating: 4.9,
    reviewCount: 610,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: true,
    specifications: { 'Key Actives': 'Pure Kashmiri Mongra Saffron, Red Sandalwood', 'Skin Type': 'All Skin Types', 'Cruelty Free': '100% Certified Organic' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-bt-2',
    categoryId: 'beauty',
    categoryName: 'Beauty',
    name: 'Niacinamide 10% + Zinc 1% Clarifying Serum',
    slug: 'niacinamide-10-zinc-1-clarifying-serum',
    brand: 'DermaNova',
    description: 'Oil-free dermatological formula that visibly balances sebum activity, shrinks enlarged pores, and strengthens damaged skin barrier.',
    price: 599,
    mrp: 899,
    discount: 33,
    stock: 80,
    rating: 4.7,
    reviewCount: 920,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: false,
    specifications: { 'Formulation': 'Water-Based Fast Absorb Serum', 'Volume': '30 ml Bottle', 'Fragrance': 'Fragrance-Free, Non-Comedogenic' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-bt-3',
    categoryId: 'beauty',
    categoryName: 'Beauty',
    name: 'Oakmoss & Amber Luxury Eau de Parfum (100ml)',
    slug: 'oakmoss-amber-luxury-eau-de-parfum',
    brand: 'Maison Noir',
    description: 'Artisanal unisex perfume with opening notes of Italian bergamot, heart of smoked cedarwood and nutmeg, settling into deep earthy oakmoss.',
    price: 2799,
    mrp: 4500,
    discount: 38,
    stock: 22,
    rating: 4.8,
    reviewCount: 175,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Concentration': 'Eau de Parfum (22% Fragrance Oil)', 'Longevity': '10-12 Hours', 'Top Notes': 'Calabrian Bergamot, Pink Peppercorn' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-bt-4',
    categoryId: 'beauty',
    categoryName: 'Beauty',
    name: 'Matte Velvet Weightless Lip Trio',
    slug: 'matte-velvet-weightless-lip-trio',
    brand: 'Velour Luxe',
    description: 'Set of 3 flattering Indian nude shades formulated with Vitamin E and shea butter. 12-hour transfer-proof comfort wear without feathering.',
    price: 999,
    mrp: 1599,
    discount: 38,
    stock: 65,
    rating: 4.5,
    reviewCount: 340,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Set Contents': '3 x 4ml Liquid Lipsticks', 'Finish': 'Powder Soft Matte', 'Wear Time': '12 Hours Transfer-Proof' },
    createdAt: new Date().toISOString()
  },

  // Sports & Fitness
  {
    id: 'prod-sp-1',
    categoryId: 'sports',
    categoryName: 'Sports & Fitness',
    name: 'Masterstroke English Willow Cricket Bat',
    slug: 'masterstroke-english-willow-cricket-bat',
    brand: 'SS Willow',
    description: 'Grade 1 air-dried English willow with massive sweet spot, thick edges, semi-oval Sarawak cane handle for supreme shock absorption.',
    price: 8499,
    mrp: 12999,
    discount: 35,
    stock: 12,
    rating: 4.9,
    reviewCount: 210,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Grade': 'Grade 1 Selected English Willow', 'Weight': '1180 - 1220 grams', 'Grain Count': '7 - 10 Clear Straight Grains' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-sp-2',
    categoryId: 'sports',
    categoryName: 'Sports & Fitness',
    name: 'ProAlign Eco-Friendly Natural Rubber Yoga Mat',
    slug: 'proalign-natural-rubber-yoga-mat',
    brand: 'Yogika',
    description: '6mm high-density biodegradable natural tree rubber with laser-etched posture alignment system, non-slip sweat grip, and carrying strap.',
    price: 1899,
    mrp: 2999,
    discount: 37,
    stock: 34,
    rating: 4.8,
    reviewCount: 320,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Dimensions': '183cm x 68cm x 6mm', 'Material': '100% Tree Rubber + Polyurethane Top', 'Weight': '2.6 kg' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-sp-3',
    categoryId: 'sports',
    categoryName: 'Sports & Fitness',
    name: 'QuickSelect Adjustable Dumbbell Set (2.5 - 24kg)',
    slug: 'quickselect-adjustable-dumbbell-set',
    brand: 'IronCore Fitness',
    description: 'Dial-turn weight selector replaces 15 sets of dumbbells in a single compact footprint. Heavy-duty cast iron molding with ergonomic knurled grip.',
    price: 12999,
    mrp: 18999,
    discount: 32,
    stock: 8,
    rating: 4.9,
    reviewCount: 115,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Weight Range': '2.5 kg to 24 kg per unit', 'Increments': '15 settings', 'Locking': 'Steel Safety Interlock' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-sp-4',
    categoryId: 'sports',
    categoryName: 'Sports & Fitness',
    name: 'AeroStrobe Lightweight Carbon Running Shoes',
    slug: 'aerostrobe-lightweight-running-shoes',
    brand: 'AeroStride',
    description: 'Embedded carbon propulsion plate, nitrogen-infused supercritical foam midsole, and engineered jacquard mesh upper for half-marathon speed.',
    price: 3499,
    mrp: 5499,
    discount: 36,
    stock: 28,
    rating: 4.6,
    reviewCount: 245,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Heel Drop': '8mm', 'Cushioning': 'Supercritical Foam + Full Carbon Plate', 'Weight': '215 grams (Size 9)' },
    createdAt: new Date().toISOString()
  },

  // Accessories
  {
    id: 'prod-acc-1',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    name: 'Vintage Top-Grain Leather Bifold Wallet',
    slug: 'vintage-top-grain-leather-bifold-wallet',
    brand: 'Hidesign Artisans',
    description: 'Vegetable-tanned full-grain leather with RFID blocking foil lining, 8 card slots, dual currency divider, and coin pocket.',
    price: 1199,
    mrp: 1999,
    discount: 40,
    stock: 45,
    rating: 4.7,
    reviewCount: 430,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Leather': 'Vegetable-Tanned Buffalo Leather', 'RFID Protection': '13.56 MHz High Frequency Shield', 'Dimensions': '11.5cm x 9cm' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-acc-2',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    name: 'Nova Chrono Heritage Sapphire Watch',
    slug: 'nova-chrono-heritage-sapphire-watch',
    brand: 'Nova Horology',
    description: '316L stainless steel case, anti-reflective sapphire crystal glass, Japanese quartz chronograph movement, and quick-release Milanese mesh strap.',
    price: 4999,
    mrp: 7999,
    discount: 38,
    stock: 16,
    rating: 4.8,
    reviewCount: 190,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Case Diameter': '40mm', 'Glass': 'Scratch-Proof Sapphire Glass', 'Water Resistance': '5 ATM / 50 Metres' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-acc-3',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    name: 'Polarized Aviator Sunglasses (UV400)',
    slug: 'polarized-aviator-sunglasses',
    brand: 'RayVista',
    description: 'Ultra-lightweight titanium alloy frame with scratch-resistant TAC polarized glass lenses, zero distortion glare reduction, and leather case.',
    price: 1499,
    mrp: 2499,
    discount: 40,
    stock: 52,
    rating: 4.6,
    reviewCount: 280,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Lens Tech': 'Triacetate Cellulose 9-Layer Polarized', 'UV Protection': 'UV400 100% UVA/UVB Block', 'Frame Material': 'Beta-Titanium' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-acc-4',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    name: 'Hand-Forged Minimalist Brass Cuff Bracelet',
    slug: 'hand-forged-minimalist-brass-cuff-bracelet',
    brand: 'Studio Dhatu',
    description: 'Solid raw brass cuff with subtle brushed satin finish, hammered end caps, adjustable fit for wrists, developing a rich vintage patina.',
    price: 799,
    mrp: 1299,
    discount: 38,
    stock: 30,
    rating: 4.5,
    reviewCount: 140,
    imageUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    isFeatured: false,
    isDeal: false,
    specifications: { 'Material': 'Solid Virgin Naval Brass', 'Width': '6mm Profile', 'Fit': 'Malleable Semi-Rigid Open Cuff' },
    createdAt: new Date().toISOString()
  },

  // Gourmet & Grocery
  {
    id: 'prod-gr-1',
    categoryId: 'grocery',
    categoryName: 'Gourmet & Grocery',
    name: 'GI-Certified Grade A Kashmiri Mongra Saffron (2g)',
    slug: 'kashmiri-mongra-saffron-2g',
    brand: 'Zaffran Valley',
    description: 'Highest grade all-red stigmas hand-picked from the historic fields of Pampore, Kashmir. Renowned for intense crimson colour, aroma and purity.',
    price: 949,
    mrp: 1499,
    discount: 37,
    stock: 60,
    rating: 4.9,
    reviewCount: 580,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: true,
    specifications: { 'Origin': 'Pampore, Jammu & Kashmir', 'Grade': 'Mongra Grade A++ (Zero Yellow Style)', 'Packaging': 'Airtight Brass Sealed Jar' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-gr-2',
    categoryId: 'grocery',
    categoryName: 'Gourmet & Grocery',
    name: 'Cold-Pressed Organic Kachi Ghani Mustard Oil (2L)',
    slug: 'cold-pressed-organic-mustard-oil-2l',
    brand: 'Shuddh Farms',
    description: 'Extracted using traditional wooden kohlu below 40°C to preserve natural pungency, essential fatty acids, and authentic desi mustard flavour.',
    price: 499,
    mrp: 699,
    discount: 29,
    stock: 45,
    rating: 4.7,
    reviewCount: 390,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: false,
    specifications: { 'Extraction': 'Wood Cold-Pressed (Kohlu)', 'Purity': '100% Unrefined Mustard Seed', 'Volume': '2 Litres Canister' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-gr-3',
    categoryId: 'grocery',
    categoryName: 'Gourmet & Grocery',
    name: 'Jumbo Royal Cashews W180 Grade (500g)',
    slug: 'jumbo-royal-cashews-w180-500g',
    brand: 'NutriBliss',
    description: 'Largest size king cashew nuts sourced from coastal Goa, naturally sweet, crunch-roasted with a touch of Himalayan pink salt.',
    price: 799,
    mrp: 1199,
    discount: 33,
    stock: 40,
    rating: 4.8,
    reviewCount: 310,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: false,
    isDeal: true,
    specifications: { 'Grade': 'W-180 King Size Jumbo', 'Origin': 'Goa, India', 'Net Weight': '500 grams Pouch with Zip Lock' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-gr-4',
    categoryId: 'grocery',
    categoryName: 'Gourmet & Grocery',
    name: 'Single-Origin Coorg Arabica Coffee Beans (250g)',
    slug: 'single-origin-coorg-arabica-coffee-beans',
    brand: 'Western Ghats Roasters',
    description: 'Medium-dark roast harvested at 3800ft elevation under silver oak shade canopy. Tasting notes of dark chocolate, toasted almond and wild honey.',
    price: 449,
    mrp: 650,
    discount: 31,
    stock: 35,
    rating: 4.8,
    reviewCount: 225,
    imageUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    isFeatured: true,
    isDeal: false,
    specifications: { 'Elevation': '3800 ft (Coorg, Karnataka)', 'Roast Profile': 'Medium-Dark City Roast', 'Tasting Notes': 'Dark Cocoa, Candied Nut, Caramel' },
    createdAt: new Date().toISOString()
  }
];

// Initial Deals
export const initialDeals: Deal[] = [
  {
    id: 'deal-mega-saver',
    title: 'Super Saver Mega Sale',
    description: 'Up to 50% Off on flagship electronics, audio gear and smartphones',
    discountPercentage: 50,
    bannerUrl: '/src/assets/images/hero_nova_cart_1791222479966.jpg',
    validUntil: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    isActive: true
  },
  {
    id: 'deal-festive-fashion',
    title: 'Festive Ethnic & Streetwear Bonanza',
    description: 'Flat 40% Off on pure handloom Khadi kurtas, selvedge denim and jackets',
    discountPercentage: 40,
    bannerUrl: '/src/assets/images/category_fashion_1791222504133.jpg',
    validUntil: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    isActive: true
  },
  {
    id: 'deal-kitchen-upgrade',
    title: 'Modern Kitchen Refresh',
    description: 'Extra ₹500 off on digital air fryers, cast iron Dutch ovens and cold press juicers',
    discountPercentage: 35,
    bannerUrl: '/src/assets/images/category_home_kitchen_1791222516162.jpg',
    validUntil: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    isActive: true
  }
];

// Seed initial users
export const initialUsers: UserProfile[] = [
  {
    id: 'user-customer-1',
    email: 'customer@novacart.in',
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    role: 'customer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-admin-1',
    email: 'admin@novacart.in',
    fullName: 'Priya Patel (Nova Admin)',
    phone: '+91 98123 45678',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    createdAt: new Date().toISOString()
  }
];

// Seed initial Addresses for Rahul
export const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    userId: 'user-customer-1',
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    streetAddress: 'Flat 402, Green Glen Layout, Bellandur',
    locality: 'Outer Ring Road, Near EcoSpace',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103',
    isDefault: true,
    addressType: 'home'
  },
  {
    id: 'addr-2',
    userId: 'user-customer-1',
    fullName: 'Rahul Sharma (Office)',
    phone: '+91 98765 43210',
    streetAddress: 'Tower B, 6th Floor, Embassy Tech Village',
    locality: 'Devarabisanahalli',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103',
    isDefault: false,
    addressType: 'work'
  }
];

// Seed initial Reviews
export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-el-1',
    userId: 'user-customer-1',
    userName: 'Rahul S.',
    rating: 5,
    comment: 'Exceptional sound stage and the active noise cancelling rivals headphones twice the price. The battery lasts through my entire work week.',
    verifiedPurchase: true,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'rev-2',
    productId: 'prod-el-1',
    userId: 'user-customer-2',
    userName: 'Ananya V.',
    rating: 5,
    comment: 'Supreme comfort on long flights. Pairing with both laptop and phone works flawlessly.',
    verifiedPurchase: true,
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'rev-3',
    productId: 'prod-fas-1',
    userId: 'user-customer-1',
    userName: 'Rahul S.',
    rating: 5,
    comment: 'Authentic pure Khadi texture, breathable and fits nicely. Received many compliments at the Diwali party.',
    verifiedPurchase: true,
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString()
  }
];

// Seed initial Orders
export const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'NC-2026-98124',
    userId: 'user-customer-1',
    userEmail: 'customer@novacart.in',
    shippingAddress: initialAddresses[0],
    paymentMethod: 'razorpay',
    paymentStatus: 'completed',
    orderStatus: 'delivered',
    items: [
      {
        id: 'ord-item-1',
        orderId: 'ord-1001',
        productId: 'prod-fas-1',
        productName: 'Hand-Spun Pure Khadi Cotton Kurta Set',
        productImage: '/src/assets/images/category_fashion_1791222504133.jpg',
        quantity: 1,
        price: 2499,
        total: 2499
      }
    ],
    subtotal: 2499,
    discount: 2000,
    couponDiscount: 0,
    deliveryCharge: 0,
    total: 2499,
    trackingId: 'DELHIVERY-981238472',
    createdAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    estimatedDeliveryDate: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString()
  }
];

// Database Engine with In-Memory State
class DatabaseStore {
  public categories: Category[] = [...initialCategories];
  public products: Product[] = [...initialProducts];
  public deals: Deal[] = [...initialDeals];
  public users: UserProfile[] = [...initialUsers];
  public addresses: Address[] = [...initialAddresses];
  public reviews: Review[] = [...initialReviews];
  public orders: Order[] = [...initialOrders];
  public cartItemsByUser: Record<string, CartItem[]> = {
    'user-customer-1': [
      {
        id: 'cart-init-1',
        productId: 'prod-el-1',
        product: initialProducts[0],
        quantity: 1,
        priceAtAddition: initialProducts[0].price
      }
    ]
  };
  public wishlistByUser: Record<string, string[]> = {
    'user-customer-1': ['prod-mob-1', 'prod-hk-1']
  };

  // Products
  getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sort?: string;
    isDeal?: boolean;
    featured?: boolean;
  }): Product[] {
    let result = [...this.products];

    if (params?.category && params.category !== 'all') {
      result = result.filter(p => p.categoryId.toLowerCase() === params.category!.toLowerCase());
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
      );
    }

    if (params?.minPrice !== undefined) {
      result = result.filter(p => p.price >= params.minPrice!);
    }

    if (params?.maxPrice !== undefined) {
      result = result.filter(p => p.price <= params.maxPrice!);
    }

    if (params?.minRating !== undefined && params.minRating > 0) {
      result = result.filter(p => p.rating >= params.minRating!);
    }

    if (params?.isDeal) {
      result = result.filter(p => p.isDeal);
    }

    if (params?.featured) {
      result = result.filter(p => p.isFeatured);
    }

    // Sorting
    if (params?.sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (params?.sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (params?.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params?.sort === 'discount') {
      result.sort((a, b) => b.discount - a.discount);
    } else {
      // Default: featured / popularity
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  createProduct(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const category = this.categories.find(c => c.id === data.categoryId);
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      categoryName: category?.name || 'General',
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    return this.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    return this.products.length < initialLen;
  }

  // Cart operations
  getCart(userId: string) {
    const items = this.cartItemsByUser[userId] || [];
    // Ensure product data is up-to-date with current stock and price
    const enrichedItems = items.map(item => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product: product || item.product,
        priceAtAddition: product ? product.price : item.priceAtAddition
      };
    });

    const subtotal = enrichedItems.reduce((sum, item) => sum + (item.priceAtAddition * item.quantity), 0);
    const totalMrp = enrichedItems.reduce((sum, item) => sum + ((item.product?.mrp || item.priceAtAddition) * item.quantity), 0);
    const discount = Math.max(0, totalMrp - subtotal);
    const deliveryCharge = subtotal === 0 || subtotal >= 999 ? 0 : 79;
    const total = subtotal + deliveryCharge;

    return {
      items: enrichedItems,
      itemCount: enrichedItems.reduce((acc, i) => acc + i.quantity, 0),
      subtotal,
      discount,
      couponDiscount: 0,
      deliveryCharge,
      total
    };
  }

  addToCart(userId: string, productId: string, quantity: number = 1): { success: boolean; message: string; cart?: any } {
    const product = this.getProductById(productId);
    if (!product) return { success: false, message: 'Product not found' };
    if (product.stock < quantity) return { success: false, message: `Only ${product.stock} units available in stock` };

    if (!this.cartItemsByUser[userId]) {
      this.cartItemsByUser[userId] = [];
    }

    const existingIdx = this.cartItemsByUser[userId].findIndex(item => item.productId === productId);
    if (existingIdx > -1) {
      const newQty = this.cartItemsByUser[userId][existingIdx].quantity + quantity;
      if (newQty > product.stock) {
        return { success: false, message: `Cannot add more than ${product.stock} items to cart` };
      }
      this.cartItemsByUser[userId][existingIdx].quantity = newQty;
    } else {
      this.cartItemsByUser[userId].push({
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId,
        product,
        quantity,
        priceAtAddition: product.price
      });
    }

    return { success: true, message: 'Item added to cart', cart: this.getCart(userId) };
  }

  updateCartItemQty(userId: string, itemId: string, quantity: number) {
    if (!this.cartItemsByUser[userId]) return { success: false, message: 'Cart is empty' };

    const idx = this.cartItemsByUser[userId].findIndex(item => item.id === itemId);
    if (idx === -1) return { success: false, message: 'Item not found in cart' };

    if (quantity <= 0) {
      this.cartItemsByUser[userId].splice(idx, 1);
      return { success: true, message: 'Item removed from cart', cart: this.getCart(userId) };
    }

    const item = this.cartItemsByUser[userId][idx];
    const product = this.getProductById(item.productId);
    if (product && quantity > product.stock) {
      return { success: false, message: `Only ${product.stock} units in stock` };
    }

    this.cartItemsByUser[userId][idx].quantity = quantity;
    return { success: true, message: 'Cart updated', cart: this.getCart(userId) };
  }

  removeCartItem(userId: string, itemId: string) {
    if (!this.cartItemsByUser[userId]) return { success: false, message: 'Cart not found' };
    this.cartItemsByUser[userId] = this.cartItemsByUser[userId].filter(item => item.id !== itemId);
    return { success: true, message: 'Item removed', cart: this.getCart(userId) };
  }

  clearCart(userId: string) {
    this.cartItemsByUser[userId] = [];
    return { success: true, cart: this.getCart(userId) };
  }

  // Wishlist operations
  getWishlist(userId: string): Product[] {
    const productIds = this.wishlistByUser[userId] || [];
    return productIds.map(id => this.getProductById(id)).filter(Boolean) as Product[];
  }

  toggleWishlist(userId: string, productId: string): { inWishlist: boolean; wishlist: Product[] } {
    if (!this.wishlistByUser[userId]) {
      this.wishlistByUser[userId] = [];
    }

    const idx = this.wishlistByUser[userId].indexOf(productId);
    let inWishlist = false;

    if (idx > -1) {
      this.wishlistByUser[userId].splice(idx, 1);
      inWishlist = false;
    } else {
      this.wishlistByUser[userId].push(productId);
      inWishlist = true;
    }

    return { inWishlist, wishlist: this.getWishlist(userId) };
  }

  // Orders
  createOrder(userId: string, orderData: {
    address: Address;
    paymentMethod: 'cod' | 'razorpay' | 'upi';
    couponCode?: string;
  }): { success: boolean; message?: string; order?: Order } {
    const user = this.users.find(u => u.id === userId);
    if (!user) return { success: false, message: 'User not found' };

    const cart = this.getCart(userId);
    if (!cart.items || cart.items.length === 0) {
      return { success: false, message: 'Your cart is empty' };
    }

    // Validate stock and prepare order items
    for (const item of cart.items) {
      const product = this.getProductById(item.productId);
      if (!product || product.stock < item.quantity) {
        return { success: false, message: `Product "${item.product.name}" is out of stock or insufficient quantity` };
      }
    }

    // Decrement stock
    for (const item of cart.items) {
      const product = this.getProductById(item.productId);
      if (product) {
        product.stock -= item.quantity;
      }
    }

    // Coupon calculation
    let couponDiscount = 0;
    if (orderData.couponCode === 'NOVA10') {
      couponDiscount = Math.round(cart.subtotal * 0.1);
    } else if (orderData.couponCode === 'SUPER500' && cart.subtotal >= 2000) {
      couponDiscount = 500;
    }

    const finalSubtotal = cart.subtotal;
    const finalDeliveryCharge = (finalSubtotal - couponDiscount) >= 999 ? 0 : 79;
    const finalTotal = Math.max(0, finalSubtotal - couponDiscount + finalDeliveryCharge);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `NC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      userId,
      userEmail: user.email,
      shippingAddress: orderData.address,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'completed',
      orderStatus: 'processing',
      items: cart.items.map(i => ({
        id: `ord-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        orderId: `ord-${Date.now()}`,
        productId: i.productId,
        productName: i.product.name,
        productImage: i.product.imageUrl,
        quantity: i.quantity,
        price: i.priceAtAddition,
        total: i.priceAtAddition * i.quantity
      })),
      subtotal: finalSubtotal,
      discount: cart.discount,
      couponDiscount,
      deliveryCharge: finalDeliveryCharge,
      total: finalTotal,
      trackingId: `DELHIVERY-${Math.floor(100000000 + Math.random() * 900000000)}`,
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString()
    };

    this.orders.unshift(newOrder);

    // Clear cart after order creation
    this.clearCart(userId);

    return { success: true, order: newOrder };
  }

  getUserOrders(userId: string): Order[] {
    return this.orders.filter(o => o.userId === userId);
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id || o.orderNumber === id);
  }

  updateOrderStatus(orderId: string, status: Order['orderStatus']): Order | null {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return null;
    order.orderStatus = status;
    return order;
  }

  // Addresses
  getAddresses(userId: string): Address[] {
    return this.addresses.filter(a => a.userId === userId);
  }

  saveAddress(userId: string, data: Omit<Address, 'id' | 'userId'>): Address {
    if (data.isDefault) {
      this.addresses.forEach(a => {
        if (a.userId === userId) a.isDefault = false;
      });
    }

    const newAddress: Address = {
      ...data,
      id: `addr-${Date.now()}`,
      userId
    };
    this.addresses.push(newAddress);
    return newAddress;
  }

  deleteAddress(userId: string, addressId: string): boolean {
    const initialLen = this.addresses.length;
    this.addresses = this.addresses.filter(a => !(a.id === addressId && a.userId === userId));
    return this.addresses.length < initialLen;
  }

  // Reviews
  getProductReviews(productId: string): Review[] {
    return this.reviews.filter(r => r.productId === productId);
  }

  addReview(productId: string, userId: string, userName: string, rating: number, comment: string): Review {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userId,
      userName,
      rating,
      comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString()
    };
    this.reviews.unshift(newReview);

    // Recalculate product rating
    const prodReviews = this.getProductReviews(productId);
    const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    const prod = this.getProductById(productId);
    if (prod) {
      prod.rating = Number(avgRating.toFixed(1));
      prod.reviewCount = prodReviews.length;
    }

    return newReview;
  }

  // Admin Stats
  getAdminStats(): AdminStats {
    const totalRevenue = this.orders.reduce((sum, o) => o.paymentStatus === 'completed' || o.orderStatus === 'delivered' ? sum + o.total : sum, 0);
    const pendingOrdersCount = this.orders.filter(o => o.orderStatus === 'processing' || o.orderStatus === 'confirmed').length;
    const lowStockCount = this.products.filter(p => p.stock <= 15).length;

    return {
      totalRevenue,
      totalOrders: this.orders.length,
      totalCustomers: this.users.filter(u => u.role === 'customer').length,
      totalProducts: this.products.length,
      pendingOrdersCount,
      lowStockCount,
      recentOrders: this.orders.slice(0, 8)
    };
  }
}

export const db = new DatabaseStore();
