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

  return (
    <main>
      <Hero />
      <section className="relative z-10 bg-background">
        <div className="flex gap-4 p-4 lg:justify-center py-10 overflow-x-auto snap-x scrollbar-hide">
          {uniqueCategories.map((product) => (
            <a
              className="flex gap-6 max-w-[300px] w-[300px] items-center p-2.5 group bg-secondary rounded-lg transition-colors cursor-pointer"
              key={product.id}
            >
              <div className="w-20 h-20 bg-white/30 relative overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-contain lg:group-hover:scale-110 lg:duration-350 lg:ease-out p-4  w-full h-full "
                />
              </div>
              <h4 className="first-letter:uppercase text-sm mr-auto font-medium">
                {product.category}
              </h4>
              <ChevronRight size={20} className="opacity-40" />
            </a>
          ))}
        </div>
        <div className="mt-10">
          <div className="bg-secondary p-4 rounded-2xl lg:rounded-none flex gap-4  ml-4 lg:flex-col lg:items-center lg:justify-center lg:mx-auto">
            <div className="flex-none flex items-center justify-center w-12 lg:mr-10 lg:py-4">
              <h2 className="leading-none font-bold text-primary text-3xl mb-0.5 lg:text-5xl uppercase -rotate-90 lg:rotate-0 whitespace-nowrap">
                Mais vendidos
              </h2>
            </div>
            <div className="flex-1 flex overflow-x-auto snap-x scrollbar-hide gap-4 lg:grid lg:grid-cols-3">
              {products.map((product) =>
                product.rating.count >= 300 ? (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    category={product.category}
                  />
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
