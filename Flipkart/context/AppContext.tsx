import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency, ScreenType, ViewMode, Coupon, Address, OrderItem } from '../types';
import { PRODUCTS, INITIAL_CART_ITEMS, AVAILABLE_COUPONS, INITIAL_ADDRESSES, INITIAL_ORDERS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  selectedProduct: Product;
  setSelectedProduct: (p: Product) => void;
  openProduct: (p: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, edition?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inr: number, usd: number) => string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  activeCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon | null) => void;
  addresses: Address[];
  defaultAddress: Address;
  setDefaultAddress: (id: string) => void;
  addNewAddress: (address: Omit<Address, 'id'>) => void;
  superCoins: number;
  orders: OrderItem[];
  activeTrackingOrder: OrderItem | null;
  setActiveTrackingOrder: (o: OrderItem | null) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (b: boolean) => void;
  isCouponModalOpen: boolean;
  setIsCouponModalOpen: (b: boolean) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (b: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (b: boolean) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (b: boolean) => void;
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  cartTotalCount: number;
  cartSubtotalINR: number;
  cartSubtotalUSD: number;
  cartTotalSavingsINR: number;
  cartTotalSavingsUSD: number;
  placeOrder: () => OrderItem;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [screen, setScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<string[]>(['sonicpro-headphones', 'brewmaster-flask', 'chronos-watch']);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [superCoins, setSuperCoins] = useState(1250);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<OrderItem | null>(INITIAL_ORDERS[0]);
  
  // Modals
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    showToast('Delivery address updated');
  };

  const addNewAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
    showToast('New address added');
  };

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setScreen('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, color?: string, edition?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color && item.selectedEdition === edition);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, {
        product,
        quantity,
        selectedColor: color || product.colors?.[0]?.name,
        selectedEdition: edition || product.editions?.[0]
      }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (coupon: Coupon | null) => {
    setActiveCoupon(coupon);
    if (coupon) {
      showToast(`Coupon "${coupon.code}" applied!`);
    } else {
      showToast('Coupon removed', 'info');
    }
  };

  const formatPrice = (inr: number, usd: number) => {
    if (currency === 'USD') {
      return `$${usd.toFixed(2)}`;
    }
    return `₹${inr.toLocaleString('en-IN')}`;
  };

  // Cart Calculations
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotalINR = cart.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const cartOriginalTotalINR = cart.reduce((acc, item) => acc + item.product.originalPriceINR * item.quantity, 0);
  const cartOriginalTotalUSD = cart.reduce((acc, item) => acc + item.product.originalPriceUSD * item.quantity, 0);

  const discountFromMRP_INR = cartOriginalTotalINR - cartSubtotalINR;
  const discountFromMRP_USD = cartOriginalTotalUSD - cartSubtotalUSD;

  const couponDiscountINR = activeCoupon ? activeCoupon.discountINR : 0;
  const couponDiscountUSD = activeCoupon ? activeCoupon.discountUSD : 0;

  const cartTotalSavingsINR = discountFromMRP_INR + couponDiscountINR;
  const cartTotalSavingsUSD = discountFromMRP_USD + couponDiscountUSD;

  const placeOrder = (): OrderItem => {
    const orderNum = `OD${Math.floor(10000000000 + Math.random() * 90000000000)}`;
    const finalINR = Math.max(0, cartSubtotalINR - couponDiscountINR);
    const finalUSD = Math.max(0, cartSubtotalUSD - couponDiscountUSD);

    const primaryProduct = cart[0]?.product || PRODUCTS[0];
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: 'Just now',
      status: 'Processing',
      expectedDelivery: 'Tomorrow by 4:00 PM',
      product: primaryProduct,
      quantity: cartTotalCount || 1,
      color: cart[0]?.selectedColor,
      totalINR: finalINR,
      totalUSD: finalUSD,
      trackingSteps: [
        { title: 'Order Confirmed', time: 'Just now', completed: true, current: true },
        { title: 'Packed & Dispatched', time: 'Estimated 2 hrs', completed: false },
        { title: 'Out for Delivery', time: 'Tomorrow 9:00 AM', completed: false },
        { title: 'Delivered', time: 'Tomorrow by 4:00 PM', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setSuperCoins(prev => prev + 50);
    clearCart();
    setActiveTrackingOrder(newOrder);
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        screen,
        setScreen,
        selectedProduct,
        setSelectedProduct,
        openProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        currency,
        setCurrency,
        formatPrice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeCoupon,
        applyCoupon,
        addresses,
        defaultAddress,
        setDefaultAddress,
        addNewAddress,
        superCoins,
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isCouponModalOpen,
        setIsCouponModalOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isSupportModalOpen,
        setIsSupportModalOpen,
        toasts,
        showToast,
        cartTotalCount,
        cartSubtotalINR,
        cartSubtotalUSD,
        cartTotalSavingsINR,
        cartTotalSavingsUSD,
        placeOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
