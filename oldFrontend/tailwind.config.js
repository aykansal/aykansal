/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exospace: ['ExoSpace', 'sans-serif'],
        cyborg: ['Cyborg', 'sans-serif']
      },
      colors: {
        primary: "#14e956",
        textPrimaryLight: " #BFE274 ",
        textWhite: "#ffffff",
        textLightGray1: "#EDEEF2",
        textLightGray2: "#DEDFE7",
        textLightGray3: "#CACBD7",
        textDarkGrey1: "#636172",
        textDarkGrey2: "#53515E",
      },
      backgroundImage: {
        'headerBg': "url('../assets/headerBg1.svg')",
        'Boy': "url('../assets/Boy.svg')",
      },
      animation: {
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        flipInY: {
          "0%": {
            "-webkit-animation-timing-function": " ease-in",
            "animation-timing-function": "ease-in",
            opacity: "0",
            "-webkit-transform": "perspective(400px) rotateY(90deg)",
            transform: "perspective(400px) rotateY(90deg)"
          },
          "40%": {
            "-webkit-animation-timing-function": "ease-in",
            "animation-timing-function": "ease-in",
            "-webkit-transform": "perspective(400px) rotateY(- 20deg)",
            transform: "perspective(400px) rotateY(- 20deg)"
          },
          "60%": {
            opacity: 1,
            "-webkit-transform": "perspective(400px) rotateY(10deg)",
            transform: "perspective(400px) rotateY(10deg)"
          },
          "80%": {
            "-webkit-transform": "perspective(400px) rotateY(- 5deg)",
            transform: "perspective(400px) rotateY(- 5deg)"
          },
          "100%": {
            "-webkit-transform": "perspective(400px)",
            transform: "perspective(400px)"
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
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        moveLine: {
          "0%": {
            width: '0%',
          },
          "100%": {
            width: '100%',
          },
        },
        moveCardUp: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }
    },
    boxShadow: {
      sectionTitle: " inset 0 0 4px 1px #14e956"
    },
    dropShadow: {
      "sectionTitle": ['3px 3px 0 green', '-1px -1px 0 #000', ' 1px -1px 0 #000', '-1px 1px 0 #000', ' 1px 1px 0 #000']
    },
  },

  plugins: [],
}