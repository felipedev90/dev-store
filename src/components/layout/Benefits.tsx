import { Truck, Shield, CreditCard } from "lucide-react";

export default function Benefits() {
  return (
    <section className="py-18 hidden md:block">
      <div className="relative">
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-8 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center  space-x-2">
            <Truck size={24} />
            <span className="text-sm lg:text-base">
              <strong className="text-blue-800">Frete grátis</strong> acima de
              R$ 200
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={24} />
            <span className="text-sm lg:text-base">
              <strong className="text-blue-800">Compra segura</strong>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard size={24} />
            <span className="text-sm lg:text-base">
              <strong className="text-blue-800">Parcelamento</strong> em até 12x
              sem juros
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
