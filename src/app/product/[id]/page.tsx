'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { mockProducts, mockSizeCharts } from '@/data/mockData';
import { Star, ShieldCheck, HelpCircle, Heart, Check, X, ArrowLeft, Ruler } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

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
  const [addedToCart, setAddedToCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

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
    );
  }, [product, selectedSize, selectedColor, selectedHeel]);

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
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white">
      <Navigation />

      {/* Detail Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16 pb-24">
        {/* Back navigation */}
        <Link
          href="/products/all"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Gallery & Zoom */}
          <div className="space-y-4">
            {/* Big image with Zoom capability */}
            <div
              className="relative aspect-square rounded border border-border-color bg-card-bg overflow-hidden cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Zoom container overlay */}
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
                    className={`h-20 w-20 rounded border overflow-hidden transition-all duration-200 ${
                      activeImage === img ? 'border-gold' : 'border-border-color hover:border-gold/50'
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
              <span className="text-xs uppercase tracking-widest text-gold font-bold">
                {product.brand}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 pt-1">
                <div className="flex items-center space-x-1 text-gold">
                  <Star className="h-4 w-4 fill-gold" />
                  <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-zinc-600">|</span>
                <span className="text-xs uppercase tracking-wider text-green-500 font-semibold">
                  In stock & ready to ship
                </span>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-extrabold text-white">
                ${finalPrice.toFixed(2)}
              </span>
              {product.sale_price && (
                <span className="text-zinc-500 line-through text-sm">
                  ${(product.price + (matchingVariant?.price_modifier || 0)).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Sizing & Customization Controls */}
            <div className="space-y-6 border-y border-border-color py-6">
              
              {/* Color Selection */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Select Color: <span className="text-white font-medium">{selectedColor}</span>
                </span>
                <div className="flex space-x-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs rounded border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-gold bg-gold/10 text-gold font-bold'
                          : 'border-border-color bg-zinc-950 text-zinc-300 hover:border-gold/50'
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
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Select Size: <span className="text-white font-medium">{selectedSize}</span>
                  </span>
                  {sizeChart && (
                    <button
                      onClick={() => setSizeModalOpen(true)}
                      className="inline-flex items-center space-x-1 text-xs text-gold hover:text-gold-light font-semibold"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      <span>Size Guide & Measures</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 min-w-[2.75rem] px-3 rounded border text-xs font-semibold flex items-center justify-center transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-gold bg-gold text-black'
                          : 'border-border-color bg-zinc-950 text-zinc-300 hover:border-gold/50'
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
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Select Heel Configuration:
                  </span>
                  <div className="flex space-x-2">
                    {availableHeels.map((heel) => (
                      <button
                        key={heel}
                        onClick={() => setSelectedHeel(heel!)}
                        className={`px-4 py-2 text-xs rounded border transition-all duration-200 ${
                          selectedHeel === heel
                            ? 'border-gold bg-gold/10 text-gold font-bold'
                            : 'border-border-color bg-zinc-950 text-zinc-300 hover:border-gold/50'
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
                onClick={() => {
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
                className="w-full sm:flex-1 py-4 bg-gradient-to-r from-gold-dark to-gold text-black font-bold uppercase text-xs tracking-widest rounded transition-all duration-200 hover:from-gold hover:to-gold-light active:scale-95"
              >
                {addedToCart ? 'Added to Cart ✓' : 'Add to Shopping Bag'}
              </button>
              <button
                onClick={() => setInWishlist(!inWishlist)}
                className={`w-full sm:w-auto p-4 rounded border transition-all duration-200 flex items-center justify-center space-x-2 ${
                  inWishlist
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-border-color bg-transparent text-white hover:text-gold hover:border-gold/50'
                }`}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? 'fill-gold' : ''}`} />
                <span className="sm:hidden text-xs uppercase tracking-wider font-semibold">
                  Wishlist
                </span>
              </button>
            </div>

            {/* Professional Standards */}
            <div className="bg-zinc-950/60 border border-border-color rounded p-4 flex items-start space-x-3 text-xs text-zinc-400">
              <ShieldCheck className="h-5 w-5 text-gold flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">DanceShop Authenticity Guaranteed</p>
                <p className="mt-0.5">Every footwear pair is subjected to sizing and weight tests to comply with WDSF safety requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Advanced size guide modal */}
      {sizeModalOpen && sizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl rounded border border-gold/30 bg-zinc-950 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-color p-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-wide text-white">
                  {sizeChart.name}
                </h3>
                <p className="text-xs text-gold">Sports Sizing Guidelines</p>
              </div>
              <button
                onClick={() => setSizeModalOpen(false)}
                className="p-1 rounded border border-border-color text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sizing Grid Table */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gold">
                  Dimensions Reference Grid
                </h4>
                <div className="overflow-x-auto border border-border-color rounded">
                  <table className="min-w-full divide-y divide-zinc-800 text-left text-xs">
                    <thead className="bg-zinc-900 text-zinc-300">
                      <tr>
                        {sizeChart.headers.map((header) => (
                          <th key={header} className="px-3 py-3 font-semibold tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-black/40">
                      {sizeChart.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-900/30">
                          {sizeChart.headers.map((header) => (
                            <td key={header} className="px-3 py-3 text-zinc-300">
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sizing Instructions / How to Measure guidelines */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gold">
                  How To Measure Correctly
                </h4>
                <div className="space-y-4 text-xs text-zinc-300">
                  {Object.entries(sizeChart.guidelines).map(([name, instruction]) => (
                    <div key={name} className="border-l-2 border-gold/40 pl-3 py-1 space-y-1">
                      <span className="font-bold text-white uppercase tracking-wider block">
                        {name}
                      </span>
                      <p className="leading-relaxed text-zinc-400">{instruction}</p>
                    </div>
                  ))}
                </div>

                {/* Sizing Visual guidelines stub */}
                <div className="rounded border border-border-color bg-zinc-900/30 p-4 space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-gold uppercase block">
                    Illustration & Guidelines
                  </span>
                  <div className="border border-dashed border-zinc-700 h-24 rounded flex items-center justify-center text-zinc-500 text-xs">
                    [ Foot Contour / Body measurement illustration ]
                  </div>
                  <p className="text-[10px] text-zinc-500 text-center">
                    Keep your foot flat on the floor. Wear the specific sports socks or stockings you intend to wear during dancesport matches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. All rights reserved.</p>
      </footer>
    </div>
  );
}
