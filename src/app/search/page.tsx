import { Suspense } from "react";
import { searchProducts } from "@/services/product";
import ProductCard from "../components/ProductCard";

// Componente de UIServer (Server Component) que realiza o data fetching.
// Ele é o responsável por "suspender" a renderização enquanto os dados carregam.
async function SearchResults({ query }: { query: string }) {
  // A latência desta chamada não bloqueia o App Shell inicial.
  // Graças ao Suspense no pai, o usuário vê o esqueleto enquanto isso roda.
  const products = await searchProducts(query);

  if (products.length === 0) {
    return (
      <div className="text-center py-20 col-span-full">
        <h2 className="text-xl font-medium">Nenhum produto encontrado.</h2>
        <p className="text-muted-foreground mt-2">
          Tente buscar por termos mais genéricos.
        </p>
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
