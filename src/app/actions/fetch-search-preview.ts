"use server";

import { Product } from "@/types/product";

// Simulated Backend/Database search logic
export async function fetchSearchPreview(query: string): Promise<Product[]> {
  try {
    // Em um contexto real, isso seria uma query ao banco (ex: ILIKE %query% LIMIT 3)
    // ou uma requisição a um serviço de busca dedicado (ElasticSearch/Algolia)
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 } // Catalog is cached in the server
    });

    if (!res.ok) {
      throw new Error("Falha ao consultar catálogo de produtos");
    }

    const allProducts: Product[] = await res.json();
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
