/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00C2A8",
        secondary: "#1E2B3A",
        brandWhite: "#F7F9FA",
        grayish: {
          100: "#4444444D",
          200: "#363636",
          300: "#F3F3F3",
        },
        light: {
          blue: "#F3F7FF",
          green: "#F3FFF6",
          red: "#FFF3F3",
        },
        border: {
          gray: "#585858",
          blue: "#0368FF",
          green: "#18FF037D",
          red: "#FF03037D",
        },
        disabled: "#F2F2F2",
      },
      fontFamily: {
        sans: ["Craftwork", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
