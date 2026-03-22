import { Product } from "@/types/product";

export default async function getProducts(limit?: number): Promise<Product[]> {
  const url = limit
    ? `https://fakestoreapi.com/products?limit=${limit}`
    : "https://fakestoreapi.com/products";

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Falha ao buscar produtos: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro de rede ao buscar produtos:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Falha ao buscar produto");
  }

  return res.json();
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Falha ao buscar categorias: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro de rede ao buscar categorias:", error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  const allProducts = await getProducts();
  const lowerQuery = query.toLowerCase();

  // Simulating API Latency for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery),
  );
}
