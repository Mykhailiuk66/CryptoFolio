// tailwind.config.js
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
  },
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {
            background: "#010100",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#D2FDDA",
              200: "#A7FBBF",
              300: "#79F5A9",
              400: "#57EB9F",
              500: "#24DF91",
              600: "#1ABF8B",
              700: "#12A081",
              800: "#0B8173",
              900: "#066B69",
              DEFAULT: "#24df91",
              foreground: "#ffffff",
            },
            secondary: "#79F5A9",
            focus: "#24df91",
          },
        }
      }
    }),
  ],
};
