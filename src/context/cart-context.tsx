"use client";

import { Product } from "@/types/product";
import { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface ICartContext {
  items: CartItem[];
  addToCart: (product: Product) => void;
  cartQuantity: number;
}

export const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const cartQuantity = items.length;

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const productInCart = currentItems.find((item) => item.id === product.id);

      if (productInCart) {
        return currentItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ items, addToCart, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
