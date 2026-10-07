import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, CreditCard, Banknote, ArrowRight, Plus, Check } from 'lucide-react';
import { Address, Order } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { api } from '../services/api.ts';

interface CheckoutPageProps {
  onOrderSuccess: (order: Order) => void;
  onNavigate: (tab: string, meta?: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderSuccess, onNavigate }) => {
  const { cart, couponCode, clearCart } = useCart();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);

  // New address form state
  const [fullName, setFullName] = useState<string>(user?.fullName || '');
  const [phone, setPhone] = useState<string>(user?.phone || '+91 98765 43210');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [city, setCity] = useState<string>('Bengaluru');
  const [state, setState] = useState<string>('Karnataka');
  const [postalCode, setPostalCode] = useState<string>('560103');
  const [addressType, setAddressType] = useState<'home' | 'work'>('home');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay' | 'upi'>('razorpay');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load existing user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const list = await api.getAddresses();
        setAddresses(list);
        if (list.length > 0) {
          const defaultAddr = list.find(a => a.isDefault) || list[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setIsAddingNewAddress(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAddresses();
  }, [user]);

  const handleSaveNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const saved = await api.saveAddress({
        fullName,
        phone,
        streetAddress,
        locality,
        city,
        state,
        postalCode,
        isDefault: true,
        addressType
      });
      setAddresses([...addresses, saved]);
      setSelectedAddressId(saved.id);
      setIsAddingNewAddress(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save address');
    }
  };

  const handlePlaceOrder = async () => {
    setErrorMessage(null);
    const chosenAddress = addresses.find(a => a.id === selectedAddressId);
    if (!chosenAddress) {
      setErrorMessage('Please select or add a shipping address');
      return;
    }

    if (cart.items.length === 0) {
      setErrorMessage('Your cart is empty. Add products to order.');
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const createdOrder = await api.createOrder({
        address: chosenAddress,
        paymentMethod,
        couponCode: couponCode || undefined
      });
      await clearCart();
      onOrderSuccess(createdOrder);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">No items to checkout</h2>
        <p className="text-xs text-slate-500">Your cart is currently empty.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">Secure Checkout</h1>
        <p className="text-xs text-slate-500 mt-1">Complete your order in 3 simple steps</p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Multi-Step Modules */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Delivery Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Select Delivery Address
                </h2>
              </div>
              {!isAddingNewAddress && (
                <button
                  onClick={() => setIsAddingNewAddress(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              )}
            </div>

            {/* Address Selection List */}
            {!isAddingNewAddress && (
              <div className="space-y-3 pt-2">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedAddressId === addr.id
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingAddress"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{addr.fullName}</span>
                          <span className="text-[10px] font-mono uppercase bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                            {addr.addressType}
                          </span>
                          <span className="text-slate-500 font-mono">{addr.phone}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {addr.streetAddress}, {addr.locality ? `${addr.locality}, ` : ''}{addr.city}, {addr.state} - <strong className="font-mono">{addr.postalCode}</strong>
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Add Address Form */}
            {isAddingNewAddress && (
              <form onSubmit={handleSaveNewAddress} className="space-y-3 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">Mobile Number (10 digits) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Flat, House no., Building, Street *</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Green Glen Layout"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Karnataka"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">Pincode (6 digits) *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="560103"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Save & Deliver Here
                  </button>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* STEP 2: Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Select Payment Mode
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {/* Razorpay Test Mode */}
              <label
                className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'razorpay'
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="mt-0.5 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Online Payment (Razorpay Test Gateway)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        FASTEST
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay instantly with UPI (Google Pay, PhonePe, Paytm), RuPay / Visa / Mastercard, or NetBanking.
                    </p>
                  </div>
                </div>
              </label>

              {/* UPI Direct */}
              <label
                className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-0.5 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900">UPI / QR Code</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Instant zero-convenience fee payment via any BHIM-UPI application.
                    </p>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash or scan courier UPI QR code directly at your doorstep upon package arrival.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              Order Items ({cart.itemCount})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{item.product?.name}</p>
                    <p className="text-slate-400 text-[11px]">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    ₹{(item.priceAtAddition * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">₹{cart.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {cart.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings ({couponCode})</span>
                  <span className="font-mono tabular-nums">-₹{cart.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span className="font-mono text-emerald-600 font-bold uppercase text-[11px]">
                  {cart.deliveryCharge === 0 ? 'FREE' : `₹${cart.deliveryCharge}`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-xl font-mono tabular-nums text-blue-600">
                  ₹{cart.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmittingOrder || !selectedAddressId}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              {isSubmittingOrder ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Place Order • ₹{cart.total.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>By placing your order, you agree to NOVA CART terms of purchase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
