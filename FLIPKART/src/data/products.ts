import { Product, Coupon, Address, OrderItem } from '../types';

export const FLIPKART_BAG_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnxlQEhAAa68unILUzE4_8i6z2yrm43SdJ07Hyn3Qbw9SZKNqGmEdod98h5Mp02W3loqvN8MtbYWURBhAdU6pA_ZZJittm1Sgl-t-ez3MfPTb0FZ2lmq-dkM5EYiKObGCT_6CWqYSMVxDU53BAn3uk73G0nhWSJypdHzi7h9PeKxP5HDU2jNNU4p427m6EEX3FqXUavqQic9HMOPjA60S_dZ6gQm-ENjNHmxLaNHCAsKOxUNuSRkZwzA';
export const NOVA_CART_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw0ZApch2a-pMf7AnUPwyN3fj4bBKm_0-_j1YPgWzumG_vJe67W4rUS8ZkloRSjsyr8_GHSMC4PBb47iuLaHKC1P3U6nDVo88li2r-iKpSzd6oiJty7_p7f5fU7L9fEzeMvPiCwQhEXSU69aCUglnuFbJpxcn84KYPclmpZaRU6wSf0R-S9_rpyQWBAoPuVUbTKq1r0ZFjRRa5BQX9Xu0rAYLgU9vtpr23smn3qD6Y_P2fzTVxb0bM5A';

