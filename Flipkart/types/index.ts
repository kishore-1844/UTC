export type Currency = 'INR' | 'USD';

export type ScreenType = 'home' | 'explore' | 'pdp' | 'cart' | 'profile';

export type ViewMode = 'mobile' | 'desktop';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'mobiles' | 'electronics' | 'fashion' | 'grocery' | 'appliances' | 'home' | 'accessories' | 'sports';
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  originalPriceUSD: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  isRecommended?: boolean;
  colors?: { name: string; hex: string; class: string }[];
  editions?: string[];
  highlights?: { title: string; desc: string; icon: string }[];
  specs?: Record<string, string>;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedEdition?: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountINR: number;
  discountUSD: number;
  minOrderINR: number;
  minOrderUSD: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  expectedDelivery: string;
  product: Product;
  quantity: number;
  color?: string;
  totalINR: number;
  totalUSD: number;
  trackingSteps: { title: string; time: string; completed: boolean; current?: boolean }[];
}

export interface Address {
  id: string;
  title: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}
