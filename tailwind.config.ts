import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        green: {
          50: "hsl(142 76% 97%)",
          100: "hsl(142 71% 90%)",
          200: "hsl(141 76% 73%)",
          400: "hsl(142 69% 58%)",
          500: "hsl(142 71% 45%)",
          600: "hsl(142 76% 36%)",
          700: "hsl(142 72% 29%)",
        },
        orange: {
          50: "hsl(20 100% 97%)",
          400: "hsl(20 95% 64%)",
          500: "hsl(20 90% 53%)",
          600: "hsl(20 91% 48%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float1: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(-5deg)" },
          "66%": { transform: "translateY(8px) rotate(3deg)" },
        },
        float3: {
          "0%, 100%": { transform: "translateY(-8px) rotate(0deg)" },
          "50%": { transform: "translateY(12px) rotate(-8deg)" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(142 71% 45% / 0.4)" },
          "50%": { boxShadow: "0 0 0 6px hsl(142 71% 45% / 0)" },
        },
        "dot-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-6px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(.22,1,.36,1) forwards",
        "fade-in": "fade-in 0.9s ease-out forwards",
        float1: "float1 4s ease-in-out infinite",
        float2: "float2 5s ease-in-out infinite",
        float3: "float3 4.5s ease-in-out infinite",
        "pulse-green": "pulse-green 2.2s ease-in-out infinite",
        "dot-bounce": "dot-bounce 1.2s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
