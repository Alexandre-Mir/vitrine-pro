"use server";

import { Product } from "@/types/product";

export async function validateCartItems(clientItems: Product[]) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, error: "Falha ao consultar catálogo do servidor." };
    }

    const allProducts: Product[] = await res.json();

    const serverProductsMap = new Map(allProducts.map((p) => [p.id, p]));

    const validationResults = clientItems.map((clientItem) => {
      const freshProduct = serverProductsMap.get(clientItem.id);

      if (!freshProduct) {
        return {
          id: clientItem.id,
          isValid: false,
          error: "Produto não existe mais",
          freshProduct: null
        };
      }

      return {
        id: clientItem.id,
        isValid: freshProduct.price === clientItem.price,
        freshProduct,
      };
    });

    return {
      success: true,
      data: validationResults,
    };
  } catch {
    return { success: false, error: "Erro de conexão ao validar itens. Tente novamente." };
  }
}
