/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "top-digital": "#4A858C",
        "top-digital-hover": "#154449",
        "top-digital-link-color": "#060606",
        "top-digital-link-hover": "#977328",
      },
      fontFamily: {
        "top-digital-nav": ["Poppins", "sans-serif"],
        "top-digital-content": ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