export const HERO_BANNERS = [
  {
    tag: 'Mega Sale',
    title: 'Biggest Tech Fest',
    subtitle: 'Up to 80% off on top smartphones & gadgets.',
    cta: 'Explore Now',
    bgClass: 'bg-[#1f6feb]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVmwKdf0D9iefUXW67lCgA9edBzUVHqUtBErFG8xUb9WIPjjcCMmMHmi5G1qBYniHmVVBWfuE0Zip895sbbKaolENHq6PkS_Hri4_Rx7gl48WHbr6Qa-sUnoais6qzEFmzxYJJtlZw1rYJqVoivz7vyRBIQvorZz0WK_oYplpTzI_CpKyYIbGyLxKAk_SsVLngEgz12t83jTwBdLOcmHlqCWAAi9MLgg94z6YRxLXrQ_vZXEwfsog9ZA'
  },
  {
    tag: 'Fashion Week',
    title: 'Trendsetting Styles',
    subtitle: 'Refresh your wardrobe with latest seasonal collections.',
    cta: 'Shop Trends',
    bgClass: 'bg-[#2e8534]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2WA1OKetm2ydUZ3C5HqLg4I2jz8ABZ186_0nBIairz1w9qRBISjEj1wdlUGxdUPTBBxDKoGycfcOYfsvVi2cyaSPjSDN96TzRO23yL4XYc6UqBsCG0_lomrqhd-0jR3nzsawi5n6Z42jpaMTnuvB6SG9BDGRMooEkukzdNdhAG7s-bLYJogzhWMOPxZXGn0azUWZIjYaHbRyYtR9cc9sCGJ3x7riylswf2Q2f6xWuyEXbPmQ2i09xUg'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'sonicpro-headphones',
    name: 'SonicPro Ultra Wireless Active Noise Cancelling Headphones with 40H Playtime',
    brand: 'SonicPro Audio',
    category: 'electronics',
    priceINR: 2499,
    originalPriceINR: 5999,
    priceUSD: 149.99,
    originalPriceUSD: 299.99,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 12450,
    isBestSeller: true,
    isFlashDeal: true,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgIbZgteGka7mFZvIX152VSeJSiBbahAF4eMAfk0jsRPXIXrFyVvDxa2hwDAA0UVjgGimivisPRKVtSqVmJPPb36UD-OmpPkBxqTKSJJXlyLY17Qi9dt9hio9K79J4sTGFP3KNF2G7PbTsSicFG7bigF-WB8jLZBA6tQdfUHWvtBuvfOhEFC9jdqHdWwT8ak8z01fR5ZNcFVz3DnAnkqGgLT5n8XKFruI4khmT2EfN_pW6KGUSFO3stQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBdVK6g_OjPPV48eRV200jqytXkZGotGeN-KVgB8ltvMVlvV30p9senNT9BOGbIfoE4g4fs00TDZ-LZn4Vb40cn0UMkrhCKzjE9q8W2Q8k9qWBfvwMZwJ2kqoL1-bSgpyX0BA6uwvXOZRFcmh7wmvNmNVABIu4tiQAp40w6W0oeKnqpeD9Q-EmU6xFdrAj5uVle93Py0swLxaULH276yAMG1tT3zF1U83PFtI4-EUwTAqesVl3ZUd9uA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBd6gW2ZoZmLKvZ0hjlxBiU6j717wqf-ZP6_qYLIwIl1mhfK55w-b2fUJ84JHZ3Aa4wHJpcEdvqzRL6KL5XXtw9MS0z9a9wlfCjjcAv6YlQnkxG283tGl9S74F3Jl1QQYcKNBw5vBpn3QzV-TvfupmKZAXv1dQUDbZ1UHwSRg9fvzx61UtjB-oO6iHj8ORUGN-r4i7dkW6zTcg-bt4jgKPyIp1HEUHPgH9-xtJ3sjDJL_63lx4tqX079A',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDjHCzwC5BiHOGT6YkcQWn9lAVoIHHyg3CJ3DLqMv_er2fcKZSbNzMRqlEvRX0JzFLgJvPO_-A0wDGU6JdoY91aKJYeHmP96zeyyow9A8wUfc_AQcUQS3HvdYJEcMIwQP9rUlXJm9SOvNBn4wtr6KhY-_lImoEVbDukE6bGRmaB2o3KgZ6cwt6cnhORxeWxnqt148gzGcDEXt56GGL8wylU9xt6XQV24EUBQXrbiAbXa7Z-rjRvscpgfg'
    ],
    description: 'Experience pure sonic immersion with hybrid Active Noise Cancellation up to 45dB. Equipped with custom-tuned 40mm neodymium dynamic drivers, soft protein memory foam cushions, and ultra-fast 10-minute fast charging giving you 5 extra hours of music.',
    colors: [
      { name: 'Obsidian Black', hex: '#191c1e', class: 'bg-[#191c1e]' },
      { name: 'Pearl White', hex: '#e0e3e6', class: 'bg-[#e0e3e6]' },
      { name: 'Midnight Navy', hex: '#1f6feb', class: 'bg-[#1f6feb]' }
    ],
    editions: ['Standard Edition', 'Pro Bundle (+Case)'],
    highlights: [
      { title: 'Active NC', desc: 'Up to 45dB reduction', icon: 'headphones' },
      { title: '40H Battery', desc: 'Fast charge 10m = 5h', icon: 'battery_charging_full' },
      { title: 'Bluetooth 5.3', desc: 'Dual device connection', icon: 'bluetooth' },
      { title: 'ENC Microphones', desc: 'Quad beamforming mics', icon: 'mic' }
    ],
    inStock: true
  },
  {
    id: 'chronos-watch',
    name: 'Classic Leather Analog Quartz Watch for Men',
    brand: 'Chronos',
    category: 'accessories',
    priceINR: 3199,
    originalPriceINR: 5499,
    priceUSD: 89.99,
    originalPriceUSD: 159.00,
    discountPercent: 40,
    rating: 4.2,
    reviewCount: 850,
    isFlashDeal: true,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB19oFXGfkUCX6QIrG81Kyex9BsaKlOot0ELYNxt67loAvaPHn9AzH56nbPAybZDI_VQEyULHZw-jhvrLBSPIyGinyc3MDc0nuMQVK48jspUMn1ePDJj_vFsMh0xc0pLtcqemPkr6nS0w91ogRmVTjXiywYr35If_zQltpEyhZ-Kcb1w_DbIGNQ2wZ0gxCexusGE1ZfTJuaHSOzZ41_0Nqm-cxgLARzKINNrs1Tx0JHiSK3juofQjfm0w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxHgS8B1DS2pHKzjabuULH6DaLDgFxvpd4YSAzJVdZwMyoW1xoJYijBaBdituLWQ64rPVgwwlIw-fJZN8bX2V_l31D1nov-Hg03xiKboL0_-kTDUBVM4aRgpbN7EhcqRZzvazHeWAKSqus6s5_4dTOzNQz_nHkNefnEVP44HM7r_j8Pi7WmpEUFRyqoXA3Wf4iccQC7phQJDFZuweXo9dim4o_QXYZWBlAa3nHM_4TWL30FbzOUHCRjQ'
    ],
    description: 'Precision Japanese quartz movement housed in a rose-gold PVD surgical stainless steel case. Features genuine Italian top-grain calfskin leather strap with quick release pins.',
    colors: [
      { name: 'Rose Gold & Saddle Brown', hex: '#875200', class: 'bg-[#875200]' },
      { name: 'Silver & Black', hex: '#2d3133', class: 'bg-[#2d3133]' }
    ],
    editions: ['Classic Dial', 'Chronograph Edition'],
    highlights: [
      { title: 'Sapphire Crystal', desc: 'Scratch-resistant glass', icon: 'diamond' },
      { title: '50M Water Resistance', desc: 'Shower and swim safe', icon: 'water_drop' }
    ],
    inStock: true
  },
  {
    id: 'velocity-shoes',
    name: "Men's Lightweight Athletic Sport Running Shoes",
    brand: 'Velocity',
    category: 'fashion',
    priceINR: 1999,
    originalPriceINR: 3999,
    priceUSD: 45.00,
    originalPriceUSD: 89.99,
    discountPercent: 50,
    rating: 4.6,
    reviewCount: 3210,
    isFlashDeal: true,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3IwXGFroz-sZT_gEX50b5h1Pbpc3Vm7UKiIhdG9u3iD8Fq0Qg7AN4lKBlzlNZvoSa82gKeO6Wijfuvuaz2rLA6p93_2DfOAGFeIk5d7U3HeUAKcH_WKT_QO1fphG3pCPIE00Sk0mEc3NfEMr0ypspT1Vw6J3znSp65xMjpzXoVsRUxEYMYs_lSW9B7mMYcKnRDerM_Jl8QY493nYHFZk7An3Y5efwGOhSHVq1BBJqT7RyUAqheBqx6w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGGpd-5bla_ZFt790_LHgKtMNyw82SyWyZ902ong8hwenG-ErDeB60CbhQvgvAwCCv2bJQpAJ7RCfcbLFoSfARGgpffiISPo-r-QeP7e7NjbcQI4SumdhqYZfUTMEb2Ypb6BboIV-egMcrgaFKEPdz1F727WHbPt51z7yvNZld1L5XrBPAp4AQh0X1Nxhz_Ew99vXApG3nWmiHUarLlXyFXjTwCa1emBNN1apSFy-osuOU--W20fb0EQ'
    ],
    description: 'Engineered breathable mesh upper with responsive SuperFoam midsole. Provides unparalleled shock absorption and energy return for high-mileage runs and all-day comfort.',
    colors: [
      { name: 'Neon Green & White', hex: '#82db7e', class: 'bg-[#82db7e]' },
      { name: 'Teal Blue & Silver', hex: '#00687a', class: 'bg-[#00687a]' }
    ],
    editions: ['Standard Fit (UK 8)', 'Wide Fit (UK 9)'],
    highlights: [
      { title: 'SuperFoam', desc: '72% energy return', icon: 'directions_run' },
      { title: 'Breathable Mesh', desc: 'Moisture-wicking knit', icon: 'air' }
    ],
    inStock: true
  },
  {
    id: 'brewmaster-flask',
    name: 'Insulated Stainless Steel Travel Coffee Mug 500ml',
    brand: 'BrewMaster',
    category: 'home',
    priceINR: 899,
    originalPriceINR: 1299,
    priceUSD: 22.50,
    originalPriceUSD: 29.99,
    discountPercent: 30,
    rating: 4.4,
    reviewCount: 640,
    isFlashDeal: true,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9UFrYyx06Gsouknab29ORJcS6h1R1dpF8jsWdQ8UvFgpiPiUAOzmh-uaqH0SiTpjz0A8B1zVn4PYm4q270bjRnefzEt52IuR9ICmCO_6jzdEx0gVBs04XHj83Ke_gt-QUh0euUapXpWwlzNu9_ubkHcadvVbskfH7dkcCcnvYF60HF3QYpj1SmE7GvQvxT0E4XQiBXgBvcJZ3-m0Uqp9HB5a6rSqdeEJITUzzFxDpmQEcrBbwhgq2Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDR1WzTN9CqAPAWD3Q0UOzV3G-x_95o9Q6PRgCiKTnxV2VVspUvyy0X9TyIK4eQH8PJ1Ith8e7a-LFY9DnZhTV1aFR4HsMpKtgVwcLEbB9cl3fPCG8XUKy30Etd_kFDPhh1g6XAOzWubygZ13jgUkB9-K5_cQAZuxGneLjd4_Dxo3BHEjohFWy_xF-lB6rfUSppqDNEQ4l52heLFFXdWAccz7lzH7ta2pVPeoPuQKfOqjSaavqh3_2MBQ'
    ],
    description: 'Double-walled vacuum insulation keeps liquids piping hot for 12 hours or iced cold for 24 hours. Features a leak-proof flip lock lid and condensation-free exterior.',
    colors: [
      { name: 'Pastel Sky Blue', hex: '#afc6ff', class: 'bg-[#afc6ff]' },
      { name: 'Brushed Stainless', hex: '#d8dadd', class: 'bg-[#d8dadd]' }
    ],
    editions: ['500 ml', '750 ml'],
    highlights: [
      { title: '18/8 Steel', desc: 'Food-grade & BPA-free', icon: 'local_cafe' },
      { title: '12H Hot / 24H Cold', desc: 'Copper lining lock', icon: 'thermostat' }
    ],
    inStock: true
  },
  {
    id: 'nomad-backpack',
    name: 'Multi-Compartment Water-Resistant Camera & Laptop Backpack',
    brand: 'Nomad',
    category: 'accessories',
    priceINR: 1749,
    originalPriceINR: 4999,
    priceUSD: 34.99,
    originalPriceUSD: 79.99,
    discountPercent: 65,
    rating: 4.7,
    reviewCount: 2115,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbtd1rHZHVXxmW13vlplzmDl8Qsks3dF7-2iHFhWJzXA6NB5dzkilbiL6SR2XCQ0RVkeflYrPeItBJolrdW0Dc6EiXwm_rrQgwih6XwyX7a1kfryOhdX5NeTuVjjWU2-yXF1P4UMgx3jG2fYXXiPp3sne3DLSM6Xv1pAvF9pVUZY65g-WCPOw_36atBiA2IbkyY585TcVKVP_wfWxWiNP1TIfCOlVSU54bVuK21RaWT_5IzGiJQB2JeQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTldUKXaI-fo8MKebgx8Za70-1X3vbT3I_OMu8tgNGBARMAcK77w8vwAZKqrjqjiaAzspqQqAHkB3VDLorcey_x7TtFA-gHc6pJuKxIe7kQ6j8KRAl19eUmaoe_yWXxn83H6a7sJR_JMHxh6vCZZiBpy-1DfTu4umogjIF9Gpu16FYHn4opTTX3ThztceZkaxEK16MRlv6itl7_PjK27vcqMpoML3mRnUUYLRENVENTMuMXJxt04enIQ'
    ],
    description: 'All-weather 900D ballistic nylon camera bag with customizable padded internal dividers. Accommodates 1-2 DSLR bodies, 3 lenses, 16-inch MacBook Pro, and tripod.',
    colors: [
      { name: 'Charcoal Grey & Amber', hex: '#424754', class: 'bg-[#424754]' },
      { name: 'Forest Olive', hex: '#2e8534', class: 'bg-[#2e8534]' }
    ],
    editions: ['25L Standard', '32L Expanded'],
    highlights: [
      { title: 'Weatherproof', desc: 'Rainfly included', icon: 'water_drop' },
      { title: 'TSA Friendly', desc: '180° lay-flat design', icon: 'luggage' }
    ],
    inStock: true
  },
  {
    id: 'gametech-keyboard',
    name: 'RGB Mechanical Gaming Keyboard Pro with Hot-Swappable Switches',
    brand: 'GameTech',
    category: 'electronics',
    priceINR: 2199,
    originalPriceINR: 3999,
    priceUSD: 69.99,
    originalPriceUSD: 99.99,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 1240,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzOCdzTUX6tlmKhP1H0UjEo_hPQjivQTqiEh690KqC046urhqriCI-WylhhF8UoQRYPdG0EiUUgP--YsWm4OsH7WH0HkcKfLZIyLwCwJ5LWqu1aO1oMEGZdB2Pgdf0tH8Uu8wViDOF0kYXjauAWfEDTh15KIsoVuad1_z9whVTb6NoxXFH6AEa1y8ZKKOy4zs3uBPNi-BGoXmkfgU3jlAAbEvCyv9Ict_eFHSrw5ISDpQ3zeIRNEF_Ow',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAND3Y4_unqrqsJdKLcwyMbs4TdIw8a6K-88UrFX8HHtzugcKwLNfNIfg8goeY1vLSbHozYPFfJbTHhEkAAA7gcS107KlaeSydXmXFHVV-2laBLswqzMUZV7qMTUmZnZGa37c1mmBUn7syiJgq13Zg-PqUHnKvoxJfpR8s7mB7CYhBXIGcKTcPN02EjngX75SKl94v8oEcQC_x3mym6CaST-py2VY08t66aAOefQkxROXjXk9cEdWtczA'
    ],
    description: 'Aircraft-grade anodized aluminum top plate with customizable per-key RGB backlighting. Features pre-lubed tactile mechanical switches and sound-dampening foam.',
    colors: [
      { name: 'Matte Gunmetal', hex: '#191c1e', class: 'bg-[#191c1e]' },
      { name: 'Cyber White', hex: '#eceef1', class: 'bg-[#eceef1]' }
    ],
    editions: ['Tactile Brown Switches', 'Linear Red Switches'],
    highlights: [
      { title: 'Hot-Swap PCB', desc: 'Supports 3/5-pin switches', icon: 'keyboard' },
      { title: 'RGB Per Key', desc: '16.8 million colors', icon: 'palette' }
    ],
    inStock: true
  },
  {
    id: 'aura-desk-lamp',
    name: 'Dimmable LED Desk Lamp with USB Port and Wireless Charger',
    brand: 'Aura',
    category: 'home',
    priceINR: 1599,
    originalPriceINR: 2599,
    priceUSD: 34.99,
    originalPriceUSD: 59.99,
    discountPercent: 40,
    rating: 4.9,
    reviewCount: 2400,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHau4R3Ouf2r9IfHBqZRRnUfXfyAezP6FlI8X6mUcMJidtZfm-SsVDoxcSG4fgt7dUXVZo4nnlKab66zZnSzGy7yJjBguAqi0p4R_PFrtRDWjtWTXCRCtJIc1P7sUScFhPYBR02_HSPNo6SXf6yD80jsssxRL3fNmnpt2_ELjucI2QYcp9v6DnNKv_cs5foDTYNsxJk3l4fNvhiX6kJLpaBQj_1Eppc6FtZ1NxDSAHnX736pPm8ZpdHA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0jnnMU8gNXnU82y7dypgWmiff7FhEpR9Ak-_IcldAemLgIKJL5Jhl75Gem2UcDpv4bCPFWe4V_TM64zHvMdT9gdFwzSVV_iGX4TjDHWDabccX77440WzvX3gPEG65NIuYmvkTIhk29_lhS6gB0FjZbpLmHOIN29g-DEh54xrvhCmp-WmxrzBTe2jLc_0eWffFIWtXeGLEnqi6c6xdkxfMGV9ocWcCJ5tQDirS5BK44SrjoujWvFzg6g'
    ],
    description: 'Flicker-free eye-caring architect desk lamp featuring 5 color temperature modes and stepless dimming. Equipped with 15W fast wireless charging pad at the base.',
    colors: [
      { name: 'Brushed Aluminum', hex: '#e0e3e6', class: 'bg-[#e0e3e6]' },
      { name: 'Midnight Matte', hex: '#191c1e', class: 'bg-[#191c1e]' }
    ],
    editions: ['Standard Touch', 'Smart WiFi Voice Control'],
    highlights: [
      { title: 'Eye Caring', desc: 'Zero blue light hazard', icon: 'lightbulb' },
      { title: 'Wireless Base', desc: '15W Qi Qi2 certified', icon: 'bolt' }
    ],
    inStock: true
  },
  {
    id: 'nova-pods-pro',
    name: 'Active Noise Cancelling True Wireless Earbuds with Spatial Audio',
    brand: 'Nova Audio',
    category: 'electronics',
    priceINR: 3999,
    originalPriceINR: 4999,
    priceUSD: 59.99,
    originalPriceUSD: 92.00,
    discountPercent: 35,
    rating: 4.7,
    reviewCount: 3100,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYkdbQijjG6d_ngcht-6dw7ebAl4udI0i-h75hsTfbs-J39vA1AZdCxy88oud5dzHNR5p4npG3tigwuMsUA7ij7G5H2DCsqF5lBLdiJYwemYO6LtNQ49crHxEWgUhXWCVpCyv91BshR4ohSK9xoO1zDAHpqUA7Hkq919km2AwzgwUuMXQZ1KrJWrqlTaELoIoQAxETkbdE0Y143HfYiV25XcHRzCkp6LDBPbnO4QRGO3MyCToiquVk3Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4dyoy-s5Ghvlu2JJguacQ2nqDL_j86jry0kffhkwqvJaet_MloOJ08NbBFk3eqAvKx3EGOYkx2XxcYcmFoY68I30nVSYWV4Hgp6rNfFzv1VhW7h-VUw4r0b_0evkjbc5lBImK_ZzBPI_RjljLrPvDtdvmst6yaiz1sBzid-4VEDUc9XFVsphvIXNk0f3rDTI4IYuujFHrhvxJor4euGeioZgVvYDSsQ9wEcdKdrvU6j5cQh4WH_1jOg'
    ],
    description: 'Crystal-clear high fidelity acoustics with dynamic head-tracking spatial audio. IPX5 sweat resistance and 36 hours of total playtime with the pocket charging case.',
    colors: [
      { name: 'Ceramic White', hex: '#f7f9fc', class: 'bg-[#f7f9fc]' },
      { name: 'Matte Space Gray', hex: '#424754', class: 'bg-[#424754]' }
    ],
    editions: ['Standard Case', 'Wireless Qi Case'],
    highlights: [
      { title: 'Spatial Audio', desc: '360° theater sound', icon: 'surround_sound' },
      { title: '36H Playtime', desc: 'Case + bud combo', icon: 'battery_saver' }
    ],
    inStock: true
  },
  {
    id: 'zenith-speaker',
    name: 'Zenith Portable Rugged Bluetooth Speaker with Deep Bass',
    brand: 'Zenith',
    category: 'electronics',
    priceINR: 2999,
    originalPriceINR: 3999,
    priceUSD: 49.99,
    originalPriceUSD: 79.99,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 780,
    isFlashDeal: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQSXdTeEsMC-OA6XqHLS-CU2HNcCNgsRiVGRSmlsR4SuU_sQhJGPQtDqF5Otz8ANc2D3yjsIr75kVSqGYcHe4phzFUEU77QW597YfIe3Dq3RjWTCiVMsIWKYc-PHWBXs7pZxSmJQqzCGE2Gor8w9WdJfeR55s-TRYFvCIWzewE9yjdXOIUOsmp-tfC7EnnbdTirKqeQdPAqGAJEzvO1SZfhaMvLUDJfy8w2hAEybeZA8jR27kI-3e_wA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMivFzruDIsEniYCTT9Ms9DZ4mVFrKK6JS6mOqtwSkirruLU3513VOXKLvV1A5tXUFU5hW7rK3qXG0OU9Wc6gnwEoDqFd3AiyckQ6wZLXE7IYmsI9xPWbgiKrO4FRBd1EOeTjCP7yOJJlPNnza_GFeCUW3Hb3vpm6iiSPPYsu2rJeVsG_ZN_K6KTMwhZGsQUf5sZ1YLnzAYj6WLKkZ8YqYvbtSHxYF8djElrXYaXvLFGneBIJIYUa_VA'
    ],
    description: 'Rugged IP67 waterproof construction with dual passive radiators delivering punchy, room-filling bass. Ideal for outdoor adventures, beach trips, and pool parties.',
    colors: [
      { name: 'Stealth Black', hex: '#191c1e', class: 'bg-[#191c1e]' },
      { name: 'Camo Olive', hex: '#2e8534', class: 'bg-[#2e8534]' }
    ],
    editions: ['15W Core', '30W Boom Edition'],
    highlights: [
      { title: 'IP67 Waterproof', desc: 'Floats on water', icon: 'water' },
      { title: 'TWS Pairing', desc: 'Pair 2 for stereo', icon: 'volume_up' }
    ],
    inStock: true
  },
  {
    id: 'apex-smartphone',
    name: 'Apex Mobile Phone X5 Pro 5G (12GB RAM, 256GB Storage)',
    brand: 'Apex',
    category: 'mobiles',
    priceINR: 34999,
    originalPriceINR: 38999,
    priceUSD: 499.00,
    originalPriceUSD: 599.00,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 430,
    isRecommended: true,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBD1XQiHfaWdY4gT1oiRAMvcL_VxPVKKxvGfihdkbCtN8geowuV3y8aSqtJzU1ge3FYinYx7kBMKqiURKC6OBRlggWu-NqiU0xcqPZyI-90pR5QOCe8tvWkbzpUAp1736CZDaUjL7VMFuoBcloA3DLzb6E0OQT7VulubBRVe5qJ_Ep5os9bUBzdJ3qQIW1k0Ovm9Aa46HB-RUiCGYZNxiGSl1HX2LpgH7gGS-gAIvgpXwvvAL7Tr-uLxQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2s1tMZ4E-Dt-1QbgSjTm2eINOXCTDCbD7Nv61cGMMQK-rmVel3e_E6aYCvJNb-mLx0EMUP76RAkkRW839jJHIVJXK-67IDdGr59fIScD_1X5TmJ5ZAHt9GelgkCn0hwKP8Zg28IzHN1A8LqMOsjPEFB6e4C133SR264wbFmPFG17H1BqX-5rVa7ilzkGRCgyz_RarIcUQ-hfXACelDHOKGWK3o4F6sUgSdfBzQz-uONXW3smr02VLQA'
    ],
    description: 'Flagship 6.78-inch 144Hz AMOLED screen with Snapdragon 8 Gen 3 chipset, 108MP Sony IMX sensor with OIS, and blazing fast 120W HyperCharge.',
    colors: [
      { name: 'Cosmic Blue', hex: '#0056c3', class: 'bg-[#0056c3]' },
      { name: 'Titanium Slate', hex: '#424754', class: 'bg-[#424754]' }
    ],
    editions: ['12GB + 256GB', '16GB + 512GB'],
    highlights: [
      { title: '120W Fast Charge', desc: '100% in 19 minutes', icon: 'flash_on' },
      { title: '108MP OIS Camera', desc: 'Cinematic night mode', icon: 'photo_camera' }
    ],
    inStock: true
  },
  {
    id: 'urban-bomber-jacket',
    name: "Classic Weather-Resistant Bomber Jacket for Men",
    brand: 'Velocity',
    category: 'fashion',
    priceINR: 2199,
    originalPriceINR: 3999,
    priceUSD: 49.99,
    originalPriceUSD: 85.00,
    discountPercent: 45,
    rating: 4.5,
    reviewCount: 410,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUcrr1-ki04pRGtoy2MU0AGBsJu2rlCW6CnFgj-wfYNufk5dEYSpbVeO-N88b_GzECyYVRa71aWryT2mEjp2bCz5KXdzfuI4GExfyOYA2ToE0yAqp4OoBmJcEPzLyiMEwEWslVmF3eVMO_1TSWRrGLKO0YrK-4ATvJCs3q5pnq3tZKjHBIZEZoZFuEdEAfAFp1Xo1g3_Xj9J8s1lear2vXqPkgkFhGzjTvlEnodSecl1FKUjqIRwKW5Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_3oE8qHwgdA76cK2tUewz4i6BpeoY2IQqwoye6RZGjE583wbimmjHuUU9Fl1jdFeOg2VO_BD9-zEVscVm5ARFgwVw2oiBwHF8PTeB0yvwGPj9xn53qm0FbnTRR2BmBdIMxah6UPXwNPoH-3Ln9LomI842ERqX_ob-ZKLgGT16CFKd81GU7cE2wf8r6iq4bXu-uHdqvQdGvDKVcI3SHp-1AzQIAhnZzQ_sFBu1Buk4323Ow0xngxooPA'
    ],
    description: 'Crafted from premium windproof ripstop fabric with ribbed elastic cuffs, interior utility pockets, and reinforced heavy-duty metal zippers.',
    colors: [
      { name: 'Olive Green', hex: '#2e8534', class: 'bg-[#2e8534]' },
      { name: 'Matte Charcoal', hex: '#2d3133', class: 'bg-[#2d3133]' }
    ],
    editions: ['Size M', 'Size L', 'Size XL'],
    highlights: [
      { title: 'Windproof', desc: 'Ripstop outer shell', icon: 'air' },
      { title: 'Thermal Lining', desc: 'Keeps cozy to 5°C', icon: 'ac_unit' }
    ],
    inStock: true
  },
  {
    id: 'brewmaster-coffee-maker',
    name: 'AromaBrew Programmable 12-Cup Drip Coffee Maker',
    brand: 'BrewMaster',
    category: 'appliances',
    priceINR: 3999,
    originalPriceINR: 4999,
    priceUSD: 79.99,
    originalPriceUSD: 119.99,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 530,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUvn2o4AZKXw_lj9E_iBhSeoZifran0pQTKOjfPYw8_Cmg9u5ArGjkzSRxEw-rDMewWK_Xqf720VAQ5t9vwm-bd98JHmqdbX3n9KOO2KUQcSlSoz3onuKbXuV2O578PetYxEZIJHEwikJes8mxqyAOTdo281FumeccY5AxkTN1ihUiua5eluc7v6Wbu-JS7ed_WwZlZnJRa4tmjxSLUazCLHklhcudlGYsf3A_HqYArklydY3NZhl6tQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDj7bHhIqq84SoR8cjPUJ-BIvc3lgTturpOQda1JTsM-tqIXmNwC3bEv-FKDYiQghX4IzufCBe_k5AtYwlmBqEr0-JbB_QtEI2O5We-9iODuX5pHufOne0mczGcTFpHJEPzDzA0dFbnlf8SqzOudT3mIen056ZROa8M8j-wdX9BG-72X8dzgWMkO0EUHokue0kLaRlFvN05mkgQ0xuL3S2Eey9tnFyumquu8NrzT8ZEDtqJ1QdRW546hg'
    ],
    description: 'Precision temperature brew head extracts rich, balanced aromas. Features a 24-hour auto-brew timer, strength selector, and borosilicate glass thermal carafe.',
    colors: [
      { name: 'Brushed Steel', hex: '#d8dadd', class: 'bg-[#d8dadd]' }
    ],
    editions: ['10-Cup Glass', '12-Cup Thermal'],
    highlights: [
      { title: '24H Programmable', desc: 'Wake up to fresh coffee', icon: 'schedule' },
      { title: 'Aroma Extraction', desc: 'Optimal 93°C brewing', icon: 'coffee' }
    ],
    inStock: true
  }
];

