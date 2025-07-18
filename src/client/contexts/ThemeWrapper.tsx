"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

/**
 * Wrapper que maneja la aplicación del tema sin causar parpadeo
 * El script inline en layout.tsx aplica el tema inicial antes de la hidratación
 */
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Evitar aplicar el tema en el primer render para prevenir parpadeo
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return <>{children}</>;
};