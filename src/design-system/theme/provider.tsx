"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { rockatLightTheme, rockatDarkTheme } from "./antd-theme";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  toggleTheme: () => {},
  isDark: false,
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("rockat-theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("rockat-theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const antdConfig = {
    ...(mode === "dark" ? rockatDarkTheme : rockatLightTheme),
    algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, isDark: mode === "dark" }}>
      <ConfigProvider theme={antdConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
