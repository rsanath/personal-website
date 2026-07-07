"use client";

import { Home, Mail, User } from "lucide-react";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/util";

const ITEMS = [
  { id: "home", href: "/#home", label: "Home", icon: Home },
  { id: "about", href: "/#about", label: "About", icon: User },
  { id: "contact", href: "/#contact", label: "Contact", icon: Mail },
];

const SECTION_IDS = ITEMS.map((item) => item.id);
const INTERSECTION_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = ids[0];
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActive(bestId);
      },
      { threshold: INTERSECTION_THRESHOLDS },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const BASE_SIZE = 50;
const MAX_SIZE = 72;
const PADDING = 8;
const MAGNIFY_RADIUS = 110;
const SPRING = { mass: 0.1, stiffness: 300, damping: 20 };

function DockItem({
  mouseX,
  active,
  href,
  label,
  icon: Icon,
}: (typeof ITEMS)[number] & { mouseX: MotionValue<number>; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? x - rect.left - rect.width / 2 : Infinity;
  });
  const size = useSpring(
    useTransform(
      distance,
      [-MAGNIFY_RADIUS, 0, MAGNIFY_RADIUS],
      [BASE_SIZE, MAX_SIZE, BASE_SIZE],
    ),
    SPRING,
  );
  const scale = useTransform(size, [BASE_SIZE, MAX_SIZE], [1, 1.25]);

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-foreground-faint bg-background transition-[box-shadow,border-color] duration-150",
          {
            "shadow-[2px_2px_20px_0px_rgba(32,157,113,0.5)] border-primary-500 dark:border-primary-900":
              active,
          },
        )}
      >
        <motion.div style={{ scale }}>
          <Icon
            className={cn(
              "h-5 w-5",
              active ? "text-primary-500" : "text-foreground-muted",
            )}
            strokeWidth={1.75}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}

export function BottomNav() {
  const activeId = useActiveSection(SECTION_IDS);
  const mouseX = useMotionValue(Infinity);
  const resetMagnify = () => mouseX.set(Infinity);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-4"
      style={{ height: BASE_SIZE + PADDING * 2 }}
    >
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={resetMagnify}
        onTouchEnd={resetMagnify}
        onTouchCancel={resetMagnify}
        className="pointer-events-auto relative flex items-end gap-3 rounded-full border border-foreground-faint bg-background/50 backdrop-blur-xl backdrop-saturate-150"
        style={{
          height: BASE_SIZE + PADDING * 2,
          paddingInline: PADDING,
          paddingBottom: PADDING,
        }}
      >
        {ITEMS.map((item) => (
          <DockItem
            key={item.href}
            mouseX={mouseX}
            active={activeId === item.id}
            {...item}
          />
        ))}
      </div>
    </nav>
  );
}
