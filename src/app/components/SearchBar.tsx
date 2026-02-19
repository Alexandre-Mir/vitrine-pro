"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import formatCurrency from "@/utils/format-currency";

interface SearchBarProps {
  onSubmit?: () => void;
}

export function SearchBar({ onSubmit }: SearchBarProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [term, setTerm] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedTerm = useDebounce(term, 350);

  // Sincroniza o estado local com a URL quando ela muda externamente
  const urlQuery = searchParams.get("q") || "";
  useEffect(() => {
    setTerm(urlQuery);
  }, [urlQuery]);

  // Fetch client-side disparado pelo termo debounced
  useEffect(() => {
    if (!debouncedTerm || debouncedTerm.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function fetchPreview() {
      setIsLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Falha ao buscar");

        const allProducts: Product[] = await res.json();
        const lowerQuery = debouncedTerm.toLowerCase();

        const filtered = allProducts
          .filter(
            (p) =>
              p.title.toLowerCase().includes(lowerQuery) ||
              p.description.toLowerCase().includes(lowerQuery) ||
              p.category.toLowerCase().includes(lowerQuery),
          )
          .slice(0, 3);

        setResults(filtered);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreview();

    return () => controller.abort();
  }, [debouncedTerm]);

  // Indica visualmente que a digitação vai disparar uma busca (antes do debounce resolver)
  const isTypingAhead = term.length >= 2 && term !== debouncedTerm;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`/search?${params.toString()}`);
    onSubmit?.();
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          type="text"
          placeholder="O que você procura?"
          className="w-full border-b border-primary py-2 text-2xl bg-transparent outline-none placeholder:text-primary/50 pr-10"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
          aria-label="Buscar"
        >
          {isLoading || isTypingAhead ? (
            <Loader2 className="text-primary animate-spin" size={20} />
          ) : (
            <Search className="text-primary" size={20} />
          )}
        </button>
      </form>

      {/* Preview de resultados */}
      {term.length >= 2 && (
        <div className="mt-4 flex flex-col gap-3">
          {isLoading && results.length === 0 ? (
            // Skeleton de carregamento
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center animate-pulse">
                <div className="w-12 h-12 bg-secondary rounded-lg shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-3.5 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-1/3" />
                </div>
              </div>
            ))
          ) : results.length > 0 ? (
            <>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={onSubmit}
                  className="flex gap-3 items-center p-2 -mx-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0 border border-border">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-1 group-hover:text-primary/70 transition-colors">
                      {product.title}
                    </h4>
                    <span className="text-xs font-bold text-primary">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Link para ver todos os resultados */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const params = new URLSearchParams(searchParams);
                  params.set("q", term);
                  replace(`/search?${params.toString()}`);
                  onSubmit?.();
                }}
                className="text-xs text-center font-medium tracking-widest uppercase text-subtitle hover:text-primary transition-colors py-2 cursor-pointer"
              >
                Ver todos os resultados →
              </button>
            </>
          ) : (
            !isLoading && (
              <p className="text-sm text-subtitle text-center py-4">
                Nenhum produto encontrado para &ldquo;{debouncedTerm}&rdquo;
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
