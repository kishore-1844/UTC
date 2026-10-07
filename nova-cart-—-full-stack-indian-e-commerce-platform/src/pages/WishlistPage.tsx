import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types/index.ts';
import { useWishlist } from '../context/WishlistContext.tsx';
import { useCart } from '../context/CartContext.tsx';

interface WishlistPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onSelectProduct: (p: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate, onSelectProduct }) => {
  const { wishlist, toggleWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async (product: Product) => {
    await addToCart(product.id, 1);
    await toggleWishlist(product.id);
  };

  if (isLoading && wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading wishlist items...
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore products you love and click the heart icon to save them for later!
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
          My Wishlist ({wishlist.length} items)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Saved items you plan to purchase</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div
              onClick={() => onSelectProduct(product)}
              className="cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {product.brand}
                </span>
                <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 hover:text-blue-600">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-sm font-bold text-slate-900 tabular-nums font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-xs text-slate-400 line-through tabular-nums font-mono">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => handleMoveToCart(product)}
                disabled={product.stock <= 0}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
