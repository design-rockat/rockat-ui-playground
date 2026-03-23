"use client";

// Components
export { Button } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { Input } from "./components/ui/input";
export type { InputProps } from "./components/ui/input";

export { Card } from "./components/ui/card";
export type { CardProps } from "./components/ui/card";

export { Table } from "./components/ui/table";
export type { Column } from "./components/ui/table";
// Note: Table's props are typed as `Props<T>` (not exported). Column<T> is the public type.

// Design System
export { ThemeProvider, useThemeContext } from "./design-system/theme/provider";
export { rockatLightTheme, rockatDarkTheme } from "./design-system/theme/antd-theme";

// Tokens
export { colors, spacing, radius, typography } from "./design-system/tokens";
