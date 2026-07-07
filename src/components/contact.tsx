import { Mail } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import StackIcon from "tech-stack-icons";
import linkedinIcon from "@/app/assets/linkedin.svg";
import data from "@/data.json";

const LINK_ICONS: Record<string, ReactNode> = {
  github: <StackIcon name="github" variant="dark" className="h-5 w-5" />,
  linkedin: <Image src={linkedinIcon} alt="" className="h-5 w-5" />,
};

export default function ContactSection() {
  const items = [
    {
      name: "email",
      url: `mailto:${data.email}`,
      icon: <Mail className="h-5 w-5" />,
    },
    ...data.links.map((link) => ({
      name: link.name,
      url: link.url,
      icon: LINK_ICONS[link.name],
    })),
  ];

  return (
    <section
      id="contact"
      className="flex flex-1 flex-col bg-background px-6 py-12 text-foreground w-150 max-w-[90%]"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <h1 className="font-serif text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          Contact
        </h1>
        <ul className="flex flex-row gap-6 items-center justify-center">
          {items.map((item, i) => (
            <li key={item.name}>
              <a
                href={item.url}
                target={item.name === "email" ? undefined : "_blank"}
                rel={item.name === "email" ? undefined : "noreferrer"}
                aria-label={item.name}
                className="group flex items-center justify-between gap-4 py-4 opacity-80 hover:opacity-100"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
