"use client";

import { useEffect, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import Button from "./ui/Button";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useLockedBody } from "@/hooks/use-locked-body";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

import { Product } from "@/types/product";

interface HeaderProps {
  categories: string[];
  featuredProducts: Product[];
}

export default function Header({ categories, featuredProducts }: HeaderProps) {
  const { cartQuantity } = useCart();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollDir = useScrollDirection();
  useLockedBody(activeMenu !== null);

  // Função para abrir e fechar o menu
  function handleToggleMenu(menu: string) {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrollDir === "down" ? "-translate-y-full -top-4" : "top-4"}`}
    >
      <div
        data-menu-blur
        className={`bg-[#000000b3]  h-[200vh] w-full -z-10 fixed -top-4 left-0 pointer-events-none backdrop-blur-sm transition-all duration-(--menu-animation-slide-time) ease-(--menu-slide-down-curve) ${activeMenu ? "opacity-100" : "opacity-0"}`}
      ></div>
      <div className="relative md:max-w-2xl max-w-xs mx-auto overflow-hidden min-h-(--header-height)  text-primary color-primary  bg-background shadow-lg rounded-lg border border-border">
        {/* ... nav existente ... */}
        <nav className="relative h-(--header-height) flex justify-between items-center border-b border-border ">
          {/* ... conteúdo da nav ... */}
          <Button
            variant="ghost"
            size="none"
            className={`lg:hidden ml-6 tham tham-e-slider tham-w-5 ${activeMenu === "shop" ? "tham-active" : ""}`}
            onClick={() => {
              handleToggleMenu("shop");
            }}
            aria-label="Abrir menu"
          >
            <span className="tham-box">
              <span className="tham-inner bg-primary"></span>
            </span>
          </Button>

          <h1 className="lg:static lg:px-5 lg:border-r lg:border-border lg:translate-0 lg:h-full lg:content-center lg:text-2xl h-full content-center text-2xl h1-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 border-0">
            <Link href="/">Vitrine Pro</Link>
          </h1>
          <ul className="gap-8 place-content-center lg:flex hidden">
            <li className="flex cursor-pointer">
              <Button
                variant="ghost"
                size="none"
                onClick={() => handleToggleMenu("shop")}
                className="gap-1.5 text-xs font-medium tracking-widest uppercase"
                aria-label="Abrir menu"
              >
                Shop
                <ChevronDown width={11} height={10} strokeWidth={1.25} />
              </Button>
            </li>
            <li className="flex">
              <Link
                href="/sobre"
                className="text-xs font-medium tracking-widest uppercase"
              >
                Sobre
              </Link>
            </li>
            <li className="flex">
              <Link
                href="/contato"
                className="text-xs font-medium tracking-widest uppercase"
              >
                Contato
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-6 h-full px-6 lg:border-l lg:border-border md:border-0">
            {/* Implementar busca Mega Menu */}
            <Button
              className="lg:static absolute left-16 top-[15px]"
              variant="ghost"
              size="none"
              onClick={() => handleToggleMenu("search")}
              aria-label="Abrir busca"
            >
              <Search size={20} className="" />
            </Button>
            {/* Implementar página de perfil */}
            <Link
              href="/perfil"
              className="color-primary cursor-pointer"
              aria-label="Abrir perfil"
            >
              <User size={20} />
            </Link>
            {/* Implementar carrinho Mega Menu */}
            {/* Implementar carrinho Mega Menu, invés de abrir uma nova página, deve abrir um menu como o Button "SHOP" */}
            <Button
              className="relative"
              variant="ghost"
              size="none"
              onClick={() => handleToggleMenu("cart")}
              aria-label="Abrir carrinho"
            >
              <ShoppingCart size={20} />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {cartQuantity}
                </span>
              )}
            </Button>
          </div>
        </nav>
        <MegaMenu
          categories={categories}
          featuredProducts={featuredProducts}
          isOpen={activeMenu !== null}
          activeMenu={activeMenu}
        />
      </div>
    </header>
  );
}
