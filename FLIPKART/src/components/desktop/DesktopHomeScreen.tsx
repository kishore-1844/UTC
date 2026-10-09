import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const DesktopHomeScreen: React.FC = () => {
  const { openProduct, addToCart, toggleWishlist, isWishlisted, formatPrice, setScreen, setSelectedCategory } = useApp();

  const trendingProducts = PRODUCTS.slice(0, 8);
  const pickedForYou = [
    PRODUCTS[4], // Nomad backpack
    PRODUCTS[6], // Aura lamp
    PRODUCTS[3], // BrewMaster flask
    PRODUCTS[5]  // GameTech keyboard
  ];

  const categories = [
    { id: 'electronics', label: 'Electronics', icon: 'headphones' },
    { id: 'fashion', label: 'Fashion', icon: 'checkroom' },
    { id: 'mobiles', label: 'Mobiles', icon: 'smartphone' },
    { id: 'home', label: 'Home & Kitchen', icon: 'chair' },
    { id: 'fashion', label: 'Beauty', icon: 'face' },
    { id: 'sports', label: 'Sports', icon: 'fitness_center' },
    { id: 'grocery', label: 'Grocery', icon: 'shopping_basket' },
    { id: 'accessories', label: 'Accessories', icon: 'watch' }
  ];

  return (
    <div className="w-full pt-28 bg-[#faf8ff] text-[#131b2e]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f2f3ff] via-[#faf8ff] to-[#e2e7ff] py-16 px-6 lg:px-12 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2dfff] text-[#3525cd] text-xs font-bold tracking-wide uppercase">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              New Season Drop
            </span>

            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#131b2e] leading-tight tracking-tight">
              Smart Shopping <br className="hidden sm:inline" />Starts Here
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Discover trending products, unbeatable deals and everything you need for everyday life.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setScreen('explore')}
                className="px-6 py-3.5 rounded-xl bg-[#3525cd] text-white font-bold text-sm shadow-[0_4px_20px_rgba(79,70,229,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => setScreen('explore')}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-800 font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Explore Deals
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-300/40 w-full mt-4">
              <div>
                <p className="font-extrabold text-2xl sm:text-3xl text-[#3525cd]">50K+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Curated Products</p>
              </div>
              <div>
                <p className="font-extrabold text-2xl sm:text-3xl text-[#3525cd]">24/7</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Express Support</p>
              </div>
              <div>
                <p className="font-extrabold text-2xl sm:text-3xl text-[#3525cd]">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Secure Checkout</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/60">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd4hcIl_8sv4FOquiG-G9igOI96Zk7NfROhN4hKNrvkdMCAveyB-o5r1qrYRuPMLb_iUJkxQZ_G3CI6byTfhhP3CHUCaFi7CUXzjkdoAGGmbNJt9KmW2c-S-tucXnX__gzxHR4zCiP_1vJi7TIEqB7DOo95Bnn6pfIIaEnHZV5WUMx8kERGWwrR81g9_IRtkW9ZORHMFh_asR_hoyiA9ocJxIFvrmhZg7Mza8d4poSxUAWsEnoWIBjig"
                alt="Curated Lifestyle Showcase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-5 -left-5 bg-white/95 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Express Delivery</p>
                <p className="text-[11px] text-slate-500">Get it within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-[#4f46e5] tracking-widest uppercase">
              Explore Collections
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => setScreen('explore')}
            className="text-xs font-bold text-[#4f46e5] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(cat.id);
                setScreen('explore');
              }}
              className="group flex flex-col items-center p-4 rounded-2xl bg-[#f2f3ff] hover:bg-[#e2e7ff] transition-all text-center border border-slate-200/50"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#3525cd] text-[26px]">
                  {cat.icon}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-800">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Products (8 Items) */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-[#4f46e5] tracking-widest uppercase">
              Hot Sellers
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Trending Products
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => {
            const wish = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                onClick={() => openProduct(product)}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/70 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative w-full aspect-square bg-[#f2f3ff] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs transition-colors shadow-xs ${
                      wish ? 'text-[#ba1a1a]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={wish ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#3525cd] text-white text-[10px] font-bold">
                    {product.discountPercent}% OFF
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-amber-500 text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                      <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-[#3525cd] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-base font-bold text-slate-900">
                        {formatPrice(product.priceINR, product.priceUSD)}
                      </span>
                      <span className="text-xs text-slate-400 line-through ml-2">
                        {formatPrice(product.originalPriceINR, product.originalPriceUSD)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#4f46e5] text-white font-bold text-xs hover:bg-[#3525cd] active:scale-95 transition-all flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4f46e5] via-[#3525cd] to-[#131b2e] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="relative z-10 max-w-xl mb-6 md:mb-0">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Limited Period Offer
            </span>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-white mt-3 mb-2">
              Up to 60% OFF
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              Upgrade your everyday essentials with incredible savings across top tech, home, and apparel categories.
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => setScreen('explore')}
              className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold shadow-lg hover:bg-slate-100 transition-all text-sm flex items-center gap-2"
            >
              <span>Shop Offers</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Picked For You */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-[#4f46e5] tracking-widest uppercase">
              Tailored For You
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Picked For You
            </h2>
          </div>
          <button
            onClick={() => setScreen('explore')}
            className="text-xs font-bold text-[#4f46e5] hover:underline flex items-center gap-1"
          >
            <span>Explore More</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pickedForYou.map(product => (
            <div
              key={product.id}
              onClick={() => openProduct(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/70 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative w-full aspect-square bg-[#f2f3ff] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-amber-500 text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                    <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-[#3525cd] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-bold text-slate-900">
                    {formatPrice(product.priceINR, product.priceUSD)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#4f46e5] text-white font-bold text-xs hover:bg-[#3525cd] active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#4f46e5] tracking-widest uppercase">
            The Nova Experience
          </span>
          <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
            Why Shop With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#f2f3ff] flex flex-col items-center text-center border border-slate-200/50 hover:bg-[#e2e7ff] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#4f46e5] text-white flex items-center justify-center mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">local_shipping</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">Fast Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lightning-fast shipping across all major pin codes with real-time tracking.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f2f3ff] flex flex-col items-center text-center border border-slate-200/50 hover:bg-[#e2e7ff] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#4f46e5] text-white flex items-center justify-center mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">lock</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">Secure Payments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiple encrypted payment gateways supporting UPI, cards, and net banking.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f2f3ff] flex flex-col items-center text-center border border-slate-200/50 hover:bg-[#e2e7ff] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#4f46e5] text-white flex items-center justify-center mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">assignment_return</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">Easy Returns</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hassle-free 7-day return policy with doorstep pickup and instant refunds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f2f3ff] flex flex-col items-center text-center border border-slate-200/50 hover:bg-[#e2e7ff] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#4f46e5] text-white flex items-center justify-center mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">Genuine Products</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% authentic merchandise sourced directly from trusted global brands.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
