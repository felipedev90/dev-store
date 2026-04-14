import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthStore {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user: AuthUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Define o estado inicial do token e do usuário como null
      token: null,
      user: null,

      // Define a função de login que atualiza o token e as informações do usuário no estado
      login: (token, user) => {
        set({ token, user });
        // Armazena o token no cookie para persistência entre sessões
        document.cookie = `auth-token=${token}; path=/; max-age=3600; samesite=strict`;
      },
      logout: () => {
        set({ token: null, user: null });
        document.cookie = "auth-token=; path=/; max-age=0; samesite=strict";
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
