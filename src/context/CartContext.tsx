// src/context/CartContext.tsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { NFT } from '../features/catalog/types';

interface CartContextType {
  items: NFT[];
  addToCart: (nft: NFT) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NFT[]>([]);

  const addToCart = (nft: NFT) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === nft.id)) return prev;
      return [...prev, nft];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart tem de ser usado dentro de um CartProvider');
  }
  return context;
}