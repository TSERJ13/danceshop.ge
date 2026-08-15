'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, Search, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/data/mockData';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { setIsCartOpen, totalItems, wishlist } = useCart();

  const navLinks = [
    { name: 'ქალები', href: '/products/women' },
    { name: 'კაცები', href: '/products/men' },
    { name: 'ბავშვები', href: '/products/kids' },
    { name: 'ფეხსაცმელი', href: '/products/shoes' },
    { name: 'ტანსაცმელი', href: '/products/dancewear' },
  ];

  const mobileBottomNav = [
    { name: 'მთავარი', href: '/', icon: Home },
    { name: 'კატალოგი', href: '/products/all', icon: ShoppingBag },
    { name: 'რჩეულები', href: '/dashboard?tab=wishlist', icon: Heart, badge: wishlist.length },
    { name: 'პროფილი', href: '/auth', icon: User },
  ];

  const searchResults = searchQuery.trim()
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 border-b border-border-color bg-white/95 backdrop-blur-md text-foreground shadow-2xs">
        {/* Top Announcement Bar */}
        <div className="bg-zinc-900 text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-center items-center space-x-2">
          <span className="bg-gold text-white px-2 py-0.5 rounded text-[9px] font-extrabold uppercase">უფასო მიწოდება</span>
          <span>სწრაფი მიწოდება მთელი საქართველოს მასშტაბით! 🚚</span>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="DanceShop Georgia" className="h-10 w-auto rounded border border-gold/30 group-hover:scale-105 transition-transform" />
            <div className="hidden sm:block">
              <span className="text-base font-extrabold tracking-wider text-zinc-900 block leading-tight">
                DANCE<span className="text-gold-dark">SHOP</span>
              </span>
              <span className="text-[8px] tracking-[0.25em] text-zinc-500 font-bold uppercase block">GEORGIA</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 text-sm font-bold tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-gold-dark transition-colors duration-200 py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-zinc-700 hover:text-gold-dark transition-colors p-1"
              title="ძებნა"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/dashboard?tab=wishlist"
              className="text-zinc-700 hover:text-gold-dark transition-colors p-1 relative"
              title="რჩეულები"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 h-4 w-4 rounded-full bg-gold text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-zinc-700 hover:text-gold-dark transition-colors p-1 relative"
              title="კალათა"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1.5 h-4.5 w-4.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account */}
            <Link
              href="/auth"
              className="text-zinc-700 hover:text-gold-dark transition-colors p-1"
              title="პროფილი"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-800 hover:text-gold-dark transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-color bg-white px-4 py-4 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-zinc-900 hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Instant Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs p-4 flex items-start justify-center pt-20 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-200">
            <div className="p-4 border-b border-zinc-100 flex items-center space-x-3 bg-zinc-50">
              <Search className="h-5 w-5 text-gold-dark" />
              <input
                type="text"
                autoFocus
                placeholder="ძებნა: ფეხსაცმელი, კაბები, Ray Rose..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-zinc-900 focus:outline-none placeholder-zinc-400 font-medium"
              />
              <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-zinc-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {!searchQuery.trim() ? (
                <div className="text-center py-8 text-xs text-zinc-400">
                  ჩაწერეთ პროდუქტის დასახელება ან ბრენდი მოსაძებნად
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500">
                  შედეგი ვერ მოიძებნა "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center space-x-4 p-2 rounded hover:bg-zinc-50 transition-colors"
                    >
                      <img src={product.images[0]} alt="" className="h-12 w-12 object-cover rounded border border-zinc-200" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{product.name}</h4>
                        <span className="text-[10px] text-zinc-500 uppercase">{product.brand}</span>
                      </div>
                      <span className="text-xs font-extrabold text-gold-dark">${product.price.toFixed(2)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-border-color bg-white/95 px-4 pt-3 pwa-bottom-bar backdrop-blur-md shadow-2xl">
        <nav className="flex justify-around items-center">
          {mobileBottomNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1 transition-colors relative ${
                  isActive ? 'text-gold-dark font-bold' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 h-3.5 w-3.5 rounded-full bg-gold text-white text-[8px] font-extrabold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-wide">{item.name}</span>
              </Link>
            );
          })}

          {/* Cart Icon in Mobile Bottom Nav */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center space-y-1 text-zinc-500 hover:text-zinc-900 relative"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-red-600 text-white text-[9px] font-extrabold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wide">კალათა</span>
          </button>
        </nav>
      </div>
    </>
  );
}
