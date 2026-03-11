/*
Componente de esqueleto (Skeleton) para exibir um placeholder animado enquanto o conteúdo real está sendo carregado.
- `className`: Permite adicionar classes CSS adicionais para personalização do estilo do esqueleto.
- Utiliza a classe `animate-pulse` para criar um efeito de pulsação, indicando que o conteúdo está em processo de carregamento.
*/

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={cn("animate-pulse bg-gray-300", className)} />;
}
