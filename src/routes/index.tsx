import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PROJECTS } from "@/lib/portfolio";
import { ArrowUpRight, ArrowRight, Sparkles, Layers, Code2, Globe, Zap, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Web Solution Sydney — Premium Web Design & Development" },
      { name: "description", content: "Sydney's premium web studio. 25 years designing and developing websites, ecommerce and digital brands for Australian businesses." },
      { property: "og:title", content: "Web Solution Sydney — Premium Web Design Studio" },
      { property: "og:description", content: "Websites, ecommerce, and digital identities crafted in Sydney." },
    ],
  }),
  component: Home,
});

const featured = PROJECTS.slice(0, 6);
const tech = [
  { name: "WordPress", short: "WP" },
  { name: "React", short: "⚛" },
  { name: "Shopify", short: "S" },
  { name: "HTML5", short: "5" },
  { name: "CSS3", short: "3" },
  { name: "JavaScript", short: "JS" },
  { name: "PHP", short: "P" },
  { name: "Bootstrap", short: "B" },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-soft">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <div className="eyebrow">
                <span className="grid h-2 w-2 place-items-center rounded-full bg-[color:var(--brand)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--brand)] animate-ping" />
                </span>
                Sydney's premier web studio · 25 years
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1] tracking-tight">
                Websites that<br />
                <span className="gradient-text italic">move business forward.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                We're a Sydney studio helping founders and established brands turn a
                digital presence into something considered — websites that read well,
                perform beautifully, and grow with you.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/portfolio" className="btn-brand">See the work <ArrowUpRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn-ghost">Start a project</Link>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-9 w-9 rounded-full border-2 border-white shadow-sm" style={{ background: `linear-gradient(135deg, oklch(0.7 0.15 ${230 + i*10}), oklch(0.45 0.18 ${250 + i*5}))` }} />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[color:var(--brand-deep)] font-medium">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <div>Trusted by 200+ Australian businesses</div>
                </div>
              </div>
            </div>

            {/* Illustrative hero graphic */}
            <div className="md:col-span-5 relative">
              <div className="relative aspect-square">
                {/* Floating cards */}
                <div className="absolute inset-0 rounded-3xl bg-white shadow-[var(--shadow-lift)] overflow-hidden border border-[color:var(--border)]">
                  <div className="h-10 flex items-center gap-1.5 px-4 bg-[color:var(--surface)] border-b border-[color:var(--border)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-3 text-[10px] text-muted-foreground">websolutionsydney.com.au</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-2 w-24 rounded-full bg-[color:var(--brand-soft)]" />
                    <div className="h-6 w-full rounded bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-deep)] opacity-90" />
                    <div className="h-6 w-3/4 rounded bg-[color:var(--brand-soft)]" />
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="aspect-square rounded-lg bg-[color:var(--surface)]" />
                      <div className="aspect-square rounded-lg bg-[color:var(--brand-soft)]" />
                      <div className="aspect-square rounded-lg bg-[color:var(--surface)]" />
                    </div>
                    <div className="h-2 w-1/2 rounded-full bg-[color:var(--muted)]" />
                    <div className="h-2 w-2/3 rounded-full bg-[color:var(--muted)]" />
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -left-6 top-1/3 card-soft p-4 rotate-[-6deg] flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full grid place-items-center" style={{ background: "var(--gradient-brand)" }}>
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-[color:var(--ink)]">99 / 100</div>
                    <div className="text-muted-foreground">PageSpeed</div>
                  </div>
                </div>
                <div className="absolute -right-4 bottom-6 card-soft p-4 rotate-[4deg]">
                  <div className="flex items-center gap-1 text-[color:var(--brand-deep)] mb-1">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <div className="text-xs font-medium text-[color:var(--ink)]">200+ happy clients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { k: "25+", v: "Years of craft" },
              { k: "200+", v: "Projects shipped" },
              { k: "24/7", v: "Ongoing support" },
              { k: "100%", v: "Custom-built" },
            ].map((s) => (
              <div key={s.v} className="card-soft p-6">
                <div className="font-display text-5xl gradient-text">{s.k}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow">Our approach</div>
            <h2 className="mt-6 font-display text-5xl leading-tight">
              A studio, not a<br /> <span className="italic gradient-text">production line.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-8">
            <p className="text-lg leading-relaxed">
              Every project begins with a conversation and ends with a website that
              feels unmistakably yours. We don't build templates; we build understanding
              — of your business, your audience, and the small details that make a brand
              worth remembering.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Sparkles, t: "Craft-first", d: "Considered typography, generous space, pixel-precise builds." },
                { icon: Code2, t: "Modern engineering", d: "Fast, accessible, SEO-ready code — WordPress to custom stacks." },
                { icon: Layers, t: "Design systems", d: "Reusable components and identities that scale with your growth." },
                { icon: Globe, t: "Long-term partnership", d: "Hosting, maintenance and iteration — we stay close after launch." },
              ].map((f) => (
                <div key={f.t} className="card-soft p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="container-editorial py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center">Built on modern tech</div>
            <h2 className="mt-4 font-display text-4xl">The right tool for the job.</h2>
          </div>
          <div className="mt-12 grid grid-cols-4 md:grid-cols-8 gap-4">
            {tech.map((t) => (
              <div key={t.name} className="card-soft aspect-square flex flex-col items-center justify-center gap-2 p-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl text-white font-display text-lg" style={{ background: "var(--gradient-brand)" }}>
                  {t.short}
                </div>
                <div className="text-[11px] font-medium text-[color:var(--ink)] text-center">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="eyebrow">Selected work</div>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">Recent projects</h2>
            </div>
            <Link to="/portfolio" className="btn-ghost">All projects <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
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
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-brand)" }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--brand)] mt-1">{p.category}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="container-editorial py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="eyebrow">What we do</div>
              <h2 className="mt-6 font-display text-5xl leading-tight">Services in full.</h2>
              <Link to="/services" className="btn-ghost mt-8">Explore services <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul className="md:col-span-8 divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
              {[
                "Web Design & Development",
                "E-Commerce & Shopping Cart",
                "Search Engine Marketing",
                "App Development",
                "Graphics & Logo Design",
                "Hosting & Domain",
              ].map((s, i) => (
                <li key={s} className="group flex items-baseline justify-between py-6 transition">
                  <span className="font-display text-3xl md:text-4xl transition group-hover:text-[color:var(--brand)] group-hover:translate-x-2">{s}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-32">
          <div className="relative overflow-hidden rounded-3xl px-8 py-20 md:py-28 text-center text-white" style={{ background: "var(--gradient-brand)" }}>
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-white/80">Let's begin</div>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight max-w-4xl mx-auto text-white">
                Have a project in <em>mind?</em>
              </h2>
              <p className="mt-6 text-lg text-white/85 max-w-lg mx-auto">
                Tell us a little about your business. We'll respond within one working day.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[color:var(--brand-deep)] shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition">
                  View packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
