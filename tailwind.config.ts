/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // These MUST match the variable names set in layout.tsx
        moul: ["var(--font-moul)", "serif"],
        kantumruy: ["var(--font-kantumruy)", "sans-serif"],
        kh: ["var(--font-odor)", "serif"],
      },
    },
  },
  plugins: [],
};