/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/Sidebar.tsx",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a0a14",
          900: "#0d0d1a",
          800: "#13131f",
          700: "#1a1a2b",
          600: "#22223a",
        },
        teal: {
          400: "#2dd9c4",
          500: "#1fc9b4",
        },
        violet: {
          500: "#7c5cff",
          600: "#6a3ff5",
        },
        pink: {
          500: "#ec4fa0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "signal-gradient": "linear-gradient(135deg, #2dd9c4 0%, #7c5cff 55%, #ec4fa0 100%)",
      },
    },
  },
  plugins: [],
};
