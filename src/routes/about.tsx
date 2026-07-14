import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowUpRight } from "lucide-react";

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
      <section className="border-b border-[color:var(--border)]">
        <div className="container-editorial pt-24 pb-24">
          <div className="eyebrow">About the studio</div>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-tight max-w-5xl">
            A quiet studio for<br /> businesses that want <span className="italic text-[color:var(--gold)]">to be taken seriously.</span>
          </h1>
        </div>
      </section>

      <section>
        <div className="container-editorial py-24 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <div className="eyebrow">Our story</div>
            <h2 className="mt-6 font-display text-4xl leading-tight">Since the early web.</h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/90">
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

      <section className="border-t border-[color:var(--border)] bg-[color:var(--ink)]">
        <div className="container-editorial py-24">
          <div className="eyebrow mb-10">Principles</div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", t: "Clarity over cleverness", d: "Design in service of the message. Nothing decorative, everything intentional." },
              { n: "02", t: "Built to last", d: "Websites that stay fast, secure and easy to update — years after launch." },
              { n: "03", t: "Fair pricing", d: "Transparent packages. No surprise invoices. No contracts to trap you." },
              { n: "04", t: "Australian craft", d: "Designed and developed in Sydney, for Australian businesses who care." },
              { n: "05", t: "Direct partnership", d: "Speak with the person building your site, not an account manager." },
              { n: "06", t: "Long relationships", d: "Most of our clients have been with us for a decade or more." },
            ].map((p) => (
              <div key={p.n} className="hairline pl-5 pt-4">
                <span className="text-xs uppercase tracking-widest text-[color:var(--gold)]">{p.n}</span>
                <h3 className="mt-4 font-display text-3xl">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow">Technologies</div>
              <h2 className="mt-6 font-display text-5xl leading-tight">The tools of the trade.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                We choose the right stack for each project — from WordPress for
                editorial ease, to custom React and headless commerce for ambition.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {["WordPress", "React", "Next.js", "Shopify", "WooCommerce", "PHP / Laravel", "HTML & CSS", "Tailwind"].map((t) => (
                <li key={t} className="flex items-center justify-between py-3 border-b border-[color:var(--border)]">
                  <span className="font-display text-2xl">{t}</span>
                  <span className="text-[color:var(--gold)]">·</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="container-editorial py-24 text-center">
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[1] max-w-4xl mx-auto">
            Ready to build something<br /><span className="italic text-[color:var(--gold)]">that lasts?</span>
          </h2>
          <Link to="/contact" className="btn-gold mt-10">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
