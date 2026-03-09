"use client";

import Image from "next/image";
import { useThemeContext } from "@/design-system/theme/provider";

interface LogoImageProps {
  width?: number;
  height?: number;
  className?: string;
}

// Native SVG dimensions: 323×59
export function LogoImage({ width = 160, height = 29, className }: LogoImageProps) {
  const { isDark } = useThemeContext();

  return (
    <Image
      src={isDark ? "/visualAssets/logo-dark.svg" : "/visualAssets/logo-light.svg"}
      alt="Rock-at UI"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
