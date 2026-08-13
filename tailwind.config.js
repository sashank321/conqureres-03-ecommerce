/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          indigo: '#c7d2fe',
          purple: '#e9d5ff',
          mint: '#a7f3d0',
          sky: '#bae6fd',
          rose: '#fbcfe8',
          peach: '#fed7aa',
          lavender: '#f5f3ff',
        },
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          400: '#c7d2fe',
          500: '#a5b4fc',
          600: '#818cf8',
          accent: '#bae6fd',
        },
        dark: {
          bg: '#000000',
          surface: '#050505',
          card: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'acrylic-sm': '0 4px 20px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
        'acrylic-md': '0 12px 40px 0 rgba(0, 0, 0, 0.6), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.4)',
        'acrylic-glow': '0 0 35px 0 rgba(255, 255, 255, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)',
      },
      backdropBlur: {
        acrylic: '40px',
      }
    },
  },
  plugins: [],
};
