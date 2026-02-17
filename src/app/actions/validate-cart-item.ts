"use server";

import { Product } from "@/types/product";

export async function validateCartItem(clientProduct: Product) {
  const res = await fetch(
    `https://fakestoreapi.com/products/${clientProduct.id}`,
    {
      cache: "no-store",
    },
  );

  const freshProduct: Product = await res.json();

  return { isValid: freshProduct.price === clientProduct.price, freshProduct };
}
