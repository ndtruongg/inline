/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        logo: "#F4A261",
        background: "#FAF0E6",
        paragraph: "#2A9D8F",
        link: "#007BFF",
        "sub-box": "#F1F3F4",
        date: "#6C757D",
        description: "#666666",
        border: "#DEE2E6",

        button: {
          primary: "#FF6600",
          "primary-hover": "#E65C00",
        },

        dark: {
          background: "#1E1E1E",
          paragraph: "#EAEAEA",
          description: "#B0B0B0",
          link: "#FF914D",
        },
      },
      fontFamily: {
        lilita: ["Lilita One", "cursive"],
      },
    },
    plugins: [],
    darkMode: "class",
  },
};
