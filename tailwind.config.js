/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        background: "#4d6f95",
        darkGray: "#192538",
      },
    },
  },
  plugins: [],
};
