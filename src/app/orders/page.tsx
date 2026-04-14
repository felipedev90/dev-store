import { apiClient } from "@/lib/api";
import { Product } from "@/types";
import { cookies } from "next/headers";
import Container from "@/components/layout/Container";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
}

export default async function OrdersPage() {
  // Le o cookie para pegar o token de autenticação
  const cookieStore = await cookies();
  // Faz a requisição para a API de pedidos, passando o token no header de autorização
  const token = cookieStore.get("auth-token")?.value;
  // Chama a API para buscar os pedidos do usuário autenticado
  const orders = await apiClient<Order[]>("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-2"
          >
            &larr; Voltar para produtos
          </Link>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">
            Meus Pedidos
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-gray-600 font-medium">
                Você ainda não realizou nenhum pedido.
              </p>
              <Link
                href="/products"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                Começar a comprar
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                // Calcula o total do pedido
                const orderTotal = order.items.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                );

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    {/* Cabeçalho do Pedido - Resumo Rápido */}
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                            Pedido realizado
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                            Total
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {formatPrice(orderTotal)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 text-right">
                          ID: {order.id.slice(0, 8)}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Confirmado
                        </span>
                      </div>
                    </div>

                    {/* Lista de Itens */}
                    <ul className="divide-y divide-gray-100">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="p-4 flex items-center gap-4"
                        >
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h4 className="text-sm font-bold">
                                {item.product.name}
                              </h4>
                              <p className="ml-4 text-sm font-mono">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Qtd: {item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Rodapé do Card - Ações rápidas */}
                    <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                      <button className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tighter">
                        Precisa de ajuda com este pedido?
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
