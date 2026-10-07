import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { Product, Category } from '../types/index.ts';
import { ProductCard } from '../components/ProductCard.tsx';

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onSelectProduct
}) => {
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [minRating, setMinRating] = useState<number>(0);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter(p => p.categoryId.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
      );
    }

    // Price filter
    list = list.filter(p => p.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      list = list.filter(p => p.rating >= minRating);
    }

    // Sort
    if (selectedSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'discount') {
      list.sort((a, b) => b.discount - a.discount);
    }

    return list;
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, selectedSort]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setMaxPrice(100000);
    setMinRating(0);
    setSelectedSort('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            {selectedCategory === 'all'
              ? 'All Products'
              : categories.find(c => c.id === selectedCategory)?.name || 'Catalog'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <strong className="text-slate-800 tabular-nums">{filteredProducts.length}</strong> items matching your selection
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 py-2 px-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating (Highest)</option>
              <option value="discount">Discount (% Off)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
        
        {/* Sidebar Filters */}
        <aside className={`md:block space-y-6 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Category</h4>
              <div className="space-y-1">
                <button
                  onClick={() => onSelectCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] text-slate-400 tabular-nums">{products.length}</span>
                </button>
                {categories.map((c) => {
                  const count = products.filter(p => p.categoryId === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => onSelectCategory(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === c.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-[11px] text-slate-400 tabular-nums">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className="text-blue-600 font-mono font-bold tabular-nums">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Customer Rating</h4>
              <div className="space-y-1.5">
                {[4, 3, 2].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === stars}
                      onChange={() => setMinRating(stars)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{stars}★ & above</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>All Ratings</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any products matching your active filters or search terms. Try clearing filters or searching for something else.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
