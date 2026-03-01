import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import getProducts from "@/services/product";

export const metadata: Metadata = {
  title: "Categorias | Vitrine Pro",
  description:
    "Explore todas as categorias de produtos da Vitrine Pro. Encontre o que precisa em moda, eletrônicos, joias e muito mais.",
  openGraph: {
    title: "Categorias | Vitrine Pro",
    description:
      "Explore todas as categorias de produtos da Vitrine Pro. Encontre o que precisa em moda, eletrônicos, joias e muito mais.",
    type: "website",
  },
};

const categoryTranslations: Record<string, string> = {
  "men's clothing": "Moda Masculina",
  "women's clothing": "Moda Feminina",
  electronics: "Eletrônicos",
  jewelery: "Joias",
};

const categoryDescriptions: Record<string, string> = {
  "men's clothing":
    "Descubra as últimas tendências em moda masculina. De camisetas casuais a jaquetas sofisticadas, encontre peças que combinam conforto e estilo.",
  "women's clothing":
    "Explore uma coleção curada de moda feminina. Peças que vão do casual ao elegante, perfeitas para qualquer ocasião.",
  electronics:
    "Tecnologia de ponta ao alcance das suas mãos. Descubra os melhores gadgets, acessórios e dispositivos do mercado.",
  jewelery:
    "Joias e acessórios exclusivos que complementam qualquer visual. Peças delicadas e sofisticadas para todos os estilos.",
};

const categoryGradients: Record<string, string> = {
  "men's clothing": "from-slate-800 to-slate-600",
  "women's clothing": "from-rose-700 to-pink-500",
  electronics: "from-blue-800 to-cyan-600",
  jewelery: "from-amber-700 to-yellow-500",
};

export default async function CategoriasPage() {
  const products = await getProducts();

  // Agrupa produtos por categoria
  const categoriesMap = new Map<string, typeof products>();
  products.forEach((product) => {
    if (!categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, []);
    }
    categoriesMap.get(product.category)!.push(product);
  });

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero Banner */}
      <section className="relative bg-secondary py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary tracking-tight">
              Categorias
            </h1>
            <p className="mt-4 text-lg text-subtitle max-w-2xl mx-auto">
              Navegue pelas nossas categorias e encontre exatamente o que você
              procura. Produtos selecionados para cada estilo e necessidade.
            </p>
          </div>
        </div>
        {/* Elemento decorativo */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Grid de Categorias */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from(categoriesMap.entries()).map(
            ([category, categoryProducts]) => (
              <Link
                key={category}
                href={`/categorias/${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Gradiente de fundo */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${categoryGradients[category] || "from-gray-700 to-gray-500"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-8 flex flex-col h-full min-h-[320px]">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-white transition-colors duration-500">
                        {categoryTranslations[category] || category}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <Package
                          size={14}
                          className="text-subtitle group-hover:text-white/70 transition-colors duration-500"
                        />
                        <span className="text-sm text-subtitle group-hover:text-white/70 transition-colors duration-500">
                          {categoryProducts.length}{" "}
                          {categoryProducts.length === 1
                            ? "produto"
                            : "produtos"}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-white/20 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1">
                      <ChevronRight
                        size={18}
                        className="text-primary group-hover:text-white transition-colors duration-500"
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-subtitle group-hover:text-white/80 transition-colors duration-500 mb-8 line-clamp-2">
                    {categoryDescriptions[category] ||
                      "Explore os produtos desta categoria."}
                  </p>

                  {/* Preview dos produtos */}
                  <div className="mt-auto flex items-end gap-3">
                    {categoryProducts.slice(0, 4).map((product, index) => (
                      <div
                        key={product.id}
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-white/90 group-hover:bg-white/20 p-2 transition-all duration-500 shadow-sm"
                        style={{
                          transitionDelay: `${index * 50}ms`,
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                    {categoryProducts.length > 4 && (
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-secondary/50 group-hover:bg-white/10 flex items-center justify-center transition-all duration-500">
                        <span className="text-xs font-medium text-subtitle group-hover:text-white/70 transition-colors duration-500">
                          +{categoryProducts.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
