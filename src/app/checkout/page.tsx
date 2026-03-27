"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckoutFormData } from "@/types";
import { useCartStore } from "@/store/cart-store";
import Container from "@/components/layout/Container";
import { formatCep, formatPhone } from "@/lib/utils";
import { useCep } from "@/hooks/useCep";

export default function CheckoutPage(){
    const router = useRouter();
    const clearCart = useCartStore((state) => state.clearCart);
    const { fetchCep, isLoadingCep } = useCep();
    const [formData, setFormData] = useState<CheckoutFormData>({
        fullName: "", email: "", phone: "",
        address: { street: "", number: "", complement: "", neighborhood: "", city: "", state: "", zipCode: "" },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();        
        clearCart();
        router.push("/checkout/success");
    }

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // Formata o CEP enquanto o usuário digita
        const newCep = formatCep(e.target.value);
        setFormData({...formData, address: {...formData.address, zipCode: newCep}});

        // Quando o CEP estiver completo (8 dígitos + hífen), busca os dados do endereço
        if(newCep.length === 9){
            const addressData = await fetchCep(newCep);

            // Se o CEP for válido, preenche os campos de endereço automaticamente
            if(addressData){
                setFormData((prev) => ({
                    ...prev,
                    address: {
                        ...prev.address,
                        ...addressData,
                    }
                }));
                document.getElementById("number")?.focus();
            } else {
                alert("CEP não encontrado. Por favor, verifique e tente novamente.");
            }
        }
    }

    // Classes comuns para inputs e labels para manter consistência no design
    const inputClasses = "w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <Container>
            <div className="flex flex-col items-center px-4 py-8">
                
                <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 md:p-8">
                    
                    {/* --- DADOS PESSOAIS --- */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Dados Pessoais</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label htmlFor="fullName" className={labelClasses}>Nome completo</label>
                                <input id="fullName" type="text" required className={inputClasses}
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className={labelClasses}>Email</label>
                                <input id="email" type="email" required className={inputClasses}
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="email@email.com.br"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="phone" className={labelClasses}>Telefone</label>
                                <input id="phone" type="tel" required className={inputClasses} placeholder="(00) 00000-0000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: formatPhone(e.target.value)})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- ENDEREÇO --- */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end border-b pb-2 mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Endereço de Entrega</h2>
                            {isLoadingCep && <span className="text-sm text-blue-600 font-medium animate-pulse">Buscando endereço...</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            <div className="sm:col-span-4">
                                <label htmlFor="zipCode" className={labelClasses}>CEP</label>
                                <input id="zipCode" type="text" required className={inputClasses} placeholder="00000-000"
                                    value={formData.address.zipCode}
                                    onChange={handleCepChange}
                                />
                            </div>

                            <div className="sm:col-span-8">
                                <label htmlFor="street" className={labelClasses}>Rua</label>
                                <input id="street" type="text" required className={inputClasses}
                                    value={formData.address.street}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, street: e.target.value}})}
                                />
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="number" className={labelClasses}>Número</label>
                                <input id="number" type="text" required className={inputClasses}
                                    value={formData.address.number}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, number: e.target.value}})}
                                />
                            </div>

                            <div className="sm:col-span-8">
                                <label htmlFor="complement" className={labelClasses}>Complemento (Opcional)</label>
                                <input id="complement" type="text" className={inputClasses}
                                    value={formData.address.complement}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, complement: e.target.value}})}
                                />
                            </div>

                            <div className="sm:col-span-5">
                                <label htmlFor="neighborhood" className={labelClasses}>Bairro</label>
                                <input id="neighborhood" type="text" required className={inputClasses}
                                    value={formData.address.neighborhood}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, neighborhood: e.target.value}})}
                                />
                            </div>

                            <div className="sm:col-span-5">
                                <label htmlFor="city" className={labelClasses}>Cidade</label>
                                <input id="city" type="text" required className={inputClasses}
                                    value={formData.address.city}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, city: e.target.value}})}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="state" className={labelClasses}>Estado</label>
                                <input id="state" type="text" required className={inputClasses} maxLength={2}
                                    value={formData.address.state}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, state: e.target.value.toUpperCase()}})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <button type="submit" className="w-full md:w-auto md:float-right bg-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-blue-700 transition-colors">
                            Finalizar Compra
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
}