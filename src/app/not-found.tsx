import Link from "next/link"
import Container from "@/components/layout/Container"

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-xl font-bold text-gray-800">Página não encontrada</h2>
        <p className="text-gray-600">A página que você procura não existe.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4">
          &larr; Voltar para a home
        </Link>
      </div>
    </Container>
  )
}