/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'open': ['Open Sans', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
        'Oswald': ['Oswald', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors:{
        'primary': '#5F35F5',
        'white': '#ffffff',
        'shape': 'rgba(0, 0, 0, 0.25)',
        'time': 'rgba(0, 0, 0, 0.50)'
      },
      boxShadow:{
        'box': ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      
    },
  },
  plugins: [],
}