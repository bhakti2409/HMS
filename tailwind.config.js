/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        body:'Poppins, sans-serif',
        sans: 'Poppins, sans-serif',
        heading: 'Merriweather,serif',
      },
      colors:{
        primary:{

'50': '#fdf8f6',
'100': '#f2e8e5',
'200': '#eaddd7',
'300': '#e0cec7',
'400': '#d2babe',
'500': '#bfa094',
'600': '#a18072',
'700': '#977669',
'800': '#846358',
'900': '#43302b'
        }
      } 
       },
  },
  plugins: [],
}

