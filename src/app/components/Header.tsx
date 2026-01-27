"use client";

import { useEffect, useRef, useState } from "react";
import Headroom from "headroom.js";
import MegaMenu from "./MegaMenu";
import { ChevronDown, Search, ShoppingCart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
      <div className="relative md:max-w-2xl max-w-xs mx-auto overflow-hidden min-h-(--header-height)  text-primary color-primary  bg-background shadow-lg rounded-lg border border-border">
        <nav className="relative h-(--header-height) flex justify-between items-center border-b border-border ">
          <button
            className={`lg:hidden relative cursor-pointer ml-6 tham tham-e-slider tham-w-5 ${isMenuOpen ? "tham-active" : ""}`}
            onClick={() => {
              handleShopClick();
            }}
          >
            <span className="tham-box">
              <span className="tham-inner bg-primary"></span>
            </span>
          </button>
          <h1 className="lg:static lg:px-5 lg:border-r lg:border-border lg:translate-0 lg:h-full lg:content-center lg:text-2xl h-full content-center text-2xl h1-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 border-0">
            <a href="#">Vitrine Pro</a>
          </h1>
          <ul className="gap-8 place-content-center lg:flex hidden">
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
          <div className="flex items-center gap-6 h-full px-6 lg:border-l lg:border-border md:border-0">
            <Search
              size={20}
              color="var(--color-primary)"
              className="cursor-pointer lg:static absolute left-16 top-[15px]"
            />

            <ShoppingCart
              size={20}
              color="var(--color-primary)"
              className="cursor-pointer"
            />
            <ThemeToggle />
          </div>
        </nav>
        <MegaMenu isOpen={isMenuOpen} />
      </div>
    </header>
  );
}
