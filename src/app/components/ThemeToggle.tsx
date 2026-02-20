"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "./ui/Button";

export default function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${className} transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label={
        mounted
          ? `Mudar para modo ${theme === "dark" ? "claro" : "escuro"}`
          : "Alternar tema"
      }
      disabled={!mounted}
    >
      {/*
       * SSR: Renderiza um <span> vazio com as dimensões exatas do ícone (20x20).
       *      O botão existe no DOM → CLS = 0.
       *      opacity-0 + pointer-events-none → invisível e não clicável.
       *      Nenhum ícone concreto é renderizado → sem risco de flash/morph.
       *
       * Cliente (após mount): O tema é resolvido via localStorage/media query.
       *      O ícone correto é renderizado de imediato.
       *      opacity transiciona suavemente de 0 → 1 (300ms).
       */}
      {mounted ? (
        theme === "dark" ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )
      ) : (
        <span className="inline-block w-5 h-5" />
      )}
    </Button>
  );
}
