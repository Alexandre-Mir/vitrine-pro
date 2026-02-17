import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeProviderWrapper from "./providers/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { getCategories } from "@/services/product";

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
  const categories = await getCategories();
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <CartProvider>
          <ThemeProviderWrapper>
            <Header categories={categories} />
            <div className="pt-[--header-height]">{children}</div>
            <Footer />
          </ThemeProviderWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
