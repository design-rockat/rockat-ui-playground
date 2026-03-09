"use client";

import React from "react";
import { Button, Tooltip } from "antd";
import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "@/design-system/theme/provider";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { mode, toggleTheme, isDark } = useThemeContext();

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-sm"
      style={{
        borderBottom: "1px solid var(--rockat-border)",
        background: "color-mix(in srgb, var(--rockat-bg) 90%, transparent)",
      }}
    >
      <div>
        <h1
          className="text-lg font-semibold leading-tight"
          style={{ color: "var(--rockat-text)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-0.5" style={{ color: "var(--rockat-text-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>

      <Tooltip title={isDark ? "Switch to Light" : "Switch to Dark"}>
        <Button
          type="text"
          shape="circle"
          icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="transition-all duration-200"
        />
      </Tooltip>
    </header>
  );
}
