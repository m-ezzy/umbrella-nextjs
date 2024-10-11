import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // oh my god! spent hours solving this error! tailwind was purging the classes because it was not able to find the files in which the classes were being used
    // the layouts folder was out of the components folder
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // purge: {
  //   content: ['./**/*.{js,ts,jsx,tsx}', './public/index.html'],
  //   options: {
  //     safelist: ['p-14', 'text-6xl'], // Add this classes if they are being purged by tailwind during build
  //   },
  // },
};
export default config;
