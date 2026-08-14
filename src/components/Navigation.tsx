'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, ShieldAlert, Menu, X } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'რჩეულები', href: '/dashboard?tab=wishlist', icon: Heart },
    { name: 'ადმინი', href: '/admin/categories', icon: ShieldAlert },
    { name: 'პროფილი', href: '/auth', icon: User },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 border-b border-border-color bg-white/90 backdrop-blur-md text-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="DanceShop Georgia" className="h-10 w-auto rounded border border-gold/30" />
            <span className="text-sm font-bold tracking-widest text-foreground hidden sm:block">
              DANCE<span className="text-gold">SHOP</span>
              <span className="block text-[8px] tracking-[0.25em] text-zinc-500">GEORGIA</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard?tab=wishlist"
              className="text-foreground hover:text-gold transition-colors duration-200"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/auth"
              className="text-foreground hover:text-gold transition-colors duration-200"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/admin/categories"
              className="text-foreground hover:text-gold transition-colors duration-200"
              title="ადმინისტრატორი"
            >
              <ShieldAlert className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground hover:text-gold transition-colors duration-200"
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
                className="block text-base font-semibold hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Enhancing PWA app-like feel) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border-color bg-white/95 px-4 py-2 backdrop-blur-md shadow-2xl">
        <nav className="flex justify-around items-center">
          {mobileBottomNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${
                  isActive ? 'text-gold font-bold' : 'text-zinc-500 hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
