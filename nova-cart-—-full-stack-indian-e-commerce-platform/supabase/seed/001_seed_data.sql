-- NOVA CART Seed Data
-- 8 Categories, 30+ Realistic Indian E-Commerce Products with INR Pricing, MRP, Discounts & Reviews

-- 1. Seed Categories
INSERT INTO categories (id, name, slug, description, icon, display_order) VALUES
('electronics', 'Electronics', 'electronics', 'Audio, smart devices, computing and high-fidelity tech', 'Headphones', 1),
('mobiles', 'Mobiles', 'mobiles', 'Latest flagship smartphones, foldable devices and 5G gadgets', 'Smartphone', 2),
('fashion', 'Fashion', 'fashion', 'Curated Indian ethnic wear, contemporary streetwear and footwear', 'Shirt', 3),
('home-kitchen', 'Home & Kitchen', 'home-kitchen', 'Smart kitchen appliances, cookware and modern home essentials', 'Home', 4),
('beauty', 'Beauty', 'beauty', 'Ayurvedic formulations, dermatological skincare and luxury fragrances', 'Sparkles', 5),
('sports', 'Sports & Fitness', 'sports', 'Cricket gear, yoga accessories, weights and performance athletic wear', 'Activity', 6),
('accessories', 'Accessories', 'accessories', 'Handcrafted leather goods, chronographs, eyewear and travel essentials', 'Watch', 7),
('grocery', 'Gourmet & Grocery', 'grocery', 'Kashmiri saffron, cold-pressed oils, premium dry fruits and artisanal coffee', 'ShoppingBag', 8)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Products (32 Products across 8 Categories)
INSERT INTO products (id, category_id, name, slug, brand, description, price, mrp, discount, stock, rating, review_count, image_url, is_featured, is_deal) VALUES
-- Electronics
('prod-el-1', 'electronics', 'Nova Studio Wireless ANC Headphones', 'nova-studio-wireless-anc-headphones', 'Nova Acoustics', 'Flagship over-ear wireless headphones with active noise cancellation, 40mm beryllium drivers, LDAC high-res audio, and 45-hour battery life.', 8999, 14999, 40, 28, 4.8, 412, '/src/assets/images/category_electronics_1791222493395.jpg', true, true),
('prod-el-2', 'electronics', 'EchoBeat 360 Portable Bluetooth Speaker', 'echobeat-360-portable-bluetooth-speaker', 'EchoBeat', 'IP67 waterproof outdoor speaker featuring dual passive radiators, 24W punchy bass, party stereo sync, and 20 hours playtime.', 2999, 4999, 40, 54, 4.6, 285, '/src/assets/images/category_electronics_1791222493395.jpg', false, true),
('prod-el-3', 'electronics', 'Vortex RGB Mechanical Gaming Keyboard', 'vortex-rgb-mechanical-gaming-keyboard', 'Vortex', 'Hot-swappable custom red switches, CNC aircraft-grade aluminium top plate, PBT double-shot keycaps, and per-key RGB backlighting.', 4499, 6999, 36, 18, 4.7, 198, '/src/assets/images/category_electronics_1791222493395.jpg', true, false),
('prod-el-4', 'electronics', 'Aura 55-inch 4K Ultra HD Smart QLED TV', 'aura-55-inch-4k-qled-tv', 'Aura Vision', 'Quantum dot display with Dolby Vision HDR10+, 120Hz refresh rate, Google TV OS, and built-in 40W soundbar with Dolby Atmos.', 39999, 59999, 33, 12, 4.9, 530, '/src/assets/images/category_electronics_1791222493395.jpg', true, false),

