import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172b3a",
        muted: "#526574",
        navy: "#173d62",
        red: "#c4373f",
        cream: "#f6f8f7",
        line: "#d9e1e4",
        teal: "#dff2ef",
      },
      boxShadow: {
        card: "0 10px 30px rgba(23, 43, 58, 0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
