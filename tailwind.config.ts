/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#393d3f', // Onyx for main background
        textPrimary: '#fdfdff', // White for primary text
        textSecondary: '#c6c5b9', // Silver for secondary text
        primary: '#62929e', // Blue Munsell for highlights and primary actions
        buttonText: '#393d3f', // Onyx for text on light buttons for contrast
        border: '#546a7b', // Payne's Gray for borders and separators
        highlight: '#62929e', // Blue Munsell, same as primary, for highlighting elements
        secondary: '#546a7b', // Payne's Gray as a secondary color
        tertiary: '#fdfdff', // White for tertiary elements or contrasts
        headline: '#ffffff', // White for headlines
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Updated to 'sans-serif' for fallback
        serif: ['Roboto Slab', 'serif'], // Roboto Slab with serif fallback
      },
    },
  },
  plugins: [require('daisyui')],
};
