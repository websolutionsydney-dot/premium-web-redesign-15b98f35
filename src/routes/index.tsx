import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PROJECTS } from "@/lib/portfolio";
import { ArrowUpRight, ArrowRight, Sparkles, Layers, Code2, Globe } from "lucide-react";

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

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_60%)]" />
        <div className="container-editorial pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="eyebrow">Sydney · Est. quietly, refined over 25 years</div>
          <h1 className="mt-8 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight">
            Websites built<br />
            with <span className="italic text-[color:var(--gold)]">intention.</span>
          </h1>
          <div className="mt-12 grid gap-12 md:grid-cols-12 items-end">
            <p className="md:col-span-6 md:col-start-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
              We are a Sydney studio helping founders and established brands turn a
              digital presence into something considered — sites that read well, move
              gracefully, and grow with your business.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/portfolio" className="btn-gold">See the work <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn-ghost">Start a project</Link>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[color:var(--border)] pt-10">
            {[
              { k: "25+", v: "Years of practice" },
              { k: "200+", v: "Projects shipped" },
              { k: "24/7", v: "Support & care" },
              { k: "100%", v: "Custom builds" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-5xl text-[color:var(--gold)]">{s.k}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--ink)]">
        <div className="container-editorial py-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow">Our approach</div>
            <h2 className="mt-6 font-display text-5xl leading-tight">
              A studio, not a<br /> <span className="italic">production line.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-8">
            <p className="text-lg leading-relaxed text-foreground/90">
              Every project begins with a conversation and ends with a website that
              feels unmistakably yours. We don't build templates; we build understanding
              — of your business, your audience, and the small details that make a brand
              worth remembering.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              {[
                { icon: Sparkles, t: "Craft-first", d: "Considered typography, generous space, and pixel-precise builds." },
                { icon: Code2, t: "Modern engineering", d: "Fast, accessible, SEO-ready code on WordPress, custom stacks, or headless." },
                { icon: Layers, t: "Design systems", d: "Reusable components and identities that scale with your growth." },
                { icon: Globe, t: "Long-term partnership", d: "Hosting, maintenance and iteration — we stay close after launch." },
              ].map((f) => (
                <div key={f.t} className="hairline pl-4 pt-3">
                  <f.icon className="h-5 w-5 text-[color:var(--gold)]" />
                  <h3 className="mt-3 font-display text-2xl">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[color:var(--card)] border border-[color:var(--border)]">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mt-1">{p.category}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--ink)]">
        <div className="container-editorial py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="eyebrow">What we do</div>
              <h2 className="mt-6 font-display text-5xl leading-tight">Services in full.</h2>
              <Link to="/services" className="btn-ghost mt-8">Explore services <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul className="md:col-span-8 divide-y divide-[color:var(--border)]">
              {[
                "Web Design & Development",
                "E-Commerce & Shopping Cart",
                "Search Engine Marketing",
                "App Development",
                "Graphics & Logo Design",
                "Hosting & Domain",
              ].map((s, i) => (
                <li key={s} className="flex items-baseline justify-between py-6">
                  <span className="font-display text-3xl md:text-4xl">{s}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-32 text-center">
          <div className="eyebrow justify-center">Let's begin</div>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight max-w-4xl mx-auto">
            Have a project in <span className="italic text-[color:var(--gold)]">mind?</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-lg mx-auto">
            Tell us a little about your business. We'll respond within one working day.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/packages" className="btn-ghost">View packages</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
