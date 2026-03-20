import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        "count-up": "countUp 1.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "slide-right": "slideRight 0.3s ease-out forwards",
        "slide-left": "slideLeft 0.3s ease-out forwards",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 3s linear infinite",
        "progress-ring": "progressRing 1.5s ease-out forwards",
      },
      keyframes: {
        countUp: { from: { opacity: "0" }, to: { opacity: "1" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        progressRing: {
          from: { strokeDashoffset: "339" },
          to: { strokeDashoffset: "var(--target-offset)" },
        },
      },
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
};

export default config;

