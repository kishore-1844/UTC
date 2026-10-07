import React, { useEffect, useState } from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff, Wifi, RefreshCw, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [showReconnectedBanner, setShowReconnectedBanner] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowReconnectedBanner(true);
      const timer = setTimeout(() => {
        setShowReconnectedBanner(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showReconnectedBanner) {
    return null;
  }

  if (showReconnectedBanner) {
    return (
      <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-medium flex items-center justify-between shadow-md transition-all sticky top-0 z-50">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>
            <strong>Connection restored!</strong> You are back online. Latest restaurant menus and order updates are synced.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-600 text-white text-xs px-4 py-2.5 font-medium shadow-md transition-all sticky top-0 z-50 border-b border-amber-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-200"></span>
          </span>
          <WifiOff className="w-4 h-4 text-amber-200 shrink-0" />
          <span>
            <strong>Offline Mode Active:</strong> You can continue exploring cached restaurants, menus, customize dishes, and review your cart. Orders placed will be queued locally.
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="bg-amber-700/80 px-2 py-0.5 rounded text-amber-100 font-mono">
            Local Storage Active
          </span>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 bg-white text-amber-800 hover:bg-amber-50 px-2.5 py-1 rounded font-bold transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Check Connection
          </button>
        </div>
      </div>
    </div>
  );
};
