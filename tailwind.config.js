import plugin from "tailwindcss/plugin";

export default {
    content: [
        "./layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
        "./pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
        "./plugins/**/*.{js,ts,mjs}",
        "./composables/**/*.{js,ts,mjs}",
        "./utils/**/*.{js,ts,mjs}",
        "./{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
        "./{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
        "./app.config.{js,ts,mjs}",
        "./app/spa-loading-template.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                'title': 'BebasNeue',
            },
        },
    },
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents({
                '.custom-title': {
                    '@apply font-title tracking-wide': {},
                },
                '.custom-underline': {
                    '@apply underline decoration-primary-500 decoration-2 underline-offset-8': {},
                },
            })
        }),
    ],
};
