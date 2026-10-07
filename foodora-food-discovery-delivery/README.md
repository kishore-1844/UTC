# FOODORA — Discover. Order. Enjoy.

> A modern, premium full-stack food discovery and delivery web application inspired by contemporary Indian culinary commerce, crafted with clean design architecture, original branding, full offline PWA execution, and GitHub readiness.

---

## 📌 Project Overview

- **Project Category**: Food Discovery & Delivery E-Commerce Platform
- **Brand**: FOODORA
- **Tagline**: *Discover. Order. Enjoy.*
- **Lead Developer**: Sameer Ahamed (`sameerahamedsyed777@gmail.com`)
- **Default Delivery Location**: Kelambakkam, Chennai, Tamil Nadu
- **Online / Offline Support**: Progressive Web App (PWA) with Service Worker & Offline LocalStorage Cache
- **Download Options**: 1-Click PWA Installation on Android/iOS/Desktop & Full Source Code ZIP Export

---

## 🚀 How to Push this App to GitHub

Follow these steps to initialize and push this codebase to your GitHub repository:

### Step 1: Create a New Repository on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Set your **Repository name** (e.g. `foodora-app` or `foodora-food-discovery`).
3. Choose **Public** or **Private**.
4. **Do not** initialize with a README, .gitignore, or license (these already exist in this project).
5. Click **Create repository**.

### Step 2: Push Your Code via Terminal
In your terminal, navigate to the project directory and execute:

```bash
# 1. Initialize Git repository
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete Foodora food delivery PWA with offline support and GitHub readiness"

# 4. Set main branch
git branch -M main

# 5. Connect your GitHub remote repository (replace with your GitHub username)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/foodora-app.git

# 6. Push to GitHub
git push -u origin main
```

> **Tip:** You can also use the in-app **"Download App / GitHub Guide"** modal by clicking the **"Download App"** button in the header or account page. It includes an interactive 1-click command generator tailored to your GitHub username!

---

## 📶 Online and Offline Architecture

Foodora is built as an offline-first **Progressive Web App (PWA)** that functions seamlessly whether connected to high-speed internet, on unstable 2G/3G connections, or completely offline:

1. **Service Worker Pre-caching**:
   - Generates an automated service worker via `vite-plugin-pwa` and Workbox.
   - Pre-caches core application shell assets, scripts, stylesheets, Google Web Fonts, and brand culinary icons.

2. **Smart Runtime Caching**:
   - **Google Fonts & CDN Icons**: `CacheFirst` policy with 1-year expiration.
   - **Unsplash Culinary Images**: `StaleWhileRevalidate` with 30-day retention and 50-entry cache limit.
   - **REST API Routes (`/api/*`)**: `NetworkFirst` with 3-second network timeout and instant Cache fallback.

3. **Persistent Offline Storage**:
   - Cart items, restaurant selections, saved addresses, favorite dishes, and past orders are automatically synchronized to browser `localStorage`.
   - Even when completely offline or during a network dropout, users can browse menus, customize dishes with spice levels and addons, review their cart, and inspect past orders.

4. **Offline Order Queue**:
   - Placing an order while offline does not crash or display an error. The order is securely stored in local history and marked with local tracking details.
   - When the user reconnects, an automatic **"Connection Restored"** notification appears, resynchronizing state with the server.

5. **Visual Connectivity Indicator**:
   - An interactive non-intrusive banner appears automatically at the top of the screen when network connectivity drops, informing the user that offline cached data is active.

---

## 📱 How to Download & Install the App

Users have multiple flexible options to install and download Foodora:

### Option 1: Install as a Mobile App (Android / Chrome)
1. Open the app in Google Chrome or Brave on Android.
2. Tap the **"Download App"** button in the top navigation, or tap the browser menu (three dots `⋮`) and select **"Install app"** or **"Add to Home Screen"**.
3. Foodora will install as a standalone mobile application on your home screen with its custom saffron icon and launch in full-screen mode without browser address bars.

### Option 2: Install on iPhone & iPad (iOS Safari)
1. Open the app in Safari.
2. Tap the **Share** button in the Safari toolbar (square with arrow pointing up).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add** in the top-right corner. The app will launch as an independent standalone iOS app.

### Option 3: Install on Desktop (Windows, Mac, Linux)
1. Open the app in Google Chrome, Microsoft Edge, or Brave.
2. Look for the **Install** button (<kbd>⊕</kbd> or <kbd>↓</kbd>) in the right side of the URL address bar.
3. Click **Install**. Foodora will run in its own dedicated desktop window with native OS dock/taskbar integration.

### Option 4: Download Full Source Code (.ZIP)
1. Click the **"Download App"** button in the top navigation or account page.
2. Switch to the **"Download (.ZIP)"** tab.
3. Click **"Download Project (.ZIP)"** (or visit `/api/download/zip` directly).
4. The server packages the full source code (excluding `node_modules` and `.git`) into `foodora-food-discovery-delivery.zip`.
5. Extract the ZIP archive anywhere on your machine and run:
   ```bash
   npm install
   npm run dev
   ```

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React, Canvas Confetti, Motion
- **PWA & Offline**: `vite-plugin-pwa`, Workbox, Cache API, Service Worker, LocalStorage sync
- **Backend**: Node.js 22, Express, TypeScript runtime (`tsx`)
- **API Protocol**: RESTful API endpoints (`/api/restaurants`, `/api/menu-items`, `/api/orders`, `/api/coupons`, `/api/addresses`, `/api/favorites`, `/api/download/zip`)
- **CI / CD**: GitHub Actions (`.github/workflows/ci.yml`)

---

## 📦 Implemented Pages & Features

| Feature | Description |
|---|---|
| **Top Navigation** | Responsive brand wordmark, location selector for 8 Indian cities, search shortcut, cart pill, wishlist count, user profile, and Download App trigger. |
| **PWA & Offline Banner** | Live connectivity status monitor with automated reconnect sync. |
| **Home Page** | Dynamic hero section with quick keywords, 12 food categories with touch-scroll, popular restaurant grid, trending dishes, and special deal banners. |
| **Restaurants Page** | 30+ curated dining kitchens with multi-attribute filtering (cuisine, pure veg, 4.5+ rating, delivery speed, and pricing sort). |
| **Restaurant Menu** | Cover photo, hygiene assurance, dishes categorized by course, spice customization, add-ons customizer modal, and customer reviews. |
| **Cart & Billing** | Real-time GST calculation, packaging fee, delivery speed toggle (Standard vs Priority), coupon validation (e.g. `FOODORA20`, `FREEDEL`, `SAVE150`). |
| **Checkout Flow** | Multi-step wizard: Delivery Address → Speed Selection → Payment (UPI / Card / COD) → Order Confirmation with celebration confetti. |
| **Live Order Tracking** | Step-by-step progress timeline, live ETA countdown, and delivery partner card. |
| **Account Dashboard** | Order history with reorder option, favorite restaurants & dishes, address book, simulated 24/7 customer support chat, and Download App card. |
| **Admin Dashboard** | Partner operational portal for menu availability, order status orchestration, and platform revenue metrics. |

---

## 🛠️ Local Development Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Full-Stack Development Server
```bash
npm run dev
```
Starts the full-stack server on `http://localhost:3000` with Express REST API and Vite frontend running simultaneously.

### 3. Verify Code Quality & Types
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

### 5. Start Production Server
```bash
npm run start
```

---

## 📄 License & Attribution

© 2026 FOODORA India Technologies. Designed and developed by Sameer Ahamed. All rights reserved.
