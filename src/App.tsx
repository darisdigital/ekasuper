import React, { useState, useEffect } from 'react';
import { Product, Order, Customer, InventoryLog } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY_LOGS,
} from './data/initialData';
import { LandingPage } from './components/LandingPage';

export default function App() {
  // =========================
  // PRODUCTS
  // =========================
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('eka_super_products');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Gagal membaca data produk:', error);
      }
    }

    return INITIAL_PRODUCTS;
  });

  // =========================
  // ORDERS
  // =========================
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('eka_super_orders');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Gagal membaca data pesanan:', error);
      }
    }

    return INITIAL_ORDERS;
  });

  // =========================
  // CUSTOMERS
  // =========================
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('eka_super_customers');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Gagal membaca data pelanggan:', error);
      }
    }

    return INITIAL_CUSTOMERS;
  });

  // =========================
  // INVENTORY LOGS
  // =========================
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(() => {
    const saved = localStorage.getItem('eka_super_inventory_logs');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Gagal membaca data stok:', error);
      }
    }

    return INITIAL_INVENTORY_LOGS;
  });

  // =========================
  // TOAST
  // =========================
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // =========================
  // LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem(
      'eka_super_products',
      JSON.stringify(products)
    );
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      'eka_super_orders',
      JSON.stringify(orders)
    );
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(
      'eka_super_customers',
      JSON.stringify(customers)
    );
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(
      'eka_super_inventory_logs',
      JSON.stringify(inventoryLogs)
    );
  }, [inventoryLogs]);

  // =========================
  // PESANAN DARI LANDING PAGE
  // =========================
  const handlePlaceOrder = (summary: any) => {
    const orderId = `ord-${Date.now()}`;

    const orderNum = `ORD-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-4)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNum,
      customerName: summary.customerName,
      customerPhone: 'WhatsApp',
      customerType:
        summary.customerType || 'Rumah Tangga',
      address:
        summary.customerAddress || 'Garut',

      items: summary.items.map((item: any) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.basePrice,
        totalPrice: item.total,
      })),

      totalAmount: summary.grandTotal,
      status: 'Baru',
      date: 'Baru saja',
      notes: summary.notes,
    };

    // Simpan pesanan
    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    // Kurangi stok
    setProducts((previousProducts) =>
      previousProducts.map((product) => {
        const matchingItem = summary.items.find(
          (item: any) =>
            item.product.id === product.id
        );

        if (!matchingItem) {
          return product;
        }

        const newStock = Math.max(
          0,
          product.stockLevel - matchingItem.quantity
        );

        const newStatus =
          newStock <= 0
            ? 'Out of Stock'
            : newStock <= product.minStockAlert
            ? 'Low Stock'
            : 'In Stock';

        return {
          ...product,
          stockLevel: newStock,
          status: newStatus,
        };
      })
    );

    showToast(
      'Pesanan berhasil dibuat. Silakan lanjutkan melalui WhatsApp.'
    );
  };

  // =========================
  // PUBLIC WEBSITE ONLY
  // =========================
  return (
    <div className="min-h-screen bg-background text-on-background">
      <LandingPage
        products={products}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fadeIn">
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>

          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
