import { Product } from "@/types/product";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  return res.json();
}

export default getProducts;
