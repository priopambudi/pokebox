/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        background: "#e7e7e7",
        primary: "#F4EBA7",
      },
    },
  },
  plugins: [],
};
