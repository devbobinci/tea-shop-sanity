/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-yellow": "#FACD22",
        "my-red": "#DE5052",
        "my-beige": "#e2ad78",
        "my-gray": "#c0c0c0",
        "my-m-gray": "#888",
        "my-d-gray": "#444",
        "my-bg": "#fffbf7",
      },
      fontFamily: {
        playFair: "Playfair Display",
      },
    },
  },
  plugins: [],
};
