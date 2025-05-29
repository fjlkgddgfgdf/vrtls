import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'star-rotate': 'star-rotate 3s linear infinite',
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
        'star-rotate': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      },
      dropShadow: {
        'glow': '0 0 4px rgba(255,255,255,0.35), 0 0 10px rgba(255,255,255,0.2)'
      },
      textShadow: {
        'glow': '0 0 4px rgba(255,255,255,0.35), 0 0 10px rgba(255,255,255,0.2)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: '0 0 4px rgba(255,255,255,0.35), 0 0 10px rgba(255,255,255,0.2)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};

export default config; 