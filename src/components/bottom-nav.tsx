"use client";

import { cn } from "@/util";
import { Home, Mail, User } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

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
            "shadow-[2px_2px_20px_0px_rgba(32,157,113,0.5)] border-primary-950":
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
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-4"
      style={{ height: BASE_SIZE + PADDING * 2 }}
    >
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto relative flex items-end gap-3 rounded-full border border-foreground-faint"
        style={{
          height: BASE_SIZE + PADDING * 2,
          paddingInline: PADDING,
          paddingBottom: PADDING,
        }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl mask-[linear-gradient(to_top,black,transparent)]" />
        </div>
        {ITEMS.map((item) => (
          <DockItem
            key={item.href}
            mouseX={mouseX}
            active={pathname === item.href}
            {...item}
          />
        ))}
      </div>
    </nav>
  );
}
