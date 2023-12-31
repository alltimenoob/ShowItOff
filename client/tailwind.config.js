/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    screens:{
      'xs' : '300px',
      'sm' : '400px',
      'md' : '700px',
      'lg' : '1100px',
      'xl' : '1900px',
      '2xl': '4000px'
    },
    extend: {
      keyframes: {
        
        slideIn: {
          '0%' : { opacity : '0'},
          '1%' : { transform: 'translateX(-10vw)'},
          '100%' : { transform: 'trasnslateX(10vw)' }
        },
        slideOut: {
          '0%' : { opacity : '0'},
          '1%': { transform: 'translateX(10vw)'},
          '100%': { transform: 'translateX(0vw)'},
        },
        slideOutFloatingLabel: {
          '0%' : { opacity : '0'},
          '1%': { transform: 'translateX(1vw)'},
          '100%': { transform: 'translateX(0vw)'},
        },
      },
      animation: {
        slideIn : '1s ease-out 0s 1 slideIn',
        slideOut : '1s ease-out 0s 1 slideOut',
        slideOutFloatingLabel : '1s ease-out 0s 1 slideOutFloatingLabel',
        
      }
    }
  },
  plugins: [],
}

