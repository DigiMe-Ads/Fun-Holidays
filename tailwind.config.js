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
        sans: ['Titillium Web', 'sans-serif'],
        display: ['Orange Lemonade', 'sans-serif'],
      },
    },
  },
  plugins: [],
};