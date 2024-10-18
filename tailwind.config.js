/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#41b883",
        white: "#ffffff",
        black: "#000000",
        gray: "#9ca3af",
      },
    },
  },
  plugins: [],
};
