"use client";

import { useEffect, useState, ReactNode } from "react";

export function HeroScrollWrapper({ children }: { children: ReactNode }) {
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
      {children}
    </section>
  );
}
