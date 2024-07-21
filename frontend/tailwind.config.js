/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey': '#7f7f7f',
        'user': '#f4f4f4'
      }
    },
  },
  plugins: [],
}