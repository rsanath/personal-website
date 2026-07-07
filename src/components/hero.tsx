"use client";
import data from '@/data.json'

export function Hero() {
  
  return (
    <div
      className="relative max-w-[500px] z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <h1 className="whitespace-break-spaces text-balance text-[clamp(2.5rem,8vw,5.5rem)] font-medium tracking-[-0.04em] leading-[0.95]">
        {`Hi, I'm ${data.name}`}
      </h1>
      <p className="max-w-lg font-mono text-balance text-lg text-foreground-muted sm:text-xl">
        {data.description}
      </p>
    </div>
  );
}
