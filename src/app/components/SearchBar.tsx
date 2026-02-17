"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Inicializa apenas uma vez na montagem. Sincronização complexa não é mais
  // necessária pois não há "live typing" que precise de consistência bidirecional
  // milimétrica durante a digitação.
  const [term, setTerm] = useState(searchParams.get("q") || "");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault(); // Previne reload nativo

    // Atualiza a URL apenas no submit
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    // Navegação padrão (sem startTransition), deixando o Suspense da página
    // lidar com o carregamento via key={query}
    replace(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="O que você procura?"
        className="w-full border-b border-primary py-2 text-2xl bg-transparent outline-none placeholder:text-primary/50 pr-8"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
        aria-label="Buscar"
      >
        <Search className="text-primary" size={20} />
      </button>
    </form>
  );
}