-- Mobiles
('prod-mob-1', 'mobiles', 'Nova Pro 5G Smartphone (12GB RAM, 256GB)', 'nova-pro-5g-smartphone', 'Nova Mobile', 'Flagship Snapdragon 8 Gen 3 chipset, 6.7-inch 1.5K 120Hz AMOLED display, 50MP Sony LYT-808 OIS primary camera, 100W SuperVOOC charge.', 34999, 42999, 19, 35, 4.8, 620, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, true),
('prod-mob-2', 'mobiles', 'Aero Z Fold 5G Dual Screen Phone', 'aero-z-fold-5g-phone', 'Aero Tech', 'Revolutionary zero-gap titanium hinge, 7.8-inch foldable dynamic LTPO panel, triple 50MP Hasselblad camera system, and S-Pen support.', 89999, 119999, 25, 8, 4.9, 142, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, false),
('prod-mob-3', 'mobiles', 'Pixelis Prime 5G (8GB RAM, 128GB)', 'pixelis-prime-5g', 'Pixelis', 'Clean Android experience with 5 years of OS updates, computational photography AI, 5000mAh battery, and IP68 dust and water resistance.', 24999, 29999, 17, 42, 4.6, 389, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, false),
('prod-mob-4', 'mobiles', 'Apex Lite 5G Budget Gaming Phone', 'apex-lite-5g-budget-gaming-phone', 'Apex Mobile', 'Dimensity 7200 processor with vapor chamber cooling, 120Hz smooth display, dual stereo speakers, and 67W fast charging brick included.', 15999, 19999, 20, 60, 4.5, 510, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, true),

-- Fashion
('prod-fas-1', 'fashion', 'Hand-Spun Pure Khadi Cotton Kurta Set', 'hand-spun-pure-khadi-cotton-kurta-set', 'Virasat Heritage', 'Artisanal handwoven cotton kurta with mandarin collar, paired with tailored breathable churidar pyjama. Perfect for festive and formal Indian occasions.', 2499, 4499, 44, 25, 4.7, 310, '/src/assets/images/category_fashion_1791222504133.jpg', true, true),
('prod-fas-2', 'fashion', 'Raw Selvedge Denim Trucker Jacket', 'raw-selvedge-denim-trucker-jacket', 'Indigo & Co.', '14oz Japanese selvedge denim, antique brass rivets, custom felled seams, designed to develop a distinct personalized fading pattern over years.', 4299, 6999, 39, 15, 4.8, 145, '/src/assets/images/category_fashion_1791222504133.jpg', true, false),
('prod-fas-3', 'fashion', 'Handcrafted Full-Grain Leather Oxford Shoes', 'handcrafted-leather-oxford-shoes', 'Regal Craft', 'Blake-stitched construction with genuine Argentine leather uppers, cushioned cork footbed, and Goodyear rubber protective heel tap.', 3899, 5999, 35, 20, 4.9, 184, '/src/assets/images/category_fashion_1791222504133.jpg', false, false),
('prod-fas-4', 'fashion', 'Breezy French Linen Casual Shirt', 'breezy-french-linen-casual-shirt', 'Coastline Studio', 'Pre-washed 100% Normandy flax linen shirt, tailored relaxed fit, mother-of-pearl buttons, moisture-wicking and ultra-soft feel in summer heat.', 1899, 2999, 37, 38, 4.5, 220, '/src/assets/images/category_fashion_1791222504133.jpg', false, true),

-- Home & Kitchen
('prod-hk-1', 'home-kitchen', 'CrispAir Digital Smart Air Fryer 5.5L', 'crispair-digital-smart-air-fryer-55l', 'Nova Home', '360 rapid air circulation technology, 8 one-touch presets, ceramic non-stick basket, and mobile Wi-Fi app recipe integration.', 4999, 8999, 44, 30, 4.8, 480, '/src/assets/images/category_home_kitchen_1791222516162.jpg', true, true),
('prod-hk-2', 'home-kitchen', 'Enameled Cast Iron Dutch Oven (4.2L)', 'enameled-cast-iron-dutch-oven', 'Artisan Cookware', 'Heavyweight cast iron for superior heat retention and uniform braising, glossy porcelain enamel interior, oven-safe up to 260°C.', 3299, 5499, 40, 18, 4.9, 215, '/src/assets/images/category_home_kitchen_1791222516162.jpg', true, false),
('prod-hk-3', 'home-kitchen', 'PurePress Cold Press Masticating Juicer', 'purepress-cold-press-juicer', 'Vitality Kitchen', 'Slow 50 RPM masticating auger yields up to 90% juice with minimal oxidation, preserves delicate nutrients and enzymes, whisper-quiet motor.', 6499, 9999, 35, 14, 4.7, 162, '/src/assets/images/category_home_kitchen_1791222516162.jpg', false, false),
('prod-hk-4', 'home-kitchen', 'Ceramic Ultrasonic Aroma Mist Diffuser', 'ceramic-ultrasonic-aroma-diffuser', 'ScentCraft', 'Handmade fluted ceramic cover, 300ml water tank with ambient warm amber night light, auto shut-off, and whisper-quiet ultrasonic atomization.', 1499, 2499, 40, 45, 4.6, 290, '/src/assets/images/category_home_kitchen_1791222516162.jpg', false, true),

