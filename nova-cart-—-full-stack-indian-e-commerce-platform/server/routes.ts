import { Router, Request, Response } from 'express';
import { db } from './db.ts';

export const apiRouter = Router();

// Helper to extract or fallback to current user ID
const getUserId = (req: Request): string => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === 'admin-token') return 'user-admin-1';
    if (token === 'customer-token') return 'user-customer-1';
    // If it is a direct user id
    if (token.startsWith('user-')) return token;
  }
  // Default to customer-1 for smooth browsing experience
  return 'user-customer-1';
};

// ---------------- PRODUCTS ----------------
apiRouter.get('/products', (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice, minRating, sort, isDeal, featured } = req.query;
    const products = db.getProducts({
      category: category as string,
      search: search as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      sort: sort as string,
      isDeal: isDeal === 'true',
      featured: featured === 'true'
    });
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

apiRouter.get('/products/:id', (req: Request, res: Response) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const reviews = db.getProductReviews(product.id);
    const relatedProducts = db.getProducts({ category: product.categoryId })
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    res.json({
      product,
      reviews,
      relatedProducts
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

apiRouter.post('/products', (req: Request, res: Response) => {
  try {
    const { name, brand, description, categoryId, price, mrp, stock, imageUrl, specifications } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ error: 'Missing required product fields' });
    }

    const calculatedDiscount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
    const created = db.createProduct({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: brand || 'Nova Select',
      description: description || '',
      categoryId,
      price: Number(price),
      mrp: Number(mrp || price),
      discount: calculatedDiscount,
      stock: Number(stock || 10),
      rating: 5.0,
      reviewCount: 0,
      imageUrl: imageUrl || '/src/assets/images/category_electronics_1791222493395.jpg',
      isFeatured: req.body.isFeatured || false,
      isDeal: req.body.isDeal || false,
      specifications: specifications || {}
    });

    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

apiRouter.put('/products/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

apiRouter.delete('/products/:id', (req: Request, res: Response) => {
  try {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ---------------- CATEGORIES ----------------
apiRouter.get('/categories', (_req: Request, res: Response) => {
  res.json(db.categories);
});

// ---------------- DEALS ----------------
apiRouter.get('/deals', (_req: Request, res: Response) => {
  res.json(db.deals);
});

// ---------------- CART ----------------
apiRouter.get('/cart', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const cart = db.getCart(userId);
    res.json(cart);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
});

apiRouter.post('/cart', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }
    const result = db.addToCart(userId, productId, Number(quantity));
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

apiRouter.put('/cart/:itemId', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ error: 'quantity is required' });
    }
    const result = db.updateCartItemQty(userId, req.params.itemId, Number(quantity));
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

apiRouter.delete('/cart/:itemId', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const result = db.removeCartItem(userId, req.params.itemId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

apiRouter.delete('/cart', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const result = db.clearCart(userId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// ---------------- WISHLIST ----------------
apiRouter.get('/wishlist', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const wishlist = db.getWishlist(userId);
    res.json(wishlist);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

apiRouter.post('/wishlist', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }
    const result = db.toggleWishlist(userId, productId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to toggle wishlist' });
  }
});

apiRouter.delete('/wishlist/:productId', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const result = db.toggleWishlist(userId, req.params.productId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

// ---------------- ADDRESSES ----------------
apiRouter.get('/addresses', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const addresses = db.getAddresses(userId);
    res.json(addresses);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

apiRouter.post('/addresses', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { fullName, phone, streetAddress, locality, city, state, postalCode, isDefault, addressType } = req.body;
    if (!fullName || !phone || !streetAddress || !city || !postalCode) {
      return res.status(400).json({ error: 'Please fill all mandatory address fields' });
    }
    const address = db.saveAddress(userId, {
      fullName,
      phone,
      streetAddress,
      locality: locality || '',
      city,
      state: state || 'Karnataka',
      postalCode,
      isDefault: Boolean(isDefault),
      addressType: addressType || 'home'
    });
    res.status(201).json(address);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save address' });
  }
});

apiRouter.delete('/addresses/:id', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const success = db.deleteAddress(userId, req.params.id);
    res.json({ success });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// ---------------- ORDERS ----------------
apiRouter.get('/orders', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const user = db.users.find(u => u.id === userId);
    // If admin, return all orders; if customer, return user orders
    if (user?.role === 'admin') {
      return res.json(db.orders);
    }
    const orders = db.getUserOrders(userId);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

apiRouter.get('/orders/:id', (req: Request, res: Response) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

apiRouter.post('/orders', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { address, paymentMethod, couponCode } = req.body;
    if (!address || !paymentMethod) {
      return res.status(400).json({ error: 'Shipping address and payment method are required' });
    }
    const result = db.createOrder(userId, { address, paymentMethod, couponCode });
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    res.status(201).json(result.order);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

apiRouter.put('/orders/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const updated = db.updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// ---------------- REVIEWS ----------------
apiRouter.post('/reviews', (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const user = db.users.find(u => u.id === userId);
    const { productId, rating, comment } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ error: 'Product, rating, and comment are required' });
    }
    const review = db.addReview(
      productId,
      userId,
      user?.fullName || 'Verified Customer',
      Number(rating),
      comment
    );
    res.status(201).json(review);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// ---------------- AUTH ----------------
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = user.role === 'admin' ? 'admin-token' : 'customer-token';
    res.json({
      user,
      token
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Login failed' });
  }
});

apiRouter.post('/auth/register', (req: Request, res: Response) => {
  try {
    const { email, fullName, phone, role = 'customer' } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ error: 'Email and full name are required' });
    }

    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser: any = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone: phone || '+91 99999 00000',
      role: role === 'admin' ? 'admin' : 'customer',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    const token = newUser.role === 'admin' ? 'admin-token' : 'customer-token';
    res.status(201).json({ user: newUser, token });
  } catch (err: any) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

apiRouter.get('/auth/me', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

apiRouter.put('/auth/profile', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const userIdx = db.users.findIndex(u => u.id === userId);
  if (userIdx === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { fullName, phone } = req.body;
  db.users[userIdx] = {
    ...db.users[userIdx],
    fullName: fullName || db.users[userIdx].fullName,
    phone: phone || db.users[userIdx].phone
  };
  res.json(db.users[userIdx]);
});

// ---------------- ADMIN STATS ----------------
apiRouter.get('/admin/stats', (_req: Request, res: Response) => {
  res.json(db.getAdminStats());
});
