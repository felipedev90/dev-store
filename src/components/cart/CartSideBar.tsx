"use client";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";
import { Trash2Icon, CircleXIcon } from "lucide-react";
import { useEffect } from "react";

export default function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    isCartOpen,
    toggleCart,
  } = useCartStore();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={toggleCart}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full max-w-md bg-white shadow-xl p-5 overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Carrinho:</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-red-500 font-bold p-2"
          >
            <CircleXIcon className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        <div className="mt-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh]">
              <p className="text-lg text-gray-500">Seu carrinho está vazio.</p>
              <Link
                href="/products"
                onClick={toggleCart}
                className="text-blue-500 hover:underline mt-2 inline-block font-medium"
              >
                Continuar comprando
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              {items.map((item) => (
                <div key={item.product.id} className="py-4 border-b flex gap-4">
                  <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          const confirm = window.confirm(
                            `Deseja remover ${item.product.name} do carrinho?`,
                          );
                          if (confirm) removeItem(item.product.id);
                        }}
                        className="text-red-500 p-2 hover:bg-red-50 rounded cursor-pointer"
                        title="Remover item"
                      >
                        <Trash2Icon className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-gray-700">
                      Subtotal:{" "}
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between font-bold text-xl py-4">
              <span>Total:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>

            <Link href="/checkout" className="w-full">
              <Button
                variant="primary"
                className="w-full py-3 cursor-pointer"
                onClick={toggleCart}
              >
                Finalizar Compra
              </Button>
            </Link>

            <Button
              variant="secondary"
              className="w-full py-3 flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => {
                const confirm = window.confirm(
                  `Deseja remover todos os itens do carrinho?`,
                );
                if (confirm) clearCart();
              }}
            >
              <Trash2Icon className="w-4 h-4 " />
              Limpar Carrinho
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
