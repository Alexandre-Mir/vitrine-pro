import { Product } from "@/types/product";

export default async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  return res.json();
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
  const res = await fetch("https://fakestoreapi.com/products/categories", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar produto");
  }

  return res.json();
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
