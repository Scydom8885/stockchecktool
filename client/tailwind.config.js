/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // green
        background: '#f1f1f1',
        headerFont: '#f1f1f1',
        textDark: '#4a4a4a',
      },
    },
  },
  plugins: [],
}
