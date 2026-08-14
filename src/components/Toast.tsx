'use client';

import { useCart } from '@/context/CartContext';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center space-x-2 px-4 py-3 bg-zinc-900 text-white rounded-lg shadow-xl border border-gold/40 text-xs font-bold">
        <Sparkles className="h-4 w-4 text-gold animate-spin" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