-- Beauty
('prod-bt-1', 'beauty', 'Kumkumadi Ayurvedic Miracle Face Oil (30ml)', 'kumkumadi-ayurvedic-miracle-face-oil', 'Veda Naturals', 'Authentic blend of pure Kashmiri saffron, sandalwood, and 26 precious Himalayan herbs. Clinically proven to brighten complexion and diminish pigmentation.', 1699, 2499, 32, 50, 4.9, 610, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, true),
('prod-bt-2', 'beauty', 'Niacinamide 10% + Zinc 1% Clarifying Serum', 'niacinamide-10-zinc-1-clarifying-serum', 'DermaNova', 'Oil-free dermatological formula that visibly balances sebum activity, shrinks enlarged pores, and strengthens damaged skin barrier.', 599, 899, 33, 80, 4.7, 920, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, false),
('prod-bt-3', 'beauty', 'Oakmoss & Amber Luxury Eau de Parfum (100ml)', 'oakmoss-amber-luxury-eau-de-parfum', 'Maison Noir', 'Artisanal unisex perfume with opening notes of Italian bergamot, heart of smoked cedarwood and nutmeg, settling into deep earthy oakmoss.', 2799, 4500, 38, 22, 4.8, 175, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, false),
('prod-bt-4', 'beauty', 'Matte Velvet Weightless Lip Trio', 'matte-velvet-weightless-lip-trio', 'Velour Luxe', 'Set of 3 flattering Indian nude shades formulated with Vitamin E and shea butter. 12-hour transfer-proof comfort wear without feathering.', 999, 1599, 38, 65, 4.5, 340, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, true),

-- Sports
('prod-sp-1', 'sports', 'Masterstroke English Willow Cricket Bat', 'masterstroke-english-willow-cricket-bat', 'SS Willow', 'Grade 1 air-dried English willow with massive sweet spot, thick edges, semi-oval Sarawak cane handle for supreme shock absorption.', 8499, 12999, 35, 12, 4.9, 210, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, false),
('prod-sp-2', 'sports', 'ProAlign Eco-Friendly Natural Rubber Yoga Mat', 'proalign-natural-rubber-yoga-mat', 'Yogika', '6mm high-density biodegradable natural tree rubber with laser-etched posture alignment system, non-slip sweat grip, and carrying strap.', 1899, 2999, 37, 34, 4.8, 320, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, true),
('prod-sp-3', 'sports', 'QuickSelect Adjustable Dumbbell Set (2.5 - 24kg)', 'quickselect-adjustable-dumbbell-set', 'IronCore Fitness', 'Dial-turn weight selector replaces 15 sets of dumbbells in a single compact footprint. Heavy-duty cast iron molding with ergonomic knurled grip.', 12999, 18999, 32, 8, 4.9, 115, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, false),
('prod-sp-4', 'sports', 'AeroStrobe Lightweight Carbon Running Shoes', 'aerostrobe-lightweight-running-shoes', 'AeroStride', 'Embedded carbon propulsion plate, nitrogen-infused supercritical foam midsole, and engineered jacquard mesh upper for half-marathon speed.', 3499, 5499, 36, 28, 4.6, 245, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, true),

