import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Headphones, CreditCard } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, meta?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Genuine Products</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sourced directly from verified brands and artisans</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-emerald-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7 Days Easy Return</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free doorstep pickup & quick refund</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Pan-India Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Free standard shipping on orders above ₹999</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-purple-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Customer assistance 7 days a week (9 AM - 9 PM)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="font-display font-bold text-2xl text-white tracking-tight">
            NOVA<span className="text-blue-500">CART</span>
          </span>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            India's modern e-commerce marketplace for curated electronics, flagships, ethnic fashion, artisanal cookware, and gourmet spices.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <span>Corporate HQ: Outer Ring Road, Bengaluru, Karnataka 560103</span>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Categories</h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('shop', { category: 'electronics' })} className="hover:text-white transition-colors">
                Electronics & Audio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'mobiles' })} className="hover:text-white transition-colors">
                Mobiles & 5G Flagships
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'fashion' })} className="hover:text-white transition-colors">
                Handloom & Fashion
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'home-kitchen' })} className="hover:text-white transition-colors">
                Home & Kitchen Essentials
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'grocery' })} className="hover:text-white transition-colors">
                Gourmet Spices & Dry Fruits
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Customer Service</h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('account')} className="hover:text-white transition-colors">
                Track My Order
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('account')} className="hover:text-white transition-colors">
                Shipping & Returns Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('deals')} className="hover:text-white transition-colors">
                Deals & Promo Coupons
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                Merchant / Admin Portal
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Accepted Payment Modes</h5>
          <p className="text-xs text-slate-400 mb-3">
            100% secure payments powered by Razorpay test gateway and Cash on Delivery.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">UPI / GPay / PhonePe</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">RuPay</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Visa / Mastercard</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 NOVA CART India Retail Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};
