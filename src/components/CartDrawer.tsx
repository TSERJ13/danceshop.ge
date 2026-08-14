'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-gold-dark" />
              <h2 className="text-base font-extrabold text-zinc-900">
                საშოპინგო კალათა ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutSuccess ? (
              <div className="text-center py-20 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
                <h3 className="text-xl font-extrabold text-zinc-900">შეკვეთა მიღებულია!</h3>
                <p className="text-sm text-zinc-600">ჩვენი მენეჯერი მალე დაგიკავშირდებათ დეტალების დასაზუსტებლად.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="h-16 w-16 text-zinc-200 mx-auto" />
                <h3 className="text-base font-bold text-zinc-800">კალათა ცარიელია</h3>
                <p className="text-xs text-zinc-500">დაამატეთ სასურველი პროდუქტები კატალოგიდან</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-zinc-900 text-white font-bold text-xs rounded uppercase tracking-wider hover:bg-zinc-800"
                >
                  ყიდვის დაწყება
                </button>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {cart.map((item, idx) => {
                  const price = item.product.sale_price || item.product.price;
                  return (
                    <div key={idx} className="py-4 flex space-x-4 items-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-20 w-20 object-cover rounded border border-zinc-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-zinc-500 space-x-2">
                          <span>ზომა: <strong>{item.selectedSize}</strong></span>
                          <span>|</span>
                          <span>ფერი: <strong>{item.selectedColor}</strong></span>
                        </div>
                        <div className="text-xs font-extrabold text-gold-dark">
                          ${price.toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 pt-1">
                          <div className="flex items-center border border-zinc-200 rounded bg-zinc-50">
                            <button
                              onClick={() => updateQuantity(idx, -1)}
                              className="p-1 text-zinc-600 hover:text-zinc-900"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-zinc-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(idx, 1)}
                              className="p-1 text-zinc-600 hover:text-zinc-900"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(idx)}
                            className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Subtotal */}
          {cart.length > 0 && !checkoutSuccess && (
            <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-zinc-900">
                <span>ჯამური ღირებულება:</span>
                <span className="text-lg font-extrabold text-gold-dark">${totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-zinc-500">მიწოდება უფასოა თბილისის მასშტაბით 150$-ზე მეტ შეკვეთაზე.</p>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-gold-dark to-gold text-white font-bold text-xs uppercase tracking-widest rounded shadow-md hover:brightness-110 flex items-center justify-center space-x-2 transition-all"
              >
                <span>შეკვეთის გაფორმება</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
