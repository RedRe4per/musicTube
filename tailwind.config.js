/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: "#1DB954",
        white: {
          50: "#ffffff",
          100: "#F1F1F1",
        },
        gray: {
          400: "#646464",
          600: "#333333",
          700: "#191414",
          800: "#121212",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
