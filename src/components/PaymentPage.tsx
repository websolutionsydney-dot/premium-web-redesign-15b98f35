import { useEffect, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useServerFn } from "@tanstack/react-start";
import { Lock, ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { createPaymentIntent } from "@/lib/stripe.functions";

const PUBLISHABLE_KEY =
  "pk_live_51TxWJ0Rsl5tv4q4ktdLwM146YI6sMQ76oAXvMvO3MF9x2YJYllSSr4neFz9DGQDpGndZPKAyXKoaJzzPFrYSVdc300efpwleLo";

let stripePromise: Promise<Stripe | null> | null = null;
function getStripe() {
  if (!stripePromise) stripePromise = loadStripe(PUBLISHABLE_KEY);
  return stripePromise;
}

type Status =
  | { kind: "idle" }
  | { kind: "processing" }
  | { kind: "success"; id?: string }
  | { kind: "error"; message: string };

function CheckoutForm({ onStatus }: { onStatus: (s: Status) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setErrorMsg(null);
    onStatus({ kind: "processing" });

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (error) {
      setErrorMsg(error.message ?? "Payment failed");
      onStatus({ kind: "error", message: error.message ?? "Payment failed" });
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onStatus({ kind: "success", id: paymentIntent.id });
    } else if (paymentIntent) {
      onStatus({
        kind: "error",
        message: `Payment status: ${paymentIntent.status}`,
      });
    }
    setSubmitting(false);
  };

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;
    onStatus({ kind: "processing" });
    setErrorMsg(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: window.location.href },
    });

    if (error) {
      setErrorMsg(error.message ?? "Payment failed");
      onStatus({ kind: "error", message: error.message ?? "Payment failed" });
      return;
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      onStatus({ kind: "success", id: paymentIntent.id });
    } else if (paymentIntent) {
      onStatus({ kind: "error", message: `Payment status: ${paymentIntent.status}` });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ExpressCheckoutElement
        onConfirm={handleExpressConfirm}
        options={{
          buttonType: { applePay: "pay", googlePay: "pay" },
          paymentMethods: { applePay: "always", googlePay: "always", link: "auto" },
        }}
      />
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[color:var(--border)]" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Or pay by card
        </span>
        <div className="h-px flex-1 bg-[color:var(--border)]" />
      </div>
      <PaymentElement
        options={{
          layout: "tabs",
          wallets: { applePay: "never", googlePay: "never" },
        }}
      />
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--brand)] py-4 font-display text-lg text-white transition hover:opacity-95 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Processing…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> Pay securely
          </>
        )}
      </button>
    </form>
  );
}

export function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  const numericAmount = Number(amount);
  const validAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const amountFixed = validAmount ? numericAmount.toFixed(2) : "0.00";

  const createIntent = useServerFn(createPaymentIntent);

  // Debounced PaymentIntent creation whenever the amount changes.
  useEffect(() => {
    if (!validAmount) {
      setClientSecret(null);
      setIntentError(null);
      return;
    }
    let cancelled = false;
    setLoadingIntent(true);
    setIntentError(null);
    setClientSecret(null);
    const t = setTimeout(async () => {
      try {
        const res = await createIntent({ data: { amount: numericAmount } });
        if (!cancelled) setClientSecret(res.clientSecret);
      } catch (err) {
        if (!cancelled)
          setIntentError(
            err instanceof Error ? err.message : "Could not start payment",
          );
      } finally {
        if (!cancelled) setLoadingIntent(false);
      }
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountFixed]);

  const stripe = useMemo(() => getStripe(), []);

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
              Enter your invoice amount and pay by card, Apple Pay, or Google
              Pay. Eligible wallets appear automatically based on your device.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-xl">
            <div className="card-soft p-8 md:p-10">
              <label className="block">
                <span className="eyebrow">Amount (AUD)</span>
                <div className="relative mt-3">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-display text-2xl text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-[color:var(--border)] bg-white py-4 pl-10 pr-4 font-display text-2xl text-[color:var(--ink)] outline-none transition focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-soft)]"
                  />
                </div>
              </label>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[color:var(--border)]" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Payment details
                </span>
                <div className="h-px flex-1 bg-[color:var(--border)]" />
              </div>

              {!validAmount && (
                <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center text-sm text-muted-foreground">
                  <CreditCard className="mx-auto mb-2 h-5 w-5 text-[color:var(--brand)]" />
                  Enter an amount above to continue to secure payment.
                </div>
              )}

              {validAmount && loadingIntent && (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing secure
                  payment…
                </div>
              )}

              {validAmount && intentError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {intentError}
                </div>
              )}

              {validAmount && clientSecret && (
                <Elements
                  key={clientSecret}
                  stripe={stripe}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#0092e8",
                        borderRadius: "10px",
                        fontFamily: "Inter, system-ui, sans-serif",
                      },
                    },
                  }}
                >
                  <CheckoutForm onStatus={setStatus} />
                </Elements>
              )}

              {status.kind === "success" && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
                  <div className="font-display text-lg">Payment successful</div>
                  <p className="mt-1">
                    Thank you — your payment has been received.
                    {status.id && (
                      <>
                        {" "}Reference:{" "}
                        <span className="font-mono">{status.id}</span>
                      </>
                    )}
                  </p>
                </div>
              )}

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
