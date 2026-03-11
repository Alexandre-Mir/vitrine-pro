"use server";

import { Product } from "@/types/product";

export async function validateCartItems(clientItems: Product[]) {
  try {
    // Em um cenário real com banco próprio, faríamos um SELECT price FROM products WHERE id IN (...)
    // Como a FakeStoreAPI não suporta filtro por array de IDs, 
    // buscamos tudo (ou faríamos os fetches no servidor, mas 1 viajem do client pro backend!)
    const res = await fetch(`https://fakestoreapi.com/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, error: "Falha ao consultar catálogo do servidor." };
    }

    const allProducts: Product[] = await res.json();
    
    // Criamos um dicionário O(1) para rápida checagem
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
