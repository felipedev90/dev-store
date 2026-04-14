"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { X } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Como não precisamos extrair token, apenas aguardamos a chamada concluir
      await apiClient("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        "Erro ao registrar. Verifique suas informações ou tente outro e-mail.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Variáveis para manter consistência com as outras páginas
  const inputClasses =
    "w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
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
            Criar nova conta
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className={inputClasses}
              />
            </div>
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

        {/* Mensagem de Erro estilizada no mesmo padrão do Login */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Botão padronizado */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
