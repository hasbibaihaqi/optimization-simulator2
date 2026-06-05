/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Kita membiarkan palet warna bawaan Tailwind tetap utuh
      // Hanya menambahkan font khusus untuk kesan Scientific/AI
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}