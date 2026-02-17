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
      <Button
        onClick={handleAddToCart}
        disabled={isValidating}
        variant="icon"
        size="icon"
        aria-label="Adicionar ao carrinho"
      >
        {isValidating ? (
          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
        ) : (
          <ShoppingBag size={18} />
        )}
      </Button>
    );
  }

  return (
    <Button onClick={handleAddToCart} disabled={isValidating}>
      {isValidating ? "Verificando..." : "Adicionar ao carrinho"}
    </Button>
  );
}
