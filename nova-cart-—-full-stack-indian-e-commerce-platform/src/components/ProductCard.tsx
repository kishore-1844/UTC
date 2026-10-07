import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../context/WishlistContext.tsx';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    setIsAdding(true);
    const res = await addToCart(product.id, 1);
    setIsAdding(false);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // High quality fallback container if needed
            (e.target as HTMLImageElement).src = '/src/assets/images/category_electronics_1791222493395.jpg';
          }}
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Discount Badge if any */}
        {product.discount > 0 && (
          <div className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category Clean Text */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryName || 'General'}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating & Review count */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-xs font-bold">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
            </div>
            <span className="text-xs text-slate-500">({product.reviewCount})</span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-amber-600 font-medium ml-auto">Only {product.stock} left!</span>
            )}
            {product.stock === 0 && (
              <span className="text-xs text-rose-600 font-medium ml-auto">Out of stock</span>
            )}
          </div>
        </div>

        {/* Price & Action Module */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500">Free delivery by tomorrow</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isAdding}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : product.stock <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
            title="Add to cart"
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
