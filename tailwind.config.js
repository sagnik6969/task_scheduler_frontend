/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  screens: {
    small: { min: '540px', max: '767px' }
  },
  plugins: [require('@tailwindcss/forms')]
}
