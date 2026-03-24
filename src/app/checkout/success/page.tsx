"use client"; // Obrigatório para usar useState e useEffect
import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";


export default function CheckoutSuccessPage() {
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsProcessing(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    if (isProcessing) {
        return (
            <Container>
                <div className="flex flex-col items-center px-4 py-16 w-full max-w-md mx-auto gap-4">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 animate-pulse">
                        Processando seu pagamento...
                    </h2>
                    <Skeleton className="w-full h-12 rounded-xl" />
                    <Skeleton className="w-full h-32 rounded-xl mt-4" />
                    <div className="w-full flex justify-between mt-2 gap-4">
                        <Skeleton className="w-1/2 h-8 rounded-lg" />
                        <Skeleton className="w-1/3 h-8 rounded-lg" />
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="flex flex-col items-center justify-center px-4 py-24 gap-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    {/* Checkmark em SVG */}
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                
                <h1 className="text-4xl font-bold text-green-600">
                    Pedido realizado com sucesso!
                </h1>
                
                <p className="text-gray-600 text-lg">
                    Obrigado pela sua compra. Enviamos os detalhes para o seu email.
                </p>
                
                <Link 
                    href="/" 
                    className="text-md text-blue-500 hover:underline mb-4 pt-4 inline-block">
                    &larr; Voltar
                </Link>
            </div>
        </Container>
    );
}