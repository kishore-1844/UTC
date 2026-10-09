import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, HERO_BANNERS } from '../../data/products';

export const MobileHomeScreen: React.FC = () => {
  const { openProduct, addToCart, toggleWishlist, isWishlisted, formatPrice, setScreen, setSelectedCategory } = useApp();

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Flash Deals Countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (num: number) => num.toString().padStart(2, '0');

  const flashDealProducts = PRODUCTS.filter(p => p.isFlashDeal || p.discountPercent >= 40).slice(0, 4);
  const recommendedProducts = PRODUCTS.filter(p => p.isRecommended).slice(0, 6);

  const categories = [
    { id: 'mobiles', label: 'Mobiles', icon: 'smartphone' },
    { id: 'electronics', label: 'Electronics', icon: 'devices' },
    { id: 'fashion', label: 'Fashion', icon: 'checkroom' },
    { id: 'grocery', label: 'Grocery', icon: 'shopping_basket' },
    { id: 'appliances', label: 'Appliances', icon: 'kitchen' },
    { id: 'accessories', label: 'Watches', icon: 'watch' },
    { id: 'home', label: 'Home Decor', icon: 'chair' }
  ];

  return (
    <div className="flex flex-col w-full gap-4 pb-24 pt-2">
      {/* Promotional Banner Carousel */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#1f6feb] shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HERO_BANNERS.map((banner, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 flex items-center justify-between p-4 text-white relative overflow-hidden ${banner.bgClass}`}
            >
              <div className="absolute right-0 bottom-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex flex-col gap-1 z-10 max-w-[62%]">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fd9e00] text-[#653c00] px-2 py-0.5 rounded w-max">
                  {banner.tag}
                </span>
                <h2 className="font-bold text-xl leading-tight text-white mt-0.5">
                  {banner.title}
                </h2>
                <p className="text-xs text-white/90 line-clamp-2 mt-0.5">
                  {banner.subtitle}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(index === 0 ? 'electronics' : 'fashion');
                    setScreen('explore');
                  }}
                  className="mt-2.5 bg-white text-[#0056c3] font-bold text-xs px-3.5 py-2 rounded-xl w-max shadow-sm active:scale-95 transition-transform"
                >
                  {banner.cta}
                </button>
              </div>

              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-md relative z-10 flex items-center justify-center bg-black/10 shrink-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-20">
          {HERO_BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-5 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Horizontal Category Shortcuts */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-900 text-sm">Categories</h3>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setScreen('explore');
            }}
            className="text-xs font-bold text-[#0056c3] hover:underline"
          >
            See All
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-1 -mx-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setScreen('explore');
              }}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none"
            >
              <div className="w-14 h-14 rounded-full bg-[#f2f4f7] group-hover:bg-blue-100 flex items-center justify-center shadow-xs transition-colors border border-slate-200/50">
                <span className="material-symbols-outlined text-[#0056c3] text-[24px]">
                  {cat.icon}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-800">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Deals Section */}
      <div className="flex flex-col gap-3 bg-[#f2f4f7] rounded-2xl p-3.5 border border-slate-200/60 shadow-xs">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#fd9e00] animate-pulse text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Flash Deals</h3>
          </div>
          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg text-xs font-bold text-[#875200] shadow-xs border border-amber-200/50">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span className="font-mono tracking-wider">
              {formatTimer(timeLeft.hours)} : {formatTimer(timeLeft.minutes)} : {formatTimer(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {flashDealProducts.map(product => (
            <div
              key={product.id}
              onClick={() => openProduct(product)}
              className="w-36 flex-shrink-0 bg-white rounded-xl p-2.5 flex flex-col gap-1.5 shadow-xs border border-slate-200/60 relative group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="absolute top-2 left-2 z-10 bg-[#ba1a1a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                {product.discountPercent}% OFF
              </div>
              <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-semibold truncate text-slate-900 mt-0.5">
                {product.name}
              </span>
              <div className="flex items-baseline gap-1.5 mt-auto">
                <span className="text-sm font-bold text-[#0056c3]">
                  {formatPrice(product.priceINR, product.priceUSD)}
                </span>
                <span className="text-[11px] text-slate-400 line-through">
                  {formatPrice(product.originalPriceINR, product.originalPriceUSD)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended For You (2-Column Product Grid) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center px-1">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recommended For You</h3>
            <span className="text-[11px] text-slate-500">Based on your browsing</span>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setScreen('explore');
            }}
            className="text-xs font-bold text-[#0056c3]"
          >
            View More
          </button>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.map(product => {
            const wish = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                onClick={() => openProduct(product)}
                className="bg-white rounded-xl p-2.5 flex flex-col gap-1.5 shadow-xs border border-slate-200/60 relative group cursor-pointer hover:shadow-md transition-all"
              >
                {/* Wishlist button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors ${
                    wish ? 'text-[#ba1a1a]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={wish ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </button>

                {/* Discount Badge */}
                <div className="absolute top-2.5 left-2.5 z-10 bg-[#0b6b1d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                  {product.discountPercent}% OFF
                </div>

                <div className="w-full h-36 sm:h-40 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <span className="text-xs font-semibold line-clamp-2 text-slate-900 mt-1 leading-snug">
                  {product.name}
                </span>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-[#2e8534] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                    <span>{product.rating}</span>
                    <span className="material-symbols-outlined text-[10px] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <span className="text-[11px] text-slate-400">({product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})</span>
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between mt-auto pt-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">
                      {formatPrice(product.priceINR, product.priceUSD)}
                    </span>
                    <span className="text-[11px] text-slate-400 line-through">
                      {formatPrice(product.originalPriceINR, product.originalPriceUSD)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-8 h-8 rounded-xl bg-[#0056c3] hover:bg-[#004299] active:scale-95 text-white flex items-center justify-center shadow-xs transition-transform"
                    title="Add to Cart"
                  >
                    <span className="material-symbols-outlined text-[17px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
