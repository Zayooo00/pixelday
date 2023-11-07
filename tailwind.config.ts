import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "card-bounce": "card-bounce 1s infinite",
      },
      screens: {
        xs: "330px",
      },
    },
  },
  plugins: [],
};
export default config;
