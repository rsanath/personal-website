import data from "@/data.json";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-background px-6 py-24 text-foreground sm:py-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <h1 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          About
        </h1>
        <p className="max-w-prose text-pretty text-foreground-muted">
          {data.description}
        </p>
      </div>
    </main>
  );
}
