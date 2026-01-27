import { ChevronRight, GithubIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="px-14 mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-2 gap-10">
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Lorem ipsum</h4>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestiae temporibus reiciendis modi repellat dolorem placeat
              quidem facilis voluptatum repellendus, voluptatem sunt alias quis
              ab distinctio aspernatur reprehenderit illo veritatis optio.
            </p>
          </div>
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Lorem ipsum</h4>
            <ul className="mt-5">
              <li>Shop</li>
              <li>Bundle + Save</li>
              <li>Sobre</li>
              <li>Lorem</li>
            </ul>
          </div>
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Lorem ipsum</h4>
            <ul className="mt-5">
              <li>Shop</li>
              <li>Bundle + Save</li>
              <li>Sobre</li>
              <li>Lorem</li>
            </ul>
          </div>
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Newsletter</h4>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <form className="max-w-[304px] flex-nowrap flex flex-row mt-5">
              <input
                className="bg-white border border-primary h-14 w-full py-3 pl-5 rounded-l-full text-primary placeholder:text-primary"
                type="email"
                placeholder="Seu email"
              />
              <button
                type="submit"
                className="rounded-r-full bg-white border border-primary w-1/4 text-primary"
              >
                <ChevronRight className="m-auto" />
              </button>
            </form>
          </div>
          <div className="h1-logo lg:text-[10rem] md:text-[8rem] text-[5rem] self-end flex place-content-center col-span-full leading-none text-nowrap">
            <span>Vitrine Pro</span>
          </div>
        </div>
      </div>
      <div className="px-14 mt-4 mx-auto flex justify-between">
        <div className="flex">
          <LinkedinIcon />
          <GithubIcon />
        </div>
        <div>
          <span className="text-sm">
            © 2026 Vitrine Pro. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
