import { ChevronRight } from "lucide-react";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Image from "next/image";

import { Metadata } from "next";
import getProducts from "@/services/product";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProducts();
  const uniqueCategories = products.filter(
    (product, index, self) =>
      index === self.findIndex((t) => t.category === product.category),
  );
  const categoryCount = uniqueCategories.length;

  return {
    title: `Vitrine Pro | ${categoryCount} Categorias`,
    description: `Vitrine Pro | ${categoryCount} Categorias`,
    openGraph: {
      title: `Vitrine Pro | ${categoryCount} Categorias`,
      description: `Vitrine Pro | ${categoryCount} Categorias`,
      type: "website",
    },
    twitter: {
      title: `Vitrine Pro | ${categoryCount} Categorias`,
      description: `Vitrine Pro | ${categoryCount} Categorias`,
      card: "summary_large_image",
    },
  };
}

export default async function Home() {
  const products = await getProducts();
  const uniqueCategories = products.filter(
    (product, index, self) =>
      index === self.findIndex((t) => t.category === product.category),
  );

  const bestSellers = products.filter((p) => p.rating.count >= 300);
  const topRated = products.filter((p) => p.rating.rate >= 4.5);
  const electronics = products.filter((p) => p.category === "electronics");
  const fashion = products.filter((p) => p.category.includes("clothing"));

  const categoryTranslations: Record<string, string> = {
    "men's clothing": "Moda Masculina",
    "women's clothing": "Moda Feminina",
    electronics: "Eletrônicos",
    jewelery: "Joias",
  };

  return (
    <main className="pb-20">
      <Hero />
      <section className="relative z-10 bg-background">
        {/* Lista de Categorias */}
        <div className="flex gap-4 p-4 lg:justify-center py-10 overflow-x-auto snap-x scrollbar-hide border-b border-secondary/20">
          {uniqueCategories.map((product) => (
            <a
              className="flex gap-6 max-w-[300px] w-[300px] items-center p-2.5 group bg-foreground/10 border border-foreground/15 rounded-lg transition-colors cursor-pointer hover:bg-foreground/15"
              key={product.id}
            >
              <div className="w-20 h-20 bg-white/30 relative overflow-hidden rounded-lg shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-contain lg:group-hover:scale-110 lg:duration-300 lg:ease-out p-4 w-full h-full"
                />
              </div>
              <h4 className="first-letter:uppercase text-sm mr-auto font-medium">
                {categoryTranslations[product.category] || product.category}
              </h4>
              <ChevronRight size={20} className="opacity-40" />
            </a>
          ))}
        </div>

        {/* Mais vendidos */}
        <div id="destaques" className="mt-10 scroll-mt-4">
          <div className="bg-secondary p-4 rounded-2xl lg:rounded-none flex gap-4 ml-4 lg:flex-col lg:items-center lg:justify-center lg:mx-auto lg:py-12">
            <div className="flex-none flex items-center justify-center w-12 lg:mr-10 lg:py-4 lg:mb-6 lg:w-full">
              <h2 className="leading-none font-bold text-primary text-3xl mb-0.5 lg:text-5xl uppercase -rotate-90 lg:rotate-0 whitespace-nowrap">
                Mais vendidos
              </h2>
            </div>
            <div className="flex-1 flex overflow-x-auto snap-x scrollbar-hide gap-4 lg:grid lg:grid-cols-4 max-w-7xl mx-auto w-full">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* Eletrônicos em Destaque */}
        <div className="mt-16 bg-secondary/30 py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-4xl font-bold text-primary">
                Tecnologia & Eletrônicos
              </h2>
            </div>
            <div className="flex overflow-x-auto snap-x scrollbar-hide gap-4 lg:grid lg:grid-cols-4">
              {electronics.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* Moda em Alta */}
        <div className="mt-16 bg-secondary/50 py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-4xl font-bold text-primary">
                Moda em Alta
              </h2>
            </div>
            <div className="flex overflow-x-auto snap-x scrollbar-hide gap-4 lg:grid lg:grid-cols-4">
              {fashion.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* Bem Avaliados */}
        <div className="bg-secondary/30 py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-4xl font-bold text-primary">
                Mais Bem Avaliados
              </h2>
            </div>
            <div className="flex overflow-x-auto snap-x scrollbar-hide gap-4 lg:grid lg:grid-cols-4">
              {topRated.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
