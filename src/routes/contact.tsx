import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PHONE, PHONE_HREF } from "@/lib/portfolio";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Web Solution Sydney" },
      { name: "description", content: "Start a project with Web Solution Sydney. Call 0420 102 599 or send us a brief — we respond within one working day." },
      { property: "og:title", content: "Contact — Web Solution Sydney" },
      { property: "og:description", content: "Start a project with a Sydney web studio." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="border-b border-[color:var(--border)]">
        <div className="container-editorial pt-24 pb-16">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-tight max-w-5xl">
            Tell us about<br /><span className="italic text-[color:var(--gold)]">your project.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The best briefs are the shortest — a sentence about your business, a
            sentence about what you need. We'll take it from there.
          </p>
        </div>
      </section>

      <section>
        <div className="container-editorial py-24 grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-10">
            <div>
              <div className="eyebrow mb-4">Direct</div>
              <ul className="space-y-4">
                <li>
                  <a href={PHONE_HREF} className="flex items-start gap-3 group">
                    <Phone className="h-5 w-5 text-[color:var(--gold)] mt-1 shrink-0" />
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                      <div className="font-display text-2xl group-hover:text-[color:var(--gold)] transition">{PHONE}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@websolutionsydney.com.au" className="flex items-start gap-3 group">
                    <Mail className="h-5 w-5 text-[color:var(--gold)] mt-1 shrink-0" />
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                      <div className="font-display text-2xl group-hover:text-[color:var(--gold)] transition break-all">hello@websolutionsydney.com.au</div>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[color:var(--gold)] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Studio</div>
                    <div className="font-display text-2xl">Sydney, Australia</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <div className="eyebrow mb-4">Response time</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We respond within one working day. Urgent? Call — someone will pick up.
              </p>
            </div>
          </aside>

          <form
            className="lg:col-span-8 space-y-8"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Company (optional)" name="company" />
              <Field label="Phone (optional)" name="phone" />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Project type</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Website", "E-Commerce", "Redesign", "SEO / Marketing", "App", "Other"].map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="checkbox" name="project" value={t} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-[color:var(--border)] px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition peer-checked:border-[color:var(--gold)] peer-checked:bg-[color:var(--gold)] peer-checked:text-[color:var(--ink)] hover:border-[color:var(--gold)]">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="brief" className="text-xs uppercase tracking-widest text-muted-foreground">Brief</label>
              <textarea
                id="brief"
                name="brief"
                rows={6}
                required
                placeholder="Tell us a bit about your business and what you need."
                className="mt-3 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-4 text-foreground placeholder:text-muted-foreground/60 focus:border-[color:var(--gold)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold)] transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button type="submit" className="btn-gold">
                {sent ? "Thanks — we'll be in touch" : "Send brief"} <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">Or call <a href={PHONE_HREF} className="text-[color:var(--gold)] hover:underline">{PHONE}</a>.</p>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-3.5 text-foreground focus:border-[color:var(--gold)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold)] transition"
      />
    </div>
  );
}
