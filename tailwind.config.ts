import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "melody-purple": "#cc55ff",
        "melody-blue": "#55ccff",
      },
      fontFamily: {
        sans: ["Gotham Pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
