import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu Perfil | Vitrine Pro",
  description:
    "Acesse seu perfil na Vitrine Pro. Gerencie seus pedidos, endereços, favoritos e configurações da sua conta.",
  openGraph: {
    title: "Meu Perfil | Vitrine Pro",
    description:
      "Acesse seu perfil na Vitrine Pro. Gerencie seus pedidos e configurações.",
    type: "website",
  },
};

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
