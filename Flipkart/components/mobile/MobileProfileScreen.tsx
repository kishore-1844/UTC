import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MobileProfileScreen: React.FC = () => {
  const {
    superCoins,
    orders,
    wishlist,
    addresses,
    formatPrice,
    setIsTrackingModalOpen,
    setIsCouponModalOpen,
    setIsAddressModalOpen,
    setIsSupportModalOpen,
    setActiveTrackingOrder,
    setScreen,
    showToast
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userName, setUserName] = useState('John Smith');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userEmail, setUserEmail] = useState('john.smith@example.com');
  const [selectedLanguage, setSelectedLanguage] = useState('English (Default)');

  const recentOrder = orders[0];

  const handleTrackRecent = () => {
    if (recentOrder) {
      setActiveTrackingOrder(recentOrder);
      setIsTrackingModalOpen(true);
    }
  };

  const handleClaimRewards = () => {
    showToast('SuperCoins Reward Catalog unlocked! 100 Coins = ₹100 discount voucher.');
    setIsCouponModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-24 pt-1">
      {/* User Profile Header Card */}
      <div className="flex items-center gap-3.5 p-4 bg-[#f2f4f7] rounded-2xl border border-slate-200/60 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-[#0056c3] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
          JS
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-slate-900 truncate">{userName}</h2>
            <span
              className="material-symbols-outlined text-[#0056c3] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            {userPhone} • {userEmail}
          </p>
          <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 bg-[#d9e2ff] text-[#001944] rounded-md text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">workspace_premium</span>
            Plus Member
          </div>
        </div>
        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200/70 rounded-xl transition-colors"
          title="Edit Profile"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isEditingProfile ? 'check' : 'edit'}
          </span>
        </button>
      </div>

      {/* Edit Profile Form if open */}
      {isEditingProfile && (
        <div className="p-4 bg-white rounded-2xl border border-blue-200 shadow-sm space-y-3 animate-fadeIn">
          <h4 className="text-xs font-bold text-slate-900">Edit Personal Details</h4>
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase">Phone Number</label>
              <input
                type="text"
                value={userPhone}
                onChange={e => setUserPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase">Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditingProfile(false);
              showToast('Profile updated successfully!');
            }}
            className="w-full py-2 bg-[#0056c3] text-white rounded-lg text-xs font-bold"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* SuperCoin / Rewards Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#fd9e00] to-[#ffb866] p-4 rounded-2xl shadow-xs flex items-center justify-between text-[#653c00]">
        <div className="relative z-10">
          <div className="flex items-center gap-1 text-xs font-bold mb-0.5">
            <span className="material-symbols-outlined text-[17px]">monetization_on</span>
            SuperCoin Balance
          </div>
          <div className="text-xl font-extrabold text-[#2b1700]">
            {superCoins.toLocaleString()} Coins
          </div>
          <p className="text-[11px] opacity-90 mt-0.5">Use on your next order for instant savings</p>
        </div>

        <button
          onClick={handleClaimRewards}
          className="relative z-10 px-3.5 py-2 bg-[#653c00] text-[#ffddba] rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform"
        >
          Claim Rewards
        </button>

        <div className="absolute -right-4 -bottom-6 opacity-20 pointer-events-none text-[#653c00]">
          <span className="material-symbols-outlined text-[110px]">savings</span>
        </div>
      </div>

      {/* Quick Action Cards Grid (2x2) */}
      <div className="grid grid-cols-2 gap-3">
        {/* My Orders */}
        <button
          onClick={handleTrackRecent}
          className="flex flex-col p-3.5 bg-[#f2f4f7] hover:bg-slate-200/80 rounded-2xl border border-slate-200/60 shadow-xs transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#d9e2ff] text-[#001944] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">package_2</span>
          </div>
          <span className="text-xs font-bold text-slate-900">My Orders</span>
          <span className="text-[11px] text-slate-500">{orders.length} active shipments</span>
        </button>

        {/* My Wishlist */}
        <button
          onClick={() => setScreen('explore')}
          className="flex flex-col p-3.5 bg-[#f2f4f7] hover:bg-slate-200/80 rounded-2xl border border-slate-200/60 shadow-xs transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </div>
          <span className="text-xs font-bold text-slate-900">My Wishlist</span>
          <span className="text-[11px] text-slate-500">{wishlist.length} saved items</span>
        </button>

        {/* My Rewards */}
        <button
          onClick={() => setIsCouponModalOpen(true)}
          className="flex flex-col p-3.5 bg-[#f2f4f7] hover:bg-slate-200/80 rounded-2xl border border-slate-200/60 shadow-xs transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#875200] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">redeem</span>
          </div>
          <span className="text-xs font-bold text-slate-900">My Rewards</span>
          <span className="text-[11px] text-slate-500">5 coupons available</span>
        </button>

        {/* Saved Addresses */}
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="flex flex-col p-3.5 bg-[#f2f4f7] hover:bg-slate-200/80 rounded-2xl border border-slate-200/60 shadow-xs transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#005312] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </div>
          <span className="text-xs font-bold text-slate-900">Saved Addresses</span>
          <span className="text-[11px] text-slate-500">{addresses.length} locations added</span>
        </button>
      </div>

      {/* Recent Order Preview Section */}
      {recentOrder && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-bold text-slate-900 text-sm">Recent Orders</h3>
            <button
              onClick={handleTrackRecent}
              className="text-xs font-bold text-[#0056c3] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="bg-[#f2f4f7] rounded-2xl p-3.5 border border-slate-200/60 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-800">{recentOrder.status}</span>
              </div>
              <span className="text-[11px] text-slate-500">{recentOrder.expectedDelivery}</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={recentOrder.product.images[0]}
                alt={recentOrder.product.name}
                className="w-14 h-14 rounded-xl object-cover bg-white shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {recentOrder.product.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Qty: {recentOrder.quantity} • {formatPrice(recentOrder.totalINR, recentOrder.totalUSD)}
                </p>
              </div>
              <button
                onClick={handleTrackRecent}
                className="px-3.5 py-1.5 bg-[#0056c3] text-white rounded-xl text-xs font-bold shrink-0 hover:bg-[#004299] transition-colors"
              >
                Track
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings & Help Options */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-slate-900 text-sm px-0.5">Account Settings &amp; Help</h3>
        <div className="bg-[#f2f4f7] rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden flex flex-col divide-y divide-slate-200/60">
          <button
            onClick={() => showToast('Push and SMS notifications updated.')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-200/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Notification Preferences</div>
                <div className="text-[11px] text-slate-500">Manage WhatsApp, SMS &amp; push alerts</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => {
              const langs = ['English (Default)', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Spanish (Español)'];
              const nextIdx = (langs.indexOf(selectedLanguage) + 1) % langs.length;
              setSelectedLanguage(langs[nextIdx]);
              showToast(`Language set to ${langs[nextIdx]}`);
            }}
            className="flex items-center justify-between p-3.5 hover:bg-slate-200/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">translate</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Select Language</div>
                <div className="text-[11px] text-slate-500">{selectedLanguage}</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="flex items-center justify-between p-3.5 hover:bg-slate-200/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">help_center</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Help Center &amp; Support</div>
                <div className="text-[11px] text-slate-500">24/7 customer service chat</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => showToast('Security check: 2-Factor Authentication enabled.')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-200/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">security</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Privacy &amp; Security</div>
                <div className="text-[11px] text-slate-500">Password, active sessions, data</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => showToast('Session active. You can log out anytime from your settings.', 'info')}
        className="w-full py-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xs"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        Log Out
      </button>
    </div>
  );
};
