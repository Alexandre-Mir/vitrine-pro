import { useEffect, useRef, useState } from "react";

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);
  const threshold = 5;

  useEffect(() => {
    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      const direction = scrollY > lastScrollY.current ? "down" : "up";

      if (
        direction !== scrollDir &&
        Math.abs(scrollY - lastScrollY.current) > threshold
      ) {
        setScrollDir(direction);
      }

      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [scrollDir]);

  return scrollDir;
}
