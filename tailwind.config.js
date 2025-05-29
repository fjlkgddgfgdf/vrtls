/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'borderGlow': 'borderGlow 2s ease-in-out infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'borderGlow': {
          '0%, 100%': {
            'box-shadow': '0 0 5px rgba(236, 72, 153, 0.5), 0 0 10px rgba(139, 92, 246, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 15px rgba(236, 72, 153, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} 