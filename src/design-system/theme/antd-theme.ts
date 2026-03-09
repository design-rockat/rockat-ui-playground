import { colors } from "../tokens/colors";
import { radius } from "../tokens/radius";
import { typography } from "../tokens/typography";

export const rockatLightTheme = {
  token: {
    colorPrimary: colors.primary[700],
    colorPrimaryHover: colors.primary[600],
    colorPrimaryActive: colors.primary[800],
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    fontFamily: typography.fontFamily.sans,
    fontSize: 14,
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f9f8ff",
    colorText: colors.neutral[900],
    colorTextSecondary: colors.neutral[600],
    colorBorder: colors.neutral[200],
    colorBorderSecondary: colors.neutral[100],
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 16,
    },
  },
};

export const rockatDarkTheme = {
  token: {
    colorPrimary: colors.primary[500],
    colorPrimaryHover: colors.primary[400],
    colorPrimaryActive: colors.primary[600],
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    fontFamily: typography.fontFamily.sans,
    fontSize: 14,
    colorBgContainer: "#1a1625",
    colorBgElevated: "#211d2e",
    colorBgLayout: "#13111c",
    colorText: "#f0ecff",
    colorTextSecondary: colors.neutral[400],
    colorBorder: "#2d2840",
    colorBorderSecondary: "#211d2e",
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 16,
    },
  },
};
