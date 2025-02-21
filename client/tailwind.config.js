/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "bg-light-pri": "var(--color-background-light-primary)",
        "bg-light-sec": "var(--color-background-light-secondary)",
        "bg-dark-pri": "var(--color-background-dark-primary)",
        "bg-dark-sec": "var(--color-background-dark-secondary)",

        // Text
        "text-light-pri": "var(--color-text-light-primary)",
        "text-light-sec": "var(--color-text-light-secondary)",
        "text-dark": "var(--color-text-dark-primary-and-secondary)", // Could also be text-dark-all if it's both primary and secondary

        // Borders
        "border-light": "var(--color-border-light)",
        "border-dark": "var(--color-border-dark)",

        // Core Colors
        white: "var(--color-white)", // No need for col- prefix
        black: "var(--color-black-9)", // black-9 is fine

        // Blues
        "blue-6": "var(--color-blue-6)",
        "blue-5": "var(--color-blue-5)",
        "blue-1": "var(--color-blue-1)",
        "blue-05": "var(--color-blue-0-5)", // or blue-half

        // Reds
        "red-5": "var(--color-red-5)",
        "red-1": "var(--color-red-1)",

        // Grays
        "gray-9": "var(--color-gray-9)",
        "gray-8": "var(--color-gray-8)",
        "gray-7": "var(--color-gray-7)",
        "gray-6": "var(--color-gray-6)",
        "gray-5": "var(--color-gray-5)",
        "gray-4": "var(--color-gray-4)",
        "gray-3": "var(--color-gray-3)",
        "gray-2": "var(--color-gray-2)",
        "gray-1": "var(--color-gray-1)",
        "gray-05": "var(--color-gray-05)", // or gray-half
      },
    },
  },

  plugins: [],
};
