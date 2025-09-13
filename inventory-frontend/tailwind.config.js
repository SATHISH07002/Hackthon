/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
        // Custom color palette
        custom: {
          dark: '#1C1C1C',      // Dark Gray/Black
          cream: '#F5E8D8',     // Light Beige/Cream
          coral: '#FF6F61',     // Coral/Light Red
          mustard: '#DAA520',   // Mustard Yellow/Gold
          orange: '#FF4500',    // Bright Orange
        },
        // Dark theme colors using custom palette
        dark: {
          50: '#F5E8D8',        // Light Beige/Cream
          100: '#F5E8D8',       // Light Beige/Cream
          200: '#F5E8D8',       // Light Beige/Cream
          300: '#F5E8D8',       // Light Beige/Cream
          400: '#F5E8D8',       // Light Beige/Cream
          500: '#F5E8D8',       // Light Beige/Cream
          600: '#DAA520',       // Mustard Yellow/Gold
          700: '#FF6F61',       // Coral/Light Red
          800: '#FF4500',       // Bright Orange
          900: '#1C1C1C',       // Dark Gray/Black
          950: '#1C1C1C',       // Dark Gray/Black
        },
        purple: {
          50: '#F5E8D8',
          100: '#F5E8D8',
          200: '#F5E8D8',
          300: '#F5E8D8',
          400: '#F5E8D8',
          500: '#DAA520',
          600: '#FF6F61',
          700: '#FF4500',
          800: '#1C1C1C',
          900: '#1C1C1C',
          950: '#1C1C1C',
        },
        green: {
          50: '#F5E8D8',
          100: '#F5E8D8',
          200: '#F5E8D8',
          300: '#F5E8D8',
          400: '#F5E8D8',
          500: '#DAA520',
          600: '#FF6F61',
          700: '#FF4500',
          800: '#1C1C1C',
          900: '#1C1C1C',
          950: '#1C1C1C',
        },
        blue: {
          50: '#F5E8D8',
          100: '#F5E8D8',
          200: '#F5E8D8',
          300: '#F5E8D8',
          400: '#F5E8D8',
          500: '#DAA520',
          600: '#FF6F61',
          700: '#FF4500',
          800: '#1C1C1C',
          900: '#1C1C1C',
          950: '#1C1C1C',
        },
      }
    }
  },
  plugins: [],
};


