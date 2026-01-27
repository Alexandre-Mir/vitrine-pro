"use client";

import { useEffect, useRef, useState } from "react";
import Headroom from "headroom.js";
import MegaMenu from "./MegaMenu";
import {
  ChevronDown,
  CircleUser,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    // Inicializa o Headroom
    const headroom = new Headroom(headerRef.current, {
      offset: 0,
      tolerance: 0,
      classes: {
        //Mapeamento das classes de estadp para classes Tailwind
        initial: "transition-all duration-300 ease-in-out",
        pinned: "translate-y-0 top-4", // Visivel
        unpinned: "-translate-y-full -top-4", // Escondido
      },
    });

    headroom.init();

    // Cleanup ao desmontar
    return () => headroom.destroy();
  }, []);

  // Bloqueia o scroll quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Função para abrir e fechar o menu
  function handleShopClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header ref={headerRef} className="fixed left-0 w-full z-50 top-4">
      <div
        data-menu-blur
        className={`bg-[#000000b3] h-screen w-full -z-10 absolute -top-4 left-0 backdrop-blur-sm transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
      ></div>
      <div className="relative max-w-2xl mx-auto overflow-hidden min-h-(--header-height)  text-primary color-primary  bg-white shadow-lg rounded-lg">
        <nav className="relative h-(--header-height) flex justify-between items-center border border-neutral-100">
          <button className="lg:hidden">
            <Menu size={20} color="var(--color-primary)" />
          </button>
          <h1 className="px-5 border-r border-neutral-100 h-full content-center text-2xl h1-logo">
            <a href="#">Vitrine Pro</a>
          </h1>
          <ul className="flex gap-8 place-content-center">
            <li className="flex cursor-pointer">
              <a
                onClick={handleShopClick}
                className="flex gap-1.5 items-center text-xs font-medium tracking-widest uppercase"
              >
                Shop
                <ChevronDown width={11} height={10} strokeWidth={1.25} />
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                className="text-xs font-medium tracking-widest uppercase"
              >
                Sobre
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                className="text-xs font-medium tracking-widest uppercase"
              >
                Contato
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-6 h-full px-6 border-l border-neutral-100">
            <Search
              size={20}
              color="var(--color-primary)"
              className="cursor-pointer"
            />
            <CircleUser
              size={20}
              color="var(--color-primary)"
              className="cursor-pointer"
            />
            <ShoppingCart
              size={20}
              color="var(--color-primary)"
              className="cursor-pointer"
            />
          </div>
        </nav>
        <MegaMenu isOpen={isMenuOpen} />
      </div>
    </header>
  );
}
