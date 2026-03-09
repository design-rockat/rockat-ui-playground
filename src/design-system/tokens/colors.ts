export const colors = {
  primary: {
    50: "#f5f0ff",
    100: "#ede4ff",
    200: "#ddcdff",
    300: "#c5a5ff",
    400: "#ab72ff",
    500: "#943aff",
    600: "#8c12ff",
    700: "#8001ff",
    800: "#6600cc",
    900: "#5902b0",
    950: "#350078",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
} as const;

export type ColorScale = keyof typeof colors.primary;
