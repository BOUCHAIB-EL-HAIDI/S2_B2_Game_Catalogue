/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // tells IntelliSense to scan your HTML files
  theme: {
    extend: {
      colors: {
        primary: '#131722',
        secondary: '#181D2B',
        third: '#03DCFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
