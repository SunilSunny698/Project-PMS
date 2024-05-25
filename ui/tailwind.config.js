/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    
    extend: {
      colors:{
        primary: {
          DEFAULT: '#03a973',
          100: '#E5F6E5',
          200: '#C0ECC0',
          300: '#9BDF9B',
          400: '#75D375',
          500: '#50C650',
          600: '#46B846',
          700: '#3DA13D',
          800: '#338B33',
          900: '#297528',
        },
        secondary: '#183e46',
        ternary: '#027d54',
        backg : '#f5f8f9'
      },
      fontFamily: {
        sans: ['Muli', 'sans-serif'],
       
      },
      minWidth: {
        'email-cell': '10rem',
      },
    },
  },
  plugins: [],
}

