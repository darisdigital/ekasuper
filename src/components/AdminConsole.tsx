import React, { useState } from 'react';
import { Product, Order, Customer, InventoryLog } from '../types';
import { ADMIN_AVATAR_URL } from '../data/initialData';
import { formatRupiah, formatNumber } from '../utils/formatters';
import { AddProductModal } from './AddProductModal';
import { EditProductModal } from './EditProductModal';

interface AdminConsoleProps {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  inventoryLogs: InventoryLog[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  onSwitchToStorefront: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  products,
  orders,
  customers,
  inventoryLogs,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onSwitchToStorefront
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders' | 'customers' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [viewFullCatalogModal, setViewFullCatalogModal] = useState(false);

  // In-line price & stock temporary states
  const [editingRowValues, setEditingRowValues] = useState<Record<string, { price: string; stock: string }>>({});

  // Filter products by search query
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate live dynamic metrics
  const totalStockUnits = products.reduce((acc, p) => acc + p.stockLevel, 0);
  const lowStockCount = products.filter((p) => p.status === 'Low Stock' || p.stockLevel <= p.minStockAlert).length;
  const totalOrderCount = 1248 + orders.length - 3;
  const todayRevenueDisplay = 'Rp 12.5M';

  const handleInlinePriceChange = (productId: string, val: string) => {
    setEditingRowValues((prev) => ({
      ...prev,
      [productId]: {
        price: val,
        stock: prev[productId]?.stock ?? products.find((p) => p.id === productId)?.stockLevel.toString() ?? '0'
      }
    }));
  };

  const handleInlineStockChange = (productId: string, val: string) => {
    setEditingRowValues((prev) => ({
      ...prev,
      [productId]: {
        price: prev[productId]?.price ?? products.find((p) => p.id === productId)?.basePrice.toLocaleString('id-ID') ?? '0',
        stock: val
      }
    }));
  };

  const handleInlineBlur = (product: Product) => {
    const editState = editingRowValues[product.id];
    if (!editState) return;

    const cleanPrice = parseFloat(editState.price.replace(/[^0-9]/g, ''));
    const cleanStock = parseInt(editState.stock.replace(/[^0-9]/g, ''));

    const newPrice = isNaN(cleanPrice) ? product.basePrice : cleanPrice;
    const newStock = isNaN(cleanStock) ? product.stockLevel : cleanStock;

    let newStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (newStock <= 0) newStatus = 'Out of Stock';
    else if (newStock <= product.minStockAlert) newStatus = 'Low Stock';

    onUpdateProduct({
      ...product,
      basePrice: newPrice,
      stockLevel: newStock,
      status: newStatus
    });
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar */}
      <aside className="w-64 fixed left-0 top-0 bottom-0 bg-surface-container-low shadow-sm flex flex-col py-6 z-50 border-r border-outline-variant/30">
        {/* Brand */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary tracking-tight">EKA SUPER</h1>
          </div>
          <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mt-0.5">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 flex flex-col px-3 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              activeTab === 'overview'
                ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              activeTab === 'inventory'
                ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            <span>Inventory</span>
            {lowStockCount > 0 && (
              <span className="ml-auto bg-error-container text-on-error-container px-2 py-0.5 rounded-full text-[10px] font-bold">
                {lowStockCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              activeTab === 'orders'
                ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            <span>Orders</span>
            <span className="ml-auto bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              activeTab === 'customers'
                ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span>Customers</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all mt-auto ${
              activeTab === 'settings'
                ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span>Settings</span>
          </button>

          {/* Quick toggle to Storefront Landing View */}
          <div className="pt-4 border-t border-outline-variant/30 mt-2">
            <button
              onClick={onSwitchToStorefront}
              className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-surface-variant text-primary border border-outline-variant/60 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              title="Lihat Landing Page Pelanggan (Gambar 2)"
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Lihat Toko Publik</span>
            </button>
          </div>
        </nav>

        {/* Add New Product Button */}
        <div className="px-4 mt-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full bg-primary text-on-primary font-bold text-sm py-3 rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Product</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-y-auto">
        {/* TopAppBar */}
        <header className="h-16 sticky top-0 bg-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/30 flex justify-between items-center px-6 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-on-surface">Admin Console</h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-primary-container/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
              Pabrik Jayaraga, Garut
            </span>
          </div>

          <div className="flex items-center gap-3 text-primary">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, SKU..."
                className="bg-surface-container pl-9 pr-4 py-1.5 rounded-full border border-transparent focus:border-primary focus:bg-surface text-sm w-64 text-on-surface focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-on-surface"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant relative"
                title="Notifikasi"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {lowStockCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface" />
                )}
              </button>

              {/* Notification Popover */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl shadow-xl p-4 z-50 text-xs animate-fadeIn">
                  <div className="flex justify-between items-center pb-2 border-b border-surface-variant mb-2">
                    <span className="font-bold text-sm text-on-surface">Pemberitahuan Sistem</span>
                    <button
                      onClick={() => setNotificationOpen(false)}
                      className="text-on-surface-variant hover:text-on-surface"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    {lowStockCount > 0 ? (
                      <div className="p-2.5 bg-error-container/20 rounded-xl border border-error-container text-on-error-container flex items-start gap-2">
                        <span className="material-symbols-outlined text-base text-error">warning</span>
                        <div>
                          <p className="font-bold">Peringatan Stok Menipis!</p>
                          <p>Tahu 10×10 tersisa 15 unit (di bawah batas 50 unit). Harap jadwalkan produksi tambahan.</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-on-surface-variant">Semua stok produk dalam kondisi aman.</p>
                    )}
                    <div className="p-2.5 bg-surface-container rounded-xl text-on-surface">
                      <p className="font-semibold text-primary">Pesanan Baru Masuk</p>
                      <p className="text-on-surface-variant">Ibu Ratna memesan 50x Tahu 12×12 via WhatsApp.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help Button */}
            <button
              onClick={() => setHelpModalOpen(true)}
              className="p-2 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant"
              title="Bantuan & Petunjuk Admin"
            >
              <span className="material-symbols-outlined text-[22px]">help</span>
            </button>

            {/* Admin Avatar */}
            <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden ml-2 border-2 border-primary-container shadow-sm flex-shrink-0 cursor-pointer" title="Admin EKA SUPER (Jayaraga)">
              <img
                src={ADMIN_AVATAR_URL}
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic View based on Active Tab */}
        <div className="p-6 flex-1 pb-24 max-w-[1280px] mx-auto w-full space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Key Metrics (Bento Grid Style) */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Orders */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold text-on-surface-variant mb-1">
                        Total Orders
                      </p>
                      <h3 className="text-3xl font-extrabold text-on-surface">
                        {formatNumber(totalOrderCount)}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>+12.5% from last week</span>
                  </div>
                </div>

                {/* Active Inventory */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold text-on-surface-variant mb-1">
                        Active Inventory
                      </p>
                      <h3 className="text-3xl font-extrabold text-on-surface">
                        {formatNumber(totalStockUnits || 8432)}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-2xl">inventory</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold">
                    Units currently in stock
                  </p>
                </div>

                {/* Today's Revenue */}
                <div className="bg-primary rounded-xl p-6 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 text-on-primary">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold opacity-90 mb-1">
                        Today's Revenue
                      </p>
                      <h3 className="text-3xl font-extrabold">{todayRevenueDisplay}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-on-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">payments</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold opacity-90">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>+5.2% vs yesterday</span>
                  </div>
                </div>

                {/* New Customers */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold text-on-surface-variant mb-1">
                        New Customers
                      </p>
                      <h3 className="text-3xl font-extrabold text-on-surface">42</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined text-2xl">person_add</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>+8 new this week</span>
                  </div>
                </div>
              </section>

              {/* Product Catalog Management Table */}
              <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant overflow-hidden">
                <div className="p-6 border-b border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-low/50">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">
                      Product Catalog Management
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                      Manage pricing and inventory levels for core products.
                    </p>
                  </div>
                  <button
                    onClick={() => setViewFullCatalogModal(true)}
                    className="flex items-center gap-1.5 text-primary text-sm font-bold hover:underline"
                  >
                    <span>View Full Catalog</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface-container-low text-on-surface-variant text-xs font-bold uppercase tracking-wider border-b border-surface-variant">
                      <tr>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">SKU</th>
                        <th className="px-6 py-4">Base Price (Rp)</th>
                        <th className="px-6 py-4">Stock Level</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant">
                      {filteredProducts.map((product) => {
                        const editState = editingRowValues[product.id];
                        const displayPrice = editState !== undefined ? editState.price : formatNumber(product.basePrice);
                        const displayStock = editState !== undefined ? editState.stock : product.stockLevel.toString();

                        return (
                          <tr
                            key={product.id}
                            className="hover:bg-surface-container-low/40 transition-colors group"
                          >
                            {/* Product Name & Thumbnail */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-surface-variant overflow-hidden border border-surface-variant flex-shrink-0">
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="font-semibold text-on-surface">
                                  {product.name}
                                </span>
                              </div>
                            </td>

                            {/* SKU */}
                            <td className="px-6 py-4 text-on-surface-variant font-mono text-xs">
                              {product.sku}
                            </td>

                            {/* Base Price (Editable inline) */}
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={displayPrice}
                                onChange={(e) => handleInlinePriceChange(product.id, e.target.value)}
                                onBlur={() => handleInlineBlur(product)}
                                className="w-24 bg-transparent border-b border-transparent hover:border-outline-variant focus:border-primary focus:ring-0 px-1 py-0.5 text-on-surface font-medium transition-colors"
                                title="Klik untuk mengedit harga langsung"
                              />
                            </td>

                            {/* Stock Level (Editable inline) */}
                            <td className="px-6 py-4">
                              <input
                                type="number"
                                value={displayStock}
                                onChange={(e) => handleInlineStockChange(product.id, e.target.value)}
                                onBlur={() => handleInlineBlur(product)}
                                className={`w-20 bg-transparent border-b border-transparent hover:border-outline-variant focus:ring-0 px-1 py-0.5 font-semibold transition-colors ${
                                  product.status === 'Low Stock' || product.stockLevel <= product.minStockAlert
                                    ? 'text-error focus:border-error'
                                    : 'text-on-surface focus:border-primary'
                                }`}
                                title="Klik untuk mengedit stok langsung"
                              />
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  product.status === 'Low Stock' || product.stockLevel <= product.minStockAlert
                                    ? 'bg-error-container text-on-error-container'
                                    : product.status === 'Out of Stock' || product.stockLevel === 0
                                    ? 'bg-secondary-container text-on-secondary-container'
                                    : 'bg-primary-container text-on-primary-container'
                                }`}
                              >
                                {product.stockLevel <= 0
                                  ? 'Out of Stock'
                                  : product.stockLevel <= product.minStockAlert
                                  ? 'Low Stock'
                                  : 'In Stock'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setEditingProduct(product)}
                                  className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-variant opacity-80 group-hover:opacity-100 focus:opacity-100"
                                  title="Edit detail produk"
                                >
                                  <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="p-8 text-center text-on-surface-variant">
                    <p>Tidak ada produk yang cocok dengan pencarian "{searchQuery}"</p>
                  </div>
                )}
              </section>
            </>
          )}

          {/* Tab: Inventory Details */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">Log &amp; Manajemen Inventaris</h3>
                  <p className="text-sm text-on-surface-variant">
                    Riwayat arus stok produksi masuk dan pengiriman ke pelanggan
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-container shadow"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Tambah Varian Baru
                </button>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-container-low text-on-surface-variant text-xs font-bold uppercase tracking-wider border-b border-surface-variant">
                    <tr>
                      <th className="px-6 py-3">Waktu</th>
                      <th className="px-6 py-3">Produk</th>
                      <th className="px-6 py-3">Jenis Mutasi</th>
                      <th className="px-6 py-3">Jumlah</th>
                      <th className="px-6 py-3">Stok Sebelum &rarr; Sesudah</th>
                      <th className="px-6 py-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant">
                    {inventoryLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-surface-container-low/30">
                        <td className="px-6 py-3 font-mono text-xs text-on-surface-variant">{log.date}</td>
                        <td className="px-6 py-3 font-semibold text-on-surface">{log.productName}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              log.changeAmount > 0
                                ? 'bg-primary-container/20 text-primary'
                                : 'bg-tertiary-container/20 text-tertiary'
                            }`}
                          >
                            {log.type}
                          </span>
                        </td>
                        <td className="px-6 py-3 font-bold">
                          {log.changeAmount > 0 ? `+${log.changeAmount}` : log.changeAmount}
                        </td>
                        <td className="px-6 py-3 text-xs text-on-surface-variant">
                          {log.previousStock} &rarr; <span className="font-bold text-on-surface">{log.newStock}</span>
                        </td>
                        <td className="px-6 py-3 text-xs text-on-surface-variant">{log.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">Daftar Pesanan Masuk</h3>
                  <p className="text-sm text-on-surface-variant">
                    Kelola pesanan dari WhatsApp dan pemesanan web
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-surface-container-lowest rounded-xl p-5 border border-surface-variant shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-primary">{ord.orderNumber}</span>
                        <span className="text-xs text-on-surface-variant">• {ord.date}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            ord.status === 'Selesai'
                              ? 'bg-primary-container text-on-primary-container'
                              : ord.status === 'Dikirim'
                              ? 'bg-tertiary-container text-on-tertiary-container'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-on-surface text-base">{ord.customerName}</h4>
                      <p className="text-xs text-on-surface-variant">{ord.customerPhone} | {ord.customerType} | {ord.address}</p>
                      <div className="mt-2 text-xs text-on-surface-variant flex flex-wrap gap-2">
                        {ord.items.map((item, idx) => (
                          <span key={idx} className="bg-surface-container px-2 py-1 rounded-md font-medium text-on-surface">
                            {item.quantity}x {item.productName} ({formatRupiah(item.totalPrice)})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right flex md:flex-col items-center md:items-end justify-between w-full md:w-auto">
                      <span className="text-xs text-on-surface-variant">Total Pesanan:</span>
                      <p className="text-xl font-bold text-primary">{formatRupiah(ord.totalAmount)}</p>
                      <a
                        href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(ord.customerName)},%20kami%20dari%20EKA%20SUPER%20Garut...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs bg-[#25D366] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#1DA851] transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        Chat WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Customers */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-2xl font-bold text-on-surface">Daftar Mitra &amp; Pelanggan</h3>
                <p className="text-sm text-on-surface-variant">
                  Daftar rumah makan, katering, warung, dan pelanggan perorangan di wilayah Garut
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {customers.map((cust) => (
                  <div
                    key={cust.id}
                    className="bg-surface-container-lowest rounded-xl p-5 border border-surface-variant shadow-sm flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-primary-container/10 text-primary rounded-full text-xs font-semibold">
                          {cust.type}
                        </span>
                        <span className="text-xs text-on-surface-variant">📍 {cust.location}</span>
                      </div>
                      <h4 className="font-bold text-on-surface text-base">{cust.name}</h4>
                      <p className="text-xs font-mono text-on-surface-variant mt-1">{cust.phone}</p>
                      <p className="text-xs text-on-surface-variant mt-3">
                        Total {cust.totalOrders} Pesanan | Belanja: <span className="font-bold text-primary">{formatRupiah(cust.totalSpent)}</span>
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#25D366] hover:bg-surface-container rounded-lg transition-colors"
                      title="Hubungi Pelanggan"
                    >
                      <span className="material-symbols-outlined">chat</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-surface-container-lowest p-6 rounded-xl border border-surface-variant shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Pengaturan Toko &amp; Pabrik</h3>
                <p className="text-sm text-on-surface-variant">Konfigurasi operasional dan kontak WhatsApp EKA SUPER Garut</p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Nama Usaha</label>
                  <input
                    type="text"
                    defaultValue="EKA SUPER Tofu & Tempeh"
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg p-2.5 text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Nomor WhatsApp Resmi</label>
                  <input
                    type="text"
                    defaultValue="+62 821-2466-1966"
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg p-2.5 text-on-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Alamat Fasilitas Produksi</label>
                  <input
                    type="text"
                    defaultValue="Jayaraga, Tarogong Kidul, Garut, Jawa Barat"
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg p-2.5 text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Jam Operasional Distribusi</label>
                  <input
                    type="text"
                    defaultValue="Setiap Hari: 04:30 - 18:00 WIB"
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg p-2.5 text-on-surface"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert('Pengaturan operasional berhasil diperbarui!')}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold hover:bg-primary-container transition-colors shadow"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer (Static at bottom of main content scroll) */}
        <footer className="w-full mt-auto bg-surface-container-lowest border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-2 text-xs">
          <div className="text-secondary font-medium">
            © 2024 EKA SUPER Tofu &amp; Tempeh. All Rights Reserved.
          </div>
          <div className="flex gap-4 text-on-secondary-container font-semibold">
            <button onClick={() => setHelpModalOpen(true)} className="hover:text-primary transition-colors">
              Support
            </button>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </footer>
      </main>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddProduct}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdate={onUpdateProduct}
        onDelete={onDeleteProduct}
      />

      {/* Full Catalog Modal */}
      {viewFullCatalogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-container-low">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Katalog Lengkap EKA SUPER</h3>
                <p className="text-xs text-on-surface-variant">Semua produk tahu, tempe, harga, dan ketersediaan stok</p>
              </div>
              <button
                onClick={() => setViewFullCatalogModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-surface-variant bg-surface-container-low/40 flex flex-col">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-on-surface">{p.name}</h4>
                    <span className="font-mono text-xs text-on-surface-variant">{p.sku}</span>
                  </div>
                  <p className="text-primary font-bold text-base mb-1">{formatRupiah(p.basePrice)} <span className="text-xs text-on-surface-variant font-normal">/ {p.unit}</span></p>
                  <p className="text-xs text-on-surface-variant flex-grow mb-3">{p.description}</p>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-outline-variant/30">
                    <span>Stok: <strong className={p.status === 'Low Stock' ? 'text-error' : 'text-on-surface'}>{p.stockLevel} unit</strong></span>
                    <button
                      onClick={() => {
                        setViewFullCatalogModal(false);
                        setEditingProduct(p);
                      }}
                      className="text-primary font-bold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-surface-variant pb-3">
              <h3 className="text-lg font-bold text-on-surface">Panduan Admin EKA SUPER</h3>
              <button onClick={() => setHelpModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                ✕
              </button>
            </div>
            <div className="text-sm space-y-3 text-on-surface-variant">
              <p>• <strong>Edit Cepat:</strong> Anda dapat langsung mengklik angka harga dasar atau jumlah stok pada tabel untuk mengedit langsung di tempat.</p>
              <p>• <strong>Peringatan Otomatis:</strong> Jika stok produk turun di bawah batas minimum (50 unit), status otomatis berubah menjadi <span className="text-error font-semibold">Low Stock</span>.</p>
              <p>• <strong>Sinkronisasi Realtime:</strong> Setiap perubahan harga atau stok langsung tercermin pada halaman katalog pemesanan WhatsApp pelanggan.</p>
            </div>
            <button
              onClick={() => setHelpModalOpen(false)}
              className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-container"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
