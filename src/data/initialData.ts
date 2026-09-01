import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-th-1212',
    name: 'Tahu 12×12',
    sku: 'TH-1212',
    category: 'TAHU',
    basePrice: 15000,
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
    basePrice: 12500,
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
    basePrice: 10000,
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

export const HERO_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAIJRDvyzbMHeZbc-Zn_RDuDA1OBU_mSmmlpqdRerUaYDoSQ8ID1fohNwjnvkYjGityxkoIrcR24AYuML0pgicm1i01S25bQrn_QF-7jt1bb7X-zwTLsxdKhdDBIHtDAkGIzSBlQfIEQ-Jabqt7Zrzoo6pLSBZghOt0Z4aIngRVwHXn-bdQO1RlsKvFWedTytacqvuuiZGx6p358PYPT91EdzmEDZOaNxEsZdiib9_vX_iuJbm-p6WO';

export const WHATSAPP_NUMBER = '6282124661966';

export const FACTORY_ADDRESS =
  'Jayaraga, Tarogong Kidul, Garut';
