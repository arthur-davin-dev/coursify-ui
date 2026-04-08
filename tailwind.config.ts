/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defining your project colors based on the image
        brand: {
          blue: "#2563eb",      // The main blue
          emerald: "#10b981",   // The green "free trial" button
          slate: "#0f172a",     // Dark text color
          orange: "#f97316",    // Public speaking icon
          purple: "#a855f7",    // Creative thinking icon
        },
      },
      fontFamily: {
        // This links to the CSS variables we created in layout.tsx
        sans: ["var(--font-inter)"],
        heading: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};