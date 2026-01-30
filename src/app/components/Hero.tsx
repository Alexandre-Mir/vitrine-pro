"use client";

import { useEffect, useState } from "react";

import { Redo } from "lucide-react";
import Image from "next/image";
import Button from "./ui/Button";

export default function Hero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const fadeStart = 0;
      const fadeEnd = windowHeight * 0.8;

      let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);

      newOpacity = Math.max(0, Math.min(1, newOpacity));

      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      style={{ opacity, willChange: "opacity" }}
      className="w-full bg-secondary sticky top-0 h-svh p-4 grid grid-cols-1 lg:grid-cols-2 grid-rows-[2fr_1fr] gap-4 "
    >
      <section className="relative w-full h-full rounded-2xl overflow-hidden lg:row-span-2">
        <Image
          src="/hero-left.jpg"
          alt="Imagem de soul chentu por Pixabay"
          fill
          priority
          className="object-cover object-[0_30%]"
        />
      </section>

      <section className="hidden lg:block w-full h-full overflow-hidden rounded-2xl relative">
        <Image
          src="/hero-right.jpg"
          alt="Imagem de Pexels por Pixabay"
          fill
          priority
          className="object-cover"
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
    </section>
  );
}
