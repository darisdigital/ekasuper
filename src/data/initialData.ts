import { Product, Order, Customer, InventoryLog } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-th-1212',
    name: 'Tahu 12×12',
    sku: 'TH-1212',
    category: 'TAHU',
    basePrice: 450,
    unit: 'pcs / potong',
    stockLevel: 450,
    minStockAlert: 50,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSNwiVJ334Isuu4DAZljQC6D8dC0WI6nRV531Fb7ADY3VerTXvGdTMl98QsCqYTJ6pbq_xwlaohjQ3wCuTd3llyzk9jDz6ZJsGvjrk6tDj4Oz0o5aZFwHRdeIvHJYTrnmJB0JNWFRX8_YPlE8DKPd_cLoKDY06pBXOeW-eSPgI1dWa6vDj3B_aPG7tcn1QPd3suPFBRaFnsYttWXnmHJ0MmY7ua2cgD12TYAO7ymydbpuu4JSYf-_X',
    description:
      'Ukuran besar untuk porsi puas, sangat cocok untuk digoreng kering atau hidangan berkuah.',
  },
  {
    id: 'prod-th-1111',
    name: 'Tahu 11×11',
    sku: 'TH-1111',
    category: 'TAHU',
    basePrice: 500,
    unit: 'pcs / potong',
    stockLevel: 320,
    minStockAlert: 50,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAq7Gq7Fy1JnhfGMBfV7QGI5gth59zjZNLyrb4QuK7XXg6yN9-6jRh9Q0ItEtTl2adZaVD0HsFupf5fyUQ-q5Ma4y7J2nwtWv5f4m590K5KYgfWdvTOfe6Pxd6jg1vtkf4EAPO-zH5xpRF3jS4UKPbGlFY6t-j7WiX8qAvODdU4COLXUii4tS4NehomydyLapaAJHiPXxK1mrFs5druIv4wX0nR3mYxmvQ2Z4zw-9LOxLALr6KjNIyZ',
    description:
      'Ukuran sedang yang ideal untuk konsumsi harian rumah tangga dengan tekstur lembut.',
  },
  {
    id: 'prod-th-1010',
    name: 'Tahu 10×10',
    sku: 'TH-1010',
    category: 'TAHU',
    basePrice: 600,
    unit: 'pcs / potong',
    stockLevel: 15,
    minStockAlert: 50,
    status: 'Low Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAW7SqxSegChN30rC6QQkYvURrriaTdNC2_U7IKud9Dmvi4y7HOkdiE3M0cCcgr_xkyd2P_y5_6vkqtW6kpOEUehNWGJ6sRUG6AeoOR8wZsjJ3F9HVn3xkWsG_jMle3VsOHgwSvpsB5VZ9zI26z37sUwJyoEHfXwpIn4hhg8Nxky8b9Ar6VZdy1h7K9O_IRU0rLfMq1Hp6weKBmGA8T78cHj5NWVVzoh2zUHiK0MzibstWA98BO7sPc',
    description:
      'Tahu dengan ukuran pas untuk aneka camilan, isian, dan lauk siap saji.',
  },
  {
    id: 'prod-tp-spr',
    name: 'Tempe Super',
    sku: 'TP-SPR',
    category: 'TEMPE',
    basePrice: 8500,
    unit: 'papan / batang',
    stockLevel: 850,
    minStockAlert: 100,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWeSKITu51_AtwL4DAw5M7yTC9Y7cmt95cQXoX8FjRGkSsyKlCNxkEGMCXNpe6I2io0qhoSAq58cEE0BgBFesdatm9Riz0zN02DgNe9wBF_DKvYeYHiOo4sh7nOunFlxeNWei01S4C2XZOlXeTCGQOQJOmNnmN7Q0oV3x5r10mbERECpyBypJKA7nOnuVSPfcEUullZbbz7W7UbC2EjvJdAbJzRH_JHA8kWAaXM5Up6uDiovX7nXh9',
    description:
      'Tempe berkualitas super dengan kepadatan maksimal dan rasa gurih alami.',
  },
  {
    id: 'prod-tp-prm',
    name: 'Tempe Premium',
    sku: 'TP-PRM',
    category: 'TEMPE',
    basePrice: 10000,
    unit: 'papan bungkus daun',
    stockLevel: 210,
    minStockAlert: 50,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBChrAGNa9VU40DwGzIzIoEPmJCMuTdngfHzDhCesNhlMdsxIffEFlk6UpKxqbigD_oX4enuIdrZmHTQQxXmFnoeggjKYAyGsNUORgLilBMVvb0c8zwKB6yvMbzmcOyL59VmMN_292j8KFumxgf2NGxvbqD-O7wkafy08xckMV3hvp2zrqwWX7pInmm8nRI0Toy4wCmNIHGFzvdIgttG6TwO-uqFaMgQ_wkhZIbU4rShC09kxQDK_8O',
    description:
      'Pilihan premium untuk kebutuhan khusus, tekstur lebih padat dan tahan lama.',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-0831-01',
    customerName: 'Ibu Ratna',
    customerPhone: '0812-3344-5566',
    customerType: 'Warung/Restoran',
    address: 'Jl. Cimanuk No. 45, Garut Kota',
    items: [
      {
        productId: 'prod-th-1212',
        productName: 'Tahu 12×12',
        quantity: 50,
        unitPrice: 450,
        totalPrice: 22500,
      },
      {
        productId: 'prod-tp-spr',
        productName: 'Tempe Super',
        quantity: 30,
        unitPrice: 8500,
        totalPrice: 255000,
      },
    ],
    totalAmount: 277500,
    status: 'Diproses',
    date: 'Hari ini, 15:30 WIB',
    notes: 'Kirim sebelum jam 17:00',
  },

  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-0831-02',
    customerName: 'Rumah Makan Padang Saiyo',
    customerPhone: '0857-9876-5432',
    customerType: 'Warung/Restoran',
    address: 'Tarogong Kaler, Garut',
    items: [
      {
        productId: 'prod-th-1111',
        productName: 'Tahu 11×11',
        quantity: 100,
        unitPrice: 500,
        totalPrice: 50000,
      },
      {
        productId: 'prod-tp-prm',
        productName: 'Tempe Premium',
        quantity: 40,
        unitPrice: 10000,
        totalPrice: 400000,
      },
    ],
    totalAmount: 450000,
    status: 'Dikirim',
    date: 'Hari ini, 14:10 WIB',
  },

  {
    id: 'ord-103',
    orderNumber: 'ORD-2026-0831-03',
    customerName: 'Pak Hendra (Katering Berkah)',
    customerPhone: '0878-1122-3344',
    customerType: 'Katering',
    address: 'Jl. Otista No. 12, Tarogong Kidul',
    items: [
      {
        productId: 'prod-tp-spr',
        productName: 'Tempe Super',
        quantity: 120,
        unitPrice: 8500,
        totalPrice: 1020000,
      },
      {
        productId: 'prod-th-1010',
        productName: 'Tahu 10×10',
        quantity: 80,
        unitPrice: 600,
        totalPrice: 48000,
      },
    ],
    totalAmount: 1068000,
    status: 'Selesai',
    date: 'Hari ini, 11:20 WIB',
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ibu Ratna (Warung Bu Ratna)',
    phone: '0812-3344-5566',
    type: 'Warung Makan',
    totalOrders: 28,
    totalSpent: 14500000,
    lastOrderDate: 'Hari ini',
    location: 'Garut Kota',
  },
  {
    id: 'cust-2',
    name: 'Rumah Makan Padang Saiyo',
    phone: '0857-9876-5432',
    type: 'Restoran',
    totalOrders: 45,
    totalSpent: 38200000,
    lastOrderDate: 'Hari ini',
    location: 'Tarogong Kaler',
  },
  {
    id: 'cust-3',
    name: 'Katering Berkah Selera',
    phone: '0878-1122-3344',
    type: 'Katering Acara',
    totalOrders: 19,
    totalSpent: 21600000,
    lastOrderDate: 'Kemarin',
    location: 'Tarogong Kidul',
  },
  {
    id: 'cust-4',
    name: 'Ibu Hj. Siti Nurjanah',
    phone: '0813-8899-7711',
    type: 'Rumah Tangga',
    totalOrders: 12,
    totalSpent: 2400000,
    lastOrderDate: '2 hari lalu',
    location: 'Jayaraga',
  },
];

