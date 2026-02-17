import { BadgeDollarSign, ShoppingBag, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import formatCurrency from "@/utils/format-currency";
import Button from "./ui/Button";
import { SearchBar } from "./SearchBar";
import { Suspense } from "react";
import { Product } from "@/types/product";

interface MegaMenuProps {
  isOpen: boolean;
  categories: string[];
  activeMenu: string | null;
  featuredProducts: Product[];
}

export default function MegaMenu({
  isOpen,
  categories,
  activeMenu,
  featuredProducts,
}: MegaMenuProps) {
  const { items, removeFromCart } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <nav
      data-main-menu
      className={`z-10 w-full grid transition-all duration-(--menu-animation-slide-time) ease-(--menu-slide-down-curve) ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden min-h-0">
        <div
          data-menu-content
          className={`flex lg:flex-row flex-col px-5 lg:py-3 py-5  ${isOpen ? "opacity-100 backdrop-blur-2xl" : "opacity-0"} transition-opacity duration-1000 ease-in`}
        >
          {activeMenu === "shop" && (
            <>
              <div className="w-full lg:w-1/2 lg:pr-5">
                <h4
                  className={`tracking-widest uppercase text-subtitle text-xs font-medium ${isOpen ? "animate-fade-right animate-once animate-normal" : ""}`}
                >
                  Categorias
                </h4>
                <ul className="pt-3 flex flex-col gap-1">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/category/${category}`}
                        className={`flex first-letter:capitalize hover:text-primary/70 transition-colors py-1 ${
                          isOpen
                            ? ` animate-fade-right animate-once animate-normal animate-delay-${index * 100}`
                            : ""
                        }`}
                      >
                        {category.replace("-", " ")}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-2 pt-2 border-t border-border">
                    <Link
                      href="/products"
                      className={`text-sm tracking-tight flex items-center gap-2 font-medium ${
                        isOpen
                          ? "animate-fade-right animate-once animate-normal animate-delay-500"
                          : ""
                      }`}
                    >
                      Ver todos os produtos
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="hidden lg:flex w-1/2 gap-4">
                {featuredProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={`flex-1 group relative rounded-lg overflow-hidden border border-border bg-background p-4 flex flex-col gap-2 hover:border-primary transition-colors ${
                      isOpen
                        ? `animate-fade-left animate-once animate-normal animate-delay-${index * 150}`
                        : ""
                    }`}
                  >
                    <div className="relative w-full h-32 mb-2 bg-white rounded-md">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="text-sm font-medium line-clamp-2 leading-tight">
                      {product.title}
                    </p>
                    <span className="text-xs font-bold mt-auto text-primary">
                      {formatCurrency(product.price)}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="lg:hidden py-5">
                {/* Mobile Menu Links (Sobre, Contato, etc) - Mantido igual */}
                <h4
                  className={`tracking-widest uppercase text-subtitle text-xs font-medium ${isOpen ? "animate-fade-right animate-once animate-normal animate-delay-900" : ""}`}
                >
                  Mais
                </h4>
                <ul>
                  <li className="pt-3 pb-1">
                    <Link
                      href="/sobre"
                      className={`text-lg tracking-tight flex ${
                        isOpen
                          ? "animate-fade-right animate-once animate-normal  animate-delay-1000"
                          : ""
                      }`}
                    >
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contato"
                      className={`text-lg tracking-tight flex ${
                        isOpen
                          ? "animate-fade-right animate-once animate-normal  animate-delay-1100"
                          : ""
                      }`}
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          {activeMenu === "search" && (
            <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
              <h4
                className={`tracking-widest uppercase text-subtitle text-xs font-medium ${isOpen ? "animate-fade-right animate-once animate-normal" : ""}`}
              >
                Buscar produtos
              </h4>
              <Suspense
                fallback={
                  <div className="w-full h-12 bg-gray-100 rounded animate-pulse" />
                }
              >
                <SearchBar />
              </Suspense>
            </div>
          )}

          {activeMenu === "cart" && (
            <div className="w-full max-w-lg mx-auto flex flex-col h-full min-h-[300px]">
              <h4
                className={`tracking-widest uppercase text-subtitle text-xs font-medium mb-4 ${
                  isOpen ? "animate-fade-right animate-once animate-normal" : ""
                }`}
              >
                Seu Carrinho
              </h4>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Seu carrinho está vazio</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-6 overflow-y-auto max-h-[60vh] pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 items-start border-b border-border pb-6 last:border-0"
                    >
                      <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-border">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <h5 className="font-medium line-clamp-2 leading-tight">
                          {item.title}
                        </h5>
                        <p className="text-sm text-subtitle capitalize">
                          {item.category}
                        </p>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-md">
                            Qtd: {item.quantity}
                          </span>
                          <span className="font-bold">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="none"
                        className="text-subtitle hover:text-primary ml-auto"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remover item"
                      >
                        <X size={20} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}

              {items.length > 0 && (
                <div className="border-t border-border mt-auto pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-medium uppercase tracking-widest">
                      Total
                    </span>
                    <span className="text-xl font-bold">
                      {formatCurrency(total)}
                    </span>
                  </div>
                  <Button className="w-full">Finalizar Compra</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={`w-full mb-5 border-t border-border pt-5 flex justify-center items-center ${isOpen ? "animate-fade-right animate-once animate-normal animate-delay-1200" : ""}`}
      >
        <ThemeToggle />
      </div>
    </nav>
  );
}
