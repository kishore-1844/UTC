import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const MobileProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    showToast,
    setIsCheckoutModalOpen,
    defaultAddress
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors?.[0]?.name || 'Obsidian Black'
  );
  const [selectedEdition, setSelectedEdition] = useState(
    selectedProduct.editions?.[0] || 'Standard Edition'
  );
  const [pincode, setPincode] = useState(defaultAddress.pincode || '560038');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(
    'Free delivery by Tomorrow, 4:00 PM if ordered within 2 hrs'
  );
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  // Flash Sale Timer
  const [flashTime, setFlashTime] = useState({ hours: 3, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 42, seconds: 19 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  const wish = isWishlisted(selectedProduct.id);

  const handleCheckDelivery = () => {
    if (pincode.trim().length >= 4) {
      setDeliveryStatus(`Delivery available to ${pincode} by Tomorrow, 4:00 PM`);
      showToast(`Pincode ${pincode} is serviceable for Express Delivery!`);
    } else {
      setDeliveryStatus('Please enter a valid pincode or ZIP code');
      showToast('Please enter a valid 5-6 digit pincode', 'error');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    } else {
      showToast('Product shared successfully!');
    }
  };

  const handleAddToCart = () => {
    setIsAddedAnimation(true);
    addToCart(selectedProduct, 1, selectedColor, selectedEdition);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, 1, selectedColor, selectedEdition);
    setIsCheckoutModalOpen(true);
  };

  const images = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [selectedProduct.images[0]];

  return (
    <div className="flex flex-col w-full pb-32 pt-1">
      {/* Image Carousel Section */}
      <div className="relative w-full bg-[#f2f4f7] rounded-2xl overflow-hidden shadow-xs border border-slate-200/60">
        <div className="w-full h-80 relative flex items-center justify-center bg-white">
          <img
            src={images[activeImageIdx] || images[0]}
            alt={selectedProduct.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Best Seller Tag */}
          <span className="absolute top-3.5 left-3.5 bg-[#fd9e00] text-[#653c00] px-3 py-1 rounded-full text-xs font-bold shadow-xs">
            {selectedProduct.isBestSeller ? 'Best Seller' : 'Trending Choice'}
          </span>

          {/* Counter Tag */}
          <div className="absolute bottom-3 right-3.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-mono font-medium">
            {activeImageIdx + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 p-2 bg-[#f2f4f7] border-t border-slate-200/60">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx ? 'border-[#0056c3] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md transition-transform active:scale-90 ${
              wish ? 'text-[#ba1a1a]' : 'text-slate-700 hover:text-slate-900'
            }`}
            title="Add to Wishlist"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={wish ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
          </button>

          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md text-slate-700 hover:text-slate-900 transition-transform active:scale-90"
            title="Share"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      {/* Product Title & Brand */}
      <div className="mt-4 flex flex-col gap-1.5 px-0.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#0056c3] uppercase tracking-wider font-bold">
            {selectedProduct.brand}
          </span>
          <div className="flex items-center gap-1 bg-[#2e8534] text-white px-2 py-0.5 rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span>{selectedProduct.rating}</span>
            <span className="text-white/80 font-normal">({selectedProduct.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <h1 className="text-lg font-bold text-slate-900 leading-snug">
          {selectedProduct.name}
        </h1>
      </div>

      {/* Price & Massive Discount Callout */}
      <div className="mt-3.5 bg-[#f2f4f7] p-3.5 rounded-2xl flex items-center justify-between shadow-xs border border-slate-200/60">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {formatPrice(selectedProduct.priceINR, selectedProduct.priceUSD)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(selectedProduct.originalPriceINR, selectedProduct.originalPriceUSD)}
            </span>
          </div>
          <span className="text-xs text-[#0b6b1d] font-bold mt-0.5">
            You save {formatPrice(selectedProduct.originalPriceINR - selectedProduct.priceINR, selectedProduct.originalPriceUSD - selectedProduct.priceUSD)} ({selectedProduct.discountPercent}% OFF)
          </span>
        </div>

        <div className="bg-[#fd9e00] text-[#653c00] px-3 py-1.5 rounded-xl text-center shadow-xs">
          <span className="text-[9px] block uppercase font-bold tracking-wider">Flash Sale</span>
          <span className="text-xs font-mono font-bold">
            Ends in {format2(flashTime.hours)}:{format2(flashTime.minutes)}:{format2(flashTime.seconds)}
          </span>
        </div>
      </div>

      {/* Available Offers List */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-bold text-slate-900 text-sm">Available Offers</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-[#f2f4f7] p-3 rounded-xl flex items-start gap-3 border border-slate-200/60">
            <span className="material-symbols-outlined text-[#0056c3] text-[20px] mt-0.5">local_offer</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">Bank Offer</span>
              <span className="text-xs text-slate-600">10% instant discount on Apex Bank Credit Cards, up to $25 / ₹1,000.</span>
            </div>
          </div>
          <div className="bg-[#f2f4f7] p-3 rounded-xl flex items-start gap-3 border border-slate-200/60">
            <span className="material-symbols-outlined text-[#875200] text-[20px] mt-0.5">payments</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">Cashback Deal</span>
              <span className="text-xs text-slate-600">Get 5% cashback up to $15 / ₹500 on your first wallet transaction.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Selector */}
      {selectedProduct.colors && selectedProduct.colors.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-900">
              Color: <span className="font-normal text-slate-600">{selectedColor}</span>
            </span>
          </div>
          <div className="flex gap-3">
            {selectedProduct.colors.map(col => {
              const isSelected = selectedColor === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`w-9 h-9 rounded-full transition-all shadow-xs ${col.class} ${
                    isSelected ? 'ring-2 ring-[#0056c3] ring-offset-2 scale-105' : 'ring-1 ring-slate-300 opacity-80'
                  }`}
                  title={col.name}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Edition / Variant Selector */}
      {selectedProduct.editions && selectedProduct.editions.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-sm font-bold text-slate-900">Edition / Size</span>
          <div className="grid grid-cols-2 gap-2.5">
            {selectedProduct.editions.map(ed => {
              const isSelected = selectedEdition === ed;
              return (
                <button
                  key={ed}
                  onClick={() => setSelectedEdition(ed)}
                  className={`p-3 rounded-xl text-center text-xs font-bold transition-all shadow-xs ${
                    isSelected
                      ? 'bg-[#0056c3] text-white shadow-sm'
                      : 'bg-[#f2f4f7] text-slate-800 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {ed}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Delivery & Services Check Input */}
      <div className="mt-4 flex flex-col gap-2">
        <span className="text-sm font-bold text-slate-900">Delivery &amp; Services</span>
        <div className="flex gap-2">
          <div className="flex-1 bg-[#f2f4f7] rounded-xl px-3.5 py-2 flex items-center gap-2 border border-slate-200/60">
            <span className="material-symbols-outlined text-slate-400 text-[18px]">location_on</span>
            <input
              type="text"
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              placeholder="Enter Pincode / Zip"
              className="bg-transparent w-full outline-none text-xs sm:text-sm text-slate-900 font-medium"
            />
          </div>
          <button
            onClick={handleCheckDelivery}
            className="bg-slate-800 hover:bg-slate-900 text-white px-4 rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            Check
          </button>
        </div>
        {deliveryStatus && (
          <div className="flex items-center gap-2 text-[#0b6b1d] text-xs mt-0.5">
            <span className="material-symbols-outlined text-[17px]">local_shipping</span>
            <span>{deliveryStatus}</span>
          </div>
        )}
      </div>

      {/* Product Highlights */}
      <div className="mt-4 flex flex-col gap-2">
        <span className="text-sm font-bold text-slate-900">Key Highlights</span>
        <div className="grid grid-cols-2 gap-2.5">
          {(selectedProduct.highlights || [
            { title: 'Premium Build', desc: 'Engineered for durability', icon: 'verified' },
            { title: '1 Year Warranty', desc: 'Hassle-free replacement', icon: 'shield' }
          ]).map((hl, i) => (
            <div key={i} className="bg-[#f2f4f7] p-3 rounded-xl flex items-center gap-2.5 border border-slate-200/60">
              <span className="material-symbols-outlined text-[#0056c3] text-[24px]">{hl.icon}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">{hl.title}</span>
                <span className="text-[11px] text-slate-500 truncate">{hl.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 bg-[#f2f4f7] p-3.5 rounded-xl border border-slate-200/60">
        <h4 className="text-xs font-bold text-slate-900 mb-1">Description</h4>
        <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#f7f9fc]/95 backdrop-blur-xl px-4 py-3 pb-safe border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#fd9e00] hover:bg-[#e08b00] text-[#653c00] py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAddedAnimation ? 'check' : 'shopping_cart'}
          </span>
          <span>{isAddedAnimation ? 'Added!' : 'Add to Cart'}</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[#0056c3] hover:bg-[#004299] text-white py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">flash_on</span>
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
