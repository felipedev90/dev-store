"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilter() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFilter("q", search);
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
          onClick={() => updateFilter("category", "")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Todos
        </button>
        <button
          onClick={() => updateFilter("category", "keyboards")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Teclados
        </button>
        <button
          onClick={() => updateFilter("category", "mice")}
          className="border border-black rounded-lg cursor-pointer px-4 py-1"
        >
          Mouses
        </button>
        <button
          onClick={() => updateFilter("category", "headsets")}
          className="border border-black rounded-lg cursor-pointer   px-4 py-1"
        >
          Headsets
        </button>
        <button
          onClick={() => updateFilter("category", "monitors")}
          className="border border-black rounded-lg cursor-pointer  px-4 py-1"
        >
          Monitores
        </button>
        <button
          onClick={() => updateFilter("category", "accessories")}
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
