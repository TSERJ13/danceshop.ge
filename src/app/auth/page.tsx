'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Send, Lock, Mail, MessageSquare, ShieldCheck, User } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth token saving
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

  // Telegram auth callback simulator
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
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white">
      <Navigation />

      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md rounded border border-gold/30 bg-zinc-950 p-8 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
              Join DanceShop Club
            </span>
            <h2 className="text-2xl font-bold tracking-wider">
              {isRegistering ? 'CREATE AN ACCOUNT' : 'WELCOME BACK'}
            </h2>
            <p className="text-zinc-400 text-xs">
              Secure authentication for professional dancers
            </p>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-border-color rounded text-sm text-white placeholder-zinc-650 focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-border-color rounded text-sm text-white placeholder-zinc-650 focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-gold-dark to-gold text-black font-bold uppercase text-xs tracking-widest rounded transition-all duration-200 hover:from-gold hover:to-gold-light disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border-color"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-wider">or sign in with</span>
            <div className="flex-grow border-t border-border-color"></div>
          </div>

          {/* Telegram Login integration widget/simulator */}
          <div className="space-y-3">
            <button
              onClick={handleTelegramMockAuth}
              className="w-full py-3 border border-sky-500/30 hover:border-sky-500 bg-sky-950/20 text-sky-400 hover:text-sky-300 font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4 fill-sky-400 text-sky-400" />
              <span>Simulate Telegram Login</span>
            </button>
            <p className="text-[10px] text-zinc-500 text-center">
              Telegram Login widget loads natively in production using Telegram OAuth API.
            </p>
          </div>

          {/* Mode Switch */}
          <div className="text-center pt-2">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-gold hover:text-gold-light transition-colors duration-200"
            >
              {isRegistering ? 'Already have an account? Sign In' : "Don't have an account yet? Register"}
            </button>
          </div>

        </div>
      </main>

      <footer className="bg-black border-t border-border-color py-12 px-4 text-center text-xs text-zinc-500 pb-20 md:pb-12">
        <p>&copy; {new Date().getFullYear()} DanceShop Georgia. All rights reserved.</p>
      </footer>
    </div>
  );
}
