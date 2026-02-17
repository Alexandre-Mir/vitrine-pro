import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeProviderWrapper from "./providers/theme-provider";
import { CartProvider } from "@/context/cart-context";
import getProducts, { getCategories } from "@/services/product";
import { Toaster } from "./components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitrine Pro | E-commerce Next.js",
  description: "Projeto de alta performance com Next.js App Router",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Parallel Data Fetching com Resiliência (Fail-Safe)
  // Se os produtos falharem, o site ainda carrega o menu básico.
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []), // Fallback para array vazio em caso de erro crítico
    getProducts()
      .then((p) => p.slice(0, 3))
      .catch((err) => {
        console.error("Falha ao carregar destaques do menu:", err);
        return []; // Retorna array vazio para não quebrar a UI
      }),
  ]);

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <CartProvider>
          <ThemeProviderWrapper>
            {/* Agora passamos tanto categorias quanto produtos para o Header */}
            <Header categories={categories} featuredProducts={products} />
            <div className="pt-[--header-height]">{children}</div>
            <Footer />
            <Toaster />
          </ThemeProviderWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
