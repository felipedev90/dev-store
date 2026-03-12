/*
Componente Container: Este componente é responsável por envolver o conteúdo da página e fornecer uma estrutura de layout consistente. 
Utiliza classes do Tailwind CSS para centralizar o conteúdo e adicionar espaçamento horizontal. 
O Container é usado para garantir que o conteúdo da página seja exibido de forma organizada e responsiva, independentemente do tamanho da tela. 
É um componente reutilizável que pode ser utilizado em várias partes do aplicativo para manter a consistência visual.
*/

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
