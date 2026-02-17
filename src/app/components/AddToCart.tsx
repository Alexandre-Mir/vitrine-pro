"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import Button from "./ui/Button";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(product)}>Adicionar ao carrinho</Button>
  );
}
