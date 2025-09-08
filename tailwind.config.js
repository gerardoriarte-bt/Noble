/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fossil: '#373c37',
        khaki: '#B2806d',
        camel: '#b9a695',
        stone: '#e6dfda',
        cloud: '#f2f2f1',
        noir: '#121212',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      },
      transitionTimingFunction: {
        'in-out-circ': 'cubic-bezier(0.87, 0, 0.13, 1)',
      }
    },
  },
  plugins: [],
}
