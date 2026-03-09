"use client";

import { useEffect } from "react";
import { useThemeContext } from "@/design-system/theme/provider";

export function FaviconSwitcher() {
  const { isDark } = useThemeContext();

  useEffect(() => {
    const href = isDark
      ? "/visualAssets/favicon-dark.svg"
      : "/visualAssets/favicon-light.svg";

    // Update existing <link rel="icon"> or create one
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = href;
    link.type = "image/svg+xml";
  }, [isDark]);

  return null;
}
