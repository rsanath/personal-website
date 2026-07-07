"use client";

import { useEffect, useState } from "react";
import { cn } from "@/util";

type Theme = "light" | "dark";

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function AppearanceRow() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light",
    );
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    setThemeState(next);
  }

  return (
    <div className="flex gap-1 rounded-full border border-foreground-faint p-1 font-mono text-sm">
      {(["light", "dark"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => choose(option)}
          className={cn(
            "rounded-full px-3 py-1 capitalize",
            theme === option
              ? "bg-foreground-faint text-foreground"
              : "text-foreground-muted",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
