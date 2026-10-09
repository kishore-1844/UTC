import React from 'react';
import { useApp } from '../../context/AppContext';

export const MobileCartScreen: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotalCount,
    cartSubtotalINR,
    cartSubtotalUSD,
    cartTotalSavingsINR,
    cartTotalSavingsUSD,
    activeCoupon,
    defaultAddress,
    formatPrice,
    setScreen,
    openProduct,
    setIsAddressModalOpen,
    setIsCouponModalOpen,
    setIsCheckoutModalOpen
  } = useApp();

  const couponDiscountINR = activeCoupon ? activeCoupon.discountINR : 0;
  const couponDiscountUSD = activeCoupon ? activeCoupon.discountUSD : 0;

  const totalPayableINR = Math.max(0, cartSubtotalINR - couponDiscountINR);
  const totalPayableUSD = Math.max(0, cartSubtotalUSD - couponDiscountUSD);

  const totalMrpINR = cart.reduce((acc, item) => acc + item.product.originalPriceINR * item.quantity, 0);
  const totalMrpUSD = cart.reduce((acc, item) => acc + item.product.originalPriceUSD * item.quantity, 0);

  const discountOnMrpINR = totalMrpINR - cartSubtotalINR;
  const discountOnMrpUSD = totalMrpUSD - cartSubtotalUSD;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">Your Cart is Empty</h3>
        <p className="text-xs text-slate-500 max-w-xs">
          Explore our trending tech, fashion, and home lifestyle collections to add items.
        </p>
        <button
          onClick={() => setScreen('explore')}
          className="px-6 py-2.5 bg-[#0056c3] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#004299]"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-3.5 pb-36 pt-1">
      {/* Savings Banner */}
      <div
        onClick={() => setIsCouponModalOpen(true)}
        className="bg-[#2e8534] text-[#f7fff1] rounded-2xl p-3.5 flex items-center justify-between shadow-xs cursor-pointer active:opacity-95 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">savings</span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">
              You're saving {formatPrice(cartTotalSavingsINR, cartTotalSavingsUSD)} on this order!
            </h3>
            <p className="text-xs text-white/80">
              {activeCoupon ? `Coupon "${activeCoupon.code}" applied` : 'Extra discount applied via SuperCoins'}
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-white/70 text-[20px]">chevron_right</span>
      </div>

      {/* Delivery Estimate Bar */}
      <div className="bg-[#f2f4f7] rounded-2xl p-3.5 flex items-center gap-3 border border-slate-200/60 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-[#d9e2ff] text-[#001944] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">local_shipping</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 truncate">
              Deliver to {defaultAddress.title} - {defaultAddress.pincode}
            </span>
            <span className="bg-[#9df898] text-[#005312] px-1.5 py-0.5 rounded text-[10px] font-bold">
              FREE
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate">Guaranteed delivery by Tomorrow, 12:00 PM</p>
        </div>
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="text-[#0056c3] font-bold text-xs hover:underline shrink-0"
        >
          Change
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-slate-900 text-sm px-1">
          Cart Items ({cartTotalCount})
        </h2>

        {cart.map((item) => (
          <div
            key={item.product.id}
            className="bg-white rounded-2xl p-3.5 flex gap-3 border border-slate-200/60 shadow-xs relative"
          >
            {/* Image */}
            <div
              onClick={() => openProduct(item.product)}
              className="w-20 h-20 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden relative cursor-pointer"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1 left-1 bg-[#fd9e00] text-[#653c00] text-[9px] font-bold px-1 rounded">
                {item.product.discountPercent}% OFF
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-1">
                  <h3
                    onClick={() => openProduct(item.product)}
                    className="text-xs font-semibold text-slate-900 line-clamp-1 cursor-pointer hover:text-[#0056c3]"
                  >
                    {item.product.name}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-[#ba1a1a] transition-colors p-1"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Color: {item.selectedColor || item.product.colors?.[0]?.name || 'Standard'}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(item.product.priceINR * item.quantity, item.product.priceUSD * item.quantity)}
                  </span>
                  <span className="text-[11px] text-slate-400 line-through">
                    {formatPrice(item.product.originalPriceINR * item.quantity, item.product.originalPriceUSD * item.quantity)}
                  </span>
                </div>

                {/* Quantity Adjuster */}
                <div className="flex items-center bg-[#f2f4f7] border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="w-7 text-center font-bold text-xs text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offers & Coupons */}
      <div
        onClick={() => setIsCouponModalOpen(true)}
        className="bg-[#f2f4f7] rounded-2xl p-3.5 flex items-center justify-between border border-slate-200/60 shadow-xs cursor-pointer hover:bg-slate-200/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#0056c3]">local_offer</span>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Available Offers &amp; Coupons</h4>
            <p className="text-[11px] text-slate-500">
              {activeCoupon ? `Code "${activeCoupon.code}" applied (-${formatPrice(couponDiscountINR, couponDiscountUSD)})` : 'Click to select coupon code'}
            </p>
          </div>
        </div>
        <button className="text-[#0056c3] font-bold text-xs flex items-center gap-0.5">
          View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Price Details Summary */}
      <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 border border-slate-200/60 shadow-xs">
        <h3 className="font-bold text-sm text-slate-900">Price Details ({cartTotalCount} Items)</h3>
        
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Total MRP</span>
            <span>{formatPrice(totalMrpINR, totalMrpUSD)}</span>
          </div>

          <div className="flex justify-between text-[#0b6b1d] font-medium">
            <span>Discount on MRP</span>
            <span>- {formatPrice(discountOnMrpINR, discountOnMrpUSD)}</span>
          </div>

          {activeCoupon && (
            <div className="flex justify-between text-[#0b6b1d] font-medium">
              <span>Coupon Discount ({activeCoupon.code})</span>
              <span>- {formatPrice(couponDiscountINR, couponDiscountUSD)}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Delivery Charges</span>
            <div className="flex items-center gap-1.5">
              <span className="line-through text-slate-400">
                {formatPrice(40, 1.00)}
              </span>
              <span className="text-[#0b6b1d] font-bold">FREE</span>
            </div>
          </div>

          <div className="h-[1px] bg-slate-200 my-1"></div>

          <div className="flex justify-between font-bold text-sm text-slate-900 pt-0.5">
            <span>Total Amount</span>
            <span>{formatPrice(totalPayableINR, totalPayableUSD)}</span>
          </div>
        </div>
      </div>

      {/* Safe & Secure Checkout Guarantee */}
      <div className="flex items-center justify-center gap-2 text-slate-400 py-1 text-center">
        <span className="material-symbols-outlined text-[18px]">verified_user</span>
        <span className="text-[11px] font-medium">Safe and Secure Payments. 100% Authentic Products.</span>
      </div>

      {/* Sticky Bottom Checkout Action Bar */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-[#f7f9fc]/95 backdrop-blur-xl px-4 py-3 border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Total Payable</span>
          <span className="text-lg font-bold text-slate-900">{formatPrice(totalPayableINR, totalPayableUSD)}</span>
        </div>

        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          className="flex-1 max-w-[210px] h-12 bg-[#fd9e00] hover:bg-[#e08b00] active:scale-95 text-[#653c00] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <span>Place Order</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
