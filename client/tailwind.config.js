import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    screens:{
      'xs' : '300px',
      'sm' : '450px',
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
        menuOpen : {
          '0%' : {opacity : '0'},
          '1%' : { transform : 'translateY(1vh)'},
          '10%': { transform: 'translateY(0vh)',opacity:'100'},
        },
        menuClose : {
          '0%' : {opacity : '100'},
          '1%' : { transform : 'translateY(0vh)'},
          '10%': { transform: 'translateY(1vh)',opacity:'0'},
        }
        
      },
      animation: {
        slideIn : '1s ease-out 0s 1 slideIn',
        slideOut : '1s ease-out 0s 1 slideOut',
        slideOutFloatingLabel : '1s ease-out 0s 1 slideOutFloatingLabel',
        menuOpen : '1s ease-out 0s 1 menuOpen',
        menuClose : '1s ease-in 0s 1 menuClose',

      }
    }
  },
  plugins: [],
}

