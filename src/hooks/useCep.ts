import { useState } from "react";
import type { AddressData } from "@/types/checkout";

export function useCep(){
    const [isLoadingCep, setIsLoadingCep] = useState(false);

    const fetchCep = async (cep: string): Promise<AddressData | null> => {
        // Remove tudo que não for número
        const cleanCep = cep.replace(/\D/g, ""); 

         // CEP deve ter 8 dígitos
        if(cleanCep.length !== 8) return null;
        setIsLoadingCep(true);

        try{
            // Consulta a API do ViaCEP
            const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await res.json();

            // Se o CEP for válido, retorna os dados do endereço
            if(!data.erro){
                return {
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf
                }
             }
             // Se o CEP for inválido ou ocorrer algum erro, retorna null
             return null;

        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            return null;
            
        } finally {
            setIsLoadingCep(false);
                }
            }
            return { 
                fetchCep, isLoadingCep
            }
        }

