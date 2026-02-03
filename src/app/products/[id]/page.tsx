import { getProductById } from "@/services/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return <div> Produto: {product.title}</div>;
}
