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

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar produto");
  }

  return res.json();
}
