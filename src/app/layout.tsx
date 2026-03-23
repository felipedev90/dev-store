import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/globals.css";
import CartSidebar from "@/components/cart/CartSideBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Store",
  description: "A sua loja Dev!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="flex-1 pt-18">{children}</main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
