// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#effcf9',
        'card-bg': '#d2f0eb',
        main: '#29dbbd',
        secondary: '#e98681',
        accent:'#d5e462'
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
