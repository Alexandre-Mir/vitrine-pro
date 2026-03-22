"use server";

import { Product } from "@/types/product";
import getProducts from "@/services/product";

export async function validateCartItems(clientItems: Product[]) {
  try {
    const allProducts = await getProducts();

    if (!allProducts || allProducts.length === 0) {
      return { success: false, error: "Falha ao consultar catálogo do servidor." };
    }

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
