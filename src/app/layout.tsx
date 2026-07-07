import { BottomNav } from "@/components/bottom-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { THEME_INIT_SCRIPT } from "@/hooks/use-theme";
import type { Metadata } from "next";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Manrope
} from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"]
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanath",
  description:
    "Sanath — software developer building mobile apps, websites, servers, and blockchain apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script (no user input) that must run before first paint to avoid a theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col pb-28 font-sans">
        <ThemeToggle />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
