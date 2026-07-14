import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowUpRight, Heart, Compass, Handshake, Award, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Web Solution Sydney" },
      { name: "description", content: "Twenty-five years of craft. Meet Web Solution Sydney — a small studio shaping websites and digital brands with care." },
      { property: "og:title", content: "About — Web Solution Sydney" },
      { property: "og:description", content: "A Sydney web studio with 25 years of craft." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-24 pb-24">
          <div className="eyebrow">About the studio</div>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1] tracking-tight max-w-5xl">
            A quiet studio for businesses that want <span className="italic gradient-text">to be taken seriously.</span>
          </h1>
        </div>
      </section>

      {/* Story with stat cards */}
      <section>
        <div className="container-editorial py-24 grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="eyebrow">Our story</div>
            <h2 className="font-display text-4xl leading-tight">Since the early web.</h2>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: Award, k: "25+", v: "Years" },
                { icon: Users, k: "200+", v: "Clients" },
                { icon: Clock, k: "24/7", v: "Support" },
              ].map((s) => (
                <div key={s.v} className="card-soft p-4 text-center">
                  <s.icon className="h-4 w-4 mx-auto text-[color:var(--brand)]" />
                  <div className="mt-2 font-display text-2xl">{s.k}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg leading-relaxed">
            <p>
              Web Solution Sydney began 25 years ago with a simple belief: a website
              should be as considered as a shopfront. We've spent every year since
              refining that belief — one project, one detail at a time.
            </p>
            <p>
              Today we work with tradespeople, retailers, professional practices and
              growing brands across Sydney and beyond. Whatever the industry, our
              method is the same: listen closely, design honestly, build cleanly, and
              stay close after launch.
            </p>
            <p>
              We don't outsource. Every project is designed and developed in-house by
              the same small team you first speak to.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="container-editorial py-24">
          <div className="eyebrow">Principles</div>
          <h2 className="mt-4 font-display text-5xl leading-tight max-w-2xl">Six things we believe.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Compass, n: "01", t: "Clarity over cleverness", d: "Design in service of the message. Nothing decorative, everything intentional." },
              { icon: Award, n: "02", t: "Built to last", d: "Websites that stay fast, secure and easy to update — years after launch." },
              { icon: Heart, n: "03", t: "Fair pricing", d: "Transparent packages. No surprise invoices. No contracts to trap you." },
              { icon: Handshake, n: "04", t: "Australian craft", d: "Designed and developed in Sydney, for Australian businesses who care." },
              { icon: Users, n: "05", t: "Direct partnership", d: "Speak with the person building your site, not an account manager." },
              { icon: Clock, n: "06", t: "Long relationships", d: "Most of our clients have been with us for a decade or more." },
            ].map((p) => (
              <div key={p.n} className="card-soft p-8">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.n}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow">Technologies</div>
            <h2 className="mt-6 font-display text-5xl leading-tight">The tools of the trade.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              We choose the right stack for each project — from WordPress for editorial
              ease, to custom React and headless commerce for ambition.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {["WordPress", "React", "Next.js", "Shopify", "WooCommerce", "PHP / Laravel", "HTML & CSS", "Tailwind"].map((t) => (
              <li key={t} className="card-soft flex items-center justify-between px-5 py-4">
                <span className="font-display text-xl">{t}</span>
                <span className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 text-center">
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] max-w-4xl mx-auto">
            Ready to build something <span className="italic gradient-text">that lasts?</span>
          </h2>
          <Link to="/contact" className="btn-brand mt-10">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
