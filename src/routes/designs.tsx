import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PROJECTS, CATEGORIES } from "@/lib/portfolio";
import { ArrowUpRight, LayoutGrid, Rows3, Search } from "lucide-react";

export const Route = createFileRoute("/designs")({
  head: () => ({
    meta: [
      { title: "Design Catalog — Web Solution Sydney" },
      { name: "description", content: "A curated catalog of website designs by Web Solution Sydney. Browse by industry, filter by category, and preview live projects." },
      { property: "og:title", content: "Design Catalog — Web Solution Sydney" },
      { property: "og:description", content: "Explore our full catalog of website designs, organized by industry." },
    ],
  }),
  component: Designs,
});

function Designs() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    return list;
  }, [cat, q]);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-24 pb-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">Design Catalog · {PROJECTS.length} live projects</div>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight max-w-4xl">
                Every design,<br />
                <span className="italic gradient-text">catalogued.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                A living archive of the websites we've shipped across Sydney and beyond — search, filter, and preview each live build.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-[color:var(--border)] bg-white px-5 py-4 shadow-[var(--shadow-soft)]">
                <div className="text-3xl font-display gradient-text">{PROJECTS.length}+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Live sites</div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white px-5 py-4 shadow-[var(--shadow-soft)]">
                <div className="text-3xl font-display gradient-text">{CATEGORIES.length - 1}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Industries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b border-[color:var(--border)] sticky top-20 z-40 bg-background/95 backdrop-blur">
        <div className="container-editorial py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search designs by name or industry…"
                className="w-full rounded-full border border-[color:var(--border)] bg-white pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
              />
            </div>
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-white p-1">
              <button
                onClick={() => setView("grid")}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-widest transition ${view === "grid" ? "text-white" : "text-muted-foreground hover:text-[color:var(--brand)]"}`}
                style={view === "grid" ? { background: "var(--gradient-brand)" } : undefined}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-widest transition ${view === "list" ? "text-white" : "text-muted-foreground hover:text-[color:var(--brand)]"}`}
                style={view === "list" ? { background: "var(--gradient-brand)" } : undefined}
                aria-label="List view"
              >
                <Rows3 className="h-3.5 w-3.5" /> List
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
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
        </div>
      </section>

      {/* Catalog */}
      <section>
        <div className="container-editorial py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="text-[color:var(--ink)] font-medium">{filtered.length}</span> of {PROJECTS.length}
              {cat !== "All" && <> in <span className="text-[color:var(--brand)]">{cat}</span></>}
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--brand-deep)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-brand)" }}>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition">
                      <span className="text-xs text-white/90 truncate">
                        {new URL(p.url).hostname.replace(/^www\./, "")}
                      </span>
                      <span className="text-xs text-white/90">View live →</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl truncate">{p.name}</h3>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs uppercase tracking-widest text-[color:var(--brand)]">{p.category}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)] overflow-hidden">
              {filtered.map((p, i) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-6 p-4 md:p-6 transition hover:bg-[color:var(--brand-soft)]/40"
                >
                  <div className="hidden md:block text-xs uppercase tracking-widest text-muted-foreground w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative aspect-[4/3] w-28 md:w-40 shrink-0 overflow-hidden rounded-lg border border-[color:var(--border)]">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl md:text-2xl truncate">{p.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="text-xs uppercase tracking-widest text-[color:var(--brand)]">{p.category}</span>
                      <span className="text-xs text-muted-foreground truncate">{new URL(p.url).hostname.replace(/^www\./, "")}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--brand)] transition group-hover:border-transparent group-hover:text-white" style={{}}>
                    <span className="sr-only">Open</span>
                    <ArrowUpRight className="h-5 w-5 transition group-hover:scale-110" />
                  </div>
                </a>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">No designs match your search.</p>
              <button onClick={() => { setQ(""); setCat("All"); }} className="btn-ghost mt-6">Reset filters</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border)] bg-soft">
        <div className="container-editorial py-24 text-center">
          <div className="eyebrow justify-center">Ready when you are</div>
          <h2 className="mt-6 font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] max-w-4xl mx-auto">
            Let's add yours to the <span className="italic gradient-text">catalog.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-brand">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/packages" className="btn-ghost">See packages</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
