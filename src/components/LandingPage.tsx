import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { formatRupiah, createWhatsAppUrl } from '../utils/formatters';
import {
  HERO_BG_IMAGE,
  WHATSAPP_NUMBER,
  FACTORY_ADDRESS,
} from '../data/initialData';
import { OrderDrawerModal } from './OrderDrawerModal';

interface LandingPageProps {
  products: Product[];
  onPlaceOrder?: (orderSummary: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  products,
  onPlaceOrder,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] =
    useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const tempeProducts = products.filter(
    (product) => product.category === 'TEMPE'
  );

  const tahuProducts = products.filter(
    (product) => product.category === 'TAHU'
  );

  const otherProducts = products.filter(
    (product) =>
      product.category !== 'TEMPE' && product.category !== 'TAHU'
  );

  const openOrderWithProduct = (product: Product) => {
    setSelectedProductForOrder(product);
    setIsOrderModalOpen(true);
  };

  const defaultWaMessage =
    'Halo EKA SUPER Garut, saya ingin berkonsultasi / memesan Tahu & Tempe segar.';

  const defaultWaUrl = createWhatsAppUrl(
    WHATSAPP_NUMBER,
    defaultWaMessage
  );

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-md py-3'
            : 'bg-surface/90 backdrop-blur-md shadow-sm py-4'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* LOGO EKA SUPER */}
<button
  type="button"
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  className="flex items-center cursor-pointer"
  aria-label="EKA SUPER - Beranda"
>
  <img
    src="/logo-ekasuper.png"
    alt="EKA SUPER"
    className="h-16 w-auto object-contain"
  />
