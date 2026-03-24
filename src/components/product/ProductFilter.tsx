/* 
Esse componente fornece uma interface para os usuários filtrarem e ordenarem os produtos. Ele inclui:
- Um campo de busca para pesquisar produtos por nome ou descrição.
- Botões para filtrar por categoria (teclados, mouses, headsets, monitores e acessórios).
- Um dropdown para ordenar os produtos por critérios como mais recentes, menor preço, maior preço e mais avaliados.
- Ele atualiza a URL com os parâmetros de filtro e ordenação, permitindo que os usuários compartilhem links específicos de produtos filtrados.
*/

"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilter() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Função usada pelo form de busca e pelo select de ordenação
  function updateFilter(key: string, value: string) {
    // Cria uma cópia dos params atuais da URLS
    const params = new URLSearchParams(searchParams.toString());

    // Adiciona ou atualiza o filtro
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Navega com todos os params
    router.push(`/products?${params.toString()}`);
  }

  // Função usada pelos botões de categoria
  function handleCategory(category: string) {
    const param = new URLSearchParams(searchParams.toString());

    if (category) {
      param.set("category", category);
    } else {
      param.delete("category");
    }
    param.delete("q");
    setSearch("");
    router.push(`/products?${param.toString()}`);
  }

  // Função usada pelo form de busca
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param = new URLSearchParams(searchParams.toString());

    if (search) {
      param.set("q", search);
    } else {
      param.delete("q");
    }
    param.delete("category");
    router.push(`/products?${param.toString()}`);
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto gap-4 py-8">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produtos..."
          className="border rounded-lg px-4 py-1 mx-2"
        />
        <button
          type="submit"
          className="bg-gray-600 text-white border rounded-lg cursor-pointer hover:bg-gray-900 px-4 py-1"
        >
          Buscar
        </button>
      </form>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          onChange={(e) => handleCategory(e.target.value)}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          <option value="">Filtrar por categoria</option>
          <option value="">Todos</option>
          <option value="keyboards">Teclados</option>
          <option value="mice">Mouses</option>
          <option value="headsets">Headsets</option>
          <option value="monitors">Monitores</option>
          <option value="accessories">Acessórios</option>
        </select>
        <select
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          <option value="">Ordenar por</option>
          <option value="recent">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Mais avaliados</option>
        </select>
      </div>
    </div>
  );
}