export const INITIAL_INVENTORY_LOGS: InventoryLog[] = [
  {
    id: 'log-1',
    productId: 'prod-th-1212',
    productName: 'Tahu 12×12',
    changeAmount: 500,
    type: 'Produksi Masuk',
    previousStock: 0,
    newStock: 500,
    date: 'Hari ini, 06:00 WIB',
    notes: 'Batch pagi pertama kedelai grade A',
  },
  {
    id: 'log-2',
    productId: 'prod-th-1212',
    productName: 'Tahu 12×12',
    changeAmount: -50,
    type: 'Penjualan',
    previousStock: 500,
    newStock: 450,
    date: 'Hari ini, 15:30 WIB',
    notes: 'Pesanan #ORD-2026-0831-01',
  },
  {
    id: 'log-3',
    productId: 'prod-tp-spr',
    productName: 'Tempe Super',
    changeAmount: 1000,
    type: 'Produksi Masuk',
    previousStock: 0,
    newStock: 1000,
    date: 'Hari ini, 05:30 WIB',
    notes: 'Panen fermentasi ruang A',
  },
  {
    id: 'log-4',
    productId: 'prod-tp-spr',
    productName: 'Tempe Super',
    changeAmount: -150,
    type: 'Penjualan',
    previousStock: 1000,
    newStock: 850,
    date: 'Hari ini, 12:00 WIB',
    notes: 'Distribusi warung langganan',
  },
];

export const ADMIN_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDcecB5eqrQ_PpKDda07Z06LArq8BdA-zj8Ss7OKxf9K_Djl3mfus1DWOMmwuEkGJV3g0WgPwfE9tT9YwYjhy_tvE9uRVcKxqIxKQX9X8i7OxcPCxUQ0cXl8QGMOaTnXOT-GvmIX5L5cy-7i0gXmVCUC6quHIVauxoi5dLkMC6oXsJkbNDcA2QhBly-XUQc4PdECw--1Oj0MEZOMrTD3ys29gfloGtLgkjeAnlgCKgMcSUqYoU8LH9i';

export const HERO_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAIJRDvyzbMHeZbc-Zn_RDuDA1OBU_mSmmlpqdRerUaYDoSQ8ID1fohNwjnvkYjGityxkoIrcR24AYuML0pgicm1i01S25bQrn_QF-7jt1bb7X-zwTLsxdKhdDBIHtDAkGIzSBlQfIEQ-Jabqt7Zrzoo6pLSBZghOt0Z4aIngRVwHXn-bdQO1RlsKvFWedTytacqvuuiZGx6p358PYPT91EdzmEDZOaNxEsZdiib9_vX_iuJbm-p6WO';

export const WHATSAPP_NUMBER = '6282124661966';

export const FACTORY_ADDRESS =
  'Jayaraga, Tarogong Kidul, Garut';
