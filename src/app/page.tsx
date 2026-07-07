import ContactSection from "@/components/contact";
import { CV } from "@/components/cv";
import { Hero } from "@/components/hero";
import { Plasma } from "@/components/plasma";
import data from "@/data.json";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center relative overflow-hidden">
      <Plasma className="absolute top-0 inset-x-auto w-full h-[50vh] mx-auto bg-linear-to-b dark:from-teal-700 from-teal-600 to-transparent mask-[linear-gradient(to_bottom,black_1%,transparent_100%)]" />
      <Hero title={`Hi, I'm ${data.name}`} subtitle={data.description} />
      <CV skills={data.skills} experience={data.experienceSummary} />
      <ContactSection />
    </main>
  );
}
