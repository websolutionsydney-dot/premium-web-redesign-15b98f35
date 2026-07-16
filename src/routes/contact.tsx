import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PHONE, PHONE_HREF } from "@/lib/portfolio";
import { Phone, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";
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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      project: fd.getAll("project").map(String),
      brief: String(fd.get("brief") || ""),
    };
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again or call us.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or call us.");
    }
  }


  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-soft border-b border-[color:var(--border)]">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="container-editorial pt-24 pb-16">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1] tracking-tight max-w-5xl">
            Tell us about<br /><span className="italic gradient-text">your project.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The best briefs are the shortest — a sentence about your business, a
            sentence about what you need. We'll take it from there.
          </p>
        </div>
      </section>

      <section>
        <div className="container-editorial py-24 grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-4">
            {[
              { icon: Phone, label: "Phone", value: PHONE, href: PHONE_HREF },
              { icon: Mail, label: "Email", value: "ryan@websolutionsydney.com.au", href: "mailto:ryan@websolutionsydney.com.au" },
              { icon: MapPin, label: "Studio", value: "Sydney, Australia" },
              { icon: Clock, label: "Response", value: "Within 1 working day" },
            ].map((item) => {
              const Inner = (
                <>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)] shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</div>
                    <div className="font-display text-xl truncate">{item.value}</div>
                  </div>
                </>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="card-soft flex items-center gap-4 p-5 group hover:border-[color:var(--brand)]">
                  {Inner}
                </a>
              ) : (
                <div key={item.label} className="card-soft flex items-center gap-4 p-5">{Inner}</div>
              );
            })}
          </aside>

          <form
            className="lg:col-span-8 card-soft p-8 md:p-10 space-y-8"
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
                    <span className="inline-block rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition peer-checked:border-[color:var(--brand)] peer-checked:bg-[color:var(--brand-soft)] peer-checked:text-[color:var(--brand-deep)] hover:border-[color:var(--brand)]">
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
                className="mt-3 w-full rounded-xl border border-[color:var(--border)] bg-white px-5 py-4 text-foreground placeholder:text-muted-foreground/60 focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-soft)] transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="submit" className="btn-brand">
                {sent ? "Thanks — we'll be in touch" : "Send brief"} <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">Or call <a href={PHONE_HREF} className="text-[color:var(--brand)] hover:underline font-medium">{PHONE}</a>.</p>
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
        className="mt-3 w-full rounded-xl border border-[color:var(--border)] bg-white px-5 py-3.5 text-foreground focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-soft)] transition"
      />
    </div>
  );
}
