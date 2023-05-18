/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        "theater": "rgba(0, 0, 0, 0.9)"
      },
      borderRadius: {
        "player": "0.5rem",
        "player-theater": "0"
      },
      boxShadow: {
        "player": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "player-theater": "none"
      },
      fontFamily: {
        bangers: ["Bangers", "cursive"],
        "dancing-script": ["Dancing Script", "cursive"]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
