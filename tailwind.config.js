/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5B27', 
        textColor: '#6B6B75',
        secondary:"#FEEAE1" 
      },
    }
  },
  plugins: [],
}

