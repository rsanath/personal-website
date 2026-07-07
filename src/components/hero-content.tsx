"use client";

import { useEffect, useRef } from "react";

export function HeroContent({ name, line }: { name: string; line: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const section = content.closest("section");
    sectionRef.current = section;
    if (!section) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reduceMotionQuery.matches) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const heroHeight = section.offsetHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / heroHeight));
      content.style.transform = `translateY(${progress * 24}px)`;
      content.style.opacity = `${Math.max(0, 1 - progress * 1.15)}`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <h1 className="text-balance text-[clamp(2.5rem,8vw,5.5rem)] font-medium tracking-[-0.04em] leading-[0.95]">
        {name}
      </h1>
      <p className="max-w-md text-balance text-lg text-ink-muted sm:text-xl">
        {line}
      </p>
      <ScrollCue />
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-muted">
      <div className="motion-safe:animate-hero-scroll-cue">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
