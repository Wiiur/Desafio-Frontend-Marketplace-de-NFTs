import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#140D0A", // Fundo principal
        surface: "#241612",    // Fundo dos cartões e modais (card)
        foreground: "#F5F1EB", // Cor do texto normal
        primary: {
          DEFAULT: "#D28A4C",  // Laranja de destaque/ação
          foreground: "#140D0A", // Cor do texto dentro dos botões (para contraste)
        },
        muted: {
          DEFAULT: "#CFB28C",  // Textos secundários
          foreground: "#CFB28C", 
        },
        highlight: "#E89B55",  // Letras em destaque extra
        // Mapeamento extra para os componentes do shadcn/ui
        card: {
          DEFAULT: "#241612",
          foreground: "#F5F1EB",
        },
        border: "#CFB28C",
      },
      fontFamily: {
        sans: ['"Roboto Mono"', 'monospace'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;