</button>
          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-2">
            <a
              href="#mengapa"
              className="px-3 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary"
            >
              Keunggulan
            </a>

            <a
              href="#produk"
              className="px-3 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary"
            >
              Katalog Produk
            </a>

            <a
              href="#kontak"
              className="px-3 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary"
            >
              Kontak
            </a>

            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                chat
              </span>

              Pesan via WhatsApp
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-on-surface hover:bg-surface-variant"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-t border-outline-variant px-6 py-4">
            <div className="flex flex-col gap-2">
              <a
                href="#mengapa"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 font-semibold text-on-surface"
              >
                Keunggulan
              </a>

              <a
                href="#produk"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 font-semibold text-on-surface"
              >
                Katalog Produk
              </a>

              <a
                href="#kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 font-semibold text-on-surface"
              >
                Kontak
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSelectedProductForOrder(null);
                  setIsOrderModalOpen(true);
                }}
                className="mt-2 w-full bg-primary text-on-primary py-3 rounded-xl font-bold"
              >
                Pesan Sekarang
              </button>

              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-center"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="pt-20">
        {/* HERO */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden bg-surface-container-low">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url('${HERO_BG_IMAGE}')`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/95 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-20 w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-6">
                🌿 Produk Segar Setiap Hari
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-on-surface">
                Tahu & Tempe Berkualitas untuk
                <span className="block text-primary mt-2">
                  Kebutuhan Keluarga dan Usaha
                </span>
              </h1>

              <p className="mt-6 text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                EKA SUPER menghadirkan tahu dan tempe berkualitas dari
                Jayaraga, Garut untuk rumah tangga, warung, restoran,
                katering, dan berbagai kebutuhan usaha.
              </p>

              {/* INFO */}
              <div className="mt-6 inline-flex flex-col sm:flex-row gap-4 bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    location_on
                  </span>

                  <span className="text-sm text-on-surface-variant">
                    {FACTORY_ADDRESS}
                  </span>
                </div>

                <div className="hidden sm:block w-px bg-outline-variant" />

                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    phone
                  </span>

                  <span className="font-semibold">
                    0821-2466-1966
                  </span>
                </div>
              </div>

              {/* HERO BUTTON */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProductForOrder(null);
                    setIsOrderModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>

                  Pesan Sekarang
                </button>

                <a
                  href="#produk"
                  className="flex items-center justify-center px-8 py-4 rounded-xl font-bold text-primary border border-outline-variant bg-surface hover:bg-surface-variant"
                >
                  Lihat Produk
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* KEUNGGULAN */}
        <section
          id="mengapa"
          className="py-20 px-6 bg-surface"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-on-surface">
                Mengapa Memilih EKA SUPER?
              </h2>

              <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto">
                Kami berkomitmen memberikan kualitas terbaik untuk setiap
                olahan kedelai yang sampai ke meja makan Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: 'verified',
                  title: 'Kualitas Terbaik',
                  text: 'Diproses dari kedelai pilihan dengan standar kebersihan tinggi.',
                },
                {
                  icon: 'local_florist',
                  title: 'Selalu Fresh',
                  text: 'Produksi setiap hari sehingga produk tetap segar.',
                },
                {
                  icon: 'payments',
                  title: 'Harga Bersahabat',
                  text: 'Harga kompetitif untuk kebutuhan rumah tangga maupun usaha.',
                },
                {
                  icon: 'support_agent',
                  title: 'Siap Melayani',
                  text: 'Layanan responsif untuk membantu kebutuhan pesanan Anda.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-primary text-[30px]">
                      {item.icon}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUK */}
        <section
          id="produk"
          className="py-20 px-6 bg-surface-container-low"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Katalog Produk
              </h2>

              <p className="mt-4 text-on-surface-variant">
                Pilihan tahu dan tempe segar untuk kebutuhan harian
                maupun bisnis Anda.
              </p>
            </div>

            {/* TEMPE */}
            {tempeProducts.length > 0 && (
              <ProductSection
                title="Kategori: TEMPE"
                products={tempeProducts}
                onOrder={openOrderWithProduct}
                icon="inventory_2"
              />
            )}

            {/* TAHU */}
            {tahuProducts.length > 0 && (
              <ProductSection
                title="Kategori: TAHU"
                products={tahuProducts}
                onOrder={openOrderWithProduct}
                icon="dashboard_customize"
              />
            )}

            {/* LAINNYA */}
            {otherProducts.length > 0 && (
              <ProductSection
                title="Kategori: LAINNYA"
                products={otherProducts}
                onOrder={openOrderWithProduct}
                icon="inventory_2"
              />
            )}
          </div>
        </section>

        {/* KONTAK */}
        <section
          id="kontak"
          className="py-16 px-6 bg-primary text-on-primary"
        >
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
                Kemitraan & Pengiriman Rutin
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Melayani Pasokan Harian untuk Usaha & Katering di Garut
              </h2>

              <p className="mt-4 max-w-xl text-on-primary/80">
                Dapatkan harga grosir dengan jadwal pengiriman tepat waktu
                langsung dari fasilitas produksi kami.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedProductForOrder(null);
                  setIsOrderModalOpen(true);
                }}
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold"
              >
                Mulai Pesanan
              </button>

              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-surface-container-highest border-t border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-extrabold">
                EKA SUPER
              </h3>

              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                Pabrik Tahu & Tempe berkualitas dari Jayaraga, Garut.
                Melayani kebutuhan rumah tangga dan mitra usaha.
              </p>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col gap-3">
                <span className="font-bold text-sm">
                  Tautan
                </span>

                <a
                  href="#produk"
                  className="text-sm text-on-surface-variant hover:text-primary"
                >
                  Produk
                </a>

                <a
                  href="#mengapa"
                  className="text-sm text-on-surface-variant hover:text-primary"
                >
                  Keunggulan
                </a>

                <a
                  href="#kontak"
                  className="text-sm text-on-surface-variant hover:text-primary"
                >
                  Kontak
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-outline-variant/20">
            <p className="text-xs text-on-surface-variant">
              © 2026 EKA SUPER Garut. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={defaultWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp EKA SUPER"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
      >
        <span className="material-symbols-outlined text-[30px]">
          chat
        </span>
      </a>

      {/* ORDER MODAL */}
      <OrderDrawerModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedProductForOrder(null);
        }}
        products={products}
        selectedProduct={selectedProductForOrder}
        onOrderPlaced={onPlaceOrder}
      />
    </div>
  );
};

/* =========================================================
   PRODUCT SECTION
========================================================= */

interface ProductSectionProps {
  title: string;
  products: Product[];
  onOrder: (product: Product) => void;
  icon: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  onOrder,
  icon,
}) => {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/30">
        <h3 className="text-2xl font-bold text-primary">
          {title}
        </h3>

        <span className="text-xs font-semibold bg-surface px-3 py-1 rounded-full">
          {products.length} Varian
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-primary shadow">
                {formatRupiah(product.basePrice)}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-[26px]">
                  {icon}
                </span>
              </div>

              <h4 className="text-xl font-bold uppercase">
                {product.name}
              </h4>

              <p className="mt-2 text-lg font-bold text-primary">
                {formatRupiah(product.basePrice)}
                <span className="text-sm font-normal text-on-surface-variant">
                  {' '}
                  / {product.unit}
                </span>
              </p>

              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed flex-1">
                {product.description}
              </p>

              <button
                type="button"
                onClick={() => onOrder(product)}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary px-4 py-3 rounded-xl font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_cart
                </span>

                Pesan via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
