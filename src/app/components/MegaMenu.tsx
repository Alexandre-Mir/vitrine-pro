import { BadgeDollarSign } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface MegaMenuProps {
  isOpen: boolean;
  categories: string[];
}

export default function MegaMenu({ isOpen, categories }: MegaMenuProps) {
  return (
    <nav
      data-main-menu
      className={`z-10 w-full transition-all duration-(--menu-animation-slide-time) ease-(--menu-slide-down-curve) ${isOpen ? "max-h-[calc(100vh-100px)]" : "max-h-0"}`}
    >
      <div
        data-menu-content
        className={`flex lg:flex-row flex-col px-5 lg:py-3 py-5  ${isOpen ? "opacity-100 backdrop-blur-2xl" : "opacity-0"} transition-opacity duration-1000 ease-in`}
      >
        <div className="w-full lg:w-1/2 lg:pr-5">
          <h4
            className={`lg:hidden tracking-widest uppercase text-subtitle text-xs font-medium ${isOpen ? "animate-fade-right animate-once animate-normal" : ""}`}
          >
            Shop
          </h4>
          <ul>
            <li className="border-b border-border py-5 ">
              <a
                href=""
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal animate-delay-100"
                    : ""
                }`}
              >
                Categorias
              </a>
              <ul className="pt-3 pl-4 flex flex-col gap-1">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      className={`flex ${
                        isOpen
                          ? `animate-fade-right animate-once animate-normal animate-delay-${index * 100}`
                          : ""
                      }`}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="pt-5 pb-1">
              <a
                href=""
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal  animate-delay-500"
                    : ""
                }`}
              >
                Item
              </a>
            </li>
            <li className="pb-1">
              <a
                href=""
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal  animate-delay-600"
                    : ""
                }`}
              >
                Item
              </a>
            </li>
            <li className="mt-4 border-y border-border py-5 ">
              <a
                href=""
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
              </a>
            </li>
            <li className="py-5 ">
              <a
                href=""
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal  animate-delay-800"
                    : ""
                }`}
              >
                Todos os itens
              </a>
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
              <a
                href=""
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal  animate-delay-1000"
                    : ""
                }`}
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href=""
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal  animate-delay-1100"
                    : ""
                }`}
              >
                Contato
              </a>
            </li>
          </ul>
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
