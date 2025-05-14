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
    },
  },
  plugins: [],
};
export default config;
