import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PROJECTS, CATEGORIES } from "@/lib/portfolio";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Web Solution Sydney" },
      { name: "description", content: "Selected websites and ecommerce stores by Web Solution Sydney — construction, retail, hospitality, professional services and more." },
      { property: "og:title", content: "Portfolio — Web Solution Sydney" },
      { property: "og:description", content: "Selected work from a Sydney web studio." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [cat, setCat] = useState<string>("All");
  const filtered = useMemo(
    () => (cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <SiteLayout>
      <section className="border-b border-[color:var(--border)]">
        <div className="container-editorial pt-24 pb-16">
          <div className="eyebrow">Portfolio · {PROJECTS.length} projects</div>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-tight max-w-5xl">
            The work<br />speaks <span className="italic text-[color:var(--gold)]">for itself.</span>
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[color:var(--border)] sticky top-20 z-40 bg-background/90 backdrop-blur">
        <div className="container-editorial py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition ${
                cat === c
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-[color:var(--ink)]"
                  : "border-[color:var(--border)] text-muted-foreground hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="container-editorial py-16">
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[color:var(--card)] border border-[color:var(--border)]">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl truncate">{p.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-widest text-[color:var(--gold)]">{p.category}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[60%]">
                    {new URL(p.url).hostname.replace(/^www\./, "")}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-24">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 text-center">
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[1] max-w-4xl mx-auto">
            Yours could be <span className="italic text-[color:var(--gold)]">next.</span>
          </h2>
          <Link to="/contact" className="btn-gold mt-10">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
