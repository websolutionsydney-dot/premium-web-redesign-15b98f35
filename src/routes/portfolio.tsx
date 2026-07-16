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
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-24 pb-16">
          <div className="eyebrow">Portfolio · {PROJECTS.length} projects</div>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1] tracking-tight max-w-5xl">
            The work<br />speaks <span className="italic gradient-text">for itself.</span>
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
                  ? "border-transparent text-white shadow-[var(--shadow-soft)]"
                  : "border-[color:var(--border)] bg-white text-muted-foreground hover:text-[color:var(--brand)] hover:border-[color:var(--brand)]"
              }`}
              style={cat === c ? { background: "var(--gradient-brand)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="container-editorial py-16">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-lift)] transition">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading={i < 3 ? "eager" : "lazy"}
                    onError={(e) => {
                      const img = e.currentTarget;
                      const tries = Number(img.dataset.tries || 0);
                      if (tries < 2) {
                        img.dataset.tries = String(tries + 1);
                        setTimeout(() => { img.src = p.image + `&r=${tries + 1}`; }, 1200);
                      } else {
                        img.style.display = "none";
                      }
                    }}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-brand)" }}>
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
                  <span className="text-xs uppercase tracking-widest text-[color:var(--brand)]">{p.category}</span>
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

          <div className="mt-16 flex justify-center">
            <Link to="/designs" className="btn-brand">
              Explore full design catalog <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>



      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 text-center">
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] max-w-4xl mx-auto">
            Yours could be <span className="italic gradient-text">next.</span>
          </h2>
          <Link to="/contact" className="btn-brand mt-10">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
