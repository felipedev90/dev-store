"use client";
import Link from "next/link";
import Container from "./Container";
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { UserRound, LogOutIcon, Package } from "lucide-react";

const CartIcon = dynamic(() => import("@/components/cart/CartIcon"), {
  ssr: false,
});

const FavoriteIcon = dynamic(
  () => import("@/components/favorites/FavoriteIcon"),
  {
    ssr: false,
  },
);

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function Header() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const isClient = useIsClient();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header id="home" className="bg-white shadow-sm fixed w-full z-50">
      <Container>
        <div className="flex flex-wrap items-center justify-between py-2 px-1 gap-y-2">
          <div className="flex justify-center flex-col md:items-start md:gap-1">
            <Link href="/" className="text-xl font-bold text-shadow-mauve-400">
              DevStore_
            </Link>
            <span className="text-shadow-mauve-400 text-xs md:text-sm text-gray-700">
              A place for developers
            </span>
          </div>

          {/* w-full e order-last no mobile. Voltam ao normal no md: */}
          <nav className="w-full md:w-auto order-last md:order-0">
            <div className="flex items-center justify-center pt-1 gap-3 md:gap-6 text-sm md:text-base">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-200 lg:hidden">|</span>
              <Link
                href="/products"
                className="hover:text-blue-600 transition-colors"
              >
                Produtos
              </Link>
              <span className="text-gray-200 lg:hidden">|</span>
              <Link
                href="/#about"
                className="hover:text-blue-600 transition-colors"
              >
                Sobre nós
              </Link>
              <span className="text-gray-200 lg:hidden">|</span>
              <Link
                href="/#footer"
                className=" hover:text-blue-600 transition-colors"
              >
                Contato
              </Link>
            </div>
          </nav>

          <div className="flex items-center justify-center gap-4 md:gap-4">
            {isClient && token ? (
              <div className="flex items-center gap-4">
                <button onClick={handleLogout}>
                  <LogOutIcon
                    size={24}
                    className="inline-block cursor-pointer"
                    aria-label="Logout"
                  />
                </button>
                <button onClick={() => router.push("/orders")}>
                  <Package
                    size={24}
                    className="inline-block cursor-pointer"
                    aria-label="Pedidos"
                  />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <UserRound
                  size={24}
                  className="inline-block cursor-pointer"
                  aria-label="Login"
                />
              </Link>
            )}
            <FavoriteIcon />
            <CartIcon />
          </div>
        </div>
      </Container>
    </header>
  );
}
