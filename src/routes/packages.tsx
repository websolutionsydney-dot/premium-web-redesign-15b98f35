import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing — Web Solution Sydney" },
      { name: "description", content: "Transparent website packages from Web Solution Sydney — static, WordPress and ecommerce, priced once with no surprises." },
      { property: "og:title", content: "Packages & Pricing — Web Solution Sydney" },
      { property: "og:description", content: "Transparent one-time pricing for websites and ecommerce." },
    ],
  }),
  component: Packages,
});

const PLANS = [
  {
    name: "Static",
    price: "600",
    tagline: "A precise, one-page or brochure site.",
    features: [
      "Up to 5 pages",
      "Custom-made design",
      "HTML + CSS build",
      "24/7 online support",
      "Mobile responsive",
      "Online booking & Google Map",
    ],
    highlighted: false,
  },
  {
    name: "WordPress",
    price: "900",
    tagline: "A flexible site you can update yourself.",
    features: [
      "Up to 10 custom pages",
      "Responsive & mobile-friendly",
      "Self-updating CMS",
      "WordPress development",
      "Client back-end access",
      "Drag-and-drop builder",
    ],
    highlighted: true,
  },
  {
    name: "E-Commerce",
    price: "2000",
    tagline: "A store built to sell, from day one.",
    features: [
      "Unlimited pages",
      "Self-updating CMS",
      "Client back-end access",
      "Drag-and-drop builder",
      "PayPal & payment gateways",
      "Full ecommerce functionality",
    ],
    highlighted: false,
  },
];

function Packages() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-24 pb-24">
          <div className="eyebrow">Packages</div>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1] tracking-tight max-w-5xl">
            One price. One website. <span className="italic gradient-text">Yours to keep.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            No subscriptions. No lock-in. Every package is a once-off — the website is
            yours, hosted with us if you'd like, or handed over on request.
          </p>
        </div>
      </section>

      <section>
        <div className="container-editorial py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-10 flex flex-col transition ${
                  p.highlighted
                    ? "text-white shadow-[var(--shadow-lift)] scale-100 md:scale-[1.02]"
                    : "card-soft"
                }`}
                style={p.highlighted ? { background: "var(--gradient-brand)" } : undefined}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-10 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--brand-deep)] font-medium shadow-[var(--shadow-soft)]">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <div className={`text-xs uppercase tracking-[0.22em] font-medium ${p.highlighted ? "text-white/85" : "text-[color:var(--brand)]"}`}>{p.name} plan</div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`font-display text-7xl ${p.highlighted ? "text-white" : "gradient-text"}`}>${p.price}</span>
                  <span className={`text-xs uppercase tracking-widest ${p.highlighted ? "text-white/70" : "text-muted-foreground"}`}>once</span>
                </div>
                <p className={`mt-4 ${p.highlighted ? "text-white/85" : "text-muted-foreground"}`}>{p.tagline}</p>

                <ul className="mt-8 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`grid h-5 w-5 place-items-center rounded-full mt-0.5 shrink-0 ${p.highlighted ? "bg-white/20" : "bg-[color:var(--brand-soft)]"}`}>
                        <Check className={`h-3 w-3 ${p.highlighted ? "text-white" : "text-[color:var(--brand)]"}`} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={
                    p.highlighted
                      ? "mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[color:var(--brand-deep)] hover:-translate-y-0.5 transition"
                      : "btn-brand mt-10 justify-center"
                  }
                >
                  Begin {p.name}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="container-editorial py-24 grid md:grid-cols-2 gap-16 items-center">
          <h2 className="font-display text-5xl leading-tight">Need something more <span className="italic gradient-text">bespoke?</span></h2>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Complex integrations, membership platforms, headless commerce, custom
              apps — we quote these individually. Send us a note and we'll come back
              with a considered proposal.
            </p>
            <Link to="/contact" className="btn-brand mt-8">Request a custom quote <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
