import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface CartPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onSelectProduct: (product: any) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    cart,
    isLoading,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    couponCode,
    couponError,
    couponSuccess
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
  };

  if (isLoading && cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xs text-slate-500">Loading your cart items...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our curated catalog of Indian tech, fashion, and lifestyle!
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Free delivery threshold calculation
  const freeDeliveryThreshold = 999;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cart.subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
          Shopping Cart ({cart.itemCount} items)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Review your selections before proceeding to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free Shipping Alert Banner */}
          {amountNeededForFreeDelivery > 0 ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
              <span>Add <strong>₹{amountNeededForFreeDelivery.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Delivery</strong></span>
              <button
                onClick={() => onNavigate('shop')}
                className="text-xs font-bold text-amber-900 underline"
              >
                Add more items
              </button>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You have unlocked <strong>FREE Express Delivery</strong> across India!</span>
            </div>
          )}

          {/* Itemized Rows */}
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {cart.items.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                
                {/* Thumbnail */}
                <div
                  onClick={() => onSelectProduct(item.product)}
                  className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 cursor-pointer border border-slate-200"
                >
                  <img
                    src={item.product?.imageUrl || '/src/assets/images/category_electronics_1791222493395.jpg'}
                    alt={item.product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.product?.brand}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(item.product)}
                    className="text-sm font-semibold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                  >
                    {item.product?.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      ₹{item.priceAtAddition.toLocaleString('en-IN')}
                    </span>
                    {item.product?.mrp && item.product.mrp > item.priceAtAddition && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        ₹{item.product.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Adjustment Stepper */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors"
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-slate-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors"
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Column: Coupon & Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Coupon Code Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Apply Discount Coupon</span>
            </div>

            {couponCode ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-emerald-800">{couponCode}</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">{couponSuccess}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    placeholder="Try NOVA10 or SUPER500"
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg uppercase font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
                <div className="text-[11px] text-slate-400">
                  <span>Available: </span>
                  <button
                    type="button"
                    onClick={() => { setInputCoupon('NOVA10'); applyCoupon('NOVA10'); }}
                    className="text-blue-600 hover:underline font-mono font-medium"
                  >
                    NOVA10
                  </button>
                  <span> (10% off), </span>
                  <button
                    type="button"
                    onClick={() => { setInputCoupon('SUPER500'); applyCoupon('SUPER500'); }}
                    className="text-blue-600 hover:underline font-mono font-medium"
                  >
                    SUPER500
                  </button>
                  <span> (₹500 off on ₹2k+)</span>
                </div>
              </form>
            )}
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              Price Details
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Price ({cart.itemCount} items)</span>
                <span className="font-mono tabular-nums">₹{cart.subtotal.toLocaleString('en-IN')}</span>
              </div>

              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-₹{cart.discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {cart.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings ({couponCode})</span>
                  <span className="font-mono tabular-nums">-₹{cart.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                {cart.deliveryCharge === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                ) : (
                  <span className="font-mono tabular-nums">₹{cart.deliveryCharge}</span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                <span>Total Payable</span>
                <span className="text-lg font-mono tabular-nums text-blue-600">
                  ₹{cart.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Savings banner */}
            {(cart.discount > 0 || cart.couponDiscount > 0) && (
              <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-medium text-center">
                🎉 You will save ₹{(cart.discount + cart.couponDiscount).toLocaleString('en-IN')} on this order!
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe and Secure Payments • 100% Authentic Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
