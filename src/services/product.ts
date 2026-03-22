import { Product } from "@/types/product";
import productsData from "@/utils/products.json";
import categoriesData from "@/utils/categories.json";

export default async function getProducts(limit?: number): Promise<Product[]> {
  const products = productsData as Product[];
  if (limit) {
    return products.slice(0, limit);
  }
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = productsData as Product[];
  const product = products.find((p) => p.id.toString() === id);
  
  if (!product) {
    return null;
  }

  return product;
}

export async function getCategories(): Promise<string[]> {
  return categoriesData as string[];
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
