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
      <section className="border-b border-[color:var(--border)]">
        <div className="container-editorial pt-24 pb-24">
          <div className="eyebrow">Services</div>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-tight max-w-5xl">
            Everything a modern<br /> business needs, under <span className="italic text-[color:var(--gold)]">one roof.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            From a single-page site to a full ecommerce platform, we cover the arc —
            design, engineering, content, marketing, and the quiet upkeep that follows.
          </p>
        </div>
      </section>

      <section>
        <div className="container-editorial py-24">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 divide-y md:divide-y-0">
            {SERVICES.map((s, i) => (
              <article key={s.t} className="group py-10 md:border-t border-[color:var(--border)]">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <span className="text-xs uppercase tracking-widest text-[color:var(--gold)]">0{i + 1}</span>
                    <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--border)] group-hover:border-[color:var(--gold)] transition">
                      <s.icon className="h-6 w-6 text-[color:var(--gold)]" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-4xl leading-tight">{s.t}</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--ink)]">
        <div className="container-editorial py-24">
          <div className="eyebrow">How we work</div>
          <div className="mt-10 grid md:grid-cols-4 gap-10">
            {[
              { s: "01", t: "Listen", d: "We start with a conversation. What are you selling, and to whom?" },
              { s: "02", t: "Design", d: "Concepts and iterations, presented in full — no black boxes." },
              { s: "03", t: "Build", d: "Fast, accessible, SEO-ready code on the right platform for the job." },
              { s: "04", t: "Support", d: "Hosting, updates and ongoing partnership after launch." },
            ].map((p) => (
              <div key={p.s}>
                <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">{p.s}</div>
                <h3 className="mt-4 font-display text-3xl">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 text-center">
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[1] max-w-4xl mx-auto">
            Not sure where<br /> <span className="italic text-[color:var(--gold)]">to start?</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto">A short call is often enough. Tell us about your business and we'll suggest the shape.</p>
          <Link to="/contact" className="btn-gold mt-10">Get in touch <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
