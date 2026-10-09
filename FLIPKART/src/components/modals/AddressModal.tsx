import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddressModal: React.FC = () => {
  const { isAddressModalOpen, setIsAddressModalOpen, addresses, defaultAddress, setDefaultAddress, addNewAddress } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    title: 'Home',
    name: 'John Smith',
    phone: '+91 98765 43210',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  if (!isAddressModalOpen) return null;

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.street || !form.city || !form.pincode) return;
    addNewAddress(form);
    setIsAdding(false);
    setForm({
      title: 'Home',
      name: 'John Smith',
      phone: '+91 98765 43210',
      street: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200">
        <div className="px-6 py-4 bg-[#f2f4f7] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0056c3]">location_on</span>
            <h3 className="font-bold text-slate-900 text-base">Select Delivery Address</h3>
          </div>
          <button
            onClick={() => {
              setIsAddressModalOpen(false);
              setIsAdding(false);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {!isAdding ? (
            <>
              <div className="space-y-3">
                {addresses.map(addr => {
                  const isSelected = defaultAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setDefaultAddress(addr.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#0056c3] bg-blue-50/50 ring-1 ring-[#0056c3]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {addr.title}
                          </span>
                          <span className="text-xs font-semibold text-slate-900">{addr.name}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{addr.street}, {addr.city}, {addr.state} - <strong className="text-slate-900">{addr.pincode}</strong></p>
                        <p className="text-xs text-slate-500">Phone: {addr.phone}</p>
                      </div>
                      <div className="pt-1">
                        <input
                          type="radio"
                          name="addressRadio"
                          checked={isSelected}
                          onChange={() => setDefaultAddress(addr.id)}
                          className="accent-[#0056c3] w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setIsAdding(true)}
                className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-[#0056c3] text-[#0056c3] font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add New Address
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmitNew} className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Add New Delivery Location</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-500 font-medium">Tag</label>
                  <select
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Pincode / ZIP</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 560038"
                    value={form.pincode}
                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Flat / House no, street name"
                  value={form.street}
                  onChange={e => setForm({ ...form, street: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-500 font-medium">City</label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={e => setForm({ ...form, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="makeDefault"
                  checked={form.isDefault}
                  onChange={e => setForm({ ...form, isDefault: e.target.checked })}
                  className="accent-[#0056c3]"
                />
                <label htmlFor="makeDefault" className="text-xs text-slate-700">Make this my default address</label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#0056c3] text-white rounded-xl text-xs font-bold hover:bg-[#004299]"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="w-full py-2.5 bg-[#0056c3] text-white rounded-xl font-bold text-sm hover:bg-[#004299] transition-colors"
          >
            Confirm Address
          </button>
        </div>
      </div>
    </div>
  );
};
