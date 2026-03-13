import { Heart, Star, StarHalf } from "lucide-react";
import FallbackImage from "./FallbackImage";
import { Product } from "@/types/product";
import Link from "next/link";
import formatCurrency from "@/utils/format-currency";
import { AddToCart } from "./AddToCart";

const categoryTranslations: Record<string, string> = {
  electronics: "Eletrônicos",
  jewelery: "Joalheria",
  "men's clothing": "Moda masculina",
  "women's clothing": "Moda feminina",
};

export default function ProductCard(product: Product) {
  const { title, price, image, rating, category, id } = product;
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 > 0;

  return (
    <article className="shrink-0 snap-center w-full rounded-3xl bg-background flex flex-col transition-all duration-300 group relative isolate overflow-hidden shadow-sm border border-secondary/40 hover:shadow-md h-[540px]">
      <Link
        href={`/products/${id}`}
        className="contents group/link after:absolute after:inset-0 after:z-0"
      >
        <div className="relative w-full h-[280px] bg-secondary/30 dark:bg-secondary/20 flex items-center justify-center shrink-0 rounded-t-3xl overflow-hidden p-8">
          <FallbackImage
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-8 mix-blend-multiply dark:mix-blend-normal group-hover/card:scale-110 transition-transform duration-500 will-change-transform"
          />
          
          <div className="absolute inset-0 p-5 pointer-events-none z-10">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-start h-full">
                {rating.rate >= 4.2 && (
                  <span className="bg-accent text-primary py-1.5 px-4 rounded-full text-[13px] font-bold tracking-tight shadow-sm w-fit">
                    Bem avaliado
                  </span>
                )}
              </div>
              <button className="text-primary/40 hover:text-red-500 transition-colors pointer-events-auto p-3 -m-3">
                <Heart size={28} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6 relative z-10 pointer-events-none justify-between">
        <div className="pointer-events-auto flex flex-col gap-4">
          <h3 className="text-[19px] leading-snug font-medium text-primary/70 line-clamp-2">
            {title}
          </h3>
          <p className="text-[2.75rem] leading-[1.1] font-extrabold text-primary tracking-tight mb-2">
            {formatCurrency(price)}
          </p>
        </div>

        <div className="flex justify-between items-end mt-4 pointer-events-auto">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < fullStars) {
                    return <Star key={i} size={15} strokeWidth="0" fill="var(--accent)" />;
                  } else if (i === fullStars && hasHalfStar) {
                    return (
                      <div key={i} className="relative">
                        <Star size={15} strokeWidth="0" fill="#D1D5DB" />
                        <div className="absolute inset-0">
                          <StarHalf size={15} strokeWidth="0" fill="var(--accent)" />
                        </div>
                      </div>
                    );
                  } else {
                    return <Star key={i} size={15} strokeWidth="0" fill="#D1D5DB" />;
                  }
                })}
              </div>
              <span className="text-sm text-subtitle font-medium">
                ({rating.count})
              </span>
            </div>
            <p className="text-[15px] font-medium text-primary/80 first-letter:uppercase">
              {categoryTranslations[category] ?? category}
            </p>
          </div>
          
          <div className="z-20 relative pointer-events-auto scale-110 origin-bottom-right">
            <AddToCart product={product} variant="icon" />
          </div>
        </div>
      </div>
    </article>
  );
}
