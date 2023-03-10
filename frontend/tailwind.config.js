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
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
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
              foreground: "#000000",
            },
            secondary: "#79F5A9",
            focus: "#24df91",
          },
        }
      }
    }),
  ],
};
