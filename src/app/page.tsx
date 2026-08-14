'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Star, Shield, ArrowRight, ArrowLeftRight, Heart, Sparkles } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

export default function Home() {
  const [wishlist, setWishlist] = useState<string[]>(['prod-1']);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    {
      name: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      desc: 'Elegant Latin & Ballroom dresses',
    },
    {
      name: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      desc: 'Tailored trousers, practice shirts & waistcoats',
    },
    {
      name: 'Shoes',
      slug: 'shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
      desc: 'Handcrafted Latin, Standard & practice shoes',
    },
    {
      name: 'Dancewear',
      slug: 'dancewear',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop',
      desc: 'Practice skirts, tops and accessories',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gold Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-gold-light font-semibold">
              The Premium Choice
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="block text-white">DANCE WITH</span>
            <span className="block gold-text-gradient py-2">ELEGANCE</span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto tracking-wide">
            Discover our premium ballroom and Latin dancewear collections. Exquisite designs, professional sizing, and luxury craftsmanship tailored for champions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products/all"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-dark to-gold text-black font-semibold text-sm tracking-widest uppercase rounded shadow-lg hover:from-gold hover:to-gold-light transition-all duration-300 transform hover:scale-[1.02]"
            >
              Shop Collection
            </Link>
            <Link
              href="/products/shoes"
              className="w-full sm:w-auto px-8 py-4 border border-gold/50 bg-black/40 text-gold font-semibold text-sm tracking-widest uppercase rounded backdrop-blur-md hover:bg-gold/10 transition-all duration-300"
            >
              Browse Shoes
            </Link>
          </div>
        </div>

        {/* Bottom fading line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider">
            FEATURED <span className="text-gold">CATEGORIES</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Select standard or practice garments designed specifically for movement and luxury styling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group relative h-80 overflow-hidden rounded border border-border-color bg-card-bg transition-transform duration-300 transform hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                <h3 className="text-lg font-bold text-white tracking-wider group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">{cat.desc}</p>
                <div className="pt-2 flex items-center text-xs font-semibold text-gold space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 border-t border-border-color bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-wider">
                NEW <span className="text-gold">ARRIVALS</span>
              </h2>
              <div className="w-16 h-[1px] bg-gold" />
            </div>
            <Link
              href="/products/all"
              className="hidden sm:flex items-center text-sm font-semibold text-gold hover:text-gold-light space-x-1"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => {
              const inWishlist = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded border border-border-color bg-card-bg overflow-hidden"
                >
                  {/* Image gallery stub */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-96 overflow-hidden block"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    
                    {product.sale_price && (
                      <span className="absolute top-4 left-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Sale
                      </span>
                    )}
                  </Link>

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/70 border border-gold/20 text-white hover:text-gold transition-colors duration-200"
                  >
                    <Heart
                      className={`h-4 w-4 ${inWishlist ? 'fill-gold text-gold' : ''}`}
                    />
                  </button>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span>{product.brand}</span>
                        <div className="flex items-center space-x-1 text-gold">
                          <Star className="h-3.5 w-3.5 fill-gold" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-gold transition-colors duration-200">
                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline space-x-2">
                        {product.sale_price ? (
                          <>
                            <span className="text-lg font-bold text-gold">
                              ${product.sale_price.toFixed(2)}
                            </span>
                            <span className="text-xs text-zinc-500 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-white">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/product/${product.id}`}
                        className="p-2 border border-gold/30 hover:border-gold hover:bg-gold hover:text-black rounded text-gold transition-all duration-300"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footwear & Sizing Promo */}
      <section className="py-20 bg-black border-t border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-wide leading-tight">
              PERFECT FIT FOR <br />
              <span className="gold-text-gradient">PERFECT PERFORMANCE</span>
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              In dancesport, a fraction of a centimeter determines your stability and control. Our custom interactive size guides and width selections ensure that your Latin or Standard shoes fit like a second skin.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-gold/10 text-gold rounded border border-gold/20">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Interactive Guides</h4>
                  <p className="text-xs text-zinc-400">Step-by-step measurements guidelines tailored for foot contours.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-gold/10 text-gold rounded border border-gold/20">
                  <ArrowLeftRight className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Flexible Swaps</h4>
                  <p className="text-xs text-zinc-400">Exchange within Tbilisi to secure your exact heel configuration.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded overflow-hidden h-96 border border-border-color">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
              alt="Premium footwear fitting"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-black border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. All rights reserved.</p>
        <p className="mt-2 text-gold/60">Designed with ultimate precision for ballroom athletes.</p>
      </footer>
    </div>
  );
}
