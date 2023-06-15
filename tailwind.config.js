/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "top-digital": "#4A858C",
        "top-digital-op-25": "#D2E0E2",
        "top-digital-op-40": "#B7CED1",
        "top-digital-hover": "#154449",
        "top-digital-link-color": "#060606",
        "top-digital-buttom-hover": "#FBBF3F",
        "top-digital-link-hover": "#977328",
        "top-digital-content-color": "#494C4F",
      },
      fontFamily: {
        "top-digital-nav": ["Montserrat", "sans-serif"],
        "top-digital-title": ["Montserrat", "sans-serif"],
        "top-digital-content": ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
