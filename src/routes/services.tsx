import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowUpRight, Code, ShoppingBag, Search, Smartphone, Palette, PenTool, Server, Globe } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Web Solution Sydney" },
      { name: "description", content: "Web design, ecommerce, SEO, app development, branding and hosting — a full studio offering from Web Solution Sydney." },
      { property: "og:title", content: "Services — Web Solution Sydney" },
      { property: "og:description", content: "A full studio offering, from design to hosting." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Code, t: "Web Design & Development", d: "Custom websites for businesses and individuals — visually distinct, fast, and built to convert." },
  { icon: ShoppingBag, t: "E-Commerce", d: "Considered online stores on Shopify, WooCommerce or headless stacks — designed to sell." },
  { icon: Search, t: "Search Engine Marketing", d: "Technical SEO, content strategy and paid campaigns that reach the right audience." },
  { icon: Smartphone, t: "App Development", d: "Cross-platform apps that extend your product into the mobile world with polish." },
  { icon: Palette, t: "Graphic Design", d: "Brand systems, print, and visual assets that carry your voice across every surface." },
  { icon: PenTool, t: "Logo Design", d: "Marks that feel timeless — considered, durable, and unmistakably yours." },
  { icon: Server, t: "Hosting & Support", d: "Secure hosting with 24/7 monitoring, backups and hands-on technical support." },
  { icon: Globe, t: "Domain Registration", d: "Domain acquisition and DNS management — quietly handled so you don't have to." },
];

function Services() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-24 pb-24">
          <div className="eyebrow">Services</div>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1] tracking-tight max-w-5xl">
            Everything a modern business needs, under <span className="italic gradient-text">one roof.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            From a single-page site to a full ecommerce platform, we cover the arc —
            design, engineering, content, marketing, and the quiet upkeep that follows.
          </p>
        </div>
      </section>

      <section>
        <div className="container-editorial py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <article key={s.t} className="card-soft group p-8">
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-brand)" }}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
                </div>
                <h2 className="mt-6 font-display text-2xl leading-tight">{s.t}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="container-editorial py-24">
          <div className="eyebrow">How we work</div>
          <h2 className="mt-4 font-display text-5xl leading-tight max-w-2xl">A calm four-step method.</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-6 left-8 right-8 h-px bg-gradient-to-r from-[color:var(--brand)] via-[color:var(--brand-deep)] to-transparent" />
            {[
              { s: "01", t: "Listen", d: "We start with a conversation. What are you selling, and to whom?" },
              { s: "02", t: "Design", d: "Concepts and iterations, presented in full — no black boxes." },
              { s: "03", t: "Build", d: "Fast, accessible, SEO-ready code on the right platform." },
              { s: "04", t: "Support", d: "Hosting, updates and ongoing partnership after launch." },
            ].map((p) => (
              <div key={p.s} className="relative card-soft p-6">
                <div className="grid h-12 w-12 place-items-center rounded-full text-white font-display font-medium relative -mt-12 mx-auto md:mx-0 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-brand)" }}>
                  {p.s}
                </div>
                <h3 className="mt-5 font-display text-2xl">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 text-center">
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] max-w-4xl mx-auto">
            Not sure where <span className="italic gradient-text">to start?</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto">A short call is often enough. Tell us about your business and we'll suggest the shape.</p>
          <Link to="/contact" className="btn-brand mt-10">Get in touch <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
