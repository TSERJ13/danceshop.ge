'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Lock, Mail, MessageSquare } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const isAdmin = email === 'danceshopge@gmail.com' || email.includes('admin');
      localStorage.setItem('ds_user', JSON.stringify({
        email,
        role: isAdmin ? 'admin' : 'customer',
        name: email.split('@')[0],
      }));
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const handleTelegramMockAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('ds_user', JSON.stringify({
        email: 'telegram_user@danceshop.ge',
        role: 'customer',
        name: 'Giga_Dancesport',
        telegram_id: '123456789',
        telegram_username: 'Giga_Dancesport',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
      }));
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-zinc-900">
      <Navigation />

      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md rounded border border-border-color bg-zinc-50 p-8 space-y-8 shadow-md relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-gold-dark uppercase">
              Danceshop Club
            </span>
            <h2 className="text-2xl font-bold tracking-wider text-zinc-950">
              {isRegistering ? 'ახალი ანგარიში' : 'ავტორიზაცია'}
            </h2>
            <p className="text-zinc-500 text-xs">
              სისტემაში შესვლა პროფესიონალი მოცეკვავეებისთვის
            </p>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">იმეილი</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-border-color rounded text-sm text-zinc-900 placeholder-zinc-350 focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">პაროლი</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-border-color rounded text-sm text-zinc-900 placeholder-zinc-350 focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-gold-dark to-gold text-white font-bold uppercase text-xs tracking-widest rounded transition-all duration-200 hover:brightness-110 disabled:opacity-50"
            >
              {isLoading ? 'იტვირთება...' : isRegistering ? 'რეგისტრაცია' : 'შესვლა'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border-color"></div>
            <span className="flex-shrink mx-4 text-zinc-400 text-xs uppercase tracking-wider">ან</span>
            <div className="flex-grow border-t border-border-color"></div>
          </div>

          {/* Telegram Login integration widget/simulator */}
          <div className="space-y-3">
            <button
              onClick={handleTelegramMockAuth}
              className="w-full py-3 border border-sky-500/30 hover:border-sky-500 bg-sky-50 text-sky-650 font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4 fill-sky-500 text-sky-500" />
              <span>Telegram-ით შესვლა</span>
            </button>
          </div>

          {/* Mode Switch */}
          <div className="text-center pt-2">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-gold-dark hover:text-gold transition-colors duration-200 font-bold"
            >
              {isRegistering ? 'უკვე გაქვთ ანგარიში? შედით' : 'არ გაქვთ ანგარიში? დარეგისტრირდით'}
            </button>
          </div>

        </div>
      </main>

      <footer className="bg-zinc-50 border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. ყველა უფლება დაცულია.</p>
      </footer>
    </div>
  );
}
