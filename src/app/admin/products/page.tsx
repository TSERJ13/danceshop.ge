'use client';

import { useState } from 'react';
import { activeProductsStore, activeCategoriesStore, activeSizeChartsStore, Product } from '@/data/mockData';
import { Plus, Trash2, Tag, Percent, Image, HelpCircle } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(activeProductsStore);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSizeChart, setSelectedSizeChart] = useState('');

  // Sizing variables state inside creator
  const [variantSize, setVariantSize] = useState('');
  const [variantColor, setVariantColor] = useState('');
  const [variantStock, setVariantStock] = useState('10');
  const [variantsList, setVariantsList] = useState<any[]>([]);

  const handleAddVariant = () => {
    if (!variantSize || !variantColor) return;
    const newVar = {
      id: `v-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      size: variantSize,
      color: variantColor,
      stock: Number(variantStock) || 0,
      price_modifier: 0,
    };
    setVariantsList([...variantsList, newVar]);
    setVariantSize('');
    setVariantColor('');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !selectedCategory) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      price: Number(price),
      sale_price: salePrice ? Number(salePrice) : undefined,
      brand: brand || 'DanceShop',
      images: images ? images.split(',').map((img) => img.trim()) : ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'],
      category_id: selectedCategory,
      category_slug: activeCategoriesStore.find((c) => c.id === selectedCategory)?.slug || 'all',
      size_chart_id: selectedSizeChart || undefined,
      status: 'active',
      rating: 5.0,
      variants: variantsList.length > 0 ? variantsList : [{ id: `v-${Date.now()}`, size: 'M', color: 'Classic Black', stock: 10, price_modifier: 0 }],
    };

    const updated = [...products, newProd];
    setProducts(updated);
    activeProductsStore.length = 0;
    activeProductsStore.push(...updated);

    // Reset fields
    setName('');
    setDescription('');
    setPrice('');
    setSalePrice('');
    setBrand('');
    setImages('');
    setSelectedCategory('');
    setSelectedSizeChart('');
    setVariantsList([]);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    activeProductsStore.length = 0;
    activeProductsStore.push(...updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-wide text-white">Product Catalog Management</h2>
        <p className="text-zinc-400 text-xs mt-1">
          Perform CRUD on sports products and map size guidelines to footwear or garments dynamically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* CRUD Creator Form */}
        <form onSubmit={handleCreateProduct} className="lg:col-span-2 space-y-6 rounded border border-border-color bg-black/40 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center space-x-2 border-b border-border-color pb-3">
            <Plus className="h-4 w-4" />
            <span>Create New Product Listing</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Product Title *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Standard Ladies Satin Court Heels"
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Supadance, Ray Rose"
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Base Price ($) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="150.00"
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Sale Price ($) (Optional)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="120.00"
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Assign Category *</label>
              <select
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-zinc-450 focus:border-gold focus:outline-none"
              >
                <option value="">-- Choose Category --</option>
                {activeCategoriesStore.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Link Size Guide Chart</label>
              <select
                value={selectedSizeChart}
                onChange={(e) => setSelectedSizeChart(e.target.value)}
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-zinc-450 focus:border-gold focus:outline-none"
              >
                <option value="">-- None (No size chart link) --</option>
                {activeSizeChartsStore.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide premium details about fit, alignment, heels shape and materials used."
              className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Images URLs (Comma Separated)</label>
            <input
              type="text"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
            />
          </div>

          {/* Variant Builder Inside Creator */}
          <div className="border border-border-color rounded p-4 bg-zinc-950/60 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase block">Inventory & Variants Planner</span>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Size (e.g. 38, S)"
                value={variantSize}
                onChange={(e) => setVariantSize(e.target.value)}
                className="px-3 py-2 bg-black border border-zinc-800 rounded text-xs"
              />
              <input
                type="text"
                placeholder="Color"
                value={variantColor}
                onChange={(e) => setVariantColor(e.target.value)}
                className="px-3 py-2 bg-black border border-zinc-800 rounded text-xs"
              />
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-3 py-2 border border-gold text-gold rounded text-xs font-semibold hover:bg-gold hover:text-black transition-colors"
              >
                Add Variant
              </button>
            </div>

            {/* List of custom variants planned */}
            {variantsList.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {variantsList.map((v, i) => (
                  <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-zinc-350">
                    {v.size} / {v.color} (Qty: {v.stock})
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-gold-dark to-gold text-black font-bold uppercase text-xs tracking-widest rounded transition-all duration-200 hover:from-gold hover:to-gold-light"
          >
            Create Product Listing
          </button>
        </form>

        {/* Existing Products List */}
        <div className="space-y-4 rounded border border-border-color bg-black/40 p-6 h-[720px] overflow-y-auto">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center space-x-2 border-b border-border-color pb-3">
            <Tag className="h-4 w-4" />
            <span>Active Listings ({products.length})</span>
          </h3>

          <div className="divide-y divide-zinc-900">
            {products.map((prod) => (
              <div key={prod.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <img src={prod.images[0]} alt="" className="h-10 w-10 object-cover rounded border border-border-color flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">{prod.name}</h4>
                    <span className="text-[10px] text-gold font-bold">${prod.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(prod.id)}
                  className="p-1.5 border border-zinc-900 text-zinc-500 hover:text-red-500 hover:border-red-500/20 rounded transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
