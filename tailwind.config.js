/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#252525',
          dark: '#1C1C1C',
          light: '#333333',
        },
        champagne: {
          DEFAULT: '#B69B72',
          light: '#C8B28E',
          dark: '#9F835A',
        },
        beige: {
          DEFAULT: '#E8DFD0',
          light: '#F0E9DD',
          dark: '#D8CCA8',
        },
        ivory: {
          DEFAULT: '#F8F6F1',
          light: '#FCFBF9',
          dark: '#EDE8E0',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(37, 37, 37, 0.08)',
        'luxury-gold': '0 10px 30px -10px rgba(182, 155, 114, 0.25)',
        'luxury-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
      },
      letterSpacing: {
        'architectural': '0.2em',
        'subtle': '0.05em',
      }
    },
  },
  plugins: [],
}

