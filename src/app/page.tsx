import { Hero } from "@/components/hero";
import { Plasma } from "@/components/plasma";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center relative overflow-hidden">
      <Plasma className="absolute top-0 inset-x-auto w-full h-[50%] mx-auto bg-linear-to-b dark:from-teal-700 from-teal-600 to-transparent mask-[linear-gradient(to_bottom,black_1%,transparent_100%)]" />
      <Hero />
    </main>
  );
}
