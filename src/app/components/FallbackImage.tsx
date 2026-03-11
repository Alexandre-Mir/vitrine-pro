"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

interface FallbackImageProps extends ImageProps {
  fallbackClassName?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackClassName,
  ...props
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-secondary/40 text-subtitle rounded-lg w-full h-full ${fallbackClassName || ""}`}
      >
        <ImageOff size={24} className="opacity-50 mb-2" />
        <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 text-center">
          Sem Imagem
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
