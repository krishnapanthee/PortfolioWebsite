/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff9800",
        primaryDark: "#e68a00",
        secondary: "#ff5722",
        dark: "#1a1a1a",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "border-move": "border-move 5s linear infinite",
        "spin-slow": "spin 1s linear infinite",
      },
      keyframes: {
        "border-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
