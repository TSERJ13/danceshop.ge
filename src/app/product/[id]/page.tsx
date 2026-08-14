'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { mockProducts, mockSizeCharts } from '@/data/mockData';
import { Star, ShieldCheck, Heart, X, ArrowLeft, Ruler, ShoppingBag, Box, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Find product
  const product = useMemo(() => {
    return mockProducts.find((p) => p.id === productId) || mockProducts[0];
  }, [productId]);

  // UI States
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || '');
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [selectedHeel, setSelectedHeel] = useState(product.variants[0]?.heel_height || '');
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  // Zoom feature state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  // Get matching Size Chart
  const sizeChart = useMemo(() => {
    return mockSizeCharts.find((sc) => sc.id === product.size_chart_id);
  }, [product]);

  // Derived variant details
  const matchingVariant = useMemo(() => {
    return product.variants.find(
      (v) =>
        v.size === selectedSize &&
        v.color === selectedColor &&
        (!selectedHeel || v.heel_height === selectedHeel)
    ) || product.variants[0];
  }, [product, selectedSize, selectedColor, selectedHeel]);

  const variantStock = matchingVariant?.stock || 0;

  const finalPrice = useMemo(() => {
    const base = product.sale_price || product.price;
    const mod = matchingVariant?.price_modifier || 0;
    return base + mod;
  }, [product, matchingVariant]);

  // Distinct sizes & colors available
  const availableSizes = useMemo(() => {
    return Array.from(new Set(product.variants.map((v) => v.size)));
  }, [product]);

  const availableColors = useMemo(() => {
    return Array.from(new Set(product.variants.map((v) => v.color)));
  }, [product]);

  const availableHeels = useMemo(() => {
    return Array.from(new Set(product.variants.map((v) => v.heel_height).filter(Boolean)));
  }, [product]);

  const isSaved = wishlist.includes(product.id);

  // Mouse zoom effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
      <Navigation />

      {/* Detail Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16 pb-24">
        {/* Back navigation */}
        <Link
          href="/products/all"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold-dark hover:text-gold space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>უკან კატალოგში</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Gallery & Zoom */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden cursor-zoom-in shadow-xs"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              <div
                className="absolute inset-0 pointer-events-none bg-no-repeat transition-opacity duration-150"
                style={{
                  ...zoomStyle,
                  backgroundImage: `url(${activeImage})`,
                  backgroundSize: '200%',
                }}
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-20 rounded-xl border overflow-hidden transition-all duration-200 ${
                      activeImage === img ? 'border-gold shadow-md scale-105' : 'border-zinc-200 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Customization & Sizing */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-gold-dark font-extrabold">
                {product.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 pt-1">
                <div className="flex items-center space-x-1 text-gold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-extrabold text-zinc-800">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-zinc-200">|</span>
                
                {/* Live Variant Stock Badge */}
                <div className="flex items-center space-x-1.5">
                  <Box className="h-4 w-4 text-emerald-600" />
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${
                    variantStock <= 5 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {variantStock <= 5 ? `🔥 დარჩენილია მხოლოდ ${variantStock} ცალი` : `მარაგშია ${variantStock} ცალი`}
                  </span>
                </div>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-extrabold text-zinc-950">
                ${finalPrice.toFixed(2)}
              </span>
              {product.sale_price && (
                <span className="text-zinc-400 line-through text-sm">
                  ${(product.price + (matchingVariant?.price_modifier || 0)).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-zinc-650 text-sm leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Sizing & Customization Controls */}
            <div className="space-y-6 border-y border-zinc-100 py-6">
              
              {/* Color Selection */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  ფერი: <span className="text-zinc-950 font-extrabold">{selectedColor}</span>
                </span>
                <div className="flex space-x-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs rounded-xl border font-bold transition-all ${
                        selectedColor === color
                          ? 'border-gold bg-gold/10 text-gold-dark shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-gold/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size & Size Guide Trigger */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    ზომა: <span className="text-zinc-950 font-extrabold">{selectedSize}</span>
                  </span>
                  {sizeChart && (
                    <button
                      onClick={() => setSizeModalOpen(true)}
                      className="inline-flex items-center space-x-1 text-xs text-gold-dark hover:text-gold font-extrabold"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      <span>ზომების ცხრილი & გაზომვა</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 min-w-[2.75rem] px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center transition-all ${
                        selectedSize === size
                          ? 'border-gold bg-gold text-white shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-gold/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heel Height Selection (For Shoes) */}
              {availableHeels.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    ქუსლის კონფიგურაცია:
                  </span>
                  <div className="flex space-x-2">
                    {availableHeels.map((heel) => (
                      <button
                        key={heel}
                        onClick={() => setSelectedHeel(heel!)}
                        className={`px-4 py-2 text-xs rounded-xl border font-bold transition-all ${
                          selectedHeel === heel
                            ? 'border-gold bg-gold/10 text-gold-dark'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-gold/50'
                        }`}
                      >
                        {heel}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => addToCart(product, selectedSize, selectedColor, selectedHeel)}
                className="w-full sm:flex-1 py-4 bg-gradient-to-r from-gold-dark to-gold text-white font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>კალათაში დამატება</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full sm:w-auto p-4 rounded-xl border transition-all flex items-center justify-center space-x-2 ${
                  isSaved
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-zinc-200 bg-white text-zinc-650 hover:text-red-500 hover:border-red-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="sm:hidden text-xs uppercase tracking-wider font-bold">
                  რჩეულებში შენახვა
                </span>
              </button>
            </div>

            {/* Professional Standards */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 flex items-start space-x-3 text-xs text-zinc-650">
              <ShieldCheck className="h-5 w-5 text-gold-dark flex-shrink-0" />
              <div>
                <p className="font-extrabold text-zinc-900">DanceShop-ის ხარისხის გარანტია</p>
                <p className="mt-0.5">თითოეული მოდელი მოწმდება უშუალოდ მწარმოებლის მიერ საერთაშორისო სტანდარტების შესაბამისად.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Advanced size guide modal */}
      {sizeModalOpen && sizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 p-6 bg-zinc-50">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold tracking-wide text-zinc-950">
                  {sizeChart.name}
                </h3>
                <p className="text-xs text-gold-dark font-bold">ზომების შერჩევის წესი</p>
              </div>
              <button
                onClick={() => setSizeModalOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-gold-dark">
                  ზომების შესატყვისობა
                </h4>
                <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                  <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
                    <thead className="bg-zinc-50 text-zinc-600">
                      <tr>
                        {sizeChart.headers.map((header) => (
                          <th key={header} className="px-3 py-3 font-extrabold tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {sizeChart.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50">
                          {sizeChart.headers.map((header) => (
                            <td key={header} className="px-3 py-3 text-zinc-700 font-medium">
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-gold-dark">
                  როგორ გავზომოთ სწორად
                </h4>
                <div className="space-y-4 text-xs text-zinc-700">
                  {Object.entries(sizeChart.guidelines).map(([name, instruction]) => (
                    <div key={name} className="border-l-2 border-gold/60 pl-3 py-1 space-y-1">
                      <span className="font-extrabold text-zinc-900 uppercase tracking-wider block">
                        {name}
                      </span>
                      <p className="leading-relaxed text-zinc-500 font-medium">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-zinc-50 border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. ყველა უფლება დაცულია.</p>
      </footer>
    </div>
  );
}
