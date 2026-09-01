import React, { useState } from 'react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Tahu Segar Putih',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSNwiVJ334Isuu4DAZljQC6D8dC0WI6nRV531Fb7ADY3VerTXvGdTMl98QsCqYTJ6pbq_xwlaohjQ3wCuTd3llyzk9jDz6ZJsGvjrk6tDj4Oz0o5aZFwHRdeIvHJYTrnmJB0JNWFRX8_YPlE8DKPd_cLoKDY06pBXOeW-eSPgI1dWa6vDj3B_aPG7tcn1QPd3suPFBRaFnsYttWXnmHJ0MmY7ua2cgD12TYAO7ymydbpuu4JSYf-_X'
  },
  {
    name: 'Tahu Sutra / Lembut',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq7Gq7Fy1JnhfGMBfV7QGI5gth59zjZNLyrb4QuK7XXg6yN9-6jRh9Q0ItEtTl2adZaVD0HsFupf5fyUQ-q5Ma4y7J2nwtWv5f4m590K5KYgfWdvTOfe6Pxd6jg1vtkf4EAPO-zH5xpRF3jS4UKPbGlFY6t-j7WiX8qAvODdU4COLXUii4tS4NehomydyLapaAJHiPXxK1mrFs5druIv4wX0nR3mYxmvQ2Z4zw-9LOxLALr6KjNIyZ'
  },
  {
    name: 'Tahu Goreng / Camilan',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW7SqxSegChN30rC6QQkYvURrriaTdNC2_U7IKud9Dmvi4y7HOkdiE3M0cCcgr_xkyd2P_y5_6vkqtW6kpOEUehNWGJ6sRUG6AeoOR8wZsjJ3F9HVn3xkWsG_jMle3VsOHgwSvpsB5VZ9zI26z37sUwJyoEHfXwpIn4hhg8Nxky8b9Ar6VZdy1h7K9O_IRU0rLfMq1Hp6weKBmGA8T78cHj5NWVVzoh2zUHiK0MzibstWA98BO7sPc'
  },
  {
    name: 'Tempe Super Fermentasi',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWeSKITu51_AtwL4DAw5M7yTC9Y7cmt95cQXoX8FjRGkSsyKlCNxkEGMCXNpe6I2io0qhoSAq58cEE0BgBFesdatm9Riz0zN02DgNe9wBF_DKvYeYHiOo4sh7nOunFlxeNWei01S4C2XZOlXeTCGQOQJOmNnmN7Q0oV3x5r10mbERECpyBypJKA7nOnuVSPfcEUullZbbz7W7UbC2EjvJdAbJzRH_JHA8kWAaXM5Up6uDiovX7nXh9'
  },
  {
    name: 'Tempe Daun Premium',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBChrAGNa9VU40DwGzIzIoEPmJCMuTdngfHzDhCesNhlMdsxIffEFlk6UpKxqbigD_oX4enuIdrZmHTQQxXmFnoeggjKYAyGsNUORgLilBMVvb0c8zwKB6yvMbzmcOyL59VmMN_292j8KFumxgf2NGxvbqD-O7wkafy08xckMV3hvp2zrqwWX7pInmm8nRI0Toy4wCmNIHGFzvdIgttG6TwO-uqFaMgQ_wkhZIbU4rShC09kxQDK_8O'
  }
];

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<'TAHU' | 'TEMPE' | 'LAINNYA'>('TAHU');
  const [basePrice, setBasePrice] = useState('10000');
  const [unit, setUnit] = useState('pcs');
  const [stockLevel, setStockLevel] = useState('100');
  const [minStockAlert, setMinStockAlert] = useState('30');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim()) return;

    const priceNum = parseFloat(basePrice.replace(/[^0-9]/g, '')) || 0;
    const stockNum = parseInt(stockLevel) || 0;
    const minAlertNum = parseInt(minStockAlert) || 20;

    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (stockNum <= 0) {
      status = 'Out of Stock';
    } else if (stockNum <= minAlertNum) {
      status = 'Low Stock';
    }

    onAdd({
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      basePrice: priceNum,
      unit,
      stockLevel: stockNum,
      minStockAlert: minAlertNum,
      status,
      imageUrl: imageUrl || PRESET_IMAGES[0].url,
      description: description.trim() || `Produk berkualitas dari EKA SUPER Garut`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-container-low/60">
          <div>
            <h3 className="text-xl font-bold text-on-surface">Tambah Produk Baru</h3>
            <p className="text-sm text-on-surface-variant">Tambahkan varian tahu atau tempe ke katalog EKA SUPER</p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Nama Produk *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth. Tahu Sutra 10×10"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Kode SKU *
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="cth. TH-SUTRA"
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
                Harga Dasar (Rp) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="10000"
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
                placeholder="pcs / batang"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Stok Awal (Unit) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={stockLevel}
                onChange={(e) => setStockLevel(e.target.value)}
                placeholder="100"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
                Batas Peringatan Stok Menipis
              </label>
              <input
                type="number"
                min="1"
                value={minStockAlert}
                onChange={(e) => setMinStockAlert(e.target.value)}
                placeholder="30"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
              Pilih Foto Produk
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(img.url)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    imageUrl === img.url ? 'border-primary ring-2 ring-primary/30' : 'border-outline-variant/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Atau masukkan URL gambar..."
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-xs text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi keunggulan dan kegunaan produk..."
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-surface-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant text-sm font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold shadow transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
