/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans JP", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      spacing: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
