/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductDetailsPage } from './pages/ProductDetailsPage.tsx';
import { DealsPage } from './pages/DealsPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage.tsx';
import { AccountPage } from './pages/AccountPage.tsx';
import { WishlistPage } from './pages/WishlistPage.tsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.tsx';
import { Product, Category, Deal, Order, Review } from './types/index.ts';
import { api } from './services/api.ts';

export function MainStoreApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selected item states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<{
    product: Product;
    reviews: Review[];
    relatedProducts: Product[];
  } | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Initial load
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);
        const [cats, prods, dls] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
          api.getDeals()
        ]);
        setCategories(cats);
        setProducts(prods);
        setDeals(dls);
      } catch (err) {
        console.error('Failed to initialize store catalog', err);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  const handleNavigate = (tab: string, meta?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (meta?.category) {
      setSelectedCategory(meta.category);
    }
    if (meta?.isDeal) {
      setSelectedCategory('all');
    }
    setCurrentTab(tab);
  };

  const handleSelectProduct = async (product: Product) => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSelectedProduct(product);
      setCurrentTab('product-details');
      const details = await api.getProductById(product.id);
      setSelectedProductDetails(details);
    } catch (err) {
      console.error(err);
      setSelectedProductDetails({
        product,
        reviews: [],
        relatedProducts: products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)
      });
    }
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
    setCurrentTab('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOrderFromAccount = (order: Order) => {
    setConfirmedOrder(order);
    setCurrentTab('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Connecting to NOVA CART Storefront...
            </p>
          </div>
        ) : (
          <>
            {currentTab === 'home' && (
              <HomePage
                categories={categories}
                featuredProducts={products.filter(p => p.isFeatured)}
                deals={deals}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'shop' && (
              <ShopPage
                products={products}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'product-details' && selectedProduct && (
              <ProductDetailsPage
                product={selectedProductDetails?.product || selectedProduct}
                reviews={selectedProductDetails?.reviews || []}
                relatedProducts={selectedProductDetails?.relatedProducts || []}
                onBack={() => setCurrentTab('shop')}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'deals' && (
              <DealsPage
                deals={deals}
                dealProducts={products.filter(p => p.isDeal || p.discount >= 35)}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'cart' && (
              <CartPage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'checkout' && (
              <CheckoutPage
                onOrderSuccess={handleOrderSuccess}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'order-confirmation' && confirmedOrder && (
              <OrderConfirmationPage
                order={confirmedOrder}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'account' && (
              <AccountPage
                onNavigate={handleNavigate}
                onSelectOrder={handleSelectOrderFromAccount}
              />
            )}

            {currentTab === 'wishlist' && (
              <WishlistPage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'admin' && (
              <AdminDashboardPage
                categories={categories}
                onNavigate={handleNavigate}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Sign In & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <MainStoreApp />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
