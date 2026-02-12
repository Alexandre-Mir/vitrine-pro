import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-primary flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p className="text-center">
        Desculpe, mas a página que você está tentando acessar não foi
        encontrada.
      </p>
      <Link
        href="/"
        className="bg-secondary text-primary hover:bg-secondary/80 rounded-lg py-3 px-8 text-xs"
      >
        Voltar para a página inicial
      </Link>
    </main>
  );
}