-- Accessories
('prod-acc-1', 'accessories', 'Vintage Top-Grain Leather Bifold Wallet', 'vintage-top-grain-leather-bifold-wallet', 'Hidesign Artisans', 'Vegetable-tanned full-grain leather with RFID blocking foil lining, 8 card slots, dual currency divider, and coin pocket.', 1199, 1999, 40, 45, 4.7, 430, '/src/assets/images/category_fashion_1791222504133.jpg', false, true),
('prod-acc-2', 'accessories', 'Nova Chrono Heritage Sapphire Watch', 'nova-chrono-heritage-sapphire-watch', 'Nova Horology', '316L stainless steel case, anti-reflective sapphire crystal glass, Japanese quartz chronograph movement, and quick-release Milanese mesh strap.', 4999, 7999, 38, 16, 4.8, 190, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, false),
('prod-acc-3', 'accessories', 'Polarized Aviator Sunglasses (UV400)', 'polarized-aviator-sunglasses', 'RayVista', 'Ultra-lightweight titanium alloy frame with scratch-resistant TAC polarized glass lenses, zero distortion glare reduction, and leather case.', 1499, 2499, 40, 52, 4.6, 280, '/src/assets/images/category_fashion_1791222504133.jpg', false, true),
('prod-acc-4', 'accessories', 'Hand-Forged Minimalist Brass Cuff Bracelet', 'hand-forged-minimalist-brass-cuff-bracelet', 'Studio Dhatu', 'Solid raw brass cuff with subtle brushed satin finish, hammered end caps, adjustable fit for wrists, developing a rich vintage patina.', 799, 1299, 38, 30, 4.5, 140, '/src/assets/images/category_fashion_1791222504133.jpg', false, false),

-- Gourmet & Grocery
('prod-gr-1', 'grocery', 'GI-Certified Grade A Kashmiri Mongra Saffron (2g)', 'kashmiri-mongra-saffron-2g', 'Zaffran Valley', 'Highest grade all-red stigmas hand-picked from the historic fields of Pampore, Kashmir. Renowned for intense crimson colour, aroma and purity.', 949, 1499, 37, 60, 4.9, 580, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, true),
('prod-gr-2', 'grocery', 'Cold-Pressed Organic Kachi Ghani Mustard Oil (2L)', 'cold-pressed-organic-mustard-oil-2l', 'Shuddh Farms', 'Extracted using traditional wooden kohlu below 40°C to preserve natural pungency, essential fatty acids, and authentic desi mustard flavour.', 499, 699, 29, 45, 4.7, 390, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, false),
('prod-gr-3', 'grocery', 'Jumbo Royal Cashews W180 Grade (500g)', 'jumbo-royal-cashews-w180-500g', 'NutriBliss', 'Largest size king cashew nuts sourced from coastal Goa, naturally sweet, crunch-roasted with a touch of Himalayan pink salt.', 799, 1199, 33, 40, 4.8, 310, '/src/assets/images/hero_nova_cart_1791222479966.jpg', false, true),
('prod-gr-4', 'grocery', 'Single-Origin Coorg Arabica Coffee Beans (250g)', 'single-origin-coorg-arabica-coffee-beans', 'Western Ghats Roasters', 'Medium-dark roast harvested at 3800ft elevation under silver oak shade canopy. Tasting notes of dark chocolate, toasted almond and wild honey.', 449, 650, 31, 35, 4.8, 225, '/src/assets/images/hero_nova_cart_1791222479966.jpg', true, false)
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Deals
INSERT INTO deals (id, title, description, discount_percentage, banner_url, valid_until, is_active) VALUES
('deal-mega-saver', 'Super Saver Mega Sale', 'Up to 50% Off on flagship electronics, audio gear and smartphones', 50, '/src/assets/images/hero_nova_cart_1791222479966.jpg', NOW() + INTERVAL '7 days', true),
('deal-festive-fashion', 'Festive Ethnic & Streetwear Bonanza', 'Flat 40% Off on pure handloom Khadi kurtas, selvedge denim and jackets', 40, '/src/assets/images/category_fashion_1791222504133.jpg', NOW() + INTERVAL '5 days', true),
('deal-kitchen-upgrade', 'Modern Kitchen Refresh', 'Extra ₹500 off on digital air fryers, cast iron Dutch ovens and cold press juicers', 35, '/src/assets/images/category_home_kitchen_1791222516162.jpg', NOW() + INTERVAL '3 days', true)
ON CONFLICT (id) DO NOTHING;
