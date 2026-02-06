import Button from "@/app/components/ui/Button";
import { getProductById } from "@/services/product";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <main className="flex w-full h-[calc(100vh+(var(--header-height)*2))] place-items-center place-content-center bg-secondary py-[calc(var(--header-height)*2)] px-4 gap-4">
      <section className="relative w-full h-full  bg-black/5 rounded-lg ">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
        />
      </section>
      <section className="bg-background w-1/2 h-full flex flex-col p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-4 pb-4 border-b border-border">
          <div>
            <h1 className="text-5xl font-bold text-primary mb-2">
              {product.title}
            </h1>
            <p className="text-subtitle first-letter:uppercase">
              {product.category}
            </p>
          </div>
          <p className="text-2xl">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <Button>Adicionar ao carrinho</Button>
        <p>{product.description}</p>
      </section>
    </main>
  );
}
