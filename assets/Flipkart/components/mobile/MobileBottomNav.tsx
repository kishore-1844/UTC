import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { screen, setScreen, cartTotalCount } = useApp();

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'cart', label: 'Cart', icon: 'shopping_cart' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#f7f9fc]/95 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map(item => {
          const isActive = screen === item.id || (item.id === 'explore' && screen === 'pdp');
          return (
            <button
              key={item.id}
              onClick={() => {
                setScreen(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-14 transition-all relative ${
                isActive ? 'text-[#0056c3] font-bold' : 'text-[#424754] hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : {}}
                >
                  {item.icon}
                </span>
                {item.id === 'cart' && cartTotalCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#0056c3] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
