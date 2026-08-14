'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { FolderTree, Sparkles, Ruler, PackageOpen } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Products Catalog', href: '/admin/products', icon: PackageOpen },
    { name: 'Size Guides Builder', href: '/admin/size-charts', icon: Ruler },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8 pb-24">
        {/* Title */}
        <div className="border-b border-border-color pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-gold">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Admin Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
              DANCESHOP MANAGER
            </h1>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <aside className="w-full md:w-64 space-y-1.5 flex-shrink-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded text-xs uppercase tracking-widest font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'bg-gold text-black'
                      : 'border border-zinc-900 bg-zinc-950 text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </aside>

          {/* Tab Workspaces */}
          <div className="flex-grow w-full rounded border border-border-color bg-zinc-950 p-6 min-h-[500px]">
            {children}
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. All rights reserved.</p>
      </footer>
    </div>
  );
}
