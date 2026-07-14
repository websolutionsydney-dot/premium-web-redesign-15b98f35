import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Check, ArrowUpRight } from "lucide-react";

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
      <section className="border-b border-[color:var(--border)]">
        <div className="container-editorial pt-24 pb-24">
          <div className="eyebrow">Packages</div>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-tight max-w-5xl">
            One price. One website.<br /><span className="italic text-[color:var(--gold)]">Yours to keep.</span>
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
                className={`relative rounded-2xl border p-10 flex flex-col ${
                  p.highlighted
                    ? "border-[color:var(--gold)] bg-[color:var(--ink)]"
                    : "border-[color:var(--border)] bg-[color:var(--card)]"
                }`}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-10 rounded-full bg-[color:var(--gold)] px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--ink)] font-medium">
                    Most popular
                  </span>
                )}
                <div className="eyebrow">{p.name} plan</div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-7xl text-[color:var(--gold)]">${p.price}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">once</span>
                </div>
                <p className="mt-4 text-muted-foreground">{p.tagline}</p>

                <ul className="mt-8 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-[color:var(--gold)] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-10 ${p.highlighted ? "btn-gold" : "btn-ghost"} justify-center`}
                >
                  Begin {p.name}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--ink)]">
        <div className="container-editorial py-24 grid md:grid-cols-2 gap-16 items-center">
          <h2 className="font-display text-5xl leading-tight">Need something more <span className="italic text-[color:var(--gold)]">bespoke?</span></h2>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Complex integrations, membership platforms, headless commerce, custom
              apps — we quote these individually. Send us a note and we'll come back
              with a considered proposal.
            </p>
            <Link to="/contact" className="btn-gold mt-8">Request a custom quote <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
