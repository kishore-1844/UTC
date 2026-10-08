import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AVAILABLE_COUPONS } from '../../data/products';
import { Coupon } from '../../types';

export const CouponsModal: React.FC = () => {
  const { isCouponModalOpen, setIsCouponModalOpen, activeCoupon, applyCoupon, formatPrice } = useApp();
  const [customCode, setCustomCode] = useState('');

  if (!isCouponModalOpen) return null;

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCode.trim()) return;
    const found = AVAILABLE_COUPONS.find(c => c.code.toLowerCase() === customCode.trim().toLowerCase());
    if (found) {
      applyCoupon(found);
      setIsCouponModalOpen(false);
    } else {
      // Mock valid custom coupon
      const newCoupon: Coupon = {
        code: customCode.toUpperCase(),
        title: 'Special Promo Code',
        description: 'Instant discount applied from voucher code',
        discountINR: 250,
        discountUSD: 3.50,
        minOrderINR: 500,
        minOrderUSD: 10.00
      };
      applyCoupon(newCoupon);
      setIsCouponModalOpen(false);
    }
    setCustomCode('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200">
        <div className="px-6 py-4 bg-[#f2f4f7] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0056c3]">local_offer</span>
            <h3 className="font-bold text-slate-900 text-base">Coupons &amp; Offers</h3>
          </div>
          <button
            onClick={() => setIsCouponModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Custom coupon form */}
          <form onSubmit={handleApplyCustom} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={customCode}
              onChange={e => setCustomCode(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono uppercase tracking-wider focus:outline-none focus:border-[#0056c3]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0056c3] text-white rounded-xl text-sm font-bold hover:bg-[#004299] transition-colors"
            >
              Apply
            </button>
          </form>

          {/* List of Coupons */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Offers</p>
            {AVAILABLE_COUPONS.map(coupon => {
              const isApplied = activeCoupon?.code === coupon.code;
              return (
                <div
                  key={coupon.code}
                  className={`p-4 rounded-xl border transition-all ${
                    isApplied ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-[#0056c3] font-mono text-xs font-bold rounded">
                          {coupon.code}
                        </span>
                        <span className="text-xs font-bold text-emerald-700">
                          Save {formatPrice(coupon.discountINR, coupon.discountUSD)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mt-1">{coupon.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{coupon.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (isApplied) {
                          applyCoupon(null);
                        } else {
                          applyCoupon(coupon);
                          setIsCouponModalOpen(false);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isApplied
                          ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          : 'bg-[#0056c3] text-white hover:bg-[#004299]'
                      }`}
                    >
                      {isApplied ? 'Remove' : 'Apply'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
