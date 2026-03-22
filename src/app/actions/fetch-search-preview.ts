"use server";

import { Product } from "@/types/product";
import getProducts from "@/services/product";

// Simulated Backend/Database search logic
export async function fetchSearchPreview(query: string): Promise<Product[]> {
  try {
    const allProducts = await getProducts();
    
    if (!allProducts || allProducts.length === 0) {
      throw new Error("Falha ao consultar catálogo de produtos");
    }

    const lowerQuery = query.toLowerCase();

    // Filtro sendo executado NO SERVIDOR
    const filtered = allProducts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 3);

    return filtered;
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return [];
  }
}
