module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./utils/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(148, 163, 184, 0.16), 0 20px 80px rgba(15, 23, 42, 0.45)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 32%), linear-gradient(180deg, rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.95))"
      },
      colors: {
        brand: {
          50: "#e0f2fe",
          100: "#bae6fd",
          200: "#7dd3fc",
          300: "#38bdf8",
          400: "#0ea5e9",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#082f49"
        }
      }
    }
  },
  plugins: []
};
