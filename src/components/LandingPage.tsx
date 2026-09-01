import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatRupiah, createWhatsAppUrl } from '../utils/formatters';
import { HERO_BG_IMAGE, WHATSAPP_NUMBER, FACTORY_ADDRESS } from '../data/initialData';
import { OrderDrawerModal } from './OrderDrawerModal';

interface LandingPageProps {
  products: Product[];
  onOpenAdmin: () => void;
  onPlaceOrder?: (orderSummary: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  products,
  onOpenAdmin,
  onPlaceOrder
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tempeProducts = products.filter((p) => p.category === 'TEMPE');
  const tahuProducts = products.filter((p) => p.category === 'TAHU');
  const otherProducts = products.filter((p) => p.category !== 'TEMPE' && p.category !== 'TAHU');

  const openOrderWithProduct = (product: Product) => {
    setSelectedProductForOrder(product);
    setIsOrderModalOpen(true);
  };

  const defaultWaMessage = 'Halo EKA SUPER Garut, saya ingin berkonsultasi / memesan Tahu & Tempe segar.';
  const defaultWaUrl = createWhatsAppUrl(WHATSAPP_NUMBER, defaultWaMessage);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* TopAppBar Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-md py-3'
            : 'bg-surface/90 backdrop-blur-md shadow-sm py-4 border-b border-outline-variant/30'
        }`}
        id="main-header"
      >
        <div className="flex justify-between items-center px-6 max-w-[1280px] mx-auto w-full">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="material-symbols-outlined text-primary text-[32px]">
              agriculture
            </span>
            <span className="text-2xl font-bold text-primary tracking-tight">EKA SUPER</span>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#mengapa"
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-3 py-2"
            >
              Keunggulan
            </a>
            <a
              href="#produk"
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-3 py-2"
            >
              Katalog Produk
            </a>
            <a
              href="#kontak"
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-3 py-2"
            >
              Kontak
            </a>

            {/* Quick Button to Switch to Admin Console */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-full text-xs font-semibold border border-outline-variant/40 transition-all shadow-sm"
              title="Buka Admin Console (Dashboard Pengelolaan)"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">dashboard</span>
              <span>Admin Console</span>
            </button>

            {/* Direct WhatsApp Order CTA */}
            <a
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:-translate-y-0.5"
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Pesan via WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-primary hover:bg-surface-variant rounded-full text-xs font-semibold flex items-center gap-1 border border-outline-variant/40"
              title="Admin Console"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span className="text-[11px]">Admin</span>
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-on-surface hover:bg-surface-variant rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-low border-b border-outline-variant px-6 py-4 space-y-3 animate-fadeIn">
            <a
              href="#mengapa"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-on-surface py-2 border-b border-outline-variant/30"
            >
              Mengapa Memilih EKA SUPER
            </a>
            <a
              href="#produk"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-on-surface py-2 border-b border-outline-variant/30"
            >
              Katalog Produk
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full bg-primary text-on-primary py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">shopping_cart</span>
                Form Pemesanan Cepat
              </button>
              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                Chat WhatsApp Langsung
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[720px] lg:min-h-[795px] flex flex-col justify-center bg-surface-container-low overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 sm:opacity-20 mix-blend-multiply"
              style={{ backgroundImage: `url('${HERO_BG_IMAGE}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/90 to-transparent" />
          </div>

          <div className="relative z-10 px-6 max-w-[1280px] mx-auto w-full py-16 md:py-24 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 flex flex-col gap-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary-container/10 text-primary font-semibold text-xs sm:text-sm rounded-full w-fit border border-primary/20 backdrop-blur-sm shadow-sm">
                <span>🌿</span>
                <span>Produk Segar Setiap Hari</span>
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight">
                Tahu &amp; Tempe Berkualitas untuk{' '}
                <span className="text-primary block mt-1 sm:mt-2">Kebutuhan Keluarga dan Usaha</span>
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                EKA SUPER menghadirkan tahu dan tempe berkualitas dari Jayaraga, Garut untuk rumah
                tangga, warung, restoran, katering, dan berbagai kebutuhan usaha. Diproduksi dengan
                standar kebersihan tinggi untuk menjamin kesegaran.
              </p>

              {/* Location & Contact badge */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 font-normal text-on-surface-variant bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/30 w-fit text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                  <span>{FACTORY_ADDRESS}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-outline-variant/50 self-center" />
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">phone_iphone</span>
                  <span className="font-semibold text-on-surface">0821-2466-1966</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-[0_8px_30px_rgb(0,106,52,0.15)] hover:shadow-[0_8px_30px_rgb(0,106,52,0.25)] hover:-translate-y-0.5 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Pesan Sekarang via WhatsApp</span>
                </button>

                <a
                  className="flex items-center justify-center gap-2 bg-surface hover:bg-surface-variant text-primary border border-outline-variant px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all"
                  href="#produk"
                >
                  <span>Lihat Produk</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Keunggulan (Why Choose Us) */}
        <section className="py-16 md:py-24 px-6 bg-surface" id="mengapa">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Mengapa Memilih EKA SUPER?
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
                Kami berkomitmen memberikan kualitas terbaik untuk setiap olahan kedelai yang sampai
                ke meja makan Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[32px]">verified</span>
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">Kualitas Terbaik</h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Diproses dari kedelai pilihan dengan standar kebersihan tinggi untuk hasil yang padat dan bergizi.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[32px]">local_florist</span>
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">Selalu Fresh</h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Produksi setiap hari. Anda selalu mendapatkan produk segar langsung dari pabrik kami.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[32px]">payments</span>
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">Harga Bersahabat</h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Harga kompetitif yang cocok untuk kebutuhan rumah tangga maupun margin usaha Anda.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[32px]">support_agent</span>
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">Siap Melayani</h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Layanan responsif via WhatsApp untuk memastikan pesanan Anda tercatat dan dikirim dengan baik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog Section */}
        <section className="py-16 md:py-24 px-6 bg-surface-container-low" id="produk">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Katalog Produk
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
                Pilihan produk tahu dan tempe segar terbaik untuk kebutuhan harian maupun bisnis Anda.
              </p>
            </div>

            {/* Kategori TEMPE */}
            {tempeProducts.length > 0 && (
              <div className="mb-16">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/30">
                  <h3 className="text-2xl font-bold text-primary">Kategori: TEMPE</h3>
                  <span className="text-xs text-on-surface-variant font-medium bg-surface-container px-3 py-1 rounded-full">
                    {tempeProducts.length} Varian
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tempeProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group"
                    >
                      <div className="relative mb-6 rounded-2xl overflow-hidden bg-surface-container-low aspect-[4/3] flex items-center justify-center border border-outline-variant/30">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          {formatRupiah(product.basePrice)}
                        </div>
                      </div>

                      <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                        <span className="material-symbols-outlined text-[28px]">inventory_2</span>
                      </div>

                      <h4 className="text-xl font-bold text-on-surface mb-2 uppercase">
                        {product.name}
                      </h4>
                      <p className="text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-2 mt-auto">
                        <button
                          onClick={() => openOrderWithProduct(product)}
                          className="flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(0,106,52,0.15)] w-full active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                          <span>Pesan via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kategori TAHU */}
            {tahuProducts.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/30">
                  <h3 className="text-2xl font-bold text-primary">Kategori: TAHU</h3>
                  <span className="text-xs text-on-surface-variant font-medium bg-surface-container px-3 py-1 rounded-full">
                    {tahuProducts.length} Varian
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tahuProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group"
                    >
                      <div className="relative mb-6 rounded-2xl overflow-hidden bg-surface-container-low aspect-[4/3] flex items-center justify-center border border-outline-variant/30">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          {formatRupiah(product.basePrice)}
                        </div>
                      </div>

                      <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                        <span className="material-symbols-outlined text-[28px]">dashboard_customize</span>
                      </div>

                      <h4 className="text-xl font-bold text-on-surface mb-1 uppercase">
                        {product.name}
                      </h4>
                      <p className="text-lg text-primary font-bold mb-2">
                        {formatRupiah(product.basePrice)}{' '}
                        <span className="text-sm text-on-surface-variant font-normal">/ {product.unit}</span>
                      </p>
                      <p className="text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-2 mt-auto">
                        <button
                          onClick={() => openOrderWithProduct(product)}
                          className="flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(0,106,52,0.15)] w-full active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                          <span>Pesan via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Products if any added via Admin */}
            {otherProducts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-primary mb-8 pb-4 border-b border-outline-variant/30">
                  Kategori: LAINNYA
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-[0_12px_40px_-12px_rgba(0,106,52,0.08)] hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group"
                    >
                      <div className="relative mb-6 rounded-2xl overflow-hidden bg-surface-container-low aspect-[4/3] flex items-center justify-center border border-outline-variant/30">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-on-surface mb-1">{product.name}</h4>
                      <p className="text-lg text-primary font-bold mb-2">{formatRupiah(product.basePrice)}</p>
                      <p className="text-sm text-on-surface-variant mb-6 flex-grow">{product.description}</p>
                      <button
                        onClick={() => openOrderWithProduct(product)}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(0,106,52,0.15)] w-full"
                      >
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                        Pesan via WhatsApp
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Partnership / Order Banner */}
        <section className="py-16 px-6 bg-primary text-on-primary" id="kontak">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-3">
                Kemitraan &amp; Pengiriman Rutin
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
                Melayani Pasokan Harian untuk Usaha &amp; Katering di Garut
              </h2>
              <p className="text-on-primary/80 max-w-xl text-sm sm:text-base leading-relaxed">
                Dapatkan harga grosir spesial dengan jadwal pengiriman tepat waktu langsung dari
                fasilitas produksi kami di Jayaraga, Tarogong Kidul.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="bg-white text-primary hover:bg-surface px-8 py-4 rounded-xl font-bold text-center shadow-lg transition-all hover:scale-105"
              >
                Mulai Pesanan Sekarang
              </button>
              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white hover:bg-[#1DA851] px-8 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                Konsultasi WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest w-full border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row justify-between gap-8 px-6 py-16 max-w-[1280px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-sm">
            <span className="text-2xl font-extrabold text-on-surface">EKA SUPER</span>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Pabrik Tahu &amp; Tempe berkualitas dari Jayaraga, Garut. Melayani kebutuhan rumah
              tangga dan mitra usaha.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="flex flex-col gap-3">
              <span className="text-xs text-on-surface font-bold uppercase tracking-wider mb-2">
                Tautan
              </span>
              <a href="#produk" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                Product Catalog
              </a>
              <a href="#kontak" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                B2B Partnership
              </a>
              <a href="#mengapa" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                About Production
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs text-on-surface font-bold uppercase tracking-wider mb-2">
                Informasi
              </span>
              <a href="#kontak" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                Order Guide
              </a>
              <button
                onClick={onOpenAdmin}
                className="text-left text-sm text-primary font-semibold hover:underline"
              >
                Admin Console
              </button>
              <span className="text-sm text-on-surface-variant">Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="border-t border-outline-variant/20 px-6 py-6 max-w-[1280px] mx-auto text-center md:text-left">
          <p className="text-xs sm:text-sm text-on-surface-variant">
            © 2024 EKA SUPER Garut. Traditional Excellence, Modern Freshness. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-[0_8px_25px_0_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        href={defaultWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Hubungi WhatsApp EKA SUPER"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Order Drawer Modal */}
      <OrderDrawerModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        products={products}
        selectedProduct={selectedProductForOrder}
        onOrderPlaced={onPlaceOrder}
      />
    </div>
  );
};
