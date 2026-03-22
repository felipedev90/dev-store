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

      <div className="flex gap-2">
        <button
          onClick={() => handleCategory("")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Todos
        </button>
        <button
          onClick={() => handleCategory("keyboards")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Teclados
        </button>
        <button
          onClick={() => handleCategory("mice")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Mouses
        </button>
        <button
          onClick={() => handleCategory("headsets")}
          className="border border-black rounded-lg cursor-pointer   px-4 py-1"
        >
          Headsets
        </button>
        <button
          onClick={() => handleCategory("monitors")}
          className="border border-black rounded-lg cursor-pointer  px-4 py-1"
        >
          Monitores
        </button>
        <button
          onClick={() => handleCategory("accessories")}
          className="border border-black rounded-lg cursor-pointer   px-4 py-1"
        >
          Acessórios
        </button>
      </div>

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
  );
}
