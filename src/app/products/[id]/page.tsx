import { AddToCart } from "@/app/components/AddToCart";
import { Star, StarHalf } from "lucide-react";
import { getProductById } from "@/services/product";
import FallbackImage from "@/app/components/FallbackImage";
import { Metadata } from "next";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import formatCurrency from "@/utils/format-currency";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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
    <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <section className="flex flex-col gap-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="relative w-full aspect-square bg-secondary/30 dark:bg-secondary/20 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-12 border border-secondary/40 shadow-sm">
          <FallbackImage
            src={product.image}
            alt={product.title}
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-12 mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      <section className="flex flex-col gap-10 lg:pt-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent-bg/80 dark:text-accent/80 mr-2">
                {product.category}
              </span>
              {product.rating.rate >= 4.2 && (
                <span className="bg-accent text-primary py-1 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  Bem avaliado
                </span>
              )}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => {
                const fullStars = Math.floor(product.rating.rate);
                const hasHalfStar = product.rating.rate % 1 > 0;
                if (i < fullStars) {
                  return <Star key={i} size={20} strokeWidth="0" fill="var(--accent)" />;
                } else if (i === fullStars && hasHalfStar) {
                  return (
                    <div key={i} className="relative">
                      <Star size={20} strokeWidth="0" fill="#D1D5DB" />
                      <div className="absolute inset-0">
                        <StarHalf size={20} strokeWidth="0" fill="var(--accent)" />
                      </div>
                    </div>
                  );
                } else {
                  return <Star key={i} size={20} strokeWidth="0" fill="#D1D5DB" />;
                }
              })}
            </div>
            <span className="text-base font-bold text-subtitle">
              {product.rating.rate} ({product.rating.count} avaliações)
            </span>
          </div>
          
          <div className="flex flex-col gap-1 mt-8">
            <p className="text-[3.5rem] lg:text-[4.5rem] font-extrabold text-primary leading-none tracking-tighter">
              {formatCurrency(product.price)}
            </p>
            <p className="text-subtitle text-sm font-medium">
              Taxas inclusas e entrega rápida disponível
            </p>
          </div>
        </div>

        <div className="h-px bg-border/60 w-full" />

        <div className="flex flex-col gap-6">
          <p className="text-lg text-primary/80 leading-relaxed max-w-prose first-letter:uppercase">
            {product.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-border/40">
            <AddToCart product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
