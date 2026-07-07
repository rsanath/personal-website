import { Hero } from "@/components/hero";
import data from "@/data.json";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero title={`Hi, I'm ${data.name}`} subtitle={data.description} />
    </main>
  );
}
