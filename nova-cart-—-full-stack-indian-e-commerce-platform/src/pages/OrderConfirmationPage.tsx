import React from 'react';
import { CheckCircle2, Truck, Package, MapPin, Printer, ArrowRight, Clock } from 'lucide-react';
import { Order } from '../types/index.ts';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigate: (tab: string, meta?: any) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, onNavigate }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Success Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Order Placed Successfully</span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Thank you for shopping with NOVA CART!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A confirmation receipt has been generated for order <strong className="text-slate-800 font-mono">{order.orderNumber}</strong>.
          </p>
        </div>

        {/* Tracking info badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400">Tracking AWB:</span>
            <strong className="text-slate-900 font-mono ml-1">{order.trackingId || 'DELHIVERY-29182390'}</strong>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <div>
            <span className="text-slate-400">Estimated Delivery:</span>
            <strong className="text-emerald-700 ml-1">
              {new Date(order.estimatedDeliveryDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </strong>
          </div>
        </div>
      </div>

      {/* Order Status Timeline Tracker */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live Delivery Status</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          
          {/* Step 1: Placed */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs mx-auto sm:mx-0">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Order Placed</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Payment Verified</p>
            </div>
          </div>

          {/* Step 2: Processing */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs mx-auto sm:mx-0">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600">Packed & Dispatched</p>
              <p className="text-[10px] text-slate-400 mt-0.5">At Bengaluru Hub</p>
            </div>
          </div>

          {/* Step 3: In Transit */}
          <div className="space-y-2 text-center sm:text-left opacity-60">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs mx-auto sm:mx-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">In Transit</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Express Air Logistics</p>
            </div>
          </div>

          {/* Step 4: Delivered */}
          <div className="space-y-2 text-center sm:text-left opacity-60">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs mx-auto sm:mx-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">Delivered</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Doorstep Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid: Address + Payment + Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Shipping Address */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Shipping Destination</span>
          </div>
          <p className="font-bold text-slate-800 text-sm">{order.shippingAddress.fullName}</p>
          <p className="text-slate-600">
            {order.shippingAddress.streetAddress}, {order.shippingAddress.locality}
          </p>
          <p className="text-slate-600">
            {order.shippingAddress.city}, {order.shippingAddress.state} - <strong className="font-mono">{order.shippingAddress.postalCode}</strong>
          </p>
          <p className="text-slate-500 pt-1 font-mono">Mobile: {order.shippingAddress.phone}</p>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs">
          <div className="font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Payment Breakdown
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Payment Mode:</span>
            <span className="font-semibold uppercase text-slate-900">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Payment Status:</span>
            <span className="font-bold uppercase text-emerald-600">{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Items Subtotal:</span>
            <span className="font-mono tabular-nums">₹{order.subtotal.toLocaleString('en-IN')}</span>
          </div>
          {order.couponDiscount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Coupon Discount:</span>
              <span className="font-mono tabular-nums">-₹{order.couponDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Delivery:</span>
            <span className="font-mono uppercase font-bold text-emerald-600">
              {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-sm text-slate-900">
            <span>Total Paid:</span>
            <span className="text-base font-mono tabular-nums text-blue-600">
              ₹{order.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Ordered Products ({order.items.length})</h3>
        <div className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                />
                <div>
                  <p className="font-semibold text-slate-900">{item.productName}</p>
                  <p className="text-slate-400 text-[11px]">Quantity: {item.quantity}</p>
                </div>
              </div>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                ₹{item.total.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Tax Invoice</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
