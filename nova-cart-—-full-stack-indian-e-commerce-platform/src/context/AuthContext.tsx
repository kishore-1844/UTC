import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/index.ts';
import { api } from '../services/api.ts';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (data: { email: string; fullName: string; phone?: string; role?: 'customer' | 'admin' }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { fullName: string; phone?: string }) => Promise<void>;
  switchDemoRole: (role: 'customer' | 'admin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('nova_cart_token') || 'customer-token');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await api.getMe();
      setUser(profile);
    } catch (err) {
      console.error('Failed to load current user, defaulting to demo customer', err);
      // Fallback default
      setUser({
        id: 'user-customer-1',
        email: 'customer@novacart.in',
        fullName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        role: 'customer',
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const login = async (email: string) => {
    const res = await api.login(email);
    localStorage.setItem('nova_cart_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (data: { email: string; fullName: string; phone?: string; role?: 'customer' | 'admin' }) => {
    const res = await api.register(data);
    localStorage.setItem('nova_cart_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('nova_cart_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data: { fullName: string; phone?: string }) => {
    const updated = await api.updateProfile(data);
    setUser(updated);
  };

  const switchDemoRole = async (role: 'customer' | 'admin') => {
    const email = role === 'admin' ? 'admin@novacart.in' : 'customer@novacart.in';
    await login(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
