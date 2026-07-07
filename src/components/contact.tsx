import data from "@/data.json";

export default function ContactSection() {
  const items = [
    { name: "email", url: `mailto:${data.email}`, display: data.email },
    ...data.links.map((link) => ({
      name: link.name,
      url: link.url,
      display: link.url.replace(/^https?:\/\//, ""),
    })),
  ];

  return (
    <section id="contact" className="flex flex-1 flex-col bg-background px-6 py-12 text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <h1 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          Contact
        </h1>
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li
              key={item.name}
              className={i > 0 ? "border-t border-foreground-faint" : undefined}
            >
              <a
                href={item.url}
                target={item.name === "email" ? undefined : "_blank"}
                rel={item.name === "email" ? undefined : "noreferrer"}
                className="flex items-baseline justify-between gap-4 py-4 hover:text-primary-500"
              >
                <span className="font-mono text-sm text-foreground-muted">
                  {item.name}
                </span>
                <span>{item.display}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
