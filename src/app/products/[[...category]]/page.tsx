'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Filter, Star, Heart, SlidersHorizontal, ArrowRight, Grid } from 'lucide-react';

interface PageProps {
  params: Promise<{
    category?: string[];
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const categorySegments = resolvedParams.category || [];
  const activeCategorySlug = categorySegments[categorySegments.length - 1] || 'all';

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1']);

  const activeCategory = useMemo(() => {
    if (activeCategorySlug === 'all') return null;
    return mockCategories.find((c) => c.slug === activeCategorySlug);
  }, [activeCategorySlug]);

  // Derived filter options
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

  // Filtered Products
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

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-zinc-50 border-b border-border-color py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider capitalize text-zinc-950">
            {activeCategory ? activeCategory.name : 'სრული კოლექცია'}
          </h1>
          <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-semibold">
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
              <h3 className="font-bold text-base flex items-center space-x-2 text-zinc-900">
                <SlidersHorizontal className="h-4.5 w-4.5 text-gold" />
                <span>ფილტრები</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedBrand('all');
                  setSelectedSize('all');
                  setMaxPrice(600);
                }}
                className="text-xs text-gold font-bold hover:text-gold-light"
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
                  <span>ყველა ბრენდი</span>
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
                    <span>{brand}</span>
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
                  className={`px-3 py-1.5 text-xs rounded border transition-colors duration-200 ${
                    selectedSize === 'all'
                      ? 'border-gold bg-gold text-white font-bold'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-gold/50'
                  }`}
                >
                  ყველა
                </button>
                {filterOptions.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors duration-200 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-white font-bold'
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
              <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
                <span className="uppercase tracking-wider">მაქს. ფასი</span>
                <span className="text-gold-dark font-extrabold">${maxPrice}</span>
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
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                ნაპოვნია {filteredProducts.length} პროდუქტი
              </p>
              <div className="flex items-center space-x-2">
                <button className="p-2 border border-zinc-200 text-gold rounded" disabled>
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-zinc-200 rounded bg-zinc-50">
                <Filter className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-zinc-900">პროდუქტები ვერ მოიძებნა</h3>
                <p className="text-zinc-500 text-xs mt-1">შეცვალეთ ფილტრის პარამეტრები</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProducts.map((product) => {
                  const inWishlist = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col rounded border border-border-color bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
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
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                        {product.sale_price && (
                          <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            ფასდაკლება
                          </span>
                        )}
                      </Link>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-zinc-200 text-zinc-500 hover:text-gold transition-colors duration-200 shadow-sm"
                      >
                        <Heart
                          className={`h-4 w-4 ${inWishlist ? 'fill-gold text-gold' : ''}`}
                        />
                      </button>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                            <span className="font-bold uppercase tracking-wider">{product.brand}</span>
                            <div className="flex items-center space-x-1 text-gold">
                              <Star className="h-3.5 w-3.5 fill-gold" />
                              <span className="font-bold">{product.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <h3 className="text-base font-bold text-zinc-900 group-hover:text-gold transition-colors duration-200">
                            <Link href={`/product/${product.id}`}>{product.name}</Link>
                          </h3>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline space-x-2">
                            {product.sale_price ? (
                              <>
                                <span className="text-lg font-bold text-gold-dark">
                                  ${product.sale_price.toFixed(2)}
                                </span>
                                <span className="text-xs text-zinc-400 line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-zinc-950">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/product/${product.id}`}
                            className="p-2 border border-gold/30 hover:border-gold hover:bg-gold hover:text-white rounded text-gold transition-all duration-300"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
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
