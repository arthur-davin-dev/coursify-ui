/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Keeps Inter as the default UI font
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        // Re-mapping 'font-kh' to Odor Mean Chey
        kh: ["var(--font-odor)", "serif"], 
      },
    },
  },
  plugins: [],
}