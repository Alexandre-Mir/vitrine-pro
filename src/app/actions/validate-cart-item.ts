"use server";

import { Product } from "@/types/product";

export async function validateCartItem(clientProduct: Product) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${clientProduct.id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return { success: false, error: "Falha ao consultar estoque." };
    }

    const freshProduct: Product = await res.json();
    return {
      success: true,
      data: {
        isValid: freshProduct.price === clientProduct.price,
        freshProduct,
      },
    };
  } catch {
    return { success: false, error: "Erro de conexão. Tente novamente." };
  }
}
