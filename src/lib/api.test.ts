import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient } from "./api";

function mockResponse(
  status: number,
  body?: unknown,
  ok?: boolean,
): Response {
  return {
    ok: ok ?? (status >= 200 && status < 300),
    status,
    json: async () => body,
  } as Response;
}

describe("apiClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  describe("montagem da URL", () => {
    it("deve concatenar NEXT_PUBLIC_API_URL com o endpoint", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(200, []));

      await apiClient("/products");

      expect(fetch).toHaveBeenCalledWith(
        "https://api.example.com/products",
        expect.any(Object),
      );
    });

    it("deve usar string vazia como baseUrl quando a variável de ambiente não estiver definida", async () => {
      delete process.env.NEXT_PUBLIC_API_URL;
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(200, []));

      await apiClient("/products");

      expect(fetch).toHaveBeenCalledWith("/products", expect.any(Object));
    });

    it("deve enviar o header Content-type por padrão", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(200, []));

      await apiClient("/products");

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-type": "application/json",
          }),
        }),
      );
    });

    it("deve mesclar headers customizados com os headers padrão", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(200, []));

      await apiClient("/products", {
        headers: { Authorization: "Bearer token-123" },
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-type": "application/json",
            Authorization: "Bearer token-123",
          }),
        }),
      );
    });

    it("deve retornar o JSON parseado em caso de sucesso", async () => {
      const payload = [{ id: "1", name: "Produto" }];
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(200, payload));

      const result = await apiClient("/products");

      expect(result).toEqual(payload);
    });
  });

  describe("tratamento de erro 500", () => {
    it("deve lançar erro com mensagem contendo a URL ao receber status 500", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(500));

      await expect(apiClient("/products")).rejects.toThrow(
        "Erro interno do servidor ao acessar https://api.example.com/products",
      );
    });

    it("não deve retornar dados ao receber status 500", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(500));

      await expect(apiClient("/products")).rejects.toThrow();
    });
  });

  describe("tratamento de erro 401", () => {
    it("deve lançar erro 'Não autorizado' ao receber status 401", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(401));

      await expect(apiClient("/products")).rejects.toThrow("Não autorizado");
    });

    it("deve limpar o cookie auth-token ao receber status 401", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(401));
      const cookieSpy = vi.spyOn(document, "cookie", "set");

      await expect(apiClient("/products")).rejects.toThrow("Não autorizado");

      expect(cookieSpy).toHaveBeenCalledWith(
        expect.stringContaining("auth-token="),
      );
      expect(cookieSpy).toHaveBeenCalledWith(
        expect.stringContaining("max-age=0"),
      );
    });

    it("deve redirecionar para /login ao receber status 401", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(401));
      const mockLocation = { href: "" };
      vi.stubGlobal("location", mockLocation);

      await expect(apiClient("/products")).rejects.toThrow("Não autorizado");

      expect(mockLocation.href).toBe("/login");
    });
  });

  describe("outros erros HTTP", () => {
    it("deve lançar erro genérico com status e URL para códigos 4xx diferentes de 401", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(404));

      await expect(apiClient("/products")).rejects.toThrow(
        "Erro na API: Status 404 ao acessar https://api.example.com/products",
      );
    });

    it("deve lançar erro genérico para status 403", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(403));

      await expect(apiClient("/products")).rejects.toThrow("Status 403");
    });
  });
});
