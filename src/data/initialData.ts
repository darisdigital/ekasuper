import { Product } from '../types';

/**
 * ============================================================
 * EKA SUPER
 * Pabrik Tahu & Tempe
 * Jayaraga, Tarogong Kidul, Garut
 * ============================================================
 */

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================================
  // TAHU
  // ==========================================================

  {
    id: 'prod-th-1212',
    name: 'Tahu 12×12',
    sku: 'TH-1212',
    category: 'TAHU',
    basePrice: 450,
    unit: 'pcs',
    stockLevel: 9999,
    minStockAlert: 0,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSNwiVJ334Isuu4DAZljQC6D8dC0WI6nRV531Fb7ADY3VerTXvGdTMl98QsCqYTJ6pbq_xwlaohjQ3wCuTd3llyzk9jDz6ZJsGvjrk6tDj4Oz0o5aZFwHRdeIvHJYTrnmJB0JNWFRX8_YPlE8DKPd_cLoKDY06pBXOeW-eSPgI1dWa6vDj3B_aPG7tcn1QPd3suPFBRaFnsYttWXnmHJ0MmY7ua2cgD12TYAO7ymydbpuu4JSYf-_X',
    description:
      'Tahu ukuran 12×12 cm dengan tekstur lembut dan cocok untuk berbagai kebutuhan rumah tangga maupun usaha.'
  },

  {
    id: 'prod-th-1111',
    name: 'Tahu 11×11',
    sku: 'TH-1111',
    category: 'TAHU',
    basePrice: 500,
    unit: 'pcs',
    stockLevel: 9999,
    minStockAlert: 0,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAq7Gq7Fy1JnhfGMBfV7QGI5gth59zjZNLyrb4QuK7XXg6yN9-6jRh9Q0ItEtTl2adZaVD0HsFupf5fyUQ-q5Ma4y7J2nwtWv5f4m590K5KYgfWdvTOfe6Pxd6jg1vtkf4EAPO-zH5xpRF3jS4UKPbGlFY6t-j7WiX8qAvODdU4COLXUii4tS4NehomydyLapaAJHiPXxK1mrFs5druIv4wX0nR3mYxmvQ2Z4zw-9LOxLALr6KjNIyZ',
    description:
      'Tahu ukuran 11×11 cm yang praktis untuk kebutuhan harian, warung makan, restoran, dan katering.'
  },

  {
    id: 'prod-th-1010',
    name: 'Tahu 10×10',
    sku: 'TH-1010',
    category: 'TAHU',
    basePrice: 600,
    unit: 'pcs',
    stockLevel: 9999,
    minStockAlert: 0,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAW7SqxSegChN30rC6QQkYvURrriaTdNC2_U7IKud9Dmvi4y7HOkdiE3M0cCcgr_xkyd2P_y5_6vkqtW6kpOEUehNWGJ6sRUG6AeoOR8wZsjJ3F9HVn3xkWsG_jMle3VsOHgwSvpsB5VZ9zI26z37sUwJyoEHfXwpIn4hhg8Nxky8b9Ar6VZdy1h7K9O_IRU0rLfMq1Hp6weKBmGA8T78cHj5NWVVzoh2zUHiK0MzibstWA98BO7sPc',
    description:
      'Tahu ukuran 10×10 cm yang pas untuk camilan, gorengan, lauk, isian makanan, dan kebutuhan usaha.'
  },

  // ==========================================================
  // TEMPE
  // ==========================================================

  {
    id: 'prod-tp-spr',
    name: 'Tempe Super',
    sku: 'TP-SPR',
    category: 'TEMPE',
    basePrice: 8500,
    unit: 'papan',
    stockLevel: 9999,
    minStockAlert: 0,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWeSKITu51_AtwL4DAw5M7yTC9Y7cmt95cQXoX8FjRGkSsyKlCNxkEGMCXNpe6I2io0qhoSAq58cEE0BgBFesdatm9Riz0zN02DgNe9wBF_DKvYeYHiOo4sh7nOunFlxeNWei01S4C2XZOlXeTCGQOQJOmNnmN7Q0oV3x5r10mbERECpyBypJKA7nOnuVSPfcEUullZbbz7W7UbC2EjvJdAbJzRH_JHA8kWAaXM5Up6uDiovX7nXh9',
    description:
      'Tempe Super EKA SUPER dengan kualitas kedelai pilihan, tekstur padat, rasa gurih, dan diproduksi setiap hari.'
  },

  {
    id: 'prod-tp-prm',
    name: 'Tempe Premium',
    sku: 'TP-PRM',
    category: 'TEMPE',
    basePrice: 10000,
    unit: 'papan',
    stockLevel: 9999,
    minStockAlert: 0,
    status: 'In Stock',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBChrAGNa9VU40DwGzIzIoEPmJCMuTdngfHzDhCesNhlMdsxIffEFlk6UpKxqbigD_oX4enuIdrZmHTQQxXmFnoeggjKYAyGsNUORgLilBMVvb0c8zwKB6yvMbzmcOyL59VmMN_292j8KFumxgf2NGxvbqD-O7wkafy08xckMV3hvp2zrqwWX7pInmm8nRI0Toy4wCmNIHGFzvdIgttG6TwO-uqFaMgQ_wkhZIbU4rShC09kxQDK_8O',
    description:
      'Tempe Premium dengan kualitas pilihan, tekstur lebih padat, rasa gurih alami, dan cocok untuk kebutuhan rumah tangga maupun usaha.'
  }
];

/**
 * ============================================================
 * WHATSAPP EKA SUPER
 * ============================================================
 *
 * Nomor:
 * 0821-2466-1966
 *
 * Format WhatsApp:
 * 6282124661966
 */

export const WHATSAPP_NUMBER = '6282124661966';

/**
 * ============================================================
 * ALAMAT PABRIK
 * ============================================================
 */

export const FACTORY_ADDRESS =
  'Jayaraga, Kecamatan Tarogong Kidul, Kabupaten Garut, Jawa Barat';

/**
 * ============================================================
 * HERO BACKGROUND
 * ============================================================
 */

export const HERO_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAIJRDvyzbMHeZbc-Zn_RDuDA1OBU_mSmmlpqdRerUaYDoSQ8ID1fohNwjnvkYjGityxkoIrcR24AYuML0pgicm1i01S25bQrn_QF-7jt1bb7X-zwTLsxdKhdDBIHtDAkGIzSBlQfIEQ-Jabqt7Zrzoo6pLSBZghOt0Z4aIngRVwHXn-bdQO1RlsKvFWedTytacqvuuiZGx6p358PYPT91EdzmEDZOaNxEsZdiib9_vX_iuJbm-p6WO';
