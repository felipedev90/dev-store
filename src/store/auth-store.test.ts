import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useAuthStore } from "./auth-store";

const mockUser = { name: "Felipe Augusto", email: "felipe@example.com" };

describe("Auth Store", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("login", () => {
    it("deve salvar o token no estado ao fazer login", () => {
      const { login } = useAuthStore.getState();

      login("token-abc-123", mockUser);

      expect(useAuthStore.getState().token).toBe("token-abc-123");
    });

    it("deve salvar o usuário no estado ao fazer login", () => {
      const { login } = useAuthStore.getState();

      login("token-abc-123", mockUser);

      expect(useAuthStore.getState().user).toEqual(mockUser);
    });

    it("deve aceitar user null e salvar apenas o token", () => {
      const { login } = useAuthStore.getState();

      login("token-abc-123", null);

      expect(useAuthStore.getState().token).toBe("token-abc-123");
      expect(useAuthStore.getState().user).toBeNull();
    });

    it("deve definir o cookie auth-token ao fazer login", () => {
      const cookieSpy = vi.spyOn(document, "cookie", "set");
      const { login } = useAuthStore.getState();

      login("token-abc-123", mockUser);

      expect(cookieSpy).toHaveBeenCalledWith(
        expect.stringContaining("auth-token=token-abc-123"),
      );
    });

    it("deve definir o cookie com path=/ e max-age=3600", () => {
      const cookieSpy = vi.spyOn(document, "cookie", "set");
      const { login } = useAuthStore.getState();

      login("token-abc-123", mockUser);

      const cookieValue = cookieSpy.mock.calls[0][0];
      expect(cookieValue).toContain("path=/");
      expect(cookieValue).toContain("max-age=3600");
    });
  });

  describe("logout", () => {
    beforeEach(() => {
      useAuthStore.setState({ token: "token-existente", user: mockUser });
    });

    it("deve limpar o token ao fazer logout", () => {
      const { logout } = useAuthStore.getState();

      logout();

      expect(useAuthStore.getState().token).toBeNull();
    });

    it("deve limpar o usuário ao fazer logout", () => {
      const { logout } = useAuthStore.getState();

      logout();

      expect(useAuthStore.getState().user).toBeNull();
    });

    it("deve expirar o cookie auth-token ao fazer logout", () => {
      const cookieSpy = vi.spyOn(document, "cookie", "set");
      const { logout } = useAuthStore.getState();

      logout();

      const cookieValue = cookieSpy.mock.calls[0][0];
      expect(cookieValue).toContain("auth-token=");
      expect(cookieValue).toContain("max-age=0");
    });

    it("não deve manter dados do usuário anterior após logout seguido de novo login", () => {
      const { logout, login } = useAuthStore.getState();
      const novoUsuario = { name: "Outro User", email: "outro@example.com" };

      logout();
      login("novo-token", novoUsuario);

      expect(useAuthStore.getState().token).toBe("novo-token");
      expect(useAuthStore.getState().user).toEqual(novoUsuario);
    });
  });
});
