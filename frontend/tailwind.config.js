// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkblue: "#2E3559",
          steelblue: "#4E7A95",
          gray: "#6C6C6C",
          forest: "#1C3B22",
          coffee: "#4D300B",
          light: "#ededed"
        },
      },
    },
  },
  plugins: [],
}