/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "bounce-once": "bounce 1s ease-in-out 1",
        "spin-once": "spin 1s linear 1",
      },
    },
  },
  plugins: [],
};
