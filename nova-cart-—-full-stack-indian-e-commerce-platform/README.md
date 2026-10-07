# NOVA CART — Full-Stack Indian E-Commerce Platform

A production-grade, full-stack e-commerce marketplace crafted for the Indian market, inspired by modern retail experiences like Flipkart. Features 8 curated categories, 30+ products with Indian Rupee (₹) pricing, live active deals, cart, address management, multi-step checkout with Cash on Delivery (COD) and Razorpay test simulation, order tracking, and an administrative control panel.

---

## Architecture Overview

```text
                 NOVA CART
                     │
          ┌──────────┴──────────┐
          │                     │
       Frontend              Backend
   React + Vite             Node + Express
          │                     │
          └──────────┬──────────┘
                     │
            Supabase / PostgreSQL
                     │
          ┌──────────┼──────────┐
          │          │          │
      PostgreSQL    Auth     Storage
          │
   Products / Orders
   Users / Cart
   Wishlist / Reviews
   Categories / Deals
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons |
| **Backend** | Node.js, Express, TypeScript (tsx runtime) |
| **Database** | PostgreSQL / Supabase Schema (RLS policies + 001_initial_schema.sql) |
| **Authentication** | Supabase Auth / JWT Session with Role-Based Access Control (RBAC) |
| **Payments** | Cash on Delivery (COD) & Razorpay Test Gateway Simulation |
| **Fulfillment** | Pan-India PIN code delivery estimator & live Delhivery-style tracking |

---

## Core Pages & Features

1. **Home (`/`)**:
   - Hero showcase banner with authentic lifestyle imagery.
   - Horizontal category strip with quick-filtering.
   - Limited-time Lightning Deal card with live countdown timer.
   - Curated best-seller collections & Indian trust guarantees.

2. **Shop Catalog (`/shop`)**:
   - 8 Categories: Electronics, Mobiles, Fashion, Home & Kitchen, Beauty, Sports & Fitness, Accessories, Gourmet & Grocery.
   - Real-time search with debounced filtering across name, brand, description.
   - Price range filter slider (₹500 – ₹1,00,000).
   - Star rating filter (4★ & up, 3★ & up).
   - Sorting by: Featured, Price (Low to High), Price (High to Low), Customer Rating, Discount (% Off).

3. **Product Details (`/products/:id`)**:
   - Sticky high-resolution gallery and contiguous purchase module.
   - MRP strikethrough, selling price, and instant discount percentage calculation.
   - 6-digit Indian PIN code delivery checker.
   - Key specifications list.
   - Verified buyer reviews with review submission form and dynamic rating recalculation.
   - Related products slider.

4. **Deals & Offers (`/deals`)**:
   - Curated lightning deals with active countdown timer.
   - High-discount banners (30% to 50% off).

5. **Cart (`/cart`)**:
   - Itemized cart with quantity steppers that enforce real-time stock limits.
   - Coupon codes (`NOVA10` for 10% off, `SUPER500` for ₹500 off orders over ₹2,000).
   - Free shipping progress alert (Free on orders ₹999+, otherwise ₹79).
   - Itemized savings breakdown.

6. **Multi-Step Checkout (`/checkout`)**:
   - Step 1: Delivery Address (select existing or add new with Indian state, city, PIN code).
   - Step 2: Payment Mode (Cash on Delivery or Razorpay Test simulation).
   - Step 3: Server-side inventory validation, stock decrement, and order creation.

7. **Order Confirmation (`/orders/:id`)**:
   - Order ID (e.g. `NC-2026-98124`) and Tracking ID (e.g. `DELHIVERY-981238472`).
   - 4-step delivery progress tracker: Order Placed → Packed & Dispatched → In Transit → Delivered.
   - Printable tax invoice button.

8. **My Account (`/account`)**:
   - Customer profile details.
   - Saved Address Book (add, edit, delete, default).
   - Order History with live status chips and track order links.

9. **Wishlist (`/wishlist`)**:
   - User-specific saved products.
   - One-click "Move to Cart" action.

10. **Merchant Admin Dashboard (`/admin`)**:
    - Restricted to users with the `admin` role.
    - KPI Metrics: Gross Revenue, Total Orders, Active Customers, Low Stock Alerts.
    - Product Management: Add new product, live stock level editing, product deletion.
    - Order Management: Status updater (Processing → Confirmed → Shipped → Delivered → Cancelled).

---

## Database Migrations & Seeds

The project includes complete, production-ready PostgreSQL / Supabase SQL scripts:

- `/supabase/migrations/001_initial_schema.sql`: Contains 13 tables (`profiles`, `categories`, `products`, `product_images`, `reviews`, `wishlists`, `wishlist_items`, `carts`, `cart_items`, `addresses`, `orders`, `order_items`, `deals`), foreign keys, performance indexes, and Row Level Security (RLS) policies.
- `/supabase/seed/001_seed_data.sql`: Seeds 8 standard categories, 32 realistic products in Indian Rupees (₹), and active promotional deals.

---

## REST API Endpoints

```text
GET    /api/categories        # List all product categories
GET    /api/deals             # List active promotional deals

GET    /api/products          # Filter by category, search, minPrice, maxPrice, rating, sort
GET    /api/products/:id      # Product details with reviews & related items
POST   /api/products          # (Admin) Add new product
PUT    /api/products/:id      # (Admin) Edit product or update stock
DELETE /api/products/:id      # (Admin) Delete product

GET    /api/cart              # Get active user cart with totals & discounts
POST   /api/cart              # Add product to cart (validates stock)
PUT    /api/cart/:itemId      # Update cart item quantity
DELETE /api/cart/:itemId      # Remove item from cart
DELETE /api/cart              # Clear cart

GET    /api/wishlist          # Get user wishlist
POST   /api/wishlist          # Toggle item in wishlist
DELETE /api/wishlist/:id      # Remove from wishlist

GET    /api/addresses         # List saved user addresses
POST   /api/addresses         # Save new delivery address
DELETE /api/addresses/:id     # Delete address

GET    /api/orders            # List user orders (or all orders for Admin)
GET    /api/orders/:id        # Get order details
POST   /api/orders            # Place order (server-side total computation & inventory deduction)
PUT    /api/orders/:id/status # (Admin) Update order fulfillment status

POST   /api/reviews           # Add customer review & recalculate rating
POST   /api/auth/login        # Login with email
POST   /api/auth/register     # Register customer or admin
GET    /api/auth/me           # Get authenticated user profile
GET    /api/admin/stats       # (Admin) Summary KPI metrics
```

---

## Local Development & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Start Full-Stack Development Server**:
   ```bash
   npm run dev
   ```
   The application runs at `http://localhost:3000` with the Express REST API and Vite frontend unified on port 3000.

4. **Testing Accounts**:
   Click "Sign In" in the navigation bar to use the one-click demo profiles:
   - **Customer**: `customer@novacart.in` (Rahul Sharma)
   - **Admin**: `admin@novacart.in` (Priya Patel)
