import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Vitrine Pro",
  description:
    "Entre em contato com a Vitrine Pro. Estamos prontos para ajudar com dúvidas, sugestões e suporte.",
  openGraph: {
    title: "Contato | Vitrine Pro",
    description:
      "Entre em contato com a Vitrine Pro. Estamos prontos para ajudar.",
    type: "website",
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
