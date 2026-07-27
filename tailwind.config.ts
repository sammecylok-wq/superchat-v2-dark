import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Manrope", '"Noto Sans SC"', "system-ui", "sans-serif"],
      },
      colors: {
        navy: "#F4F8FC",
        ink: "#F4F8FC",
        muted: "#B7C5D6",
        surface: "#0B1728",
        line: "#213953",
        brand: { 50: "#101F33", 100: "#213953", 500: "#2878C8", 600: "#3B8ED8", 700: "#57A2E6" },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 8, 20, 0.24)",
      },
    },
  },
  plugins: [],
} satisfies Config;
