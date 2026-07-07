import { SkillChip, type SkillItem } from "@/components/skill-chip";

type SkillGroup = { category: string; items: SkillItem[] };

export function CV({
  skills,
  experience,
}: {
  skills: SkillGroup[];
  experience: string;
}) {
  return (
    <section id="about" className="bg-background px-6 py-20 text-foreground w-150 max-w-[90%]">
      <div className="mx-auto flex max-w-3xl flex-col gap-20">
        <div className="flex flex-col gap-8">
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Skills
          </h2>
          <div className="flex flex-col gap-6">
            {skills.map((group) => (
              <div key={group.category} className="flex flex-col gap-3">
                <h3 className="font-mono text-sm text-foreground-muted">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <SkillChip key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Experience
          </h2>
          <div className="flex flex-col whitespace-break-spaces text-lg text-foreground-muted">
            {experience}
          </div>
        </div>
      </div>
    </section>
  );
}
