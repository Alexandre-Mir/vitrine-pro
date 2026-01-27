interface MegaMenuProps {
  isOpen: boolean;
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  return (
    <nav
      data-main-menu
      className={`z-10 w-full transition-all duration-(--menu-animation-slide-time) ease-(--menu-slide-down-curve) ${isOpen ? "max-h-[calc(100vh-100px)]" : "max-h-0"}`}
    >
      <div
        data-menu-content
        className={`flex lg:flex-row flex-col px-5 lg:py-3 py-5 mb-5 ${isOpen ? "opacity-100 backdrop-blur-2xl" : "opacity-0"} transition-opacity duration-1000 ease-in`}
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
                Lista
              </a>
              <ul className="pt-3 pl-4 flex flex-col gap-1">
                <li>
                  <a
                    className={`flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal animate-delay-200"
                        : ""
                    }`}
                  >
                    Item 1
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className={`flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal  animate-delay-300"
                        : ""
                    }`}
                  >
                    Item 2
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className={`flex ${
                      isOpen
                        ? "animate-fade-right animate-once animate-normal  animate-delay-400"
                        : ""
                    }`}
                  >
                    Item 3
                  </a>
                </li>
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
                className={`text-xl tracking-tight flex ${
                  isOpen
                    ? "animate-fade-right animate-once animate-normal animate-delay-700"
                    : ""
                }`}
              >
                Item Especial ou Bundle
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
    </nav>
  );
}
