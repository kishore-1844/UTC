import React from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useApp } from '../../context/AppContext';
import { Download, Smartphone, CheckCircle2 } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'primary' | 'subtle' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'primary',
}) => {
  const { isInstallable, isInstalled, isStandalone, isIOS, install } = usePWAInstall();
  const { setIsDownloadModalOpen, showToast } = useApp();

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        showToast('Foodora app successfully installed!');
        return;
      }
    }
    // Open the rich download & install modal for options or iOS/desktop guidance
    setIsDownloadModalOpen(true);
  };

  if (isStandalone) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleInstallClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          isInstallable
            ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
            : 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200'
        } ${className}`}
        title="Download or Install Foodora App"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{isInstallable ? 'Install App' : 'Download App'}</span>
      </button>
    );
  }

  if (variant === 'subtle') {
    return (
      <button
        onClick={handleInstallClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors ${className}`}
        title="Download or Install Foodora App"
      >
        <Download className="w-4 h-4 text-orange-600" />
        <span>Download / Install App</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleInstallClick}
      className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs px-3.5 py-2 shadow-md shadow-orange-600/20 active:scale-95 transition-all ${className}`}
      title="Download & Install Foodora on your device"
    >
      <Download className="w-4 h-4" />
      <span>{isInstallable ? 'Install App' : 'Download App'}</span>
    </button>
  );
};
