/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: (theme) => ({
        "screen/2": "50vh",
        "screen/4*3": "calc(100vh / 4 * 3)",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      width: (theme) => ({
        "screen/2": "50vh",
        "screen/4*3": "calc(100vh / 4 * 3)",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      screens: (theme) => ({
        xxs: "0px",
      }),
    },
  },
  variants: { display: ["responsive", "hover", "focus"] },
  plugins: [],
};
