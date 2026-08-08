/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2C2420',
          900: '#2C2420',
          800: '#3D332C',
          700: '#57493F',
          500: '#7A6B60',
          400: '#9B8D82',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F5EFE6',
          200: '#E9DECE',
          300: '#D8C8B0',
        },
        brand: {
          50: '#FBF1EE',
          100: '#F5DFD9',
          200: '#E9BFB3',
          300: '#DA9C8C',
          400: '#C97F6C',
          500: '#B66650',
          600: '#9C5540',
          700: '#7D4433',
        },
        sage: {
          50: '#F4F7F2',
          100: '#E5EDDF',
          200: '#C9D9BC',
          300: '#A7C093',
          400: '#84A66C',
          500: '#668A4F',
          600: '#4F6E3C',
          700: '#3D5730',
        },
        forest: {
          50: '#EAF2ED',
          100: '#CFE3D6',
          200: '#9EC7AC',
          300: '#6AAA81',
          400: '#3D7F5C',
          500: '#2B5C43',
          600: '#1F4635',
          700: '#183628',
          800: '#12271D',
          900: '#0D1D16',
        },
        blush: {
          50: '#FDF7F5',
          100: '#FBEDE8',
          200: '#F5DAD1',
          300: '#EEC3B6',
          400: '#E4A897',
          500: '#D48D7A',
          600: '#BD7562',
          700: '#9C5D4E',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Alumni Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(44, 36, 32, 0.05), 0 1px 3px rgba(44, 36, 32, 0.07)',
        cardHover: '0 12px 28px -10px rgba(44, 36, 32, 0.20), 0 3px 8px rgba(44, 36, 32, 0.08)',
      },
    },
  },
  plugins: [],
};
