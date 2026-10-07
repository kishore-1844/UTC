import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { api } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface WishlistContextType {
  wishlist: Product[];
  wishlistIds: Set<string>;
  isLoading: boolean;
  toggleWishlist: (productId: string) => Promise<boolean>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshWishlist = async () => {
    try {
      setIsLoading(true);
      const items = await api.getWishlist();
      setWishlist(items);
      setWishlistIds(new Set(items.map(p => p.id)));
    } catch (err) {
      console.error('Failed to load wishlist', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, [user]);

  const toggleWishlist = async (productId: string): Promise<boolean> => {
    try {
      const res = await api.toggleWishlist(productId);
      setWishlist(res.wishlist);
      setWishlistIds(new Set(res.wishlist.map(p => p.id)));
      return res.inWishlist;
    } catch (err) {
      console.error('Failed to toggle wishlist', err);
      return false;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistIds.has(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        isLoading,
        toggleWishlist,
        isInWishlist,
        refreshWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
