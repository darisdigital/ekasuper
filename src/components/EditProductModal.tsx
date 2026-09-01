import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: Product) => void;
  onDelete: (id: string) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<'TAHU' | 'TEMPE' | 'LAINNYA'>('TAHU');
  const [basePrice, setBasePrice] = useState('0');
  const [unit, setUnit] = useState('');
  const [stockLevel, setStockLevel] = useState('0');
  const [minStockAlert, setMinStockAlert] = useState('20');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setCategory(product.category);
      setBasePrice(product.basePrice.toString());
      setUnit(product.unit);
      setStockLevel(product.stockLevel.toString());
      setMinStockAlert(product.minStockAlert.toString());
      setImageUrl(product.imageUrl);
      setDescription(product.description);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(basePrice.replace(/[^0-9]/g, '')) || 0;
    const stockNum = parseInt(stockLevel) || 0;
    const minAlertNum = parseInt(minStockAlert) || 20;

    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (stockNum <= 0) {
      status = 'Out of Stock';
    } else if (stockNum <= minAlertNum) {
      status = 'Low Stock';
    }

    onUpdate({
      ...product,
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      basePrice: priceNum,
      unit,
      stockLevel: stockNum,
      minStockAlert: minAlertNum,
      status,
      imageUrl,
      description: description.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-container-low/60">
          <div>
            <h3 className="text-xl font-bold text-on-surface">Edit Produk</h3>
            <p className="text-sm text-on-surface-variant">Ubah informasi harga, stok, dan spesifikasi {product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-3 bg-surface-container rounded-xl border border-outline-variant/30">
            <img src={imageUrl} alt={name} className="w-16 h-16 rounded-lg object-cover border border-outline-variant/50" />
            <div>
              <p className="font-bold text-on-surface">{name}</p>
              <p className="text-xs font-mono text-on-surface-variant">{sku}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                product.status === 'Low Stock'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-primary-container text-on-primary-container'
              }`}>
                {product.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Kode SKU
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'TAHU' | 'TEMPE' | 'LAINNYA')}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              >
                <option value="TAHU">TAHU</option>
                <option value="TEMPE">TEMPE</option>
                <option value="LAINNYA">LAINNYA</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Harga Dasar (Rp)
              </label>
              <input
                type="number"
                required
                min="0"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Satuan Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Jumlah Stok Tersedia
              </label>
              <input
                type="number"
                required
                min="0"
                value={stockLevel}
                onChange={(e) => setStockLevel(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Batas Minimum Alert
              </label>
              <input
                type="number"
                min="1"
                value={minStockAlert}
                onChange={(e) => setMinStockAlert(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
              URL Gambar
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-xs text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
              Deskripsi
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
            />
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-surface-variant">
            <button
              type="button"
              onClick={() => {
                if (confirm(`Hapus produk "${product.name}" dari katalog?`)) {
                  onDelete(product.id);
                  onClose();
                }
              }}
              className="px-4 py-2 text-xs text-error hover:bg-error-container/30 rounded-lg transition-colors font-medium flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Hapus Produk
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant text-sm font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold shadow transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
