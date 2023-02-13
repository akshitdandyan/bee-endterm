/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            // roboto font
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
                body: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
};
