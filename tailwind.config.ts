/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // IMPORTANT: Ensure this is set to 'class'
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // We are defining your specific colors here
        darkbg: "#1A1F3A",    
        darksecbg: "#242B4D", 
      },
    },
  },
  plugins: [],
}