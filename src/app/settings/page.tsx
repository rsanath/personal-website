import { AppearanceRow } from "@/components/appearance-row";

export default function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col bg-background px-6 py-24 text-foreground sm:py-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <h1 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          Settings
        </h1>
        <ul className="flex flex-col">
          <li className="flex items-center justify-between gap-4 py-4">
            <span className="font-mono text-sm text-foreground-muted">
              appearance
            </span>
            <AppearanceRow />
          </li>
        </ul>
      </div>
    </main>
  );
}
