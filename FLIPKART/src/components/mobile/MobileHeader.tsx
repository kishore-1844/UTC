import React from 'react';
import { useApp } from '../../context/AppContext';
import { FLIPKART_BAG_LOGO } from '../../data/products';

export const MobileHeader: React.FC = () => {
  const { screen, setScreen, cartTotalCount, searchQuery, setSearchQuery } = useApp();

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#f7f9fc]/90 backdrop-blur-xl border-b border-slate-200/60 pt-safe">
      <div className="h-16 px-4 flex items-center justify-between gap-2.5">
        {/* Left: Back button (if PDP) or Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          {screen === 'pdp' ? (
            <button
              onClick={() => setScreen('explore')}
              className="w-9 h-9 flex items-center justify-center text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors"
              title="Go back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
          ) : (
            <button
              onClick={() => setScreen('home')}
              className="flex items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <img
                src={FLIPKART_BAG_LOGO}
                alt="Nova Cart / Shop Logo"
                className="h-8 w-auto object-contain"
              />
            </button>
          )}
        </div>

        {/* Center: Search Input */}
        <div className="flex-1 relative flex items-center min-w-0">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search for products, brands..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              if (screen !== 'explore' && e.target.value.trim().length > 0) {
                setScreen('explore');
              }
            }}
            className="w-full h-10 pl-9 pr-3 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#191c1e] rounded-xl text-xs sm:text-sm outline-none placeholder:text-slate-400 transition-colors focus:bg-white focus:ring-2 focus:ring-[#0056c3]/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-[12px]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: Cart & Profile Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setScreen('cart')}
            className="w-10 h-10 flex items-center justify-center text-slate-700 relative hover:bg-slate-200/60 rounded-full transition-colors"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {cartTotalCount > 0 && (
              <span className="absolute 1 top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-scaleIn">
                {cartTotalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setScreen('profile')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
              screen === 'profile' ? 'bg-[#0056c3] ring-2 ring-blue-300' : 'bg-[#0056c3]'
            }`}
            title="User Profile"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
