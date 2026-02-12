"use client";
import { useEffect } from "react";
import Button from "./components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, []);
  return (
    <main className="min-h-screen bg-background text-primary flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">Algo deu errado!</h2>
      <Button onClick={reset}>Tentar novamente</Button>
    </main>
  );
}
