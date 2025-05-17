import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B3954',
          light: '#087E8B',
        },
        secondary: {
          DEFAULT: '#FF5A5F',
          light: '#FF8A8F',
        },
        dark: {
          DEFAULT: '#121212',
          surface: '#2D3748',
          primary: '#164B69',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
