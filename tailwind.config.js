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
      fontSize: {
        h2: [
          "36px",
          {
            lineHeight: "43px",
            fontWeight: "400",
          },
        ],
        "h3-light": [
          "24px",
          {
            lineHeight: "28px",
            fontWeight: "300",
          },
        ],
        "h3-normal": [
          "24px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
        "h3-bold": [
          "24px",
          {
            lineHeight: "28px",
            fontWeight: "500",
          },
        ],
        "h4-light": [
          "22px",
          {
            lineHeight: "26px",
            fontWeight: "300",
          },
        ],
        "h4-normal": [
          "22px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "button-light": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "300",
          },
        ],
        "button-normal": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "tag-light": [
          "18px",
          {
            lineHeight: "21px",
            fontWeight: "400",
          },
        ],
        "tag-normal": [
          "18px",
          {
            lineHeight: "21px",
            fontWeight: "300",
          },
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
