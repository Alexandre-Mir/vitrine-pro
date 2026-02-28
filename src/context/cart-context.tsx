"use client";

import { Product } from "@/types/product";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface ICartContext {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  updateItemPrice: (productId: number, newPrice: number) => void;
  clearCart: () => void;
  cartQuantity: number;
}

export const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 1. Mounted Check: Só acessamos window/localStorage após a montagem no cliente.
  // Isso evita que o HTML do servidor (vazio) difira do HTML inicial do cliente.
  useEffect(() => {
    const storedCart = localStorage.getItem("vitrine-pro-cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []); // Executa apenas uma vez na montagem

  // 2. Persistência Automática: Qualquer mudança no items salva no storage
  useEffect(() => {
    // Evita sobrescrever o storage com array vazio durante a hidratação inicial
    // Se quiser permitir limpar o carrinho, a lógica deve ser refinada, mas para refresh serve.
    // Uma melhor abordagem é usar um ref 'isInitialized' se precisarmos diferenciar [] inicial de [] limpo.
    // Neste caso simples, assumimos que se items mudou (e já montou), salvamos.
    if (items.length > 0 || localStorage.getItem("vitrine-pro-cart")) {
      localStorage.setItem("vitrine-pro-cart", JSON.stringify(items));
    }
  }, [items]);

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

  function removeFromCart(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function decreaseQuantity(productId: number) {
    setItems((currentItems) => {
      const itemToDecrease = currentItems.find((item) => item.id === productId);

      if (itemToDecrease?.quantity === 1) {
        return currentItems.filter((item) => item.id !== productId);
      }

      return currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  }

  function updateItemPrice(productId: number, newPrice: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, price: newPrice } : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
    localStorage.removeItem("vitrine-pro-cart");
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        updateItemPrice,
        clearCart,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
