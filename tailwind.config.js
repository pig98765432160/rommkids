/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx,vue}`],
  theme: {
    extend: {
      colors: {
        primary: "#007CFB",
        secondary: "#8724D9",
        popular: "#9200FF",
        hot: "#FF0000",
        "gray-100": "#F7F7F7",
        "gray-200": "#EFEFEF",
        "gray-300": "#D9D9D9",
        "gray-400": "#A0A0A0",
        "gray-500": "#808080",
        "gray-600": "#777777",
        "gray-700": "#555555",
        "gray-800": "#333333",
        "gray-900": "#2B2B2B",
      },
    },
  },
  plugins: [
    // 單行省略號和多行省略號
    require("@tailwindcss/line-clamp"),
  ],
};


