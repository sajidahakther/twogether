import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D400A",
        secondary: "#6C8F58",
        sage: "#B1C1A4",
        black: "#2E2E2E",
        grey: "#979797",
        white: "#FFFFFF",
        stone: "#F6F4F0",
        beige: "#E7DCC8",
      },
      fontFamily: {
        apercu: ['"ApercuRegular"', "sans-serif"],
        apercuBold: ['"ApercuBold"', "sans-serif"],
        nimbus: ['"Nimbus"', "serif"],
      },
      fontWeight: {
        regular: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
} satisfies Config;
