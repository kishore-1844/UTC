import React from 'react';
import { useApp } from '../../context/AppContext';
import { NOVA_CART_LOGO } from '../../data/products';

export const DesktopHeader: React.FC = () => {
  const {
    screen,
    setScreen,
    cartTotalCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency
  } = useApp();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top micro-announcement bar */}
      <div className="w-full bg-[#4f46e5] text-white py-1.5 px-6 text-center text-xs font-medium flex items-center justify-between">
        <div className="hidden sm:block text-[11px] opacity-80">Welcome to Nova Cart • Premier Retail</div>
        <div className="mx-auto sm:mx-0">Free delivery on orders above ₹499 • Easy returns • Secure payments</div>
        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span>Currency:</span>
          <button
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="font-bold underline cursor-pointer"
          >
            {currency === 'INR' ? '₹ INR (Switch to $ USD)' : '$ USD (Switch to ₹ INR)'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => setScreen('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <img
            src={NOVA_CART_LOGO}
            alt="Nova Cart Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-2xl tracking-tight text-[#3525cd] font-inter">
            Nova Cart
          </span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              if (screen !== 'explore' && e.target.value.trim().length > 0) {
                setScreen('explore');
              }
            }}
            className="w-full bg-[#f2f3ff] pl-11 pr-4 py-2.5 rounded-full border border-slate-300/70 text-sm text-[#131b2e] focus:outline-none focus:border-[#4f46e5] focus:bg-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setScreen('home')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              screen === 'home'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setScreen('explore')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              screen === 'explore' || screen === 'pdp'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => {
              setScreen('explore');
            }}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Deals
          </button>
          <button
            onClick={() => setScreen('profile')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              screen === 'profile'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Account
          </button>
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <button
            onClick={() => setScreen('explore')}
            className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-[24px]">favorite</span>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#4f46e5] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setScreen('cart')}
            className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {cartTotalCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#4f46e5] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button
            onClick={() => setScreen('profile')}
            className="w-9 h-9 rounded-full bg-[#4f46e5] flex items-center justify-center text-white shadow-xs hover:bg-[#3525cd] transition-colors"
            title="Profile"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
