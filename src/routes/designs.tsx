import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { DESIGN_CATEGORIES, ALL_DESIGNS_COUNT, thumbFor, type Design } from "@/lib/designs";
import { ArrowUpRight, LayoutGrid, Rows3, Search, Sparkles, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/designs")({
  head: () => ({
    meta: [
      { title: "Design Catalog — Web Solution Sydney" },
      { name: "description", content: "A living catalog of every website we've shipped — filter by industry, browse AI-enabled builds, and preview live projects." },
      { property: "og:title", content: "Design Catalog — Web Solution Sydney" },
      { property: "og:description", content: "Browse our full catalog of live websites and templates." },
    ],
  }),
  component: Designs,
});

const ALL_SLUG = "all";
const CATEGORIES = [{ name: "All", slug: ALL_SLUG }, ...DESIGN_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug }))];

function tagStyle(tag: string): string {
  const t = tag.toLowerCase();
  if (t.includes("ai") || t.includes("chatbot")) return "bg-[color:var(--brand)] text-white";
  if (t.includes("google") || t.includes("recaptcha")) return "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20";
  if (t.includes("smart") || t.includes("form") || t.includes("pop")) return "bg-amber-500/10 text-amber-700 border border-amber-500/20";
  if (t.includes("call")) return "bg-fuchsia-500/10 text-fuchsia-700 border border-fuchsia-500/20";
  return "bg-[color:var(--brand-soft)] text-[color:var(--brand-deep)] border border-[color:var(--border)]";
}

function Designs() {
  const [cat, setCat] = useState<string>(ALL_SLUG);
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const activeCategories = useMemo(() => {
    const filterDesign = (d: Design) => {
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return d.name.toLowerCase().includes(s) || d.url.toLowerCase().includes(s) || (d.tags ?? []).some((t) => t.toLowerCase().includes(s));
    };
    const base = cat === ALL_SLUG ? DESIGN_CATEGORIES : DESIGN_CATEGORIES.filter((c) => c.slug === cat);
    return base
      .map((c) => ({ ...c, designs: c.designs.filter(filterDesign) }))
      .filter((c) => c.designs.length > 0);
  }, [cat, q]);

  const totalShown = activeCategories.reduce((n, c) => n + c.designs.length, 0);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-brand)" }} />
        <div className="container-editorial pt-24 pb-20">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <div className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Design Catalog · Updated for 2026</div>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight">
                Every design<br />
                we've ever <span className="italic gradient-text">shipped.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                {ALL_DESIGNS_COUNT} live websites and templates across {DESIGN_CATEGORIES.length} industries — from AI-powered chatbots to full ecommerce builds. Search, filter and open any project live.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#catalog" className="btn-brand">Browse the catalog <ArrowUpRight className="h-4 w-4" /></a>
                <Link to="/contact" className="btn-ghost">Commission a build</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard number={`${ALL_DESIGNS_COUNT}`} label="Live projects" />
              <StatCard number={`${DESIGN_CATEGORIES.length}`} label="Industries" />
              <StatCard number="10" label="AI-enabled sites" accent />
              <StatCard number="25+" label="Years shipping" />
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section id="catalog" className="border-b border-[color:var(--border)] sticky top-20 z-40 bg-background/95 backdrop-blur">
        <div className="container-editorial py-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
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
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-white p-1 shrink-0">
              <ViewBtn active={view === "grid"} onClick={() => setView("grid")} icon={<LayoutGrid className="h-3.5 w-3.5" />} label="Grid" />
              <ViewBtn active={view === "list"} onClick={() => setView("list")} icon={<Rows3 className="h-3.5 w-3.5" />} label="List" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition ${
                  cat === c.slug
                    ? "border-transparent text-white shadow-[var(--shadow-soft)]"
                    : "border-[color:var(--border)] bg-white text-muted-foreground hover:text-[color:var(--brand)] hover:border-[color:var(--brand)]"
                }`}
                style={cat === c.slug ? { background: "var(--gradient-brand)" } : undefined}
              >
                {c.name}
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
              Showing <span className="text-[color:var(--ink)] font-medium">{totalShown}</span> of {ALL_DESIGNS_COUNT}
            </div>
            {q && <button onClick={() => setQ("")} className="text-xs uppercase tracking-widest text-[color:var(--brand)] hover:underline">Clear search</button>}
          </div>

          {activeCategories.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">No designs match your search.</p>
              <button onClick={() => { setQ(""); setCat(ALL_SLUG); }} className="btn-ghost mt-6">Reset filters</button>
            </div>
          )}

          <div className="space-y-20">
            {activeCategories.map((c) => (
              <CategoryBlock key={c.slug} category={c} view={view} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border)] bg-soft">
        <div className="container-editorial py-24 text-center">
          <div className="eyebrow justify-center">Ready when you are</div>
          <h2 className="mt-6 font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] max-w-4xl mx-auto">
            Add yours to the <span className="italic gradient-text">catalog.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground">Tell us about your project. We'll send a fixed quote within 24 hours.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-brand">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/packages" className="btn-ghost">See packages</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatCard({ number, label, accent }: { number: string; label: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow-soft)] ${accent ? "relative overflow-hidden" : ""}`}>
      {accent && <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-brand)" }} />}
      <div className="relative text-4xl font-display gradient-text">{number}</div>
      <div className="relative text-xs uppercase tracking-widest text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

function ViewBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-widest transition ${active ? "text-white" : "text-muted-foreground hover:text-[color:var(--brand)]"}`}
      style={active ? { background: "var(--gradient-brand)" } : undefined}
      aria-label={`${label} view`}
    >
      {icon} {label}
    </button>
  );
}

function CategoryBlock({ category, view }: { category: { name: string; slug: string; blurb: string; designs: Design[] }; view: "grid" | "list" }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6 border-b border-[color:var(--border)] pb-4">
        <div>
          <div className="eyebrow">{String(category.designs.length).padStart(2, "0")} projects</div>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight">{category.name}</h2>
          {category.blurb && <p className="mt-2 text-sm text-muted-foreground max-w-xl">{category.blurb}</p>}
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {category.designs.map((d, i) => (
            <DesignCard key={d.url} design={d} index={i} />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)] overflow-hidden">
          {category.designs.map((d, i) => (
            <DesignRow key={d.url} design={d} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function DesignCard({ design, index }: { design: Design; index: number }) {
  const host = (() => { try { return new URL(design.url).hostname.replace(/^www\./, ""); } catch { return design.url; } })();
  return (
    <a href={design.url} target="_blank" rel="noreferrer" className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-lift)] transition">
        <img
          src={thumbFor(design.url)}
          alt={design.name}
          loading={index < 3 ? "eager" : "lazy"}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {design.demo && (
            <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-widest text-[color:var(--brand-deep)]">Template</span>
          )}
          {(design.tags ?? []).slice(0, 2).map((t) => (
            <span key={t} className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${tagStyle(t)}`}>{t}</span>
          ))}
        </div>
        <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-brand)" }}>
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition">
          <span className="text-xs text-white/90 truncate flex items-center gap-1"><ExternalLink className="h-3 w-3" />{host}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-xl truncate">{design.name}</h3>
        <div className="mt-1 text-xs text-muted-foreground truncate">{host}</div>
      </div>
    </a>
  );
}

function DesignRow({ design, index }: { design: Design; index: number }) {
  const host = (() => { try { return new URL(design.url).hostname.replace(/^www\./, ""); } catch { return design.url; } })();
  return (
    <a href={design.url} target="_blank" rel="noreferrer" className="group flex items-center gap-6 p-4 md:p-5 transition hover:bg-[color:var(--brand-soft)]/40">
      <div className="hidden md:block text-xs uppercase tracking-widest text-muted-foreground w-8 shrink-0">{String(index + 1).padStart(2, "0")}</div>
      <div className="relative aspect-[4/3] w-24 md:w-36 shrink-0 overflow-hidden rounded-lg border border-[color:var(--border)] bg-white">
        <img src={thumbFor(design.url)} alt={design.name} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg md:text-xl truncate">{design.name}</h3>
        <div className="mt-1 text-xs text-muted-foreground truncate">{host}</div>
        {(design.tags?.length || design.demo) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {design.demo && <span className="rounded-full bg-[color:var(--brand-soft)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[color:var(--brand-deep)]">Template</span>}
            {(design.tags ?? []).map((t) => (
              <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${tagStyle(t)}`}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--brand)] transition group-hover:border-transparent group-hover:bg-[color:var(--brand)] group-hover:text-white">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </a>
  );
}
