import { Lock, ShieldCheck, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/14A7sN4ZRfx2afzc7E6EU01";

export function PaymentPage() {
  return (
    <SiteLayout>
      <section className="relative">
        <div className="container-editorial pt-32 pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow justify-center">
              <Lock className="h-3.5 w-3.5" /> Secure Checkout
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              Secure Invoice Payment
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Web Solution Sydney
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Click the button below to pay your invoice securely via Stripe. You
              can use your saved cards, Apple Pay, Google Pay, or a direct bank
              transfer where available.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-xl">
            <div className="card-soft p-8 md:p-10 text-center">
              <p className="text-sm text-muted-foreground">
                You will be redirected to Stripe's secure hosted checkout page to
                complete your payment.
              </p>

              <a
                href={STRIPE_PAYMENT_LINK}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--brand)] px-6 py-4 font-display text-lg text-white transition hover:opacity-95"
              >
                <Lock className="h-4 w-4" /> Pay securely
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--brand)]" />{" "}
                  256-bit SSL
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[color:var(--brand)]" /> PCI
                  Compliant
                </span>
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
