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
          indigo: '#a5b4fc',
          purple: '#c084fc',
          mint: '#6ee7b7',
          sky: '#7dd3fc',
          rose: '#f472b6',
          peach: '#fdba74',
          lavender: '#e0e7ff',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#a5b4fc',
          500: '#818cf8',
          600: '#6366f1',
          accent: '#7dd3fc',
        },
        dark: {
          bg: '#080c16',
          surface: '#0f172a',
          card: 'rgba(15, 23, 42, 0.32)',
          border: 'rgba(255, 255, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'acrylic-sm': '0 4px 20px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
        'acrylic-md': '0 12px 40px 0 rgba(0, 0, 0, 0.35), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.3)',
        'acrylic-glow': '0 0 35px 0 rgba(165, 180, 252, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
      },
      backdropBlur: {
        acrylic: '36px',
      }
    },
  },
  plugins: [],
};
