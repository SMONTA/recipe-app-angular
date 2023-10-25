/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui", "@tailwindcss/forms")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro"],
  },
};
