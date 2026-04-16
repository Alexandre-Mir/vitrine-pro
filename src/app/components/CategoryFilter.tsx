"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";

const categoryTranslations: Record<string, string> = {
  electronics: "Eletrônicos",
  jewelery: "Joias",
  "men's clothing": "Moda Masculina",
  "women's clothing": "Moda Feminina",
};

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleCategoryChange(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("categoria", category);
    } else {
      params.delete("categoria");
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {/* Chip "Todos" */}
      <button
        onClick={() => handleCategoryChange(null)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all duration-300 cursor-pointer border ${
          !activeCategory
            ? "bg-accent text-primary border-accent shadow-sm"
            : "bg-secondary/50 text-primary/70 border-border hover:bg-secondary hover:text-primary"
        }`}
      >
        <LayoutGrid size={14} />
        Todos
      </button>

      {/* Chips de categorias */}
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all duration-300 cursor-pointer border ${
              isActive
                ? "bg-accent text-primary border-accent shadow-sm"
                : "bg-secondary/50 text-primary/70 border-border hover:bg-secondary hover:text-primary"
            }`}
          >
            {categoryTranslations[category] ?? category}
          </button>
        );
      })}
    </div>
  );
}
