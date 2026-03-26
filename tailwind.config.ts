// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      // 1. Define os Keyframes (o movimento)
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          // Move exatamente metade do tamanho do container total duplicado
          "100%": { transform: "translateX(-50%)" },
        },
      },
      // 2. Define a Animação (velocidade e loop)
      animation: {
        // 'ticker' é o nome nas classes
        // 40s é a duração (mais lento = mais suave), linear = velocidade constante, infinite = nunca para
        ticker: "ticker 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
