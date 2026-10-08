import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotalCount,
    cartSubtotalINR,
    cartSubtotalUSD,
    activeCoupon,
    defaultAddress,
    formatPrice,
    placeOrder,
    setScreen,
    setIsTrackingModalOpen
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('johnsmith@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  if (!isCheckoutModalOpen) return null;

  const couponDiscountINR = activeCoupon ? activeCoupon.discountINR : 0;
  const couponDiscountUSD = activeCoupon ? activeCoupon.discountUSD : 0;
  const payableINR = Math.max(0, cartSubtotalINR - couponDiscountINR);
  const payableUSD = Math.max(0, cartSubtotalUSD - couponDiscountUSD);

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder = placeOrder();
      setConfirmedOrder(newOrder);
      setIsProcessing(false);
    }, 1200);
  };

  const handleFinish = () => {
    setIsCheckoutModalOpen(false);
    setConfirmedOrder(null);
    setScreen('profile');
    setIsTrackingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
        {!confirmedOrder ? (
          <>
            {/* Header */}
            <div className="px-6 py-4 bg-[#f2f4f7] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0056c3]">verified_user</span>
                <h3 className="font-bold text-slate-900 text-base">Secure Checkout</h3>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Delivery Address Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="material-symbols-outlined text-[16px] text-[#0056c3]">local_shipping</span>
                    <span>Delivering to {defaultAddress.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{defaultAddress.street}, {defaultAddress.city} - {defaultAddress.pincode}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  FREE DELIVERY
                </span>
              </div>

              {/* Order Items Preview */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Items ({cartTotalCount})
                </p>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-800 truncate max-w-[240px]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formatPrice(item.product.priceINR * item.quantity, item.product.priceUSD * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Method</p>
                
                {/* UPI Option */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-[#0056c3] bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#0056c3] mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">UPI / QR (Instant)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Fastest</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                    {paymentMethod === 'upi' && (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-[#0056c3] bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#0056c3] mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900">Credit / Debit Card</span>
                    <p className="text-xs text-slate-500 mt-0.5">Visa, Mastercard, RuPay, Amex</p>
                  </div>
                </label>

                {/* COD Option */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#0056c3] bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#0056c3] mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900">Cash on Delivery (COD)</span>
                    <p className="text-xs text-slate-500 mt-0.5">Pay via cash or UPI at your doorstep</p>
                  </div>
                </label>
              </div>

              {/* Summary line */}
              <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Total Payable Amount</span>
                <span className="text-base font-bold text-slate-900">{formatPrice(payableINR, payableUSD)}</span>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                disabled={isProcessing}
                onClick={handleConfirmOrder}
                className="w-full py-3 bg-[#fd9e00] hover:bg-[#e08b00] active:scale-[0.99] text-[#2b1700] rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {formatPrice(payableINR, payableUSD)} &amp; Place Order</span>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* Confirmation Celebratory Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Order Placed Successfully</span>
              <h3 className="text-xl font-bold text-slate-900">Thank you for your order!</h3>
              <p className="text-xs text-slate-500">Order ID: <span className="font-mono font-bold text-slate-800">{confirmedOrder.orderNumber}</span></p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl text-left border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-slate-800">{confirmedOrder.expectedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-bold text-emerald-700">Paid ({formatPrice(confirmedOrder.totalINR, confirmedOrder.totalUSD)})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SuperCoins Earned:</span>
                <span className="font-bold text-amber-600">+50 Coins</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleFinish}
                className="w-full py-3 bg-[#0056c3] text-white rounded-xl font-bold text-sm hover:bg-[#004299] transition-colors"
              >
                Track Shipment Details
              </button>
              <button
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setConfirmedOrder(null);
                  setScreen('home');
                }}
                className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-xs hover:bg-slate-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
