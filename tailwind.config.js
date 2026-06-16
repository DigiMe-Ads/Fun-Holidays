/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F97316",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["Kalam", "cursive"],
        display: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};