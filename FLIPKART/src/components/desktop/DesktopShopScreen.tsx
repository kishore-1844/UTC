import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const DesktopShopScreen: React.FC = () => {
  const { openProduct, addToCart, toggleWishlist, isWishlisted, formatPrice, searchQuery } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');

  const brands = ['Nova Audio', 'Chronos', 'Velocity', 'Apex', 'GameTech', 'Nomad', 'BrewMaster', 'Zenith', 'Aura'];

  const toggleBrand = (b: string) => {
    setSelectedBrands(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range) ? prev.filter(x => x !== range) : [...prev, range]
    );
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      list = list.filter(p => p.category === categoryFilter);
    }

    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedPriceRanges.length > 0) {
      list = list.filter(p => {
        return selectedPriceRanges.some(range => {
          if (range === 'under-1000') return p.priceINR < 1000;
          if (range === '1000-5000') return p.priceINR >= 1000 && p.priceINR <= 5000;
          if (range === '5000-15000') return p.priceINR >= 5000 && p.priceINR <= 15000;
          if (range === 'over-15000') return p.priceINR > 15000;
          return true;
        });
      });
    }

    if (minRating > 0) {
      list = list.filter(p => p.rating >= minRating);
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, categoryFilter, selectedBrands, selectedPriceRanges, minRating, sortBy]);

  return (
    <div className="w-full pt-28 bg-[#faf8ff] text-[#131b2e] min-h-screen">
      {/* Top Controls Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-6 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200/60">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-bold text-3xl text-slate-900">All Products</h1>
          <span className="text-slate-500 text-sm font-medium">({filteredProducts.length} items)</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-[#f2f3ff] text-slate-800 px-4 py-2.5 rounded-xl border border-slate-300/80 text-sm focus:outline-none focus:border-[#4f46e5] pr-10 appearance-none cursor-pointer font-medium"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home &amp; Kitchen</option>
              <option value="accessories">Accessories</option>
              <option value="mobiles">Mobiles</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
              expand_more
            </span>
          </div>

          {/* Sort by Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#f2f3ff] text-slate-800 px-4 py-2.5 rounded-xl border border-slate-300/80 text-sm focus:outline-none focus:border-[#4f46e5] pr-10 appearance-none cursor-pointer font-medium"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
              expand_more
            </span>
          </div>

          <button
            onClick={() => {
              setCategoryFilter('all');
              setSelectedBrands([]);
              setSelectedPriceRanges([]);
              setMinRating(0);
              setSortBy('featured');
            }}
            className="flex items-center gap-1.5 bg-[#e2e7ff] hover:bg-[#d0d7fd] text-[#3525cd] px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar + 4-column Product Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
        {/* Left Sidebar for Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-[#f2f3ff] p-6 rounded-2xl border border-slate-200/60 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-base text-slate-900 mb-3">Categories</h3>
              <div className="space-y-2 text-sm text-slate-700">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'electronics', label: 'Electronics' },
                  { id: 'accessories', label: 'Wearables' },
                  { id: 'fashion', label: 'Footwear & Apparel' },
                  { id: 'appliances', label: 'Home Appliances' },
                  { id: 'home', label: 'Home & Living' }
                ].map(cat => (
                  <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                    <input
                      type="radio"
                      name="catRadio"
                      checked={categoryFilter === cat.id}
                      onChange={() => setCategoryFilter(cat.id)}
                      className="accent-[#3525cd]"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-base text-slate-900 mb-3">Price Range</h3>
              <div className="space-y-2 text-sm text-slate-700">
                {[
                  { id: 'under-1000', label: 'Under ₹1,000 / $15' },
                  { id: '1000-5000', label: '₹1,000 - ₹5,000 / $15 - $60' },
                  { id: '5000-15000', label: '₹5,000 - ₹15,000 / $60 - $180' },
                  { id: 'over-15000', label: 'Over ₹15,000 / $180' }
                ].map(r => (
                  <label key={r.id} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(r.id)}
                      onChange={() => togglePriceRange(r.id)}
                      className="rounded accent-[#3525cd]"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <h3 className="font-bold text-base text-slate-900 mb-3">Brand</h3>
              <div className="space-y-2 text-sm text-slate-700 max-h-48 overflow-y-auto pr-1">
                {brands.map(b => (
                  <label key={b} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="rounded accent-[#3525cd]"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Rating */}
            <div>
              <h3 className="font-bold text-base text-slate-900 mb-3">Customer Rating</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <label className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                  <input
                    type="radio"
                    name="ratingRadio"
                    checked={minRating === 4}
                    onChange={() => setMinRating(4)}
                    className="accent-[#3525cd]"
                  />
                  <span>4 Stars &amp; above</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                  <input
                    type="radio"
                    name="ratingRadio"
                    checked={minRating === 3}
                    onChange={() => setMinRating(3)}
                    className="accent-[#3525cd]"
                  />
                  <span>3 Stars &amp; above</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                  <input
                    type="radio"
                    name="ratingRadio"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    className="accent-[#3525cd]"
                  />
                  <span>All Ratings</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Right 4-column Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const wish = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                onClick={() => openProduct(product)}
                className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-[0_4px_20px_rgba(79,70,229,0.06)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] border border-slate-200/70 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#f2f3ff] mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#3525cd] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {product.discountPercent}% OFF
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-colors shadow-xs ${
                      wish ? 'text-[#ba1a1a]' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={wish ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-xs text-slate-700 font-bold">{product.rating}</span>
                      <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1 group-hover:text-[#3525cd] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-bold text-base text-slate-900">
                        {formatPrice(product.priceINR, product.priceUSD)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(product.originalPriceINR, product.originalPriceUSD)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-[#3525cd] hover:bg-[#4f46e5] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
