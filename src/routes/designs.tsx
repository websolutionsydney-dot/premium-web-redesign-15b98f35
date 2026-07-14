import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { DESIGN_CATEGORIES, ALL_DESIGNS_COUNT, type Design } from "@/lib/designs";
import { ArrowUpRight, Search, Sparkles, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/designs")({
  head: () => ({
    meta: [
      { title: "Design Catalog — Web Solution Sydney" },
      { name: "description", content: "A living index of every website we've shipped — organised by industry with live links." },
      { property: "og:title", content: "Design Catalog — Web Solution Sydney" },
      { property: "og:description", content: "Text-based catalog of live websites and templates." },
    ],
  }),
  component: Designs,
});

function tagStyle(tag: string): string {
  const t = tag.toLowerCase();
  if (t.includes("ai") || t.includes("chatbot")) return "bg-[color:var(--brand)] text-white";
  if (t.includes("google") || t.includes("recaptcha")) return "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20";
  if (t.includes("smart") || t.includes("form") || t.includes("pop")) return "bg-amber-500/10 text-amber-700 border border-amber-500/20";
  if (t.includes("call")) return "bg-fuchsia-500/10 text-fuchsia-700 border border-fuchsia-500/20";
  return "bg-[color:var(--brand-soft)] text-[color:var(--brand-deep)] border border-[color:var(--border)]";
}

const hostOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

function Designs() {
  const [q, setQ] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeCategories = useMemo(() => {
    const filterDesign = (d: Design) => {
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return d.name.toLowerCase().includes(s) || d.url.toLowerCase().includes(s) || (d.tags ?? []).some((t) => t.toLowerCase().includes(s));
    };
    const base = activeSlug ? DESIGN_CATEGORIES.filter((c) => c.slug === activeSlug) : DESIGN_CATEGORIES;
    return base
      .map((c) => ({ ...c, designs: c.designs.filter(filterDesign) }))
      .filter((c) => c.designs.length > 0);
  }, [q, activeSlug]);

  const totalShown = activeCategories.reduce((n, c) => n + c.designs.length, 0);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-brand)" }} />
        <div className="container-editorial pt-24 pb-16">
          <div className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Design Index · {ALL_DESIGNS_COUNT} live projects</div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-5xl">
            The full <span className="italic gradient-text">index.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every website we've shipped, organised by industry. A working directory — not a gallery. Click any line to open the live site.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b border-[color:var(--border)] sticky top-20 z-40 bg-background/95 backdrop-blur">
        <div className="container-editorial py-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, URL or tag…"
              className="w-full rounded-full border border-[color:var(--border)] bg-white pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            <button
              onClick={() => setActiveSlug(null)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-widest transition ${
                !activeSlug
                  ? "border-transparent text-white shadow-[var(--shadow-soft)]"
                  : "border-[color:var(--border)] bg-white text-muted-foreground hover:text-[color:var(--brand)] hover:border-[color:var(--brand)]"
              }`}
              style={!activeSlug ? { background: "var(--gradient-brand)" } : undefined}
            >
              All
            </button>
            {DESIGN_CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                onClick={(e) => { e.preventDefault(); setActiveSlug(c.slug); document.getElementById(c.slug)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-widest transition ${
                  activeSlug === c.slug
                    ? "border-transparent text-white shadow-[var(--shadow-soft)]"
                    : "border-[color:var(--border)] bg-white text-muted-foreground hover:text-[color:var(--brand)] hover:border-[color:var(--brand)]"
                }`}
                style={activeSlug === c.slug ? { background: "var(--gradient-brand)" } : undefined}
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section>
        <div className="container-editorial py-16">
          <div className="mb-10 flex items-baseline justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="text-[color:var(--ink)] font-medium">{totalShown}</span> of {ALL_DESIGNS_COUNT} projects
            </div>
            {(q || activeSlug) && (
              <button
                onClick={() => { setQ(""); setActiveSlug(null); }}
                className="text-xs uppercase tracking-widest text-[color:var(--brand)] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {activeCategories.length === 0 && (
            <p className="text-center text-muted-foreground py-24">No projects match your search.</p>
          )}

          <div className="space-y-16">
            {activeCategories.map((cat, ci) => (
              <div key={cat.slug} id={cat.slug} className="scroll-mt-40">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                  {/* Category header */}
                  <div className="lg:sticky lg:top-40 lg:self-start">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-4xl text-[color:var(--brand)]/30">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {cat.designs.length} {cat.designs.length === 1 ? "project" : "projects"}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-3xl leading-tight">
                      {cat.name}
                    </h2>
                    {cat.blurb && (
                      <p className="mt-3 text-sm text-muted-foreground max-w-xs">{cat.blurb}</p>
                    )}
                    <div className="mt-4 h-px w-16 bg-[color:var(--brand)]" />
                  </div>

                  {/* Design list */}
                  <ul className="divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
                    {cat.designs.map((d, i) => (
                      <DesignLine key={d.url} design={d} index={i} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border)] bg-soft">
        <div className="container-editorial py-24 text-center">
          <div className="eyebrow justify-center">Ready when you are</div>
          <h2 className="mt-6 font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] max-w-4xl mx-auto">
            Add yours to the <span className="italic gradient-text">index.</span>
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

function DesignLine({ design, index }: { design: Design; index: number }) {
  const host = hostOf(design.url);
  return (
    <li>
      <a
        href={design.url}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-4 py-4 md:py-5 transition"
      >
        {/* Hover gradient underline effect */}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-0 opacity-0 transition-all duration-300 group-hover:w-1.5 group-hover:opacity-100"
          style={{ background: "var(--gradient-brand)" }}
        />
        <span className="font-display text-sm w-8 shrink-0 tabular-nums text-muted-foreground group-hover:text-[color:var(--brand)] transition">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1 flex flex-col md:flex-row md:items-baseline md:gap-4">
          <span className="font-display text-lg md:text-xl truncate group-hover:text-[color:var(--brand)] transition">
            {design.name}
          </span>
          <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            {host}
          </span>
        </div>

        {(design.demo || design.tags?.length) && (
          <div className="hidden sm:flex flex-wrap items-center gap-1.5 shrink-0 max-w-[45%] justify-end">
            {design.demo && (
              <span className="rounded-full bg-[color:var(--brand-soft)] px-2.5 py-1 text-[10px] uppercase tracking-widest text-[color:var(--brand-deep)] border border-[color:var(--border)]">
                Template
              </span>
            )}
            {(design.tags ?? []).map((t) => (
              <span key={t} className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${tagStyle(t)}`}>
                {t}
              </span>
            ))}
          </div>
        )}

        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-[color:var(--brand)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </li>
  );
}
