import { ChevronRight, GithubIcon, LinkedinIcon } from "lucide-react";
import Button from "./ui/Button";

export default function Footer() {
  return (
    <footer className="bg-background text-primary py-16 ">
      <div className="md:px-14 md:max-w-full max-w-xs mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-2 gap-12 lg:gap-16">
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Sobre </h4>
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
                className="bg-background border border-primary h-14 w-full py-3 pl-5 rounded-l-full text-primary placeholder:text-primary"
                type="email"
                placeholder="Seu email"
              />
              <Button
                type="submit"
                variant="outline"
                size="none"
                className="rounded-r-full w-1/4"
                aria-label="Assinar newsletter"
              >
                <ChevronRight size={20} className="m-auto" />
              </Button>
            </form>
          </div>
          <div className="h1-logo mt-10 lg:text-[10rem] md:text-[8rem] text-[4rem] self-end flex place-content-center col-span-full leading-none text-nowrap">
            <span>Vitrine Pro</span>
          </div>
        </div>
      </div>
      <div className="md:px-14 mt-4 md:max-w-full max-w-xs mx-auto flex md:justify-between flex-col md:flex-row justify-center ">
        <div className="flex gap-2">
          <LinkedinIcon />
          <GithubIcon />
        </div>
        <div className="mt-1">
          <span className="text-sm">
            © 2026 Vitrine Pro. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
