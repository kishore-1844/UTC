export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatarUrl?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl?: string;
  displayOrder: number;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  additionalImages?: string[];
  isFeatured?: boolean;
  isDeal?: boolean;
  specifications?: Record<string, string>;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  priceAtAddition: number;
}

export interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  couponCode?: string;
  deliveryCharge: number;
  total: number;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
  addressType: 'home' | 'work';
}

export type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'razorpay' | 'upi';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  deliveryCharge: number;
  total: number;
  trackingId?: string;
  createdAt: string;
  estimatedDeliveryDate: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  bannerUrl: string;
  validUntil: string;
  categoryId?: string;
  productId?: string;
  isActive: boolean;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrdersCount: number;
  lowStockCount: number;
  recentOrders: Order[];
}
