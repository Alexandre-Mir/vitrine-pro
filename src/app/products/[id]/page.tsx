import { AddToCart } from "@/app/components/AddToCart";
import { getProductById } from "@/services/product";
import Image from "next/image";
import { Metadata } from "next";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import formatCurrency from "@/utils/format-currency";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: product.category,
      href: "/",
    },
    { label: product.title, href: `/products/${id}` },
  ];

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2  min-h-screen  place-content-center bg-secondary py-[calc(var(--header-height)*2)] px-6 gap-6">
      <section className="bg-background p-8 rounded-lg flex flex-col gap-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="relative w-full h-96 lg:h-[800px]  bg-black/5 rounded-lg ">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10"
          />
        </div>
      </section>

      <section className="bg-background  h-full flex flex-col p-8 rounded-lg gap-6">
        <div className="flex flex-col gap-6 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-primary mb-2 line-clamp-1 lg:line-clamp-3">
              {product.title}
            </h1>
            <p className="text-subtitle first-letter:uppercase">
              {product.category}
            </p>
          </div>
          <p className="text-2xl">{formatCurrency(product.price)}</p>
        </div>
        <AddToCart product={product} />
        <p className="first-letter:uppercase">{product.description}</p>
      </section>
    </main>
  );
}
