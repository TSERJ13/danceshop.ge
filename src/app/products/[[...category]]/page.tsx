'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Filter, Star, Heart, SlidersHorizontal, ArrowRight, Grid, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface PageProps {
  params: Promise<{
    category?: string[];
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const categorySegments = resolvedParams.category || [];
  const activeCategorySlug = categorySegments[categorySegments.length - 1] || 'all';

  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600);

  const activeCategory = useMemo(() => {
    if (activeCategorySlug === 'all') return null;
    return mockCategories.find((c) => c.slug === activeCategorySlug);
  }, [activeCategorySlug]);

  const filterOptions = useMemo(() => {
    const brands = new Set<string>();
    const sizes = new Set<string>();
    mockProducts.forEach((p) => {
      brands.add(p.brand);
      p.variants.forEach((v) => sizes.add(v.size));
    });
    return {
      brands: Array.from(brands),
      sizes: Array.from(sizes),
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory =
        activeCategorySlug === 'all' ||
        product.category_slug === activeCategorySlug ||
        mockCategories.find((c) => c.slug === activeCategorySlug)?.id === product.category_id;

      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      
      const matchesSize =
        selectedSize === 'all' ||
        product.variants.some((v) => v.size === selectedSize);

      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesBrand && matchesSize && matchesPrice;
    });
  }, [activeCategorySlug, selectedBrand, selectedSize, maxPrice]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-amber-50/50 via-white to-white border-b border-border-color py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight capitalize text-zinc-950">
            {activeCategory ? activeCategory.name : 'სრული კოლექცია'}
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
            მთავარი / პროდუქცია {activeCategory ? `/ ${activeCategory.name}` : ''}
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <aside className="space-y-8 lg:block">
            <div className="flex items-center justify-between border-b border-border-color pb-4">
              <h3 className="font-extrabold text-base flex items-center space-x-2 text-zinc-900">
                <SlidersHorizontal className="h-4.5 w-4.5 text-gold-dark" />
                <span>ფილტრები</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedBrand('all');
                  setSelectedSize('all');
                  setMaxPrice(600);
                }}
                className="text-xs text-gold-dark font-extrabold hover:text-gold"
              >
                გასუფთავება
              </button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">ბრენდი</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-zinc-700 cursor-pointer">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === 'all'}
                    onChange={() => setSelectedBrand('all')}
                    className="accent-gold h-4 w-4"
                  />
                  <span className="font-medium">ყველა ბრენდი</span>
                </label>
                {filterOptions.brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 text-sm text-zinc-700 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="accent-gold h-4 w-4"
                    />
                    <span className="font-medium">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">ზომა</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-3 py-1.5 text-xs rounded-lg border font-bold transition-all ${
                    selectedSize === 'all'
                      ? 'border-gold bg-gold text-white shadow-xs'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-gold/50'
                  }`}
                >
                  ყველა
                </button>
                {filterOptions.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs rounded-lg border font-bold transition-all ${
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

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-500">
                <span className="uppercase tracking-wider">მაქს. ფასი</span>
                <span className="text-gold-dark font-extrabold text-sm">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between border-b border-border-color pb-4">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-extrabold">
                ნაპოვნია {filteredProducts.length} პროდუქტი
              </p>
              <div className="flex items-center space-x-2">
                <button className="p-2 border border-zinc-200 text-gold-dark rounded-lg" disabled>
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50">
                <Filter className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="font-extrabold text-lg text-zinc-900">პროდუქტები ვერ მოიძებნა</h3>
                <p className="text-zinc-500 text-xs mt-1 font-medium">შეცვალეთ ფილტრის პარამეტრები</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProducts.map((product) => {
                  const isSaved = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="relative h-96 overflow-hidden block"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        {product.sale_price && (
                          <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            ფასდაკლება
                          </span>
                        )}
                      </Link>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 border border-zinc-200 text-zinc-600 hover:text-red-500 transition-colors shadow-sm"
                      >
                        <Heart
                          className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
                        />
                      </button>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1 font-bold">
                            <span className="uppercase tracking-wider text-gold-dark">{product.brand}</span>
                            <div className="flex items-center space-x-1 text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-amber-400" />
                              <span className="font-extrabold text-zinc-800">{product.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <h3 className="text-base font-bold text-zinc-900 group-hover:text-gold-dark transition-colors">
                            <Link href={`/product/${product.id}`}>{product.name}</Link>
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                          <div className="flex items-baseline space-x-2">
                            {product.sale_price ? (
                              <>
                                <span className="text-xl font-extrabold text-zinc-950">
                                  ${product.sale_price.toFixed(2)}
                                </span>
                                <span className="text-xs text-zinc-400 line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-xl font-extrabold text-zinc-950">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => addToCart(product)}
                            className="px-4 py-2.5 bg-zinc-900 hover:bg-gold text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center space-x-1.5 shadow-sm active:scale-95"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>კალათაში</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="bg-zinc-50 border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. ყველა უფლება დაცულია.</p>
      </footer>
    </div>
  );
}
