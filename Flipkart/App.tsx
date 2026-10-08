import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBarControls } from './components/TopBarControls';

// Mobile Components
import { MobileHeader } from './components/mobile/MobileHeader';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { MobileHomeScreen } from './components/mobile/MobileHomeScreen';
import { MobileExploreScreen } from './components/mobile/MobileExploreScreen';
import { MobileProductDetailScreen } from './components/mobile/MobileProductDetailScreen';
import { MobileCartScreen } from './components/mobile/MobileCartScreen';
import { MobileProfileScreen } from './components/mobile/MobileProfileScreen';

// Desktop Components
import { DesktopHeader } from './components/desktop/DesktopHeader';
import { DesktopHomeScreen } from './components/desktop/DesktopHomeScreen';
import { DesktopShopScreen } from './components/desktop/DesktopShopScreen';
import { DesktopFooter } from './components/desktop/DesktopFooter';

// Modals
import { OrderTrackingModal } from './components/modals/OrderTrackingModal';
import { CouponsModal } from './components/modals/CouponsModal';
import { AddressModal } from './components/modals/AddressModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { SupportChatModal } from './components/modals/SupportChatModal';

const MainContent: React.FC = () => {
  const { viewMode, screen, toasts } = useApp();

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col font-jakarta">
      {/* View Switcher & Screen Navigation Bar */}
      <TopBarControls />

      {viewMode === 'mobile' ? (
        /* MOBILE VIEWPORT CONTAINER */
        <div className="flex-1 flex justify-center bg-slate-200/50 py-0 sm:py-6">
          <div className="w-full sm:max-w-[430px] min-h-[100dvh] sm:min-h-[880px] bg-[#f7f9fc] sm:rounded-[36px] shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden">
            {/* Phone Speaker Notch bar on desktop simulation */}
            <div className="hidden sm:flex items-center justify-center pt-2 pb-1 bg-slate-800">
              <div className="w-20 h-3.5 bg-slate-900 rounded-full flex items-center justify-end px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
              </div>
            </div>

            {/* Mobile Header */}
            <MobileHeader />

            {/* Screen Content */}
            <main className="flex-1 px-4 overflow-y-auto">
              {screen === 'home' && <MobileHomeScreen />}
              {screen === 'explore' && <MobileExploreScreen />}
              {screen === 'pdp' && <MobileProductDetailScreen />}
              {screen === 'cart' && <MobileCartScreen />}
              {screen === 'profile' && <MobileProfileScreen />}
            </main>

            {/* Mobile Bottom Navigation (only when not in PDP sticky checkout bar) */}
            {screen !== 'pdp' && <MobileBottomNav />}
          </div>
        </div>
      ) : (
        /* DESKTOP STOREFRONT VIEWPORT */
        <div className="flex-1 flex flex-col w-full bg-[#faf8ff]">
          <DesktopHeader />

          <main className="flex-1 w-full">
            {screen === 'home' && <DesktopHomeScreen />}
            {screen === 'explore' && <DesktopShopScreen />}
            {screen === 'pdp' && (
              <div className="max-w-2xl mx-auto px-6 pt-32 pb-16">
                <MobileProductDetailScreen />
              </div>
            )}
            {screen === 'cart' && (
              <div className="max-w-2xl mx-auto px-6 pt-32 pb-16">
                <MobileCartScreen />
              </div>
            )}
            {screen === 'profile' && (
              <div className="max-w-2xl mx-auto px-6 pt-32 pb-16">
                <MobileProfileScreen />
              </div>
            )}
          </main>

          <DesktopFooter />
        </div>
      )}

      {/* Interactive Global Modals */}
      <OrderTrackingModal />
      <CouponsModal />
      <AddressModal />
      <CheckoutModal />
      <SupportChatModal />

      {/* Global Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2 pointer-events-auto animate-bounceIn ${
              toast.type === 'error'
                ? 'bg-red-50 text-red-800 border-red-200'
                : toast.type === 'info'
                ? 'bg-blue-50 text-blue-900 border-blue-200'
                : 'bg-slate-900 text-white border-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
