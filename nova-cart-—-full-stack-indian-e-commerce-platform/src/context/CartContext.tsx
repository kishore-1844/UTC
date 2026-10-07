import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartSummary } from '../types/index.ts';
import { api } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface CartContextType {
  cart: CartSummary;
  isLoading: boolean;
  couponCode: string;
  couponError: string | null;
  couponSuccess: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<{ success: boolean; message: string }>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  refreshCart: () => Promise<void>;
}

const defaultCart: CartSummary = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  discount: 0,
  couponDiscount: 0,
  deliveryCharge: 0,
  total: 0
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartSummary>(defaultCart);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const calculateTotals = (rawCart: CartSummary, coupon: string): CartSummary => {
    let couponDiscount = 0;
    if (coupon.toUpperCase() === 'NOVA10') {
      couponDiscount = Math.round(rawCart.subtotal * 0.1);
    } else if (coupon.toUpperCase() === 'SUPER500') {
      couponDiscount = rawCart.subtotal >= 2000 ? 500 : 0;
    }

    const subtotalAfterCoupon = Math.max(0, rawCart.subtotal - couponDiscount);
    const deliveryCharge = rawCart.items.length === 0 || subtotalAfterCoupon >= 999 ? 0 : 79;
    const total = subtotalAfterCoupon + deliveryCharge;

    return {
      ...rawCart,
      couponDiscount,
      couponCode: coupon || undefined,
      deliveryCharge,
      total
    };
  };

  const refreshCart = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCart();
      setCart(calculateTotals(data, couponCode));
    } catch (err) {
      console.error('Failed to load cart', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.addToCart(productId, quantity);
      setCart(calculateTotals(res.cart, couponCode));
      return { success: true, message: 'Item added to cart!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Could not add to cart' };
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await api.updateCartItem(itemId, quantity);
      setCart(calculateTotals(res.cart, couponCode));
    } catch (err: any) {
      console.error('Failed to update quantity', err);
      alert(err.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await api.removeCartItem(itemId);
      setCart(calculateTotals(res.cart, couponCode));
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCart(defaultCart);
      setCouponCode('');
      setCouponSuccess(null);
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);

    if (clean === 'NOVA10') {
      setCouponCode('NOVA10');
      setCouponSuccess('10% Flat Discount applied successfully!');
      setCart(prev => calculateTotals(prev, 'NOVA10'));
    } else if (clean === 'SUPER500') {
      if (cart.subtotal < 2000) {
        setCouponError('SUPER500 requires minimum cart subtotal of ₹2,000');
        return;
      }
      setCouponCode('SUPER500');
      setCouponSuccess('Flat ₹500 savings applied!');
      setCart(prev => calculateTotals(prev, 'SUPER500'));
    } else {
      setCouponError('Invalid coupon code. Try NOVA10 or SUPER500');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponSuccess(null);
    setCouponError(null);
    setCart(prev => calculateTotals(prev, ''));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        couponCode,
        couponError,
        couponSuccess,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
