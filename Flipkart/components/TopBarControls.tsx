import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const TopBarControls: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    screen,
    setScreen,
    currency,
    setCurrency,
    cartTotalCount
  } = useApp();

  const screens: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'pdp', label: 'Product Details', icon: 'headphones' },
    { id: 'cart', label: `Cart (${cartTotalCount})`, icon: 'shopping_cart' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <div className="bg-[#191c1e] text-white py-2 px-3 sm:px-6 sticky top-0 z-50 shadow-md flex items-center justify-between gap-2 flex-wrap border-b border-white/10">
      {/* Left: View Mode Toggle */}
      <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl">
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            viewMode === 'mobile'
              ? 'bg-[#0056c3] text-white shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Mobile App View (Flipkart Style)"
        >
          <span className="material-symbols-outlined text-[16px]">smartphone</span>
          <span className="hidden sm:inline">Mobile App View</span>
          <span className="sm:hidden">Mobile</span>
        </button>

        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            viewMode === 'desktop'
              ? 'bg-[#4f46e5] text-white shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Desktop Storefront (Nova Cart)"
        >
          <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
          <span className="hidden sm:inline">Desktop Storefront</span>
          <span className="sm:hidden">Desktop</span>
        </button>
      </div>

      {/* Center: Screen Shortcut Navigator */}
      <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
        {screens.map(s => {
          const isActive = screen === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setScreen(s.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Currency Toggle */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white/10 rounded-lg p-0.5 text-xs font-bold">
          <button
            onClick={() => setCurrency('INR')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              currency === 'INR' ? 'bg-[#0056c3] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              currency === 'USD' ? 'bg-[#0056c3] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            $ USD
          </button>
        </div>
      </div>
    </div>
  );
};
