import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
    content: ["./index.html", "./src/App.vue", "./src/components/*.vue", "./src/views/*.vue"],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                "melody-purple": "#cc55ff",
                "melody-blue": "#55ccff",
            },
            fontFamily: {
                sans: ["Gotham Pro", ...defaultTheme.fontFamily.sans]
            },
        }
    }
};
