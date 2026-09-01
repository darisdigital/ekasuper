```tsx
import React, { useState, useEffect } from 'react';
import { Product, Order, Customer, InventoryLog } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY_LOGS
} from './data/initialData';
import { AdminConsole } from './components/AdminConsole';
import { LandingPage } from './components/LandingPage';

export default function App() {
  // Website publik selalu membuka Landing Page.
  // Admin tetap ada di dalam project, tetapi tidak ditampilkan kepada pengunjung.
  const [currentScreen, setCurrentScreen] = useState<'admin' | 'landing'>('landing');

  // Products state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('eka_super_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('eka_super_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return INITIAL_ORDERS;
  });

  // Customers state
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('eka_super_customers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved customers', e);
      }
    }
    return INITIAL_CUSTOMERS;
  });

  // Inventory logs state
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(() => {
    const saved = localStorage.getItem('eka_super_inventory_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved logs', e);
      }
    }
    return INITIAL_INVENTORY_LOGS;
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('eka_super_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('eka_super_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('eka_super_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('eka_super_inventory_logs', JSON.stringify(inventoryLogs));
  }, [inventoryLogs]);

  // Product Update Handler
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => {
      const oldProd = prev.find((p) => p.id === updated.id);

      if (oldProd && oldProd.stockLevel !== updated.stockLevel) {
        const diff = updated.stockLevel - oldProd.stockLevel;

        const newLog: InventoryLog = {
          id: `log-${Date.now()}`,
          productId: updated.id,
          productName: updated.name,
          changeAmount: diff,
          type: diff > 0 ? 'Produksi Masuk' : 'Penyesuaian',
          previousStock: oldProd.stockLevel,
          newStock: updated.stockLevel,
          date: 'Baru saja',
          notes: 'Penyesuaian cepat via Admin Console'
        };

        setInventoryLogs((l) => [newLog, ...l]);
      }

      return prev.map((p) =>
        p.id === updated.id ? updated : p
      );
    });

    showToast(`Produk "${updated.name}" berhasil diperbarui.`);
  };

  // Add Product Handler
  const handleAddProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;

    const newProduct: Product = {
      ...newProdData,
      id: newId
    };

    setProducts((prev) => [...prev, newProduct]);

    const newLog: InventoryLog = {
      id: `log-${Date.now()}`,
      productId: newId,
      productName: newProduct.name,
      changeAmount: newProduct.stockLevel,
      type: 'Produksi Masuk',
      previousStock: 0,
      newStock: newProduct.stockLevel,
      date: 'Baru saja',
      notes: 'Penambahan varian produk baru ke katalog'
    };

    setInventoryLogs((l) => [newLog, ...l]);

    showToast(`Produk "${newProduct.name}" berhasil ditambahkan.`);
  };

  // Delete Product Handler
  const handleDeleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);

    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );

    if (target) {
      showToast(`Produk "${target.name}" telah dihapus.`);
    }
  };

  // Order Placement Handler
  const handlePlaceOrder = (summary: any) => {
    const orderId = `ord-${Date.now()}`;
    const orderNum = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNum,
      customerName: summary.customerName,
      customerPhone: 'WhatsApp',
      customerType: summary.customerType || 'Rumah Tangga',
      address: summary.customerAddress || 'Garut',
      items: summary.items.map((it: any) => ({
        productId: it.product.id,
        productName: it.product.name,
        quantity: it.quantity,
        unitPrice: it.product.basePrice,
        totalPrice: it.total
      })),
      totalAmount: summary.grandTotal,
      status: 'Baru',
      date: 'Baru saja',
      notes: summary.notes
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Kurangi stok produk
    setProducts((prev) =>
      prev.map((prod) => {
        const matchingItem = summary.items.find(
          (it: any) => it.product.id === prod.id
        );

        if (matchingItem) {
          const newStock = Math.max(
            0,
            prod.stockLevel - matchingItem.quantity
          );

          const newStatus =
            newStock <= 0
              ? 'Out of Stock'
              : newStock <= prod.minStockAlert
                ? 'Low Stock'
                : 'In Stock';

          return {
            ...prod,
            stockLevel: newStock,
            status: newStatus
          };
        }

        return prod;
      })
    );

    showToast('Pesanan WhatsApp berhasil dicatat.');
  };

  return (
    <div className="min-h-screen bg-background text-on-background">

      {/* Website publik */}
      {currentScreen === 'landing' ? (
        <LandingPage
          products={products}
          onOpenAdmin={() => setCurrentScreen('admin')}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : (
        /* Admin tetap tersedia untuk pemilik website,
           tetapi tidak ditampilkan melalui tombol publik. */
        <AdminConsole
          products={products}
          orders={orders}
          customers={customers}
          inventoryLogs={inventoryLogs}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onSwitchToStorefront={() => setCurrentScreen('landing')}
        />
      )}

      {/* ScreenSwitcher DIHAPUS agar pengunjung tidak melihat
          tombol Dashboard Admin */}

      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fadeIn">
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>

          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
```
