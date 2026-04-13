"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { X } from "lucide-react";

interface LoginResponse {
  token: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((state) => state.login); // Acessa a função de login do Zustand

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Faz a requisição de login para a API e espera a resposta contendo o token
      const response = await apiClient<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Chama a função de login do Zustand para armazenar o token e as informações do usuário
      login(response.token, null);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    /* Overlay (Layover) que cobre toda a tela */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {/* Container do Formulário centralizado */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 md:p-8"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 text-center">
            Entrar na conta
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClasses}>
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Mensagem de Erro estilizada */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Botão padronizado com o Checkout */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <Link
          href="/register"
          replace
          className="mt-4 block text-center text-blue-600 hover:underline"
        >
          Criar uma conta
        </Link>
      </form>
    </div>
  );
}
