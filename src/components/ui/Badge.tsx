/* 
Componente de Badge para exibir informações como descontos ou itens no carrinho.
- `variant`: Define o estilo do badge (desconto ou carrinho).
- `children`: O conteúdo a ser exibido dentro do badge, como o valor do desconto ou a quantidade de itens no carrinho.
*/

type variantProps = "discount" | "cart";

interface BadgeProps {
  children: React.ReactNode;
  variant: variantProps;
}

export default function Badge({ children, variant }: BadgeProps) {
  const variantClasses = {
    discount: "bg-red-500 text-white",
    cart: "bg-blue-600 text-white",
  };

  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
