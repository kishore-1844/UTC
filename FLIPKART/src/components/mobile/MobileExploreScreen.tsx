import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const MobileExploreScreen: React.FC = () => {
  const {
    openProduct,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    searchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'price-low' | 'price-high' | 'rating-4' | 'discount-50'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (activeFilterTab === 'rating-4') {
      result = result.filter(p => p.rating >= 4.0);
    } else if (activeFilterTab === 'discount-50') {
      result = result.filter(p => p.discountPercent >= 50);
    }

    if (activeFilterTab === 'price-low' || sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (activeFilterTab === 'price-high' || sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, activeFilterTab, sortBy]);

  return (
    <div className="flex flex-col w-full pb-24 pt-2">
      {/* Category header indicator if active */}
      {selectedCategory && (
        <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-xl border border-blue-100 mb-2">
          <span className="text-xs font-semibold text-[#0056c3] capitalize">
            Filtered by Category: <strong>{selectedCategory}</strong>
          </span>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Clear ✕
          </button>
        </div>
      )}

      {/* Filter Chips Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 -mx-4 px-4 no-scrollbar mb-3">
        <button
          onClick={() => {
            setActiveFilterTab('all');
            setSelectedBrand('all');
            setSelectedCategory(null);
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 shadow-xs transition-all ${
            activeFilterTab === 'all' && selectedBrand === 'all' && !selectedCategory
              ? 'bg-[#0056c3] text-white'
              : 'bg-[#f2f4f7] text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">tune</span>
          <span>All Filters</span>
        </button>

        <button
          onClick={() => {
            setActiveFilterTab(prev => (prev === 'price-low' ? 'all' : 'price-low'));
            setSortBy('price-asc');
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 shadow-xs transition-all ${
            activeFilterTab === 'price-low'
              ? 'bg-[#0056c3] text-white'
              : 'bg-[#f2f4f7] text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>Price: Low to High</span>
          <span className="material-symbols-outlined text-[15px]">expand_more</span>
        </button>

        <button
          onClick={() => {
            setActiveFilterTab(prev => (prev === 'rating-4' ? 'all' : 'rating-4'));
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 shadow-xs transition-all ${
            activeFilterTab === 'rating-4'
              ? 'bg-[#0056c3] text-white'
              : 'bg-[#f2f4f7] text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>4★ &amp; above</span>
        </button>

        <button
          onClick={() => {
            setActiveFilterTab(prev => (prev === 'discount-50' ? 'all' : 'discount-50'));
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 shadow-xs transition-all ${
            activeFilterTab === 'discount-50'
              ? 'bg-[#0056c3] text-white'
              : 'bg-[#f2f4f7] text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>Discount: 50% off</span>
        </button>
      </div>

      {/* Sort & Results Count Bar */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <span className="text-xs text-slate-600">
          Showing <span className="font-bold text-slate-900">{filteredProducts.length} items</span>
        </span>

        <div className="flex items-center gap-1.5">
          <label className="text-xs text-slate-500 font-medium">Sort:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="text-xs font-bold text-[#0056c3] bg-transparent border-none outline-none cursor-pointer pr-1"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <span className="material-symbols-outlined text-[#0056c3] text-[16px]">sort</span>
        </div>
      </div>

      {/* Two-Column Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map(product => {
          const wish = isWishlisted(product.id);
          return (
            <div
              key={product.id}
              onClick={() => openProduct(product)}
              className="bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200/60 flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition-all"
            >
              {/* Wishlist Heart */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 shadow-xs ${
                  wish ? 'text-[#ba1a1a]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[17px]"
                  style={wish ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>

              {/* Product Image + Discount */}
              <div className="w-full h-40 sm:h-44 bg-[#f2f4f7] relative overflow-hidden flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 bg-[#fd9e00] text-[#653c00] px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
                  {product.discountPercent}% OFF
                </div>
              </div>

              {/* Details */}
              <div className="p-3 flex flex-col flex-1 justify-between gap-1">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    {product.brand}
                  </span>
                  <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 mt-0.5 leading-snug">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <div className="bg-[#0b6b1d] text-white px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] font-bold">
                    <span>{product.rating}</span>
                    <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
                </div>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(product.priceINR, product.priceUSD)}
                  </span>
                  <span className="text-[11px] text-slate-400 line-through">
                    {formatPrice(product.originalPriceINR, product.originalPriceUSD)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
          <p className="text-sm font-medium text-slate-600">No products found matching your search</p>
          <button
            onClick={() => {
              setActiveFilterTab('all');
              setSelectedBrand('all');
              setSelectedCategory(null);
            }}
            className="px-4 py-2 bg-[#0056c3] text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
