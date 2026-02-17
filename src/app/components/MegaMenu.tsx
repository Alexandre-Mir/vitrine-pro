import { BadgeDollarSign, ShoppingBag, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import formatCurrency from "@/utils/format-currency";

interface MegaMenuProps {
  isOpen: boolean;
  categories: string[];
  activeMenu: string | null;
}

export default function MegaMenu({
  isOpen,
  categories,
  activeMenu,
}: MegaMenuProps) {
  const { items } = useCart();

  return (
    <nav
      data-main-menu
      className={`z-10 w-full transition-all duration-(--menu-animation-slide-time) ease-(--menu-slide-down-curve) ${isOpen ? "max-h-[calc(100vh-100px)]" : "max-h-0"}`}
    >
      <div
        data-menu-content
        className={`flex lg:flex-row flex-col px-5 lg:py-3 py-5  ${isOpen ? "opacity-100 backdrop-blur-2xl" : "opacity-0"} transition-opacity duration-1000 ease-in`}
      >
        {activeMenu === "shop" && (
          <>
            <div className="w-full lg:w-1/2 lg:pr-5">
              <h4
                className={`lg:hidden tracking-widest uppercase text-subtitle text-xs font-medium ${isOpen ? "animate-fade-right animate-once animate-normal" : ""}`}
              >
                Shop
              </h4>
              <ul>
                <li className="border-b border-border py-5 ">
                  <h5
                    className={`text-xl tracking-tight flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal animate-delay-100"
                        : ""
                    }`}
                  >
                    Categorias
                  </h5>
                  <ul className="pt-3 pl-4 flex flex-col gap-1">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          href={`/category/${category}`}
                          className={`flex first-letter:capitalize ${
                            isOpen
                              ? ` animate-fade-right animate-once animate-normal animate-delay-${index * 100}`
                              : ""
                          }`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="pt-5 pb-1">
                  <Link
                    href="/item"
                    className={`text-xl tracking-tight flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal  animate-delay-500"
                        : ""
                    }`}
                  >
                    Item
                  </Link>
                </li>
                <li className="pb-1">
                  <Link
                    href="/item"
                    className={`text-xl tracking-tight flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal  animate-delay-600"
                        : ""
                    }`}
                  >
                    Item
                  </Link>
                </li>
                <li className="mt-4 border-y border-border py-5 ">
                  <Link
                    href="/Coleção"
                    className={`text-xl tracking-tight flex items-center gap-2 ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal animate-delay-700"
                        : ""
                    }`}
                  >
                    <div className="bg-accent p-1.5 rounded-sm">
                      <BadgeDollarSign size={18} strokeWidth="1.5" />
                    </div>
                    Coleção
                  </Link>
                </li>
                <li className="py-5 ">
                  <Link
                    href="/todos"
                    className={`text-xl tracking-tight flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal  animate-delay-800"
                        : ""
                    }`}
                  >
                    Todos os itens
                  </Link>
                </li>
              </ul>
            </div>
            <img
              className={` rounded-lg lg:block hidden ${
                isOpen ? "animate-fade-right animate-once animate-normal" : ""
              }`}
              src="https://placehold.co/317x402"
              alt=""
            />
            <div className="lg:hidden py-5">
              <h4
                className={`tracking-widest uppercase text-subtitle text-xs font-medium ${isOpen ? "animate-fade-right animate-once animate-normal animate-delay-900" : ""}`}
              >
                Vitrine Pro
              </h4>
              <ul>
                <li className="pt-5 pb-1">
                  <Link
                    href="/sobre"
                    className={`text-xl tracking-tight flex ${
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
                    className={`text-xl tracking-tight flex ${
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
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full border-b border-primary py-2 text-2xl bg-transparent outline-none placeholder:text-primary/50"
              autoFocus
            />
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
                  </li>
                ))}
              </ul>
            )}

            {/* Rodapé do Carrinho com Total e Botão de Checkout virá aqui depois */}
          </div>
        )}
      </div>
      <div
        className={`w-full mb-5 border-t border-border pt-5 flex justify-center items-center ${isOpen ? "animate-fade-right animate-once animate-normal animate-delay-1200" : ""}`}
      >
        <ThemeToggle />
      </div>
    </nav>
  );
}
