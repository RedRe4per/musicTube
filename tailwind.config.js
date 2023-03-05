/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
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
          200: "#F1F1F1",
        },
        gray: {
          200: "#C4C4C4",
          400: "#646464",
          600: "#333333",
          700: "#191414",
          800: "#121212",
        },
        background: {
          500: "#1B1B1B",
        },
      },
      textColor: {
        // default: 'mix-blend-screen text-gray-700 text-white-200',
        default: "#1DB954",
      },
      opacity: {
        15: ".15",
      },
      fontSize: {
        h2: [
          "2.25rem",
          {
            lineHeight: "43px",
            fontWeight: "400",
          },
        ],
        "h3-light": [
          "1.5rem",
          {
            lineHeight: "28px",
            fontWeight: "300",
          },
        ],
        "h3-normal": [
          "1.5rem",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
        "h3-bold": [
          "1.5rem",
          {
            lineHeight: "28px",
            fontWeight: "500",
          },
        ],
        "h4-light": [
          "1.375rem",
          {
            lineHeight: "26px",
            fontWeight: "300",
          },
        ],
        "h4-normal": [
          "1.375rem",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "button-light": [
          "1.25rem",
          {
            lineHeight: "24px",
            fontWeight: "300",
          },
        ],
        "button-normal": [
          "1.25rem",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "tag-light": [
          "1.125rem",
          {
            lineHeight: "21px",
            fontWeight: "400",
          },
        ],
        "tag-normal": [
          "1.125rem",
          {
            lineHeight: "21px",
            fontWeight: "300",
          },
        ],
      },
      backgroundImage: {
        header:
          "url('/full-heart.svg'), linear-gradient(135deg, #A56FFF 0%, #8A96FF 100%)",
        secondary: "linear-gradient(0deg, #121212, #121212)",
      },
      backgroundBlendMode: {
        header: "multiply, overlay",
      },
      backgroundSize: {
        header: "fill",
      },
      backgroundPosition: {
        header: "center",
      },
      width: {
        "screen-70": "calc(100vw - 330px)",
      },
    },
  },
  plugins: [require("daisyui")],
};
