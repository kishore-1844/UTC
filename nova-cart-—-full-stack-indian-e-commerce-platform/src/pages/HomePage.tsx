import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Product, Category, Deal } from '../types/index.ts';
import { ProductCard } from '../components/ProductCard.tsx';

interface HomePageProps {
  categories: Category[];
  featuredProducts: Product[];
  deals: Deal[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string, meta?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  featuredProducts,
  deals,
  onSelectProduct,
  onNavigate
}) => {
  const activeDeal = deals[0];

  return (
    <div className="space-y-10 pb-12">
      {/* Category Quick Navigation Strip */}
      <div className="bg-white border-b border-slate-200 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('shop', { category: cat.id })}
                className="flex flex-col items-center gap-1.5 shrink-0 min-w-[70px] group text-center cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 group-hover:border-blue-500 group-hover:bg-blue-50 flex items-center justify-center transition-all overflow-hidden">
                  {cat.imageUrl ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-700">{cat.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl min-h-[380px] md:min-h-[440px] flex items-center">
          {/* Background Hero Image with measured scrim */}
          <img
            src="/src/assets/images/hero_nova_cart_1791222479966.jpg"
            alt="Nova Cart Indian E-Commerce Banner"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>The Great Indian Festival Specials</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Premium Lifestyle & Tech Curated for India.
            </h1>
            
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Discover flagship 5G smartphones, handloom Khadi fashion, noise-cancelling audio, and gourmet spices with express 2-day delivery across India.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('deals')}
                className="px-5 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Today's Top Deals</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Sellers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Doorstep Delivery in 48h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightning Deals Spotlight */}
      {activeDeal && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-900 to-amber-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-rose-800/50">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-300">
                <Zap className="w-4 h-4 fill-amber-300" />
                <span>Limited-Time Lightning Deal</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display">{activeDeal.title}</h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-lg">{activeDeal.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-black/30 rounded-xl border border-white/10">
                <span className="block text-2xl font-bold font-mono text-amber-300 tabular-nums">06:42:19</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">Time Remaining</span>
              </div>
              <button
                onClick={() => onNavigate('deals')}
                className="px-5 py-3 bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
              >
                View All Deals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Top Rated Recommendations</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-0.5">Featured Indian Best-Sellers</h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <span>See All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Curated Category Visual Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fashion Spotlight */}
          <div
            onClick={() => onNavigate('shop', { category: 'fashion' })}
            className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 cursor-pointer group border border-slate-200"
          >
            <img
              src="/src/assets/images/category_fashion_1791222504133.jpg"
              alt="Fashion & Apparel"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Handcrafted Heritage</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">Pure Khadi & Raw Selvedge</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">Authentic hand-spun kurtas, bespoke footwear, and denim crafted to last.</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white mt-3 group-hover:translate-x-1 transition-transform">
                Shop Collection →
              </span>
            </div>
          </div>

          {/* Kitchen Spotlight */}
          <div
            onClick={() => onNavigate('shop', { category: 'home-kitchen' })}
            className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 cursor-pointer group border border-slate-200"
          >
            <img
              src="/src/assets/images/category_home_kitchen_1791222516162.jpg"
              alt="Home & Kitchen"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Modern Living</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">Smart Kitchen & Cookware</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">Enameled Dutch ovens, smart air fryers, and cold press juicers for modern homes.</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white mt-3 group-hover:translate-x-1 transition-transform">
                Shop Kitchen →
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
