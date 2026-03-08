import getProducts from "@/services/product";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductsPage() {
  const products = await getProducts();

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
            Coleção Completa
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight mb-6">
            Todos os Produtos
          </h1>
          <p className="text-lg text-subtitle max-w-2xl text-balance">
            Explore nossa seleção completa de produtos premium. Peças
            exclusivas escolhidas a dedo para o seu estilo de vida.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up animate-once animate-duration-1000 animate-delay-300">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}