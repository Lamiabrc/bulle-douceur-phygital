// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#005B5F', // Vert Canard
        },
        secondary: {
          DEFAULT: '#212121', // Noir doux
        },
        accent: {
          DEFAULT: '#FF6B57', // Corail (CTA)
        },
      },
    },
  },
  plugins: [],
}
colors: {
  primary: { DEFAULT: '#005B5F' },
  secondary: { DEFAULT: '#212121' },
  accent: { DEFAULT: '#FF6B57' },
  border: { DEFAULT: '#E5E7EB' }, // <-- ajoute cette ligne
},

export default config
