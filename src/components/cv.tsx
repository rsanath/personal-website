import StackIcon, { type IconName } from "tech-stack-icons";
import { cn } from "@/util";

type SkillItem = { name: string; icon?: string };
type SkillGroup = { category: string; items: SkillItem[] };

export function CV({
  skills,
  experience,
}: {
  skills: SkillGroup[];
  experience: string;
}) {
  return (
    <section
      id="about"
      className="bg-background px-6 py-20 text-foreground"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-20">
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
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
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Experience
          </h2>
          <div className="flex flex-col whitespace-break-spaces">
            {experience}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillChip({ item }: { item: SkillItem }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-foreground-faint py-1.5 pl-1.5 pr-3">
      {item.icon ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <StackIcon
            name={item.icon as IconName}
            variant="dark"
            className="h-5 w-5"
          />
        </span>
      ) : null}
      <span className="font-mono text-sm">{item.name}</span>
    </div>
  );
}
