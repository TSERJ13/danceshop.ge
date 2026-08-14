'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Star, ArrowRight, Heart, Sparkles, ShoppingBag, ShieldCheck, Truck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const categories = [
    {
      name: 'ქალის კოლექცია',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      desc: 'ლათინური & სამეჯლისო კაბები',
      badge: 'ახალი',
    },
    {
      name: 'კაცის კოლექცია',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      desc: 'შარვლები, მაისურები & ჟილეტები',
      badge: 'პოპულარული',
    },
    {
      name: 'საცეკვაო ფეხსაცმელი',
      slug: 'shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
      desc: 'ლათინო & სტანდარტის მოდელები',
      badge: 'ტოპ ხარისხი',
    },
    {
      name: 'სავარჯიშო სამოსი',
      slug: 'dancewear',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop',
      desc: 'იუბკები, ტოპები & აქსესუარები',
      badge: 'კომფორტი',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
      <Navigation />

      {/* Modern Split Hero Banner Section */}
      <section className="relative bg-gradient-to-b from-amber-50/40 via-white to-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold-dark text-xs font-bold shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>ახალი სეზონი 2026 • DanceShop Georgia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
              შენი საცეკვაო სტილი, <br className="hidden sm:inline" />
              <span className="gold-text-gradient">უნაკლო ხარისხით</span>
            </h1>

            <p className="text-zinc-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              სამეჯლისო და ლათინური საცეკვაო ტანსაცმლისა და ფეხსაცმლის პრემიუმ კოლექცია საქართველოში. შექმნილია მოძრაობის თავისუფლებისა და სცენური ბრწყინვალებისთვის.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products/all"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-dark to-gold text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:brightness-110 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>კოლექციის დათვალიერება</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products/shoes"
                className="w-full sm:w-auto px-8 py-4 border border-zinc-200 bg-white text-zinc-800 font-bold text-sm tracking-wider uppercase rounded-xl hover:border-gold hover:text-gold-dark transition-all duration-200 flex items-center justify-center"
              >
                ფეხსაცმლის შერჩევა
              </Link>
            </div>

            {/* Value Props Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-100 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>100% ორიგინალი</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>სწრაფი მიწოდება</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>ზომის გარანტია</span>
              </div>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop"
                alt="DanceShop Georgia Modern Dancewear"
                className="w-full h-[450px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-zinc-100 flex items-center space-x-3 max-w-xs">
                <div className="p-2.5 bg-gold/10 text-gold-dark rounded-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-zinc-900">პროფესიონალური ხარისხი</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">WDSF & GDSF სტანდარტების შესაბამისი მოდელები.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              რჩეული <span className="gold-text-gradient">კატეგორიები</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-1 font-medium">
              შეარჩიეთ პროფესიონალური საცეკვაო და სავარჯიშო კოლექციები
            </p>
          </div>
          <Link
            href="/products/all"
            className="text-xs font-bold text-gold-dark hover:text-gold flex items-center space-x-1 group"
          >
            <span>ყველა კატეგორია</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group relative h-84 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-end"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent" />
              
              {/* Badge */}
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {cat.badge}
              </span>

              <div className="relative z-10 p-6 space-y-1 text-white">
                <h3 className="text-lg font-extrabold tracking-wide group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 font-medium line-clamp-1">{cat.desc}</p>
                
                <div className="pt-2 flex items-center text-xs font-bold text-gold space-x-1">
                  <span>დაათვალიერე</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Section with Live Add to Cart & Wishlist Triggers */}
      <section className="py-16 border-t border-zinc-100 bg-zinc-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-1">
                ახალი პროდუქცია
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                პოპულარული <span className="text-gold">მოდელები</span>
              </h2>
            </div>
            <Link
              href="/products/all"
              className="hidden sm:flex items-center text-xs font-bold text-zinc-700 hover:text-gold-dark space-x-1"
            >
              <span>სრული სია</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => {
              const isSaved = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
                >
                  {/* Image container */}
                  <Link href={`/product/${product.id}`} className="relative h-96 overflow-hidden block">
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

                  {/* Wishlist Button Trigger */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-red-500 transition-colors shadow-md border border-zinc-100"
                    title="რჩეულებში შენახვა"
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1 font-semibold">
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

                      {/* Working Add to Cart Button */}
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
        </div>
      </section>

      {/* Friendly Service Features Section */}
      <section className="py-16 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-amber-50/50 border border-amber-100/60">
              <div className="p-3 bg-gold/10 text-gold-dark rounded-xl">
                <Truck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-zinc-900">სწრაფი მიწოდება საქართველოში</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  თბილისში მიწოდება ხორციელდება იმავე ან მომდევნო დღეს. რეგიონებში 1-2 სამუშაო დღეში.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-amber-50/50 border border-amber-100/60">
              <div className="p-3 bg-gold/10 text-gold-dark rounded-xl">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-zinc-900">ზომის უფასო გადაცვლა</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  თუ ზომა არ მოგერგოთ, მარტივად და უფასოდ შეგიცვლით სასურველ ზომაზე.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-amber-50/50 border border-amber-100/60">
              <div className="p-3 bg-gold/10 text-gold-dark rounded-xl">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-zinc-900">100% ორიგინალი პროდუქცია</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  მხოლოდ სერტიფიცირებული ბრენდების (Ray Rose, Supadance, TDR) ოფიციალური პროდუქტები.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-zinc-900 text-white py-12 px-4 text-center text-xs pb-20 md:pb-12 space-y-3">
        <div className="flex justify-center items-center space-x-3">
          <img src="/logo.png" alt="" className="h-8 w-auto rounded" />
          <span className="font-extrabold tracking-widest">DANCE<span className="text-gold">SHOP</span> GEORGIA</span>
        </div>
        <p className="text-zinc-400">&copy; {new Date().getFullYear()} DanceShop Georgia. ყველა უფლება დაცულია.</p>
      </footer>
    </div>
  );
}
