import Image from "next/image";
import Button from "./ui/Button";
import { Redo } from "lucide-react";
import { HeroScrollWrapper } from "./HeroScrollWrapper";
import HeroLeft from "@/assets/hero-left.jpg";
import HeroRight from "@/assets/hero-right.jpg";

export default function Hero() {
  return (
    <HeroScrollWrapper>
      <section className="relative w-full h-full rounded-2xl overflow-hidden lg:row-span-2">
        <Image
          src={HeroLeft}
          alt="Imagem de soul chentu por Pixabay"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[0_30%]"
          placeholder="blur"
        />
      </section>

      <section className="hidden lg:block w-full h-full overflow-hidden rounded-2xl relative">
        <Image
          src={HeroRight}
          alt="Imagem de Pexels por Pixabay"
          fill
          priority
          sizes="50vw"
          className="object-cover"
          placeholder="blur"
        />
      </section>
      <section className="w-full h-full bg-accent-bg rounded-2xl flex flex-col items-center justify-center text-center p-10 text-white ">
        <h2 className="text-2xl font-medium mb-6 tracking-widest">
          Coleção Verão 2026!
        </h2>
        <Button className="gap-2">
          Confira
          <Redo className="rotate-x-180" strokeWidth={1} />
        </Button>
      </section>
    </HeroScrollWrapper>
  );
}
