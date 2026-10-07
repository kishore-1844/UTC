import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Search, ShieldCheck, Tag, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../context/WishlistContext.tsx';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, meta?: any) => void;
  onOpenAuth: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  searchQuery,
  setSearchQuery
}) => {
  const { user, isAdmin, logout, switchDemoRole } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Promotional Top Trust Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-300">
            <span>🇮🇳 All-India Express Delivery</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">Free Shipping on orders ₹999+</span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">Use code <strong className="text-amber-300 font-mono">NOVA10</strong> for 10% off</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Current Role:</span>
            <button
              onClick={() => switchDemoRole(isAdmin ? 'customer' : 'admin')}
              className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
              title="Click to toggle between Customer and Admin role"
            >
              {isAdmin ? 'Admin Mode (Click for Customer)' : 'Customer Mode (Click for Admin)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left font-display font-bold text-2xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <span>NOVA</span>
              <span className="text-blue-600">CART</span>
            </button>
          </div>

          {/* Search Bar (Flipkart style centered search) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentTab !== 'shop') onNavigate('shop');
                }}
                placeholder="Search for Mobiles, Electronics, Kurtas, Kitchen & more..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Zone 2: Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-slate-900 transition-colors py-1 ${currentTab === 'home' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-slate-900 transition-colors py-1 ${currentTab === 'shop' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''}`}
            >
              Shop All
            </button>
            <button
              onClick={() => onNavigate('deals')}
              className={`hover:text-slate-900 transition-colors py-1 flex items-center gap-1 ${currentTab === 'deals' ? 'text-rose-600 font-semibold border-b-2 border-rose-600' : 'text-rose-600 hover:text-rose-700'}`}
            >
              <Tag className="w-3.5 h-3.5" />
              Deals & Offers
            </button>
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className={`transition-colors py-1 flex items-center gap-1 ${currentTab === 'admin' ? 'text-amber-600 font-semibold border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-700'}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-700" />
              {cart.itemCount > 0 && (
                <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                  {cart.itemCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-medium text-slate-700"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase">
                      {user.fullName.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">{user.fullName}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-800 truncate">{user.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-mono uppercase bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          {user.role}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('account');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        My Account & Orders
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('wishlist');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        My Wishlist ({wishlist.length})
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onNavigate('admin');
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-amber-700 font-medium hover:bg-amber-50 transition-colors"
                        >
                          Admin Console
                        </button>
                      )}
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentTab !== 'shop') onNavigate('shop');
              }}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md font-medium"
            >
              Shop All Categories
            </button>
            <button
              onClick={() => {
                onNavigate('deals');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-md font-medium"
            >
              Deals & Offers
            </button>
            <button
              onClick={() => {
                onNavigate('account');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md font-medium"
            >
              My Account & Orders
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  onNavigate('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-md font-medium"
              >
                Admin Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
