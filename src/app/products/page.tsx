import getProducts, { getCategories } from "@/services/product";
import ProductCard from "@/app/components/ProductCard";
import CategoryFilter from "@/app/components/CategoryFilter";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const categoryTranslations: Record<string, string> = {
  electronics: "Eletrônicos",
  jewelery: "Joias",
  "men's clothing": "Moda Masculina",
  "women's clothing": "Moda Feminina",
};

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Valida se a categoria existe no catálogo
  const isValidCategory = categoria
    ? categories.includes(categoria)
    : false;

  const activeCategory = isValidCategory ? categoria! : null;

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const heroTitle = activeCategory
    ? categoryTranslations[activeCategory] ?? activeCategory
    : "Todos os Produtos";

  const heroSubtitle = activeCategory
    ? `${filteredProducts.length} produto${filteredProducts.length !== 1 ? "s" : ""} encontrado${filteredProducts.length !== 1 ? "s" : ""}`
    : "Explore nossa seleção completa de produtos premium. Peças exclusivas escolhidas a dedo para o seu estilo de vida.";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative w-full pt-32 pb-20 px-5 flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pb-20 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-40 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center max-w-3xl mx-auto animate-fade-up animate-once animate-duration-700">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            {activeCategory ? "Categoria" : "Coleção Completa"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight mb-6 first-letter:uppercase">
            {heroTitle}
          </h1>
          <p className="text-lg text-subtitle max-w-2xl text-balance">
            {heroSubtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="relative z-10 mt-12 w-full max-w-3xl mx-auto">
          <Suspense fallback={null}>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
            />
          </Suspense>
        </div>
      </section>

      {/* Products Grid ou Estado Vazio */}
      <section className="max-w-7xl mx-auto px-5 pb-32">
        {categoria && !isValidCategory ? (
          /* Categoria inválida */
          <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center">
              <PackageOpen size={36} className="text-subtitle" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Categoria não encontrada
              </h2>
              <p className="text-subtitle max-w-md">
                A categoria &quot;{categoria}&quot; não existe no nosso catálogo.
                Explore todas as categorias disponíveis.
              </p>
            </div>
            <Link
              href="/products"
              className="bg-accent hover:bg-[#f9e3ae] text-primary font-medium text-xs uppercase tracking-widest px-8 py-3 rounded-lg transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Categoria válida mas sem produtos */
          <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center">
              <PackageOpen size={36} className="text-subtitle" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Nenhum produto encontrado
              </h2>
              <p className="text-subtitle max-w-md">
                Não encontramos produtos nesta categoria no momento.
              </p>
            </div>
            <Link
              href="/products"
              className="bg-accent hover:bg-[#f9e3ae] text-primary font-medium text-xs uppercase tracking-widest px-8 py-3 rounded-lg transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up animate-once animate-duration-1000 animate-delay-300">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}