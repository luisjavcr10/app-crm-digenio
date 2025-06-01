import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: Theme, systemPrefersDark: boolean) => {
      let actualTheme: "light" | "dark";

      if (theme === "dark") {
        root.classList.add("dark");
        actualTheme = "dark";
      } else if (theme === "light") {
        root.classList.remove("dark");
        actualTheme = "light";
      } else {
        root.classList.toggle("dark", systemPrefersDark);
        actualTheme = systemPrefersDark ? "dark" : "light";
      }

      setResolvedTheme(actualTheme);
    };

    applyTheme(theme, media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme("system", event.matches);
      }
    };

    media.addEventListener("change", (event) => {
      if (theme === "system") {
        applyTheme("system", event.matches);
      }
    });
    

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", newTheme);
    }
    setThemeState(newTheme);
  };

  return { theme, setTheme, resolvedTheme };
}
