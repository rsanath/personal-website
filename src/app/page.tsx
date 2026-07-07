import { Hero } from "@/components/hero";
import data from "@/data.json";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero name={data.name} line="Building small, considered things." />
    </main>
  );
}
