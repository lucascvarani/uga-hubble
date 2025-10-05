/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom fonts here
        "source-sans": ["Source Sans 3", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        "space-mono": ["Space Mono", "monospace"],
        sans: ["Source Sans 3", "Inter", "system-ui", "sans-serif"], // Override default sans
      },
    },
  },
  plugins: [],
};
