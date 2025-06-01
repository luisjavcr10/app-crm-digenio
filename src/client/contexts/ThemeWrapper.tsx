"use client";

import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return <>{children}</>;
};