export const INITIAL_CART_ITEMS = [
  {
    product: PRODUCTS[0], // SonicPro / BoAt Rockerz
    quantity: 1,
    selectedColor: 'Luscious Black, Matte',
    selectedEdition: 'Standard Edition'
  },
  {
    product: PRODUCTS[3], // BrewMaster / Milton Thermosteel Flask
    quantity: 2,
    selectedColor: 'Silver Steel',
    selectedEdition: '500 ml'
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'SUPER200',
    title: 'SuperCoin Saver',
    description: 'Extra ₹200 / $2.50 off applied with SuperCoins redemption',
    discountINR: 200,
    discountUSD: 2.50,
    minOrderINR: 999,
    minOrderUSD: 15.00
  },
  {
    code: 'APEXBANK',
    title: 'Apex Bank 10% Off',
    description: '10% instant discount on Apex Bank cards up to ₹1,000 / $25',
    discountINR: 350,
    discountUSD: 5.00,
    minOrderINR: 1500,
    minOrderUSD: 20.00
  },
  {
    code: 'FREESHIP',
    title: 'Free Express Delivery',
    description: 'Free guaranteed priority delivery across all pin codes',
    discountINR: 40,
    discountUSD: 1.00,
    minOrderINR: 499,
    minOrderUSD: 10.00
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    name: 'John Smith',
    phone: '+91 98765 43210',
    street: '#42, 3rd Cross, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Work',
    name: 'John Smith',
    phone: '+91 98765 43210',
    street: 'Building 4B, Tech Innovation Park',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    isDefault: false
  },
  {
    id: 'addr-3',
    title: 'San Francisco Office',
    name: 'John Smith',
    phone: '+1 (415) 555-0199',
    street: '550 Mission St, Suite 1200',
    city: 'San Francisco',
    state: 'CA',
    pincode: '94107',
    isDefault: false
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-90214',
    orderNumber: 'OD12894721903',
    date: 'Today, 10:14 AM',
    status: 'Out for Delivery',
    expectedDelivery: 'Today by 4:00 PM',
    product: PRODUCTS[0],
    quantity: 1,
    color: 'Obsidian Black',
    totalINR: 1499,
    totalUSD: 49.99,
    trackingSteps: [
      { title: 'Order Placed', time: 'Yesterday, 8:30 PM', completed: true },
      { title: 'Packed & Dispatched', time: 'Yesterday, 11:45 PM', completed: true },
      { title: 'Out for Delivery', time: 'Today, 8:15 AM', completed: true, current: true },
      { title: 'Delivered', time: 'Estimated by 4:00 PM', completed: false }
    ]
  },
  {
    id: 'ord-89104',
    orderNumber: 'OD12891048210',
    date: '2 Oct 2026',
    status: 'Delivered',
    expectedDelivery: 'Delivered on 4 Oct 2026',
    product: PRODUCTS[3],
    quantity: 1,
    color: 'Pastel Sky Blue',
    totalINR: 899,
    totalUSD: 22.50,
    trackingSteps: [
      { title: 'Order Placed', time: '2 Oct, 11:20 AM', completed: true },
      { title: 'Shipped', time: '2 Oct, 5:40 PM', completed: true },
      { title: 'Out for Delivery', time: '4 Oct, 9:00 AM', completed: true },
      { title: 'Delivered', time: '4 Oct, 2:15 PM', completed: true, current: true }
    ]
  }
];
