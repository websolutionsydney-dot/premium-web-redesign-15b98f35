import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PaymentPage } from "@/components/PaymentPage";
import { getHostContext } from "@/lib/host.functions";
import { PROJECTS } from "@/lib/portfolio";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Globe,
  Zap,
  Star,
  Award,
  Quote,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  loader: () => getHostContext(),
  head: () => ({
    meta: [
      { title: "Web Solution Sydney — Premium Web Design & Development" },
      { name: "description", content: "Sydney's premium web studio. 25 years designing and developing websites, ecommerce and digital brands for Australian businesses." },
      { property: "og:title", content: "Web Solution Sydney — Premium Web Design Studio" },
      { property: "og:description", content: "Websites, ecommerce, and digital identities crafted in Sydney." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const process = [
  {
    n: "01",
    t: "Discovery",
    d: "A quiet conversation about your business, audience and ambitions. We listen more than we speak.",
  },
  {
    n: "02",
    t: "Design",
    d: "Considered typography and layout. We prototype in the browser so you feel the site, not a picture of it.",
  },
  {
    n: "03",
    t: "Build",
    d: "Fast, accessible, SEO-ready code. WordPress, custom stacks — whatever serves your project best.",
  },
  {
    n: "04",
    t: "Partnership",
    d: "Launch is the beginning. We stay close with hosting, maintenance and thoughtful iteration.",
  },
];

const testimonials = [
  {
    q: "The most professional web team we've worked with in twenty years of business. Every detail was considered.",
    a: "Margaret Chen",
    r: "Director, Chen & Associates",
  },
  {
    q: "Our new site tripled enquiries in the first quarter. Ryan and the team genuinely care about the outcome.",
    a: "David Papadopoulos",
    r: "Founder, Sydney Restoration Co.",
  },
  {
    q: "Elegant, fast, and refreshingly free of the usual agency circus. We recommend them constantly.",
    a: "Priya Sharma",
    r: "CMO, Harbourline Group",
  },
];

const clientNames = [
  "Harbourline",
  "Chen & Associates",
  "Kingsford Studio",
  "Northshore Legal",
  "Bondi Craft",
  "Paddington Home",
  "Sydney Restoration",
  "Meridian",
];

function Home() {
  const { isPaymentHost } = Route.useLoaderData();

  if (isPaymentHost) {
    return <PaymentPage />;
  }

  return (
    <SiteLayout>
      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className="relative overflow-hidden bg-soft">
        <div className="absolute inset-0 -z-10 dot-pattern opacity-40" />

        {/* Decorative blurred blobs */}
        <div
          className="absolute -top-32 -right-24 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl -z-10"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.14 225) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 -left-24 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl -z-10"
          style={{ background: "radial-gradient(circle, oklch(0.7 0.15 210) 0%, transparent 65%)" }}
        />

        <div className="container-editorial pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <div className="eyebrow">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-[color:var(--brand)] animate-ping opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                </span>
                Sydney's premier web studio · Est. 2000
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.98] tracking-[-0.03em]">
                Websites that<br />
                <span className="gradient-text italic">move business</span><br />
                <span className="relative inline-block">
                  forward.
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    height="14"
                    viewBox="0 0 300 14"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9 Q 75 2, 150 7 T 298 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-[color:var(--brand)]"
                      opacity="0.6"
                    />
                  </svg>
                </span>
              </h1>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A Sydney studio helping founders and established brands turn a digital
                presence into something considered — websites that read well, perform
                beautifully, and grow with you.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/portfolio" className="btn-brand">See the work <ArrowUpRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn-ghost">Start a project</Link>
              </div>

              <div className="mt-12 flex items-center gap-5 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
                      style={{ background: `linear-gradient(135deg, oklch(0.72 0.15 ${215 + i * 10}), oklch(0.48 0.16 ${245 + i * 5}))` }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[color:var(--brand-deep)] font-medium">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <div>Trusted by 200+ Australian businesses</div>
                </div>
              </div>
            </div>

            {/* Illustrative hero graphic */}
            <div className="md:col-span-5 relative">
              <div className="relative aspect-square">
                {/* Ornamental ring behind */}
                <svg
                  className="absolute -inset-8 text-[color:var(--brand-soft)]"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="0.6 1.2" />
                </svg>

                {/* Browser mock */}
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
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-[color:var(--brand-soft)] to-white" />
                      <div className="aspect-square rounded-lg bg-[color:var(--surface)]" />
                    </div>
                    <div className="h-2 w-1/2 rounded-full bg-[color:var(--muted)]" />
                    <div className="h-2 w-2/3 rounded-full bg-[color:var(--muted)]" />
                  </div>
                </div>

                {/* Floating badges */}
                <div className="animate-float absolute -left-6 top-1/4 glass p-4 flex items-center gap-3 rotate-[-6deg]">
                  <div className="h-10 w-10 rounded-full grid place-items-center shrink-0" style={{ background: "var(--gradient-brand)" }}>
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-[color:var(--ink)]">99 / 100</div>
                    <div className="text-muted-foreground">PageSpeed</div>
                  </div>
                </div>

                <div className="animate-float absolute -right-4 bottom-8 glass p-4 rotate-[4deg]" style={{ animationDelay: "1.5s" }}>
                  <div className="flex items-center gap-1 text-[color:var(--brand-deep)] mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <div className="text-xs font-medium text-[color:var(--ink)]">200+ happy clients</div>
                </div>

                <div className="animate-float absolute -bottom-2 left-8 glass p-3 rotate-[-3deg] flex items-center gap-2" style={{ animationDelay: "3s" }}>
                  <Award className="h-4 w-4 text-[color:var(--brand)]" />
                  <div className="text-[11px] font-medium text-[color:var(--ink)]">25 years of craft</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { k: "25+", v: "Years of craft" },
              { k: "200+", v: "Projects shipped" },
              { k: "24/7", v: "Ongoing support" },
              { k: "100%", v: "Custom-built" },
            ].map((s) => (
              <div key={s.v} className="card-soft p-7 relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, oklch(0.7 0.15 225 / 0.15), transparent 70%)" }} />
                <div className="font-display text-5xl md:text-6xl gradient-text">{s.k}</div>
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CLIENT MARQUEE ─────────────────────── */}
      <section className="border-y border-[color:var(--border)] bg-white overflow-hidden">
        <div className="container-editorial py-10 flex items-center gap-8">
          <div className="shrink-0 text-xs uppercase tracking-[0.22em] font-medium text-muted-foreground max-w-[10rem]">
            Trusted by studios<br /> and founders
          </div>
          <div className="relative flex-1 overflow-hidden mask-fade">
            <div className="marquee-track">
              {[...clientNames, ...clientNames].map((n, i) => (
                <span key={i} className="font-display text-2xl md:text-3xl text-[color:var(--ink)]/50 whitespace-nowrap tracking-tight">
                  {n}
                  <span className="mx-8 text-[color:var(--brand)]/40">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── PHILOSOPHY ─────────────────────────── */}
      <section className="relative">
        <div className="container-editorial py-28 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow">Our approach</div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02] tracking-[-0.02em]">
              A studio,<br />
              not a<br />
              <span className="italic gradient-text">production line.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-8">
            <p className="text-lg md:text-xl leading-relaxed">
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
                <div key={f.t} className="card-soft p-7 group">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── PROCESS ────────────────────────── */}
      <section className="relative border-t border-[color:var(--border)] overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "linear-gradient(180deg, oklch(0.98 0.01 235) 0%, oklch(0.94 0.03 230) 100%)" }}
        />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

        <div className="container-editorial py-28">
          <div className="max-w-2xl">
            <div className="eyebrow">Process</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-[-0.02em]">
              Four movements,<br />
              <span className="italic gradient-text">one composition.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.n} className="relative">
                <div className="card-soft p-8 h-full bg-white/80 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 font-display text-[7rem] leading-none text-[color:var(--brand-soft)] select-none">
                    {p.n}
                  </div>
                  <div className="relative">
                    <div className="text-xs uppercase tracking-widest text-[color:var(--brand)] font-medium">
                      Step {p.n}
                    </div>
                    <h3 className="mt-3 font-display text-2xl">{p.t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                  </div>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 h-px w-6 bg-gradient-to-r from-[color:var(--brand)] to-transparent -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── TECH STACK ─────────────────────── */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-editorial py-24">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center">Built on modern tech</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">The right tool for the job.</h2>
            <p className="mt-4 text-muted-foreground">
              We're stack-agnostic. We choose the technology that best serves your project — not what's trendy.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-4 md:grid-cols-8 gap-4">
            {tech.map((t) => (
              <div key={t.name} className="card-soft aspect-square flex flex-col items-center justify-center gap-2 p-3 hover:-translate-y-1 transition-transform">
                <div className="grid h-11 w-11 place-items-center rounded-xl text-white font-display text-lg shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-brand)" }}>
                  {t.short}
                </div>
                <div className="text-[11px] font-medium text-[color:var(--ink)] text-center">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── FEATURED WORK ───────────────────── */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-28">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="eyebrow">Selected work</div>
              <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-[-0.02em]">
                Recent<br />
                <span className="italic gradient-text">projects.</span>
              </h2>
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-lift)] transition duration-500">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-deep)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full text-white opacity-0 -translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-brand)" }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl transition group-hover:text-[color:var(--brand)]">{p.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--brand)] mt-1">{p.category}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TESTIMONIALS ─────────────────── */}
      <section className="relative border-t border-[color:var(--border)] overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, white 0%, oklch(0.96 0.02 230) 100%)" }} />
        <div className="container-editorial py-28">
          <div className="max-w-2xl mx-auto text-center">
            <div className="eyebrow justify-center">Kind words</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-[-0.02em]">
              What clients<br />
              <span className="italic gradient-text">say.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.a} className="card-soft p-8 bg-white flex flex-col">
                <Quote className="h-8 w-8 text-[color:var(--brand)]" />
                <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-[color:var(--ink)]">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-[color:var(--border)]">
                  <div className="font-medium text-[color:var(--ink)]">{t.a}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── SERVICES STRIP ─────────────────── */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-editorial py-28">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="eyebrow">What we do</div>
              <h2 className="mt-6 font-display text-5xl md:text-6xl leading-tight tracking-[-0.02em]">
                Services<br />
                <span className="italic gradient-text">in full.</span>
              </h2>
              <p className="mt-6 text-muted-foreground max-w-sm">
                A complete studio offering — from brand identity through to launch, hosting and long-term partnership.
              </p>
              <Link to="/services" className="btn-ghost mt-8">Explore services <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul className="md:col-span-8 divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
              {[
                { s: "Web Design & Development", i: "Bespoke websites built for performance and longevity." },
                { s: "E-Commerce & Shopping Cart", i: "Shopify, WooCommerce and custom carts that convert." },
                { s: "Search Engine Marketing", i: "SEO strategy and content that earns its place." },
                { s: "App Development", i: "Web and mobile applications, thoughtfully engineered." },
                { s: "Graphics & Logo Design", i: "Identities and visual systems that carry your brand." },
                { s: "Hosting & Domain", i: "Reliable hosting, secured and maintained by our team." },
              ].map((row, i) => (
                <li key={row.s} className="group flex items-center justify-between py-7 gap-4 transition">
                  <div className="flex-1">
                    <div className="font-display text-2xl md:text-3xl transition group-hover:text-[color:var(--brand)] group-hover:translate-x-2">
                      {row.s}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                      {row.i}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
                    <ArrowUpRight className="h-5 w-5 text-[color:var(--border)] group-hover:text-[color:var(--brand)] transition" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────── GUARANTEES ─────────────────── */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="container-editorial py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Two-week turnarounds", d: "Starter builds shipped fast without cutting corners." },
              { t: "Fixed, transparent pricing", d: "No surprise invoices. Packages priced up-front." },
              { t: "Australian-owned", d: "Sydney studio. Local support, local hours, local care." },
            ].map((g) => (
              <div key={g.t} className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[color:var(--brand)] mt-1" />
                <div>
                  <div className="font-display text-2xl">{g.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{g.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-32">
          <div className="relative overflow-hidden rounded-[2rem] px-8 py-20 md:py-32 text-center text-white" style={{ background: "var(--gradient-brand)" }}>
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div
              className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-white/85">
                <span className="h-px w-8 bg-white/50" />
                Let's begin
                <span className="h-px w-8 bg-white/50" />
              </div>
              <h2 className="mt-8 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] max-w-4xl mx-auto text-white">
                Have a project<br />in <em className="font-normal">mind?</em>
              </h2>
              <p className="mt-8 text-lg text-white/85 max-w-lg mx-auto leading-relaxed">
                Tell us a little about your business. We'll respond thoughtfully within one working day.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-[color:var(--brand-deep)] shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-4 text-sm font-medium text-white hover:bg-white/10 transition">
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
