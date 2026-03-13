"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import Button from "./ui/Button";
import { validateCartItems } from "../actions/validate-cart-items";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag, Plus, Check } from "lucide-react";

interface AddToCartProps {
  product: Product;
  variant?: "primary" | "icon";
}

export function AddToCart({ product, variant = "primary" }: AddToCartProps) {
  const { addToCart } = useCart();
  const [isValidating, setIsValidating] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const timeout = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAdded]);

  async function handleAddToCart() {
    setIsValidating(true);
    try {
      const result = await validateCartItems([product]);

      if (!result.success || !result.data) {
        toast.error(result.error || "Falha ao validar.");
        return;
      }

      const { isValid, freshProduct } = result.data[0];

      if (!isValid && freshProduct) {
        toast.info(
          "O preço mudou! O carrinho foi atualizado com o novo valor.",
        );
        addToCart(freshProduct);
      } else if (isValid && freshProduct) {
        addToCart(freshProduct);
      } else {
        toast.error("Produto indisponível.");
        return;
      }
      
      setIsAdded(true);
      toast.success("Produto adicionado ao carrinho!");
    } catch {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsValidating(false);
    }
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isValidating || isAdded}
        aria-label="Adicionar ao carrinho"
        className={`group/btn cursor-pointer flex items-center justify-center rounded-full shadow-sm h-12 w-12 transition-all duration-500 active:scale-90 disabled:cursor-not-allowed overflow-hidden
          ${isAdded ? "bg-green-500 text-white shadow-green-200" : "bg-accent hover:bg-yellow-400 text-primary"}
        `}
      >
        {isValidating ? (
          <div className="w-[20px] h-[20px] border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Bag Icon: Visible by default, hidden on hover or when added */}
            <ShoppingBag 
              size={22} 
              className={`absolute transition-all duration-300 ease-out 
                ${isAdded ? "opacity-0 scale-50 -translate-y-4" : "opacity-100 scale-100 group-hover/btn:opacity-0 group-hover/btn:scale-50 group-hover/btn:rotate-12"}
              `}
            />
            {/* Plus Icon: Visible only on hover, hidden when added */}
            <Plus 
              size={24} 
              className={`absolute transition-all duration-300 ease-out
                ${isAdded ? "opacity-0 scale-50 -translate-y-4" : "opacity-0 scale-50 -rotate-12 group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:rotate-0"}
              `}
            />
            {/* Check Icon: Visible only when added */}
            <Check 
              size={26} 
              strokeWidth={3.5} 
              className={`absolute transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                ${isAdded ? "opacity-100 scale-100 rotate-0 translate-y-0" : "opacity-0 scale-50 rotate-12 translate-y-4"}
              `}
            />
          </div>
        )}
      </button>
    );
  }

  return (
    <Button onClick={handleAddToCart} disabled={isValidating}>
      {isValidating ? "Verificando..." : "Adicionar ao carrinho"}
    </Button>
  );
}
