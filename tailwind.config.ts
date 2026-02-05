/** @type {import('tailwindcss').Config} */
import animatePlugin from 'tailwindcss-animate';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#1F1E1E',
        'bg-glass': 'rgba(255, 255, 255, 0.2)',
      },
      linearGradients: {
        'bg-top': ['180deg', '#0e1016 0%', 'transparent 50%'],
        'bg-bottom': ['0deg', '#0e1016 0%', 'transparent 100%'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
        "expandWidth": "expandWidth 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "expandHeight": "expandHeight 1.5s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards",
        "shimmer-slide": "shimmer-slide 1s ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "grid": "grid 15s linear infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        expandWidth: {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        expandHeight: {
          "0%": { height: "0%" },
          "100%": { height: "100%" }
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      screens:{
        'sm' : '500px'
      },
    },

  },
  safelist:[
    'from-[#C93301]',
    'from-[#3803A6]',
    'from-[#8A39EA]',
    'from-[#3B80F7]',
    'from-[#FEFFFE]',
  ],
  plugins: [animatePlugin],
}