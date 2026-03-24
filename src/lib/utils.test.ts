import { formatPrice, getDiscountPercentage, cn, formatCep, formatPhone } from "./utils";
import { it, describe, expect } from "vitest";

describe("formatPrice", () => {
  it("deve formatar o preço corretamente",() => {
    const resultado = formatPrice(29990);

    expect(resultado).toMatch(/R\$\s?299,90/);
  });

  it("deve formatar 1234.56 com ponto separando os milhares", () => {
    const resultado = formatPrice(123456);

    expect(resultado).toMatch(/R\$\s?1\.234,56/);
  })

  it("deve formatar corretamente os valores em centavos", () => {
    const resultado = formatPrice(0.50);

    expect(resultado).toMatch(/R\$\s?0,01/);
  })

  it("deve formatar corretamente quando o valor for 0", () => {
    const resultado = formatPrice(0);

    expect(resultado).toMatch(/R\$\s?0,00/);
  })

  it("deve formatar valores altos com múltiplos separadores de milhares", () => {
    const resultado = formatPrice(123456789);

    expect(resultado).toMatch(/R\$\s?1\.234\.567,89/);
  })
})

describe("getDiscountPercentage", () => {
  it("deve calcular a porcentagem de desconto corretamente", () => {
    const resultado = getDiscountPercentage(29990, 39990);

    expect(resultado).toBe(25);
  });

  it("deve retornar 0% de desconto quando os preços forem iguais", () => {
    const resultado = getDiscountPercentage(29990, 29990);

    expect(resultado).toBe(0);
  })

  it("deve retornar 100% de desconto quando o preço atual for 0", () => {
    const resultado = getDiscountPercentage(0, 29990);

    expect(resultado).toBe(100);
  })
})

describe("cn", () => {
  it("deve concatenar classes corretamente", () => {
    const resultado = cn("bg-white", true && "border-blue-500", false && "opacity-50");

    expect(resultado).toBe("bg-white border-blue-500");
  });

  it("deve retornar uma string vazia quando nenhuma classe for verdadeira", () => {
    const resultado = cn(false && "bg-white", false && "border-blue-500", false && "opacity-50");

    expect(resultado).toBe("");
  });

  it("deve concatenar classes corretamente mesmo com valores undefined", () => {
    const resultado = cn("bg-white", undefined, "border-blue-500", false && "opacity-50");

    expect(resultado).toBe("bg-white border-blue-500");
  });

  it("deve concatenar classes corretamente quando todas forem verdadeiras", () => {
    const resultado = cn("bg-white", true && "border-blue-500", true && "opacity-50");

    expect(resultado).toBe("bg-white border-blue-500 opacity-50");
  });
});

describe("formatCep", () => {
  it("deve formatar o CEP corretamente", () => {
    const resultado = formatCep("12345678");

    expect(resultado).toBe("12345-678");
  });

  it("deve remover caracteres não numéricos e formatar corretamente", () => {
    const resultado = formatCep("12a34b5678");

    expect(resultado).toBe("12345-678");
  });

  it("deve limitar o CEP a 8 dígitos", () => {
    const resultado = formatCep("1234567890");

    expect(resultado).toBe("12345-678");
  });
});

describe("formatPhone", () => {
  it("deve formatar o telefone corretamente", () => {
    const resultado = formatPhone("11987654321");

    expect(resultado).toBe("(11) 98765-4321");
  });

  it("deve remover caracteres não numéricos e formatar corretamente", () => {
    const resultado = formatPhone("11a987b654321");

    expect(resultado).toBe("(11) 98765-4321");
  });

  it("deve limitar o telefone a 11 dígitos", () => {
    const resultado = formatPhone("119876543210");

    expect(resultado).toBe("(11) 98765-4321");
  });
});
