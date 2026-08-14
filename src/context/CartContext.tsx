'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/mockData';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  selectedHeel?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, color?: string, heel?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-hide toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, size?: string, color?: string, heel?: string) => {
    const finalSize = size || product.variants[0]?.size || 'M';
    const finalColor = color || product.variants[0]?.color || 'Black';
    const finalHeel = heel || product.variants[0]?.heel_height;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === finalSize &&
          item.selectedColor === finalColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: finalSize,
            selectedColor: finalColor,
            selectedHeel: finalHeel,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`"${product.name}" დაემატა კალათაში ✨`);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showToast('ამოღებულია რჩეულებიდან');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('დაემატა რჩეულებში ❤️');
        return [...prev, productId];
      }
    });
  };

  const totalAmount = cart.reduce((sum, item) => {
    const price = item.product.sale_price || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        toastMessage,
        showToast,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
