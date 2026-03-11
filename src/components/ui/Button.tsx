/*
Componente de botão reutilizável com suporte para variantes e tamanhos personalizados.
- `variant`: Define o estilo do botão (primário, secundário ou outline).
- `size`: Define o tamanho do botão (pequeno, médio ou grande).
- `className`: Permite adicionar classes CSS adicionais para personalização.
- O componente estende as propriedades padrão do botão HTML, permitindo o uso de eventos como onClick, disabled, etc.
*/

import React from "react";
import { cn } from "@/lib/utils";

type variantProps = "primary" | "secondary" | "outline";
type sizeProps = "sm" | "md" | "lg";

// Extendendo as propriedades do botão HTML para incluir variantes e tamanhos personalizados
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variantProps;
  size?: sizeProps;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest // Permite passar outras propriedades do botão, como onClick, disabled, etc.
}: ButtonProps) {
  // Definindo as classes CSS para cada variante
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  // Definindo as classes CSS para cada tamanho
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
