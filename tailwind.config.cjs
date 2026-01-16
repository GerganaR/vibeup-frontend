const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Sofia Sans", "sans-serif"],
      condensed: ["Sofia Sans Condensed", "sans-serif"],
    },
    colors: {
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D0D5DD",
        400: "#9CA3AF",
        500: "#667085",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      // Neutral Palette
      neutral: {
        black: "#000000",
        white: "#FEFFFF",
        grey25: "#F9FAFA",
        grey50: "#F1F2F2",
        grey100: "#E4E6E6",
        grey200: "#CBCCCC",
        grey300: "#B5B6B6",
        grey400: "#989999",
        grey500: "#878686",
        grey600: "#666565",
        grey700: "#4D4C4C",
        grey800: "#333333",
        grey900: "#1A1919",
      },
      // Blue Palette
      blue: {
        50: "#F2FAFF",
        100: "#E6F6FF",
        200: "#D1EEFF",
        300: "#ACD0E6",
        400: "#5CA1CC",
        500: "#2D80B3",
        600: "#1A5980",
        700: "#043959",
        800: "#022133",
        900: "#ACD0E5",
      },
      // Turquoise Palette
      turquoise: {
        50: "#F7FBFC",
        100: "#EDF6FA",
        200: "#DAEBF2",
        300: "#ADCCD9",
        400: "#86AEBF",
        500: "#6392A6",
        600: "#3D7E99",
        700: "#206481",
        800: "#003F59",
      },
      // Red Palette (Error)
      red: {
        50: "#FFFAFA",
        100: "#FEE2E2",
        200: "#FFCCCD",
        300: "#FFA6A7",
        400: "#EA7576",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B43328",
        800: "#80241C",
      },
      // Orange Palette (Warning)
      orange: {
        50: "#FAF5EE",
        100: "#FAEDD4",
        200: "#FFDCA8",
        300: "#FABF7D",
        400: "#FBAB63",
        500: "#FC8921",
        600: "#D16300",
        700: "#9E5400",
        800: "#6E3B00",
      },
      // Green Palette (Normal status)
      green: {
        50: "#ECFDF3",
        100: "#D1FADF",
        200: "#A6F4C5",
        300: "#6CE9A6",
        400: "#32D583",
        500: "#12B76A",
        600: "#039855",
        700: "#027A48",
        800: "#054F31",
      },
      purple: {
        50: "#F8F9FC",
        100: "#EAECF5",
        200: "#D5D9EB",
        300: "#AFB5D9",
        400: "#717BBC",
        500: "#4E5BA6",
        600: "#3E4784",
        700: "#363F72",
        800: "#293056",
      },
      slate: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
        950: "#020617",
      },
      yellow: {
        500: "#EAB308",
      },
      amber: {
        50: "#FFFBEB",
        100: "#FEF3C7",
        200: "#FDE68A",
        500: "#F59E0B",
        600: "#D97706",
        700: "#B45309",
      },
      emerald: {
        50: "#ECFDF5",
        100: "#D1FAE5",
        200: "#A7F3D0",
        500: "#10B981",
        600: "#059669",
        700: "#047857",
      },
      teal: {
        50: "#F0FDFA",
        100: "#CCFBF1",
        200: "#99F6E4",
        500: "#14B8A6",
        600: "#0D9488",
        700: "#0F766E",
      },
      cyan: {
        50: "#ECFEFF",
        100: "#CFFAFE",
        200: "#A5F3FC",
        500: "#06B6D4",
        600: "#0891B2",
        700: "#0E7490",
      },
      sky: {
        50: "#F0F9FF",
        100: "#E0F2FE",
        200: "#BAE6FD",
        500: "#0EA5E9",
        600: "#0284C7",
        700: "#0369A1",
      },
      indigo: {
        50: "#EEF2FF",
        100: "#E0E7FF",
        200: "#C7D2FE",
        500: "#6366F1",
        600: "#4F46E5",
        700: "#4338CA",
      },
      violet: {
        50: "#F5F3FF",
        100: "#EDE9FE",
        200: "#DDD6FE",
        500: "#8B5CF6",
        600: "#7C3AED",
        700: "#6D28D9",
      },
      pink: {
        50: "#FDF2F8",
        100: "#FCE7F3",
        200: "#FBCFE8",
        500: "#EC4899",
        600: "#DB2777",
        700: "#BE185D",
      },
      rose: {
        50: "#FFF1F2",
        100: "#FFE4E6",
        200: "#FECDD3",
        500: "#F43F5E",
        600: "#E11D48",
        700: "#BE123C",
      },
      fuchsia: {
        50: "#FDF4FF",
        100: "#FAE8FF",
        200: "#F5D0FE",
        500: "#D946EF",
        600: "#C026D3",
        700: "#A21CAF",
      },
      primary: {
        blue500: "#2D80B3",
      },
    },
    extend: {
      backgroundImage: {
        // Gradients
        "red-purple": "linear-gradient(93.96deg, #FFFAFA 0%, #F1F2F2 100%)",
        "dark-blue-dark-turquoise":
          "linear-gradient(117.03deg, #043959 0%, #043959 0.01%, #003F59 100%)",
        "turquoise-turquoise":
          "linear-gradient(117.03deg, #EDF6FA 0%, #D1FADF 100%)",
        "light-blue-blue":
          "linear-gradient(117.03deg, #2D80B3 0%, #2D80B3 0.01%, #5CA1CC 100%)",
        "main-gradient": "linear-gradient(117deg, #F7FBFC 0%, #F9FAFA 100%)",
      },
    },
    screens: {
      sm: "320px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1740px",
      // => @media (min-width: 1740px) { ... }

      "4xl": "1820px",
      // => @media (min-width: 1820px) { ... }

      "5xl": "1920px",
      // => @media (min-width: 1920px) { ... }

      "6xl": "2100px",
      // => @media (min-width: 2100px) { ... }
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
        },
      });
    },
  ],
});
