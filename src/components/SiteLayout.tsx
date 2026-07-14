import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LOGO_URL, PHONE, PHONE_HREF } from "@/lib/portfolio";
import { Menu, X, Phone, ArrowUpRight, Instagram, Facebook, Linkedin } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/packages", label: "Packages" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/80 backdrop-blur-md">
      <div className="container-editorial flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={LOGO_URL} alt="Web Solution Sydney" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 text-sm text-muted-foreground transition hover:text-[color:var(--brand)]"
              activeProps={{ className: "px-4 py-2 text-sm font-medium text-[color:var(--brand)]" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href={PHONE_HREF} className="btn-brand">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--ink)]"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--border)] bg-white">
          <div className="container-editorial py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display text-[color:var(--ink)]"
                activeProps={{ className: "py-3 text-lg font-display text-[color:var(--brand)]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a href={PHONE_HREF} className="btn-brand mt-4 w-fit">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-md">
            <img src={LOGO_URL} alt="Web Solution Sydney" className="h-10 w-auto" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A Sydney studio crafting websites, ecommerce and digital identities for founders and
              established brands. Twenty-five years of quiet, precise work.
            </p>
            <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 font-medium text-[color:var(--brand)] hover:underline">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--ink)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Studio</div>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground hover:text-[color:var(--brand)]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Connect</div>
            <a
              href="https://designs.websolutionsydney.com.au/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[color:var(--brand)]"
            >
              View design archive <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <p className="mt-6 text-xs text-muted-foreground">Sydney, Australia</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[color:var(--border)] pt-8 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Web Solution Sydney. All rights reserved.</div>
          <div className="font-display text-base tracking-wide text-[color:var(--brand-deep)]">Website · Business Growth · Success</div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
