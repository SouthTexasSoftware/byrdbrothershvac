/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        byrdbrothershvac: {
          primary: "#fe7615",

          secondary: "#1c79ea",

          accent: "#f7ddbb",

          neutral: "#272636",

          "base-100": "#fff",

          info: "#90CFEA",

          success: "#25B15D",

          warning: "#E9C42F",

          error: "#DB3C33",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
