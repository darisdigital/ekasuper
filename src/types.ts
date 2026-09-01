export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'TAHU' | 'TEMPE' | 'LAINNYA';
  basePrice: number;
  unit: string;
  stockLevel: number;
  minStockAlert: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  imageUrl: string;
  description: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerType: 'Rumah Tangga' | 'Warung/Restoran' | 'Katering' | 'Mitra B2B';
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Baru' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Batal';
  date: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  type: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  location: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  changeAmount: number;
  type: 'Produksi Masuk' | 'Penjualan' | 'Penyesuaian' | 'Retur';
  previousStock: number;
  newStock: number;
  date: string;
  notes: string;
}
