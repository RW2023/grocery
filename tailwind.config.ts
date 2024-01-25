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
        overlay: 'rgba(43, 45, 66, 0.5)',
        background: '#2b2d42',
        primary: '#f8f32b',
        textPrimary: '#ffffff',
        textSecondary: '#8d99ae',
        button: '#f8f32b',
        buttonText: '#2b2d42',
        border: '#8d99ae',
        highlight: '#f8f32b',
        secondary: '#8d99ae',
        tertiary: '#000000',
      },
    },
  },
  plugins: [require('daisyui')],
};

export default config;
