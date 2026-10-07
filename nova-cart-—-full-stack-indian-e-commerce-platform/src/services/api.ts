import { Product, Category, Deal, CartSummary, Address, Order, Review, UserProfile, AdminStats } from '../types/index.ts';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('nova_cart_token') || 'customer-token';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export const api = {
  // Products
  async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sort?: string;
    isDeal?: boolean;
    featured?: boolean;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
    if (params?.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());
    if (params?.minRating !== undefined) query.set('minRating', params.minRating.toString());
    if (params?.sort) query.set('sort', params.sort);
    if (params?.isDeal) query.set('isDeal', 'true');
    if (params?.featured) query.set('featured', 'true');

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },

  async getProductById(id: string): Promise<{ product: Product; reviews: Review[]; relatedProducts: Product[] }> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to load product details');
    return res.json();
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to delete product');
  },

  // Categories & Deals
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to load categories');
    return res.json();
  },

  async getDeals(): Promise<Deal[]> {
    const res = await fetch(`${API_BASE}/deals`);
    if (!res.ok) throw new Error('Failed to load deals');
    return res.json();
  },

  // Cart
  async getCart(): Promise<CartSummary> {
    const res = await fetch(`${API_BASE}/cart`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load cart');
    return res.json();
  },

  async addToCart(productId: string, quantity: number = 1): Promise<{ message: string; cart: CartSummary }> {
    const res = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ productId, quantity })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add item to cart');
    return data;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<{ message: string; cart: CartSummary }> {
    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ quantity })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update cart');
    return data;
  },

  async removeCartItem(itemId: string): Promise<{ cart: CartSummary }> {
    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to remove cart item');
    return res.json();
  },

  async clearCart(): Promise<void> {
    await fetch(`${API_BASE}/cart`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
  },

  // Wishlist
  async getWishlist(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/wishlist`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load wishlist');
    return res.json();
  },

  async toggleWishlist(productId: string): Promise<{ inWishlist: boolean; wishlist: Product[] }> {
    const res = await fetch(`${API_BASE}/wishlist`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ productId })
    });
    if (!res.ok) throw new Error('Failed to update wishlist');
    return res.json();
  },

  // Addresses
  async getAddresses(): Promise<Address[]> {
    const res = await fetch(`${API_BASE}/addresses`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load addresses');
    return res.json();
  },

  async saveAddress(address: Partial<Address>): Promise<Address> {
    const res = await fetch(`${API_BASE}/addresses`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(address)
    });
    if (!res.ok) throw new Error('Failed to save address');
    return res.json();
  },

  async deleteAddress(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/addresses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to delete address');
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load orders');
    return res.json();
  },

  async getOrderById(id: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load order details');
    return res.json();
  },

  async createOrder(data: { address: Address; paymentMethod: string; couponCode?: string }): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to place order');
    return result;
  },

  async updateOrderStatus(orderId: string, status: Order['orderStatus']): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },

  // Reviews
  async addReview(data: { productId: string; rating: number; comment: string }): Promise<Review> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return res.json();
  },

  // Auth
  async login(email: string): Promise<{ user: UserProfile; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async register(data: { email: string; fullName: string; phone?: string; role?: 'customer' | 'admin' }): Promise<{ user: UserProfile; token: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    if (!res.ok) throw new Error(resData.error || 'Registration failed');
    return resData;
  },

  async getMe(): Promise<UserProfile> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to get user profile');
    return res.json();
  },

  async updateProfile(data: { fullName: string; phone?: string }): Promise<UserProfile> {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Admin Stats
  async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load admin metrics');
    return res.json();
  }
};
