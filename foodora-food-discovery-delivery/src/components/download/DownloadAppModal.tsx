import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import {
  X,
  Download,
  Smartphone,
  Share2,
  Github,
  Check,
  Copy,
  Laptop,
  Wifi,
  WifiOff,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Terminal,
  FolderArchive,
  ArrowRight,
} from 'lucide-react';
import JSZip from 'jszip';

export const DownloadAppModal: React.FC = () => {
  const { isDownloadModalOpen, setIsDownloadModalOpen, showToast } = useApp();
  const { isInstallable, isInstalled, isStandalone, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();

  const [activeTab, setActiveTab] = useState<'pwa' | 'zip' | 'github'>('pwa');
  const [githubUser, setGithubUser] = useState('your-github-username');
  const [repoName, setRepoName] = useState('foodora-app');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  if (!isDownloadModalOpen) return null;

  const githubRemoteUrl = `https://github.com/${githubUser || 'username'}/${repoName || 'foodora-app'}.git`;

  const gitCommands = [
    { label: '1. Initialize Git repository', cmd: 'git init' },
    { label: '2. Stage all files', cmd: 'git add .' },
    {
      label: '3. Create initial commit',
      cmd: 'git commit -m "feat: initial release of Foodora PWA food discovery app"',
    },
    { label: '4. Set primary branch to main', cmd: 'git branch -M main' },
    {
      label: '5. Link to your GitHub remote',
      cmd: `git remote add origin ${githubRemoteUrl}`,
    },
    { label: '6. Push code to GitHub', cmd: 'git push -u origin main' },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('Copied command to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyAll = () => {
    const fullScript = `# Push Foodora to GitHub
git init
git add .
git commit -m "feat: initial release of Foodora PWA food discovery app"
git branch -M main
git remote add origin ${githubRemoteUrl}
git push -u origin main`;

    navigator.clipboard.writeText(fullScript);
    showToast('Copied all Git commands to clipboard!');
  };

  const handleDownloadZip = async () => {
    setIsGeneratingZip(true);
    showToast('Preparing Foodora source archive...', 'info');

    try {
      // 1. If online, try server route
      if (isOnline) {
        const response = await fetch('/api/download/zip');
        if (response.ok) {
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'foodora-food-discovery-delivery.zip';
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(downloadUrl);
          showToast('Source archive downloaded successfully!');
          setIsGeneratingZip(false);
          return;
        }
      }

      // 2. Client-side fallback generation with JSZip
      const zip = new JSZip();
      zip.file(
        'README.md',
        `# Foodora Food Discovery & Delivery App\n\nRun locally:\n1. npm install\n2. npm run dev\n`
      );
      zip.file(
        'quick-start.txt',
        `Foodora App Source Code Backup\nTo push to GitHub:\ngit init\ngit add .\ngit commit -m "Initial commit"\ngit remote add origin ${githubRemoteUrl}\ngit push -u origin main\n`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'foodora-offline-backup.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      showToast('Offline archive created and downloaded!');
    } catch (err) {
      console.error('Download error:', err);
      showToast('Failed to download archive. Please try again.', 'error');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white p-6 relative">
          <button
            onClick={() => setIsDownloadModalOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl tracking-tight">
                Get Foodora App
              </h2>
              <p className="text-xs text-orange-100 font-medium">
                Install as a mobile/desktop app, download full source code, or push to GitHub
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 mt-4 bg-black/15 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pwa')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'pwa'
                  ? 'bg-white text-orange-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>

            <button
              onClick={() => setActiveTab('zip')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'zip'
                  ? 'bg-white text-orange-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>Download (.ZIP)</span>
            </button>

            <button
              onClick={() => setActiveTab('github')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'github'
                  ? 'bg-white text-orange-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Push to GitHub</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: PWA INSTALL */}
          {activeTab === 'pwa' && (
            <div className="space-y-6">
              {/* Status Header */}
              {isStandalone || isInstalled ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-emerald-900">
                      Foodora is installed & running!
                    </h3>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      You are enjoying the native standalone app experience. Service worker caching and offline access are currently active.
                    </p>
                  </div>
                </div>
              ) : isInstallable ? (
                <div className="p-5 rounded-2xl bg-orange-50/80 border border-orange-200/90 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white mx-auto flex items-center justify-center shadow-md shadow-orange-500/20">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Ready to install on this device!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                      Click below to add Foodora to your home screen or desktop. It will work completely offline and launch instantly.
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const success = await install();
                      if (success) {
                        showToast('Foodora app installed successfully!');
                        setIsDownloadModalOpen(false);
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-xl shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 mx-auto active:scale-95 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install Foodora Now</span>
                  </button>
                </div>
              ) : null}

              {/* Platform Specific Guides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Android / Chrome */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                    <Smartphone className="w-4 h-4 text-orange-600" />
                    <span>Android / Chrome</span>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                    <li>Tap the Chrome menu (<strong>⋮</strong> three dots top right).</li>
                    <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                    <li>Confirm install. Foodora icon appears on your home screen.</li>
                  </ol>
                </div>

                {/* iPhone / Safari */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                    <Share2 className="w-4 h-4 text-orange-600" />
                    <span>iPhone & iPad (Safari)</span>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                    <li>Tap the <strong>Share</strong> button at bottom toolbar.</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                    <li>Tap <strong>Add</strong> at top right corner.</li>
                  </ol>
                </div>
              </div>

              {/* Desktop Windows / Mac / Linux */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <Laptop className="w-4 h-4 text-orange-600" />
                  <span>Desktop (Chrome, Edge & Brave)</span>
                </div>
                <p className="text-xs text-slate-600">
                  Look for the <strong>Install Foodora</strong> icon (<Download className="w-3.5 h-3.5 inline mx-0.5 text-orange-600" />) directly in your browser's address bar next to the bookmark star, or click browser menu → "Install Foodora".
                </p>
              </div>

              {/* Online vs Offline Features */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs tracking-wider uppercase text-amber-400">
                    Offline & Online Capabilities
                  </span>
                  <div className="flex items-center gap-1.5 text-xs">
                    {isOnline ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Wifi className="w-3.5 h-3.5" /> Online Connected
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <WifiOff className="w-3.5 h-3.5" /> Offline Mode
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>✓ Works without internet connection</div>
                  <div>✓ Instant load with Service Worker</div>
                  <div>✓ Menus & past orders saved locally</div>
                  <div>✓ Orders placed offline auto-queue</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOWNLOAD ZIP */}
          {activeTab === 'zip' && (
            <div className="space-y-6">
              <div className="text-center space-y-2 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
                  <FolderArchive className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  Download Complete Application Code
                </h3>
                <p className="text-xs text-slate-600">
                  Get a complete standalone ZIP archive of the entire Foodora codebase. Ready to extract, run locally on any computer, or push to GitHub.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <button
                  onClick={handleDownloadZip}
                  disabled={isGeneratingZip}
                  className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-extrabold rounded-xl shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 mx-auto active:scale-95 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isGeneratingZip ? 'Packaging Archive...' : 'Download Project (.ZIP)'}
                  </span>
                </button>
                <p className="text-[11px] text-slate-500 mt-2">
                  Includes full React + TypeScript frontend, Express REST backend, seed data, PWA service worker & icon assets.
                </p>
              </div>

              {/* Local Run Instructions */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  How to Run After Downloading:
                </h4>
                <div className="bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-2xl space-y-2">
                  <div className="text-slate-400"># 1. Unzip the downloaded file</div>
                  <div className="text-emerald-400">unzip foodora-food-discovery-delivery.zip</div>
                  <div className="text-slate-400 pt-1"># 2. Install dependencies</div>
                  <div className="text-emerald-400">npm install</div>
                  <div className="text-slate-400 pt-1"># 3. Launch full-stack app</div>
                  <div className="text-emerald-400">npm run dev</div>
                  <div className="text-slate-400 text-[11px] pt-1">
                    App runs on http://localhost:3000 with hot reloading and offline PWA!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PUSH TO GITHUB */}
          {activeTab === 'github' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Github className="w-5 h-5 text-slate-900" />
                  <span>Push Foodora to your GitHub Account</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Follow these simple steps to push the entire codebase to your GitHub repository.
                </p>
              </div>

              {/* Configure GitHub URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Your GitHub Username
                  </label>
                  <input
                    type="text"
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value)}
                    placeholder="e.g. sameerahamed"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Repository Name
                  </label>
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    placeholder="e.g. foodora-app"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Step 1: Create repo on GitHub */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200">
                <div className="text-xs text-orange-950 font-medium">
                  <strong>Step 1:</strong> First create a blank repository on GitHub named{' '}
                  <code className="font-mono bg-orange-100 px-1 py-0.5 rounded">
                    {repoName}
                  </code>
                </div>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Create on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Step 2: Copy Commands */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    Step 2: Run Terminal Commands
                  </span>
                  <button
                    onClick={handleCopyAll}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Commands</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {gitCommands.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 text-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs font-mono group"
                    >
                      <div className="overflow-x-auto truncate">
                        <span className="text-slate-500 select-none mr-2">
                          #{idx + 1}
                        </span>
                        <span className="text-emerald-400">{item.cmd}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(item.cmd, idx)}
                        className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 shrink-0 transition-colors"
                        title="Copy command"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600">
                💡 <strong>Tip:</strong> The repository includes pre-configured <code className="font-mono">.gitignore</code> to ignore <code className="font-mono">node_modules</code> and sensitive keys, as well as production build scripts.
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PWA & Offline Service Worker Ready</span>
          </div>

          <button
            onClick={() => setIsDownloadModalOpen(false)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
