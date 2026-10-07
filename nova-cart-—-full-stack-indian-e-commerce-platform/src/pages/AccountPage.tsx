import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Heart, ShieldCheck, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Order, Address } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { api } from '../services/api.ts';

interface AccountPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onSelectOrder: (order: Order) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate, onSelectOrder }) => {
  const { user, isAdmin, updateProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // New Address form
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(user?.fullName || '');
  const [phone, setPhone] = useState<string>(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Bengaluru');
  const [state, setState] = useState<string>('Karnataka');
  const [postalCode, setPostalCode] = useState<string>('560103');

  // Edit profile state
  const [editName, setEditName] = useState<string>(user?.fullName || '');
  const [editPhone, setEditPhone] = useState<string>(user?.phone || '');
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  const loadAccountData = async () => {
    try {
      setIsLoading(true);
      const [userOrders, userAddresses] = await Promise.all([
        api.getOrders(),
        api.getAddresses()
      ]);
      setOrders(userOrders);
      setAddresses(userAddresses);
    } catch (err) {
      console.error('Failed to load user account data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, [user]);

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const saved = await api.saveAddress({
        fullName,
        phone,
        streetAddress,
        city,
        state,
        postalCode,
        isDefault: addresses.length === 0,
        addressType: 'home'
      });
      setAddresses([...addresses, saved]);
      setIsAddingAddress(false);
      setStreetAddress('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await api.deleteAddress(id);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ fullName: editName, phone: editPhone });
      setProfileMsg('Profile updated successfully!');
      setTimeout(() => setProfileMsg(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Account Hero Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl uppercase shadow-inner">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-slate-900">{user?.fullName || 'User Profile'}</h1>
            <p className="text-xs text-slate-500 font-mono">{user?.email}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                Role: {user?.role}
              </span>
              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold hover:bg-amber-100 transition-colors"
                >
                  Open Admin Dashboard →
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('wishlist')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Wishlist</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'orders'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'addresses'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No orders placed yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Once you place an order, live shipping tracking and delivery updates will appear here.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400">Order ID:</span>
                    <strong className="text-slate-900 font-mono ml-1">{ord.orderNumber}</strong>
                    <span className="text-slate-400 ml-2">({new Date(ord.createdAt).toLocaleDateString('en-IN')})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        ord.orderStatus === 'delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : ord.orderStatus === 'shipped'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                    <button
                      onClick={() => onSelectOrder(ord)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Track Order →
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {ord.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{item.productName}</p>
                        <p className="text-slate-400 text-[11px]">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        ₹{item.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Payment via {ord.paymentMethod.toUpperCase()} ({ord.paymentStatus})
                  </span>
                  <div className="text-right">
                    <span className="text-slate-500 mr-2">Total:</span>
                    <strong className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Saved Addresses</h2>
            {!isAddingAddress && (
              <button
                onClick={() => setIsAddingAddress(true)}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            )}
          </div>

          {isAddingAddress && (
            <form onSubmit={handleSaveAddress} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 max-w-xl">
              <h3 className="text-xs font-bold text-slate-900 uppercase">New Address Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Street Address, Flat, Building"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Pincode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs relative"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900">{addr.fullName}</span>
                  <div className="flex items-center gap-2">
                    {addr.isDefault && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        DEFAULT
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600">{addr.streetAddress}</p>
                <p className="text-slate-600">
                  {addr.city}, {addr.state} - <strong className="font-mono">{addr.postalCode}</strong>
                </p>
                <p className="text-slate-500 font-mono pt-1">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-xl space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Information</h2>
          
          {profileMsg && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg">
              {profileMsg}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Email Address</label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
