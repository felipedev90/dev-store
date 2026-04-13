

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  // Lê a variável de ambiente e monta a URL completa
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${baseUrl}${endpoint}`;

  // Monta os headers padrão e mescla com as options recebidas
  const defaultHeaders = {
    "Content-type": "application/json",
  };

  // Configura o objeto de configuração para o fetch, mesclando os headers
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  };

  // Chama o fetch nativo
  const response = await fetch(url, config);

  // Tratamento de erro
  if (!response.ok) {
    throw new Error(`Erro na API: Status ${response.status} ao acessar ${url}`);
  }

  return response.json() as Promise<T>;
}
