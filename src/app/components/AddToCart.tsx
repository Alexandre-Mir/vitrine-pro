"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import Button from "./ui/Button";
import { validateCartItem } from "../actions/validate-cart-item";
import { useState } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

interface AddToCartProps {
  product: Product;
  variant?: "primary" | "icon";
}

export function AddToCart({ product, variant = "primary" }: AddToCartProps) {
  const { addToCart } = useCart();
  const [isValidating, setIsValidating] = useState(false);

  async function handleAddToCart() {
    // ... lógica existente ...
    setIsValidating(true);
    try {
      const result = await validateCartItem(product);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      const { isValid, freshProduct } = result.data!;

      if (!isValid) {
        toast.info(
          "O preço mudou! O carrinho foi atualizado com o novo valor.",
        );
      }
      addToCart(freshProduct);
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
        disabled={isValidating}
        aria-label="Adicionar ao carrinho"
        className="group/btn cursor-pointer flex items-center gap-0 bg-accent hover:bg-yellow-400 text-background rounded-full shadow-sm p-2.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isValidating ? (
          <div className="w-[18px] h-[18px] border-2 border-background border-t-transparent rounded-full animate-spin" />
        ) : (
          <ShoppingBag size={18} className="shrink-0" />
        )}
        {/* Grid 0fr → 1fr: anima para o tamanho real do conteúdo sem valor mágico */}
        <div className="grid grid-cols-[0fr] group-hover/btn:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-out">
          <div className="overflow-hidden min-w-0">
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider pl-2 pr-0.5">
              Adicionar
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <Button onClick={handleAddToCart} disabled={isValidating}>
      {isValidating ? "Verificando..." : "Adicionar ao carrinho"}
    </Button>
  );
}
