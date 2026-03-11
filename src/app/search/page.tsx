import { Suspense } from "react";
import { searchProducts } from "@/services/product";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

// Componente de UIServer (Server Component) que realiza o data fetching.
// Ele é o responsável por "suspender" a renderização enquanto os dados carregam.
async function SearchResults({ query }: { query: string }) {
  // A latência desta chamada não bloqueia o App Shell inicial.
  // Graças ao Suspense no pai, o usuário vê o esqueleto enquanto isso roda.
  const products = await searchProducts(query);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4 bg-secondary/20 rounded-2xl border border-secondary/50 col-span-full">
        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm border border-border">
          <span className="text-2xl">🔍</span>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-foreground">
          Nenhum produto encontrado
        </h2>
        <p className="text-subtitle mb-8 max-w-md">
          Não conseguimos encontrar resultados exatos para &quot;<strong className="text-foreground">{query}</strong>&quot;.
          Mas não pare por aqui! Explore nossos departamentos mais populares:
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "Eletrônicos", href: "/categorias/electronics" },
            { label: "Moda Masculina", href: "/categorias/men's%20clothing" },
            { label: "Joias", href: "/categorias/jewelery" },
            { label: "Mais Vendidos", href: "/#destaques" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="px-6 py-2.5 bg-background border border-border rounded-full text-sm font-medium hover:bg-secondary hover:text-primary transition-all shadow-sm hover:shadow"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  return (
    <main className="container mx-auto px-5 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Resultados da busca
        </h1>
        <p className="text-muted-foreground">
          Exibindo resultados para{" "}
          <span className="font-semibold">"{query}"</span>
        </p>
      </div>

      <Suspense
        key={query}
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[580px] w-full bg-secondary/30 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        }
      >
        <SearchResults query={query} />
      </Suspense>
    </main>
  );
}
