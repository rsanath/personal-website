"use client";

export function Hero({ title, subtitle }: {
  title: string,
  subtitle: string
}) {
  return (
    <section className="z-10 flex h-dvh w-full flex-col items-center justify-center gap-4 text-center" id="home">
      <h1 className="whitespace-break-spaces text-balance text-[clamp(2.5rem,8vw,5.5rem)] font-medium tracking-[-0.04em] leading-[0.95]">
        {title}
      </h1>
      <p className="max-w-lg font-mono text-balance text-lg text-foreground-muted sm:text-xl">
        {subtitle}
      </p>
    </section>
  );
}
