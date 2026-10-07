import React, { useState, useEffect } from 'react';
import { Tag, Zap, Clock, ArrowRight } from 'lucide-react';
import { Deal, Product } from '../types/index.ts';
import { ProductCard } from '../components/ProductCard.tsx';

interface DealsPageProps {
  deals: Deal[];
  dealProducts: Product[];
  onSelectProduct: (p: Product) => void;
  onNavigate: (tab: string, meta?: any) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({
  deals,
  dealProducts,
  onSelectProduct,
  onNavigate
}) => {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 8,
    minutes: 42,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Deals Header Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-indigo-900/50">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>Grand Festive Sale • Up to 50% Off</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Lightning Deals & Steal Offers
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Grab hand-picked electronics, flagship phones, and ethnic fashion at unbeatable prices. Prices valid strictly until timer runs out!
          </p>

          {/* Countdown Clock */}
          <div className="pt-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ends In:</span>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-lg text-amber-300">
              <span className="px-2.5 py-1 bg-black/40 rounded-lg border border-white/10 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="px-2.5 py-1 bg-black/40 rounded-lg border border-white/10 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="px-2.5 py-1 bg-black/40 rounded-lg border border-white/10 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Deal Collections Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 bg-rose-50 text-rose-700 text-xs font-bold rounded">
                Flat {deal.discountPercentage}% OFF
              </span>
              <h3 className="text-base font-bold text-slate-900 font-display">{deal.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{deal.description}</p>
            </div>

            <button
              onClick={() => onNavigate('shop', { isDeal: true })}
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Shop Deal Items</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Products under Deals */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">Today's Discounted Products</h2>
            <p className="text-xs text-slate-500 mt-0.5">High-discount items verified in stock</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {dealProducts.length} Deals Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
