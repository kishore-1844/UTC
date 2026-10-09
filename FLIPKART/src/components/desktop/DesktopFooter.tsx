import React from 'react';
import { useApp } from '../../context/AppContext';

export const DesktopFooter: React.FC = () => {
  const { setScreen, setIsSupportModalOpen } = useApp();

  return (
    <footer className="w-full bg-[#f2f3ff] py-16 mt-16 border-t border-slate-200/80 text-[#131b2e]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1 */}
        <div>
          <h4 className="font-bold text-base text-slate-900 mb-4">About Nova Cart</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <button onClick={() => setScreen('home')} className="hover:text-[#3525cd] transition-colors">
                About Us
              </button>
            </li>
            <li>
              <a href="#careers" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#3525cd] transition-colors">
                Careers &amp; Culture
              </a>
            </li>
            <li>
              <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-[#3525cd] transition-colors">
                Contact &amp; Press
              </button>
            </li>
          </ul>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-bold text-base text-slate-900 mb-4">Help &amp; Support</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-[#3525cd] transition-colors">
                Help Center
              </button>
            </li>
            <li>
              <a href="#shipping" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#3525cd] transition-colors">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#returns" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#3525cd] transition-colors">
                Return &amp; Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-bold text-base text-slate-900 mb-4">Policies</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#3525cd] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#3525cd] transition-colors">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#security" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#3525cd] transition-colors">
                Security Standards
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-bold text-base text-slate-900 mb-4">Connect &amp; Pay</h4>
          <div className="flex gap-4 text-slate-600 mb-4">
            <span className="material-symbols-outlined hover:text-[#3525cd] cursor-pointer">share</span>
            <span className="material-symbols-outlined hover:text-[#3525cd] cursor-pointer">public</span>
            <span
              onClick={() => setIsSupportModalOpen(true)}
              className="material-symbols-outlined hover:text-[#3525cd] cursor-pointer"
            >
              chat
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2 font-medium">100% Secure Payment Gateways</p>
          <div className="flex gap-2 text-slate-400">
            <span className="material-symbols-outlined" title="UPI & QR">payments</span>
            <span className="material-symbols-outlined" title="Credit / Debit Card">credit_card</span>
            <span className="material-symbols-outlined" title="Net Banking">account_balance</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-300/60 pt-6 text-center text-xs text-slate-500">
        © 2026 Nova Cart Retail Inc. All rights reserved.
      </div>
    </footer>
  );
};
