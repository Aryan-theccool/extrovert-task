import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-base": "#000000",
        "bg-elevated": "#141414",
        "bg-elevated-2": "#1F1F1F",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A3A3A3",
        "text-muted": "#6B6B6B",
        "border-default": "#2A2A2A",
        accent: "#E91E8C",
        "gradient-start": "#FF4E9A",
        "gradient-end": "#7B2FF7",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F5A623",
        bronze: "#CD7F32",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(8px,-10px) scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease both",
        "pop-in": "pop-in 0.3s ease both",
        blob: "blob 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
