import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, Check, ArrowLeft, Send } from 'lucide-react';
import { Product, Review } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../context/WishlistContext.tsx';
import { api } from '../services/api.ts';
import { ProductCard } from '../components/ProductCard.tsx';

interface ProductDetailsPageProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (tab: string, meta?: any) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  reviews: initialReviews,
  relatedProducts,
  onBack,
  onSelectProduct,
  onNavigate
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Pincode checker
  const [pincode, setPincode] = useState<string>('560103');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>('Delivery available by tomorrow (Free on ₹999+)');

  // Review submission
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [userRating, setUserRating] = useState<number>(5);
  const [userComment, setUserComment] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    setIsAdding(true);
    const res = await addToCart(product.id, quantity);
    setIsAdding(false);
    if (res.success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }
  };

  const handleBuyNow = async () => {
    if (product.stock <= 0) return;
    await addToCart(product.id, quantity);
    onNavigate('checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus('Please enter a valid 6-digit Indian postal code');
      return;
    }
    setPincodeStatus(`Available! Standard delivery to ${pincode} within 2-3 business days.`);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    setIsSubmittingReview(true);
    try {
      const newReview = await api.addReview({
        productId: product.id,
        rating: userRating,
        comment: userComment
      });
      setReviewsList([newReview, ...reviewsList]);
      setUserComment('');
      setReviewSuccess('Review published successfully! Thank you for your feedback.');
      setTimeout(() => setReviewSuccess(null), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to catalog</span>
      </button>

      {/* Main Contiguous PDP Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Gallery (Left Zone) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                {product.discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
              title="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Purchase & Info Module (Right Zone) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.categoryName || 'General'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {product.reviewCount} Ratings & {reviewsList.length} Verified Customer Reviews
              </span>
            </div>
          </div>

          {/* Pricing Module */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-emerald-600">
                  Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({product.discount}% off)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">Inclusive of all taxes & GST. Free shipping available.</p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Stock Indicator & Quantity Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Stock Availability:</span>
              {product.stock > 0 ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units available)
                </span>
              ) : (
                <span className="text-rose-600 font-bold">Currently Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-700">Select Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs: Add to Cart + Buy Now */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || isAdding}
              className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : product.stock <= 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                product.stock <= 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              Buy Now (Express Checkout)
            </button>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              Check Delivery & Cash on Delivery Options
            </span>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="w-40 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                ✓ {pincodeStatus}
              </p>
            )}
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">{key}</span>
                    <span className="text-slate-900 font-medium mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews & Form */}
      <section className="pt-8 border-t border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">Verified Customer Reviews</h3>
            <p className="text-xs text-slate-500 mt-0.5">Real feedback from genuine buyers across India</p>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 max-w-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Write a Review</h4>
          
          {reviewSuccess && (
            <div className="p-2 text-xs bg-emerald-100 text-emerald-800 rounded font-medium">
              {reviewSuccess}
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-medium">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-1 text-slate-400 hover:text-amber-400 focus:outline-none"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= userRating ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              required
              rows={3}
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="How was the build quality, delivery speed, and overall performance?"
              className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
              <span>{isSubmittingReview ? 'Submitting...' : 'Post Review'}</span>
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviewsList.map((rev) => (
              <div key={rev.id} className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Purchase
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Reviewed on {new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold font-display text-slate-900">Similar Products You May Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
