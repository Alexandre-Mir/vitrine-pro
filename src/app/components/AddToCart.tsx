"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import Button from "./ui/Button";
import { validateCartItem } from "../actions/validate-cart-item";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useCart();

  async function handleAddToCart() {
    const { isValid, freshProduct } = await validateCartItem(product);

    if (!isValid) {
      alert("O preço mudou! O carrinho foi atualizado com o novo valor.");
    }
    addToCart(freshProduct);
  }

  return <Button onClick={handleAddToCart}>Adicionar ao carrinho</Button>;
}
