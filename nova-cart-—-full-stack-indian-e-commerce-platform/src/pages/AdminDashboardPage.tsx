import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, Package, Users, AlertTriangle, Plus, Trash2, Edit2, Search, Check, RefreshCw } from 'lucide-react';
import { AdminStats, Product, Category, Order } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { api } from '../services/api.ts';

interface AdminDashboardPageProps {
  categories: Category[];
  onNavigate: (tab: string, meta?: any) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ categories, onNavigate }) => {
  const { isAdmin, user, switchDemoRole } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'kpis' | 'products' | 'orders'>('kpis');
  const [productSearch, setProductSearch] = useState<string>('');

  // Add Product modal state
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [newProdName, setNewProdName] = useState<string>('');
  const [newProdBrand, setNewProdBrand] = useState<string>('Nova Select');
  const [newProdCategory, setNewProdCategory] = useState<string>('electronics');
  const [newProdPrice, setNewProdPrice] = useState<number>(1999);
  const [newProdMrp, setNewProdMrp] = useState<number>(2999);
  const [newProdStock, setNewProdStock] = useState<number>(25);
  const [newProdDesc, setNewProdDesc] = useState<string>('');
  const [isSavingProduct, setIsSavingProduct] = useState<boolean>(false);

  // Quick edit stock state
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      const [statsData, prodsData, ordersData] = await Promise.all([
        api.getAdminStats(),
        api.getProducts(),
        api.getOrders()
      ]);
      setStats(statsData);
      setProducts(prodsData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-display text-slate-900">Admin Privileges Required</h2>
        <p className="text-xs text-slate-500">
          You are currently logged in as a Customer (<strong className="text-slate-700">{user?.email}</strong>). Switch to Merchant Admin mode to test this dashboard.
        </p>
        <button
          onClick={() => switchDemoRole('admin')}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          ⚡ Switch to Admin Role (Priya Patel)
        </button>
      </div>
    );
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProduct(true);
    try {
      const created = await api.createProduct({
        name: newProdName,
        brand: newProdBrand,
        categoryId: newProdCategory,
        price: Number(newProdPrice),
        mrp: Number(newProdMrp),
        stock: Number(newProdStock),
        description: newProdDesc || 'Premium e-commerce curated item with national delivery coverage.',
        imageUrl: '/src/assets/images/category_electronics_1791222493395.jpg'
      });
      setProducts([created, ...products]);
      setIsAddingProduct(false);
      setNewProdName('');
      setNewProdDesc('');
      loadAdminData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      await api.updateProduct(id, { stock: newStock });
      setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
      setEditingStockId(null);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['orderStatus']) => {
    try {
      const updated = await api.updateOrderStatus(orderId, status);
      setOrders(orders.map(o => o.id === orderId ? updated : o));
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAdminProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Merchant Operations Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            NOVA CART Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time catalog control, inventory management, and pan-India fulfillment tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAdminData}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Gross Revenue
            </span>
            <p className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold">+18.4% this month</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-blue-600" /> Total Orders
            </span>
            <p className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              {stats.totalOrders}
            </p>
            <span className="text-[10px] text-blue-600 font-semibold">{stats.pendingOrdersCount} orders in transit</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-600" /> Active Customers
            </span>
            <p className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              {stats.totalCustomers}
            </p>
            <span className="text-[10px] text-slate-400 font-semibold">Registered profiles</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Low Stock Alerts
            </span>
            <p className="text-2xl font-extrabold font-mono text-amber-600 tabular-nums">
              {stats.lowStockCount}
            </p>
            <span className="text-[10px] text-amber-600 font-semibold">&le; 15 units remaining</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'kpis'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Recent Activity & KPIs
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Product Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Orders & Fulfillment ({orders.length})
        </button>
      </div>

      {/* TAB 1: Recent Activity & KPIs */}
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent Customer Orders
            </h3>
            <div className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((ord) => (
                <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <strong className="font-mono text-slate-900">{ord.orderNumber}</strong>
                    <p className="text-slate-400 text-[11px]">{ord.userEmail} · {ord.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">₹{ord.total.toLocaleString('en-IN')}</span>
                    <p className="text-[10px] text-emerald-600 uppercase font-semibold">{ord.orderStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Critical Low Stock Warnings
            </h3>
            <div className="divide-y divide-slate-100">
              {products.filter(p => p.stock <= 15).slice(0, 5).map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900 truncate max-w-xs">{p.name}</p>
                    <p className="text-slate-400 text-[11px]">{p.categoryName || p.categoryId}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold font-mono rounded text-xs">
                    {p.stock} units left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title, brand..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-xs text-slate-400">
              Showing <strong className="text-slate-800">{filteredAdminProducts.length}</strong> products
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price / MRP</th>
                  <th className="py-3 px-3">Stock Level</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdminProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate max-w-xs">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.brand}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 uppercase font-mono text-[11px]">
                      {p.categoryName || p.categoryId}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 ml-1.5 text-[11px] line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-3 px-3">
                      {editingStockId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(Number(e.target.value))}
                            className="w-16 px-1.5 py-1 text-xs border border-blue-500 rounded font-mono"
                          />
                          <button
                            onClick={() => handleUpdateStock(p.id, tempStockValue)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingStockId(p.id);
                            setTempStockValue(p.stock);
                          }}
                          className={`font-mono font-bold text-xs hover:underline flex items-center gap-1 ${
                            p.stock <= 10 ? 'text-rose-600' : 'text-slate-700'
                          }`}
                          title="Click to edit stock level"
                        >
                          <span>{p.stock} units</span>
                          <Edit2 className="w-3 h-3 text-slate-400" />
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-700 font-bold">{p.rating.toFixed(1)} ★</span>
                      <span className="text-slate-400 text-[10px] ml-1">({p.reviewCount})</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Order Number</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">City / Destination</th>
                  <th className="py-3 px-3">Total Payable</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-800">{ord.shippingAddress.fullName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{ord.userEmail}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {ord.shippingAddress.city}, {ord.shippingAddress.state}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono uppercase text-[11px] text-slate-600 font-semibold">{ord.paymentMethod}</span>
                      <span className="block text-[10px] text-emerald-600 font-bold">{ord.paymentStatus}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.orderStatus === 'delivered'
                            ? 'bg-emerald-50 text-emerald-700'
                            : ord.orderStatus === 'shipped'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium"
                      >
                        <option value="processing">Processing</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <h2 className="text-base font-bold font-display text-slate-900 mb-4">Add New Product to Catalog</h2>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nova Wireless Earbuds Pro"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Brand</label>
                  <input
                    type="text"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdMrp}
                    onChange={(e) => setNewProdMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Initial Stock</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Key features, warranty, and specifications..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  {isSavingProduct ? 'Creating...' : 'Save Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2.5 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
