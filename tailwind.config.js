/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        modern: {
          primary: '#6366F1', // Indigo
          secondary: '#EC4899', // Pink
          accent: '#8B5CF6', // Purple
          success: '#10B981', // Emerald
          warning: '#F59E0B', // Amber
          dark: '#111827',
          light: '#F3F4F6',
          gray: '#4B5563'
        }
      },
      boxShadow: {
        'modern': '0 0 20px rgba(99, 102, 241, 0.15)',
        'modern-lg': '0 0 30px rgba(99, 102, 241, 0.2)',
        'modern-colored': '0 0 20px rgba(236, 72, 153, 0.15)',
      },
      backgroundImage: {
        'gradient-modern': 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}