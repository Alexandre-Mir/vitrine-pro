import { ShoppingBag, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Button from "./ui/Button";
import { Product } from "@/types/product";
import Link from "next/link";
import formatCurrency from "@/utils/format-currency";

export default function ProductCard({
  title,
  price,
  image,
  rating,
  category,
  id,
}: Product) {
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 > 0;

  return (
    <Link href={`/products/${id}`}>
      <article
        className={`shrink-0 snap-center overflow-hidden h-[580px] w-full  p-5 rounded-2xl
     cursor-pointer bg-background flex flex-col transition-all duration-300 group `}
      >
        <div className={`relative w-full h-full overflow-hidden rounded-xl `}>
          <Image
            className="object-contain group-hover:scale-105 transition-transform duration-500 bg-secondary p-4"
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2.5 left-2.5 flex gap-2">
            {fullStars >= 4 && (
              <span className="bg-accent text-primary py-2 px-3 rounded-4xl text-xs font-medium first-letter:uppercase">
                Bem avaliado
              </span>
            )}

            {rating.count >= 300 && (
              <span className="backdrop-blur bg-transparent border border-white text-white py-2 px-3 rounded-4xl text-xs font-bold">
                Mais vendidos
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-between pt-4">
          <div>
            <h3 className="leading-none text-2xl font-medium line-clamp-1 text-primary">
              {title}
            </h3>
            <p className="leading-none text-2xl font-bold text-primary">
              {formatCurrency(price)}
            </p>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      strokeWidth="0"
                      fill="var(--accent)"
                    />
                  ))}
                  {hasHalfStar && (
                    <StarHalf size={12} strokeWidth="0" fill="var(--accent)" />
                  )}
                </div>
                <span className="text-xs text-secondary font-medium ">
                  ({rating.count})
                </span>
              </div>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="first-letter:uppercase">{category}</span>
              </div>
            </div>
            <Button variant="icon" size="icon">
              <ShoppingBag size={18} />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
