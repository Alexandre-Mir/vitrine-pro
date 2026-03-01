import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import getProducts from "@/services/product";
import ProductCard from "@/app/components/ProductCard";

const categoryTranslations: Record<string, string> = {
  "men's clothing": "Moda Masculina",
  "women's clothing": "Moda Feminina",
  electronics: "Eletrônicos",
  jewelery: "Joias",
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const categoryName = categoryTranslations[decodedSlug] || decodedSlug;

  return {
    title: `${categoryName} | Vitrine Pro`,
    description: `Confira todos os produtos de ${categoryName} na Vitrine Pro. Os melhores preços e maior qualidade.`,
    openGraph: {
      title: `${categoryName} | Vitrine Pro`,
      description: `Confira todos os produtos de ${categoryName} na Vitrine Pro.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.category === decodedSlug);

  if (products.length === 0) {
    notFound();
  }

  const categoryName = categoryTranslations[decodedSlug] || decodedSlug;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        <nav
          className="flex items-center gap-2 text-sm text-subtitle"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home size={14} />
            Início
          </Link>
          <ChevronRight size={14} className="opacity-40" />
          <Link
            href="/categorias"
            className="hover:text-primary transition-colors"
          >
            Categorias
          </Link>
          <ChevronRight size={14} className="opacity-40" />
          <span className="text-primary font-medium">{categoryName}</span>
        </nav>
      </div>

      {/* Header da Categoria */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary tracking-tight">
              {categoryName}
            </h1>
            <p className="mt-2 text-subtitle">
              {products.length}{" "}
              {products.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Produtos */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
