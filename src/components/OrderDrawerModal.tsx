import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupiah, createWhatsAppUrl } from '../utils/formatters';
import { WHATSAPP_NUMBER } from '../data/initialData';

interface OrderDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  selectedProduct?: Product | null;
  onOrderPlaced?: (orderSummary: any) => void;
}

export const OrderDrawerModal: React.FC<OrderDrawerModalProps> = ({
  isOpen,
  onClose,
  products,
  selectedProduct,
  onOrderPlaced
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    products.forEach((p) => {
      init[p.id] = selectedProduct?.id === p.id ? 10 : 0;
    });
    return init;
  });

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerType, setCustomerType] = useState('Rumah Tangga');
  const [notes, setNotes] = useState('');

  // Update selected product count when opening modal with a specific product
  React.useEffect(() => {
    if (selectedProduct) {
      setQuantities((prev) => ({
        ...prev,
        [selectedProduct.id]: prev[selectedProduct.id] > 0 ? prev[selectedProduct.id] : 10
      }));
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const selectedItems = products
    .filter((p) => (quantities[p.id] || 0) > 0)
    .map((p) => ({
      product: p,
      quantity: quantities[p.id] || 0,
      total: (quantities[p.id] || 0) * p.basePrice
    }));

  const grandTotal = selectedItems.reduce((acc, item) => acc + item.total, 0);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Silakan pilih minimal 1 produk untuk dipesan.');
      return;
    }

    let itemLines = selectedItems
      .map((item) => `• ${item.product.name} (${item.quantity} ${item.product.unit}) = ${formatRupiah(item.total)}`)
      .join('\n');

    const message = `Halo EKA SUPER Garut, saya ingin memesan Tahu & Tempe:\n\n` +
      `📋 *DETAIL PESANAN:*\n${itemLines}\n\n` +
      `💰 *Total Estimasi:* ${formatRupiah(grandTotal)}\n\n` +
      `👤 *Nama Pemesan:* ${customerName || '-'}\n` +
      `🏷️ *Tipe:* ${customerType}\n` +
      `📍 *Alamat Pengiriman:* ${customerAddress || '-'}\n` +
      `📝 *Catatan:* ${notes || '-'}\n\n` +
      `Mohon konfirmasi ketersediaan dan jadwal pengirimannya. Terima kasih!`;

    const waUrl = createWhatsAppUrl(WHATSAPP_NUMBER, message);

    if (onOrderPlaced) {
      onOrderPlaced({
        customerName: customerName || 'Pelanggan WhatsApp',
        customerAddress,
        customerType,
        items: selectedItems,
        grandTotal,
        notes
      });
    }

    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-primary text-on-primary flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              <h3 className="text-xl font-bold font-headline-md">Form Pemesanan Cepat</h3>
            </div>
            <p className="text-xs text-on-primary/80 mt-1">
              Pesan langsung ke WhatsApp Pabrik EKA SUPER Garut
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-primary/80 hover:text-on-primary p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSendWhatsApp} className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Product list with quantity stepper */}
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant mb-3 tracking-wider">
              Pilih Produk & Jumlah Pesanan:
            </label>
            <div className="space-y-3">
              {products.map((p) => {
                const qty = quantities[p.id] || 0;
                return (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      qty > 0
                        ? 'border-primary bg-primary-container/5 shadow-sm'
                        : 'border-outline-variant/30 bg-surface-container-low/50 hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-outline-variant/40"
                      />
                      <div>
                        <h4 className="font-semibold text-on-surface text-sm">{p.name}</h4>
                        <p className="text-xs text-primary font-bold">
                          {formatRupiah(p.basePrice)}{' '}
                          <span className="text-on-surface-variant font-normal">/ {p.unit}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(p.id, -10)}
                        className="w-8 h-8 rounded-lg bg-surface-container border border-outline-variant text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 font-bold transition-transform"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={qty}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setQuantities((prev) => ({ ...prev, [p.id]: Math.max(0, val) }));
                        }}
                        className="w-14 text-center font-bold text-sm bg-surface-container-low border border-outline-variant rounded-lg py-1 text-on-surface"
                      />
                      <button
                        type="button"
                        onClick={() => handleQtyChange(p.id, 10)}
                        className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-95 font-bold transition-transform"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer details */}
          <div className="space-y-4 pt-2 border-t border-surface-variant">
            <label className="block text-xs font-bold uppercase text-on-surface-variant tracking-wider">
              Informasi Pemesan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1 font-medium">Nama / Nama Usaha</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Cth. Ibu Maya / RM Sunda"
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant mb-1 font-medium">Kategori Kebutuhan</label>
                <select
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Rumah Tangga">Rumah Tangga</option>
                  <option value="Warung/Restoran">Warung Makan / Restoran</option>
                  <option value="Katering">Katering / Hajatan</option>
                  <option value="Mitra B2B">Mitra Grosir / Reseller</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant mb-1 font-medium">Alamat Pengiriman di Garut</label>
              <textarea
                rows={2}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Cth. Jl. Cimanuk No. 20, Tarogong Kidul, Garut"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant mb-1 font-medium">Catatan Khusus (Opsional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Cth. Minta dikirim sebelum jam 09:00 pagi"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Price Calculation Summary */}
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/40 flex justify-between items-center">
            <div>
              <span className="text-xs text-on-surface-variant">Total Estimasi ({selectedItems.length} jenis produk):</span>
              <p className="text-2xl font-extrabold text-primary">{formatRupiah(grandTotal)}</p>
            </div>
            <button
              type="submit"
              disabled={grandTotal === 0}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kirim via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
