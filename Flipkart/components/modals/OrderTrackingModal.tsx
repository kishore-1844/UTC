import React from 'react';
import { useApp } from '../../context/AppContext';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingModalOpen, setIsTrackingModalOpen, activeTrackingOrder, formatPrice } = useApp();

  if (!isTrackingModalOpen || !activeTrackingOrder) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f2f4f7] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0056c3]">local_shipping</span>
            <h3 className="font-bold text-slate-900 text-base">Track Order</h3>
          </div>
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Order Snapshot */}
          <div className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <img
              src={activeTrackingOrder.product.images[0]}
              alt={activeTrackingOrder.product.name}
              className="w-16 h-16 object-cover rounded-lg bg-white"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-slate-500 font-mono">ID: {activeTrackingOrder.orderNumber}</span>
              <h4 className="text-sm font-semibold text-slate-900 truncate">{activeTrackingOrder.product.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Qty: {activeTrackingOrder.quantity} · {formatPrice(activeTrackingOrder.totalINR, activeTrackingOrder.totalUSD)}
              </p>
            </div>
          </div>

          {/* Delivery Status Banner */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></div>
            <div>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">{activeTrackingOrder.status}</p>
              <p className="text-xs text-emerald-700">{activeTrackingOrder.expectedDelivery}</p>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-4 relative pl-4 before:content-[''] before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {activeTrackingOrder.trackingSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div
                  className={`w-5 h-5 rounded-full z-10 flex items-center justify-center text-white text-[10px] ${
                    step.completed
                      ? step.current
                        ? 'bg-[#0056c3] ring-4 ring-blue-100'
                        : 'bg-emerald-600'
                      : 'bg-slate-300'
                  }`}
                >
                  {step.completed && !step.current ? '✓' : ''}
                </div>
                <div>
                  <h5 className={`text-sm font-semibold ${step.current ? 'text-[#0056c3]' : 'text-slate-800'}`}>
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support action */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Need help with this shipment?</span>
            <button
              onClick={() => {
                setIsTrackingModalOpen(false);
              }}
              className="text-[#0056c3] font-semibold hover:underline"
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
