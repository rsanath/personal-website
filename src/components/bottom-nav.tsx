"use client";

import { Home, Mail, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/util";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/settings", label: "Settings", icon: Settings },
];

const MAGNIFY_RADIUS = 110;
const MAX_SCALE = 1.45;

export function BottomNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let rafId = 0;
    let pointerX: number | null = null;

    const apply = () => {
      rafId = 0;
      for (const item of itemRefs.current) {
        if (!item) continue;
        if (pointerX === null) {
          item.style.transform = "";
          continue;
        }
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
        const falloff = Math.max(0, 1 - distance / MAGNIFY_RADIUS);
        const eased = falloff * falloff * (3 - 2 * falloff);
        const scale = 1 + (MAX_SCALE - 1) * eased;
        item.style.transform = `translateY(${-eased * 8}px) scale(${scale})`;
      }
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      schedule();
    };
    const onLeave = () => {
      pointerX = null;
      schedule();
    };

    nav.addEventListener("pointermove", onMove);
    nav.addEventListener("pointerleave", onLeave);
    return () => {
      nav.removeEventListener("pointermove", onMove);
      nav.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-4"
    >
      <div
        ref={navRef}
        className="pointer-events-auto relative flex items-end gap-2 overflow-hidden rounded-[26px] border border-foreground-faint p-2"
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl mask-[linear-gradient(to_top,black,transparent)]" />
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative flex h-11 w-11 shrink-0 origin-bottom items-center justify-center rounded-full border border-foreground-faint transition-transform duration-150 ease-out will-change-transform"
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  active ? "text-primary-500" : "text-foreground-muted",
                )}
                strokeWidth={1.75}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
