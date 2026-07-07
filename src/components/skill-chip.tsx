"use client";

import StackIcon, { type IconName } from "tech-stack-icons";
import { useTheme } from "@/hooks/use-theme";

export type SkillItem = { name: string; icon?: string };

export function SkillChip({ item }: { item: SkillItem }) {
  const { theme } = useTheme();
  const iconVariant = theme === "dark" ? "light" : "dark";

  return (
    <div className="flex items-center gap-2 rounded-full bg-gray-200 dark:bg-gray-800 py-1.5 pl-1.5 pr-3">
      {item.icon ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <StackIcon
            name={item.icon as IconName}
            variant={iconVariant}
            className="h-5 w-5"
          />
        </span>
      ) : null}
      <span className="font-mono text-sm">{item.name}</span>
    </div>
  );
}
