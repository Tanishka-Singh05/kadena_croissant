/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9E0D9',   // Lightest shade
          100: '#E6DBD0',  // Light shade
          200: '#D4C4B5',  // Intermediate
          300: '#C2AD9A',  // Intermediate
          400: '#B0967F',  // Intermediate
          500: '#7D6167',  // Main brand color
          600: '#754F5B',  // Darker
          700: '#5D4954',  // Darkest brand
          800: '#4A3A42',  // Very dark
          900: '#372B30',  // Almost black
        },
        secondary: {
          light: '#F9E0D9',
          DEFAULT: '#E6DBD0',
          dark: '#7D6167',
        },
        accent: {
          brown: '#754F5B',
          dark: '#5D4954',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(125, 97, 103, 0.1), 0 2px 4px -1px rgba(125, 97, 103, 0.06)',
        'glow': '0 0 20px rgba(249, 224, 217, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      }
    },
  },
  plugins: [],
}