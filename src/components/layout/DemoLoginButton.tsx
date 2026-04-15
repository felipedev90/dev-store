"use client";

import { useState, useSyncExternalStore } from "react";
import { Settings, CheckCircle, AlertCircle } from "lucide-react";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

interface LoginResponse {
  token: string;
}

// Definindo os estados possíveis do botão
type ButtonState = "idle" | "loading" | "success" | "error";

// Hook para detectar se estamos no cliente (browser) ou no servidor (SSR)
function useIsClient() {
  // Como este componente é "use client", ele só será renderizado no cliente.
  return useSyncExternalStore(
    // Subscrição vazia, pois não precisamos de atualizações.
    () => () => {}, 
    // Sempre retorna true, pois se estamos aqui, estamos no cliente.
    () => true, 
    // No SSR, retornamos false, mas isso não deve acontecer devido ao "use client".
    () => false, 
  );
}

export default function DemoLoginButton() {
  const [state, setState] = useState<ButtonState>("idle");
  const login = useAuthStore((s) => s.login);
  const token = useAuthStore((s) => s.token);
  const isClient = useIsClient();

  // Se não estamos no cliente ou já temos um token, não renderizamos o botão
  if (!isClient || token) return null;

  async function handleDemoLogin() {
    if (state === "loading") return;
    setState("loading");

    try {
      // Simulando uma chamada à API para login
      const response = await apiClient<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({
          email: "demo@devstore.dev",
          password: "demodemo",
        }),
      });

      // Armazenando o token e informações do usuário no estado global
      login(response.token, {
        name: "Recrutador Demo",
        email: "demo@devstore.dev",
      });

      // Exibindo feedback de sucesso
      setState("success");
      setTimeout(() => setState("idle"), 2500);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  // Mapeando os estados para rótulos e cores
  const label = {
    idle: "Modo Demo",
    loading: "Entrando...",
    success: "Logado com sucesso!",
    error: "API offline. Inicie a devstore-api.",
  }[state];

  // Mapeando os estados para classes de cor
  const bgColor = {
    idle: "bg-blue-600 hover:bg-blue-700",
    loading: "bg-blue-500",
    success: "bg-emerald-500",
    error: "bg-red-500",
  }[state];

  return (
    <div className="fixed bottom-6 right-6 z-50 group flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className="
          px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl
          opacity-0 group-hover:opacity-100
          translate-y-1 group-hover:translate-y-0
          transition-all duration-200 pointer-events-none
          max-w-56 text-right
        "
      >
        <p className="font-semibold leading-tight">{label}</p>
        {state === "idle" && (
          <p className="text-gray-400 text-xs mt-0.5">
            Login automático para testes da plataforma. Sem necessidade de
            cadastro!
          </p>
        )}
        {/* Seta apontando para o botão */}
        <span className="absolute -bottom-1.5 right-5 w-3 h-3 bg-gray-900 rotate-45" />
      </div>

      {/* Botão flutuante */}
      <div className="relative">
        {/* Anel pulsante — só exibe no estado idle */}
        {state === "idle" && (
          <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-50" />
        )}

        <button
          onClick={handleDemoLogin}
          disabled={state === "loading"}
          aria-label="Modo Demo — login automático para recrutadores"
          className={`
            relative w-14 h-14 rounded-full shadow-lg
            flex items-center justify-center text-white
            transition-all duration-300 cursor-pointer
            disabled:cursor-not-allowed
            ${bgColor}
          `}
        >
          {state === "idle" && <Settings size={24} />}
          {state === "loading" && (
            <Settings size={24} className="animate-spin" />
          )}
          {state === "success" && <CheckCircle size={24} />}
          {state === "error" && <AlertCircle size={24} />}
        </button>
      </div>
    </div>
  );
}
