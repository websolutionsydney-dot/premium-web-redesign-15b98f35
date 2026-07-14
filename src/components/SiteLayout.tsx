import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LOGO_URL, PHONE, PHONE_HREF } from "@/lib/portfolio";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--ink)]/85 backdrop-blur-md">
      <div className="container-editorial flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="rounded-full bg-white/95 px-3 py-1.5">
            <img src={LOGO_URL} alt="Web Solution Sydney" className="h-8 w-auto" />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 text-sm text-muted-foreground transition hover:text-[color:var(--gold)]"
              activeProps={{ className: "px-4 py-2 text-sm text-[color:var(--gold)]" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href={PHONE_HREF} className="btn-gold">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)]"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--border)] bg-[color:var(--ink)]">
          <div className="container-editorial py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display text-foreground/90"
                activeProps={{ className: "py-3 text-lg font-display text-[color:var(--gold)]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a href={PHONE_HREF} className="btn-gold mt-4 w-fit">
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
    <footer className="mt-32 border-t border-[color:var(--border)] bg-[color:var(--ink)]">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-md">
            <div className="inline-block rounded-full bg-white/95 px-3 py-1.5">
              <img src={LOGO_URL} alt="Web Solution Sydney" className="h-8 w-auto" />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A Sydney studio crafting websites, ecommerce and digital identities for founders and
              established brands. Twenty-five years of quiet, precise work.
            </p>
            <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 text-[color:var(--gold)] hover:underline">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>

          <div>
            <div className="eyebrow mb-4">Studio</div>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground hover:text-[color:var(--gold)]">
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
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[color:var(--gold)]"
            >
              View design archive <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <p className="mt-6 text-xs text-muted-foreground">Sydney, Australia</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[color:var(--border)] pt-8 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Web Solution Sydney. All rights reserved.</div>
          <div className="font-display text-base tracking-wide">Website · Business Growth · Success</div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
