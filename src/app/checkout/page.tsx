"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckoutFormData } from "@/types";
import { useCartStore } from "@/store/cart-store";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button"; // Supondo que você tem esse componente

export default function CheckoutPage(){
    const router = useRouter();
    const clearCart = useCartStore((state) => state.clearCart);
    const [formData, setFormData] = useState<CheckoutFormData>({
        fullName: "", email: "", phone: "",
        address: { street: "", number: "", complement: "", neighborhood: "", city: "", state: "", zipCode: "" },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();        
        clearCart();
        router.push("/checkout/success");
    }

    // Criei uma string de classes comuns para não poluir tanto o HTML
    const inputClasses = "w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <Container>
            <div className="flex flex-col items-center px-4 py-8">
                
                <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8">
                    
                    {/* --- SESSÃO 1: DADOS PESSOAIS --- */}
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
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="phone" className={labelClasses}>Telefone</label>
                                <input id="phone" type="tel" required className={inputClasses}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- SESSÃO 2: ENDEREÇO --- */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Endereço de Entrega</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            <div className="sm:col-span-4">
                                <label htmlFor="zipCode" className={labelClasses}>CEP</label>
                                <input id="zipCode" type="text" required className={inputClasses}
                                    value={formData.address.zipCode}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, zipCode: e.target.value}})}
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
                                <input id="state" type="text" required className={inputClasses} maxLength={2} placeholder="SP"
                                    value={formData.address.state}
                                    onChange={(e) => setFormData({...formData, address: {...formData.address, state: e.target.value.toUpperCase()}})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        {/* Usei botão padrão com w-full no mobile e tamanho normal no desktop */}
                        <button type="submit" className="w-full md:w-auto md:float-right bg-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-blue-700 transition-colors">
                            Finalizar Compra
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
}