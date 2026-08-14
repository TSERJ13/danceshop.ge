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
      name: 'ქალები',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      desc: 'ელეგანტური ლათინური და სამეჯლისო კაბები',
    },
    {
      name: 'კაცები',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      desc: 'კლასიკური შარვლები, სავარჯიშო მაისურები და ჟილეტები',
    },
    {
      name: 'ფეხსაცმელი',
      slug: 'shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
      desc: 'სამეჯლისო, ლათინური და სავარჯიშო ფეხსაცმელი',
    },
    {
      name: 'ტანსაცმელი',
      slug: 'dancewear',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop',
      desc: 'სავარჯიშო იუბკები, ტოპები და აქსესუარები',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
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
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-white/90" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gold/40 bg-white/80 backdrop-blur-md shadow-sm">
            <Sparkles className="h-4 w-4 text-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
              პრემიუმ არჩევანი
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="block text-zinc-900">იცეკვე</span>
            <span className="block gold-text-gradient py-2">ელეგანტურად</span>
          </h1>

          <p className="text-zinc-700 text-base sm:text-lg max-w-xl mx-auto tracking-wide font-medium">
            აღმოაჩინეთ პრემიუმ კლასის სამეჯლისო და ლათინური საცეკვაო კოლექციები. საუკეთესო დიზაინი, პროფესიონალური ზომები და ჩემპიონებისთვის შექმნილი ხარისხი.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products/all"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-dark to-gold text-white font-bold text-sm tracking-widest uppercase rounded shadow-lg hover:brightness-115 transition-all duration-300 transform hover:scale-[1.02]"
            >
              კოლექცია
            </Link>
            <Link
              href="/products/shoes"
              className="w-full sm:w-auto px-8 py-4 border border-gold/50 bg-white/70 text-gold-dark font-bold text-sm tracking-widest uppercase rounded backdrop-blur-md hover:bg-gold/10 transition-all duration-300"
            >
              ფეხსაცმელი
            </Link>
          </div>
        </div>

        {/* Bottom fading line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider">
            რჩეული <span className="text-gold">კატეგორიები</span>
          </h2>
          <div className="w-24 h-[2px] bg-gold mx-auto" />
          <p className="text-zinc-500 text-sm max-w-md mx-auto font-medium">
            შეარჩიეთ საცეკვაო და სავარჯიშო სამოსი, რომელიც შექმნილია სპეციალურად კომფორტული მოძრაობისთვის.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group relative h-80 overflow-hidden rounded border border-border-color bg-card-bg transition-transform duration-300 transform hover:-translate-y-1 shadow-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1 bg-white/90 backdrop-blur-xs border-t border-zinc-100">
                <h3 className="text-base font-bold text-zinc-950 tracking-wider group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-600 line-clamp-2">{cat.desc}</p>
                <div className="pt-1 flex items-center text-xs font-bold text-gold space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>დაათვალიერე</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 border-t border-border-color bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-wider text-zinc-950">
                ახალი <span className="text-gold">კოლექცია</span>
              </h2>
              <div className="w-16 h-[2px] bg-gold" />
            </div>
            <Link
              href="/products/all"
              className="hidden sm:flex items-center text-sm font-bold text-gold hover:text-gold-light space-x-1"
            >
              <span>სრული კატალოგი</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => {
              const inWishlist = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded border border-border-color bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
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
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                    
                    {product.sale_price && (
                      <span className="absolute top-4 left-4 bg-red-650 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        ფასდაკლება
                      </span>
                    )}
                  </Link>

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-zinc-200 text-zinc-650 hover:text-gold transition-colors duration-200 shadow-sm"
                  >
                    <Heart
                      className={`h-4 w-4 ${inWishlist ? 'fill-gold text-gold' : 'text-zinc-500'}`}
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
        </div>
      </section>

      {/* Footwear & Sizing Promo */}
      <section className="py-20 bg-white border-t border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide leading-tight text-zinc-950">
              იდეალური ზომა <br />
              <span className="gold-text-gradient">საუკეთესო შედეგისთვის</span>
            </h2>
            <p className="text-zinc-650 text-sm leading-relaxed">
              ცეკვის დროს სანტიმეტრის მეასედიც კი განსაზღვრავს თქვენს ბალანსს და კონტროლს. ჩვენი ინტერაქტიული ზომების ცხრილი უზრუნველყოფს, რომ თქვენი სამოსი თუ ფეხსაცმელი იდეალურად მოგერგოთ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-gold/10 text-gold rounded border border-gold/20">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm uppercase">ინტერაქტიული ცხრილი</h4>
                  <p className="text-xs text-zinc-500 mt-1">ზუსტი მითითებები ტანისა და ტერფის სწორად გასაზომად.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-gold/10 text-gold rounded border border-gold/20">
                  <ArrowLeftRight className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm uppercase">მარტივი ზომის შეცვლა</h4>
                  <p className="text-xs text-zinc-500 mt-1">უფასო გადაცვლა თბილისის მასშტაბით იდეალური მორგების მისაღწევად.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded overflow-hidden h-96 border border-border-color shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
              alt="Premium footwear fitting"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-zinc-50 border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. ყველა უფლება დაცულია.</p>
        <p className="mt-2 text-gold font-bold">შექმნილია პროფესიონალი მოცეკვავეებისთვის.</p>
      </footer>
    </div>
  );
}
