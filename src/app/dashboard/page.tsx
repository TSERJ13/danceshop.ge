'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { mockProducts } from '@/data/mockData';
import { Heart, User, LogOut, Trash2, Package } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'orders'>('profile');
  
  // Shipping details state
  const [street, setStreet] = useState('რუსთაველის გამზირი 12');
  const [city, setCity] = useState('თბილისი');
  const [phone, setPhone] = useState('+995 599 000 000');
  const [saved, setSaved] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);

  useEffect(() => {
    const cachedUser = localStorage.getItem('ds_user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    } else {
      const defaultUser = {
        email: 'dancer@danceshop.ge',
        role: 'customer',
        name: 'მარიამ ლათინო',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
      };
      setUser(defaultUser);
      localStorage.setItem('ds_user', JSON.stringify(defaultUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ds_user');
    router.push('/auth');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  // Get matching products for the wishlist
  const wishlistProducts = mockProducts.filter((p) => wishlist.includes(p.id));

  if (!user) return null;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        
        {/* Welcome Banner */}
        <div className="rounded border border-border-color bg-zinc-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full border border-gold/30 bg-white overflow-hidden flex items-center justify-center">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-gold" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-zinc-950">{user.name}</h1>
              <p className="text-xs text-zinc-500 capitalize">{user.role === 'admin' ? 'ადმინისტრატორი' : 'მომხმარებელი'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-zinc-200 text-xs uppercase tracking-widest text-zinc-500 hover:text-red-500 hover:border-red-500/30 rounded flex items-center space-x-2 transition-all duration-200 bg-white shadow-2xs"
          >
            <LogOut className="h-4 w-4" />
            <span>გასვლა</span>
          </button>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto pb-4 md:pb-0">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-4 py-3 rounded text-xs uppercase tracking-wider font-bold transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-gold text-white shadow-xs'
                  : 'border border-zinc-200 hover:bg-zinc-50 text-zinc-650 bg-white'
              }`}
            >
              <User className="h-4 w-4" />
              <span>მისამართი</span>
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center space-x-2 px-4 py-3 rounded text-xs uppercase tracking-wider font-bold transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'wishlist'
                  ? 'bg-gold text-white shadow-xs'
                  : 'border border-zinc-200 hover:bg-zinc-50 text-zinc-650 bg-white'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>რჩეულები ({wishlist.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 px-4 py-3 rounded text-xs uppercase tracking-wider font-bold transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-gold text-white shadow-xs'
                  : 'border border-zinc-200 hover:bg-zinc-50 text-zinc-650 bg-white'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>შეკვეთები</span>
            </button>
          </nav>

          {/* Details Content Box */}
          <div className="md:col-span-3 rounded border border-border-color bg-white p-6 min-h-[400px] shadow-xs">
            
            {/* Tab: Profile & Shipping */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-wide border-b border-border-color pb-3 text-gold-dark">
                  მიწოდების მისამართი
                </h3>
                <form onSubmit={handleSaveAddress} className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        ტელეფონი
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-border-color rounded text-xs text-zinc-900 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        ქალაქი
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-border-color rounded text-xs text-zinc-900 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      ქუჩა / კორპუსი / ბინა
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-border-color rounded text-xs text-zinc-900 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-gold-dark to-gold text-white text-xs font-bold uppercase tracking-widest rounded transition-colors duration-200 hover:brightness-110"
                  >
                    {saved ? 'შენახულია ✓' : 'მისამართის შენახვა'}
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-wide border-b border-border-color pb-3 text-gold-dark">
                  ჩემი რჩეულები
                </h3>
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-10 w-10 text-zinc-300 mx-auto mb-2" />
                    <p className="text-zinc-500 text-sm">რჩეულების სია ცარიელია</p>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-200">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                          <img src={p.images[0]} alt="" className="h-16 w-16 object-cover rounded border border-border-color shadow-3xs" />
                          <div>
                            <h4 className="font-bold text-sm text-zinc-900 hover:text-gold transition-colors duration-200">
                              <Link href={`/product/${p.id}`}>{p.name}</Link>
                            </h4>
                            <span className="text-xs text-gold-dark font-extrabold">${p.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(p.id)}
                          className="p-2 border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-500/20 rounded transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-wide border-b border-border-color pb-3 text-gold-dark">
                  შეკვეთების ისტორია
                </h3>
                <div className="rounded border border-border-color bg-zinc-50 p-4 flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-450 tracking-wider">შეკვეთა #DS-9901</span>
                    <p className="text-xs font-bold text-zinc-800 mt-1">Fiery Latin Rhythm Dress & Sizing Shoe Set</p>
                    <span className="text-[10px] text-zinc-450">შესრულდა: 12 აგვისტო, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gold-dark">$579.99</span>
                    <span className="block text-[10px] text-green-600 uppercase font-bold mt-1">მიწოდებულია</span>
                  </div>
                </div>
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
