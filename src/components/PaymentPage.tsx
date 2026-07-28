import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

type PreparedIntent = {
  amountCents: number;
  clientSecret: string;
  id: string;
};

const MIN_AMOUNT = 1;

function CheckoutForm({
  amountCents,
  validAmount,
  intentPreparing,
  preparedIntent,
  ensureIntent,
  onStatus,
}: {
  amountCents: number;
  validAmount: boolean;
  intentPreparing: boolean;
  preparedIntent: PreparedIntent | null;
  ensureIntent: (amountCents: number) => Promise<PreparedIntent>;
  onStatus: (s: Status) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [walletsReady, setWalletsReady] = useState(false);
  const [paymentElementReady, setPaymentElementReady] = useState(false);

  // Live-update the mounted Elements when the amount changes — no iframe rebuild.
  useEffect(() => {
    if (!elements) return;
    if (amountCents >= MIN_AMOUNT * 100) {
      elements.update({ amount: amountCents });
    }
  }, [elements, amountCents]);

  const confirm = async () => {
    if (!stripe || !elements) return;
    setErrorMsg(null);
    onStatus({ kind: "processing" });

    // Validate & collect payment details from the mounted Elements.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      const msg = submitError.message ?? "Please check your payment details";
      setErrorMsg(msg);
      onStatus({ kind: "error", message: msg });
      return;
    }

    // Create the PaymentIntent server-side only now.
    let intent: PreparedIntent;
    try {
      intent = await ensureIntent(amountCents);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not start payment";
      setErrorMsg(msg);
      onStatus({ kind: "error", message: msg });
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: intent.clientSecret,
      redirect: "if_required",
      confirmParams: { return_url: window.location.href },
    });

    if (error) {
      const msg = error.message ?? "Payment failed";
      setErrorMsg(msg);
      onStatus({ kind: "error", message: msg });
      return;
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      onStatus({ kind: "success", id: paymentIntent.id });
    } else if (paymentIntent) {
      onStatus({ kind: "error", message: `Payment status: ${paymentIntent.status}` });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validAmount) {
      setErrorMsg("Enter an amount to continue");
      return;
    }
    setSubmitting(true);
    await confirm();
    setSubmitting(false);
  };

  const handleExpressConfirm = async () => {
    if (!validAmount) {
      setErrorMsg("Enter an amount to continue");
      return;
    }
    await confirm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative min-h-[48px]">
        {validAmount && intentPreparing && !preparedIntent && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-[color:var(--surface)] text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[color:var(--brand)]" />
            Preparing secure wallet checkout…
          </div>
        )}
        <ExpressCheckoutElement
          onConfirm={handleExpressConfirm}
          onReady={() => setWalletsReady(true)}
          options={{
            buttonType: { applePay: "plain", googlePay: "plain" },
            buttonHeight: 48,
            paymentMethods: { applePay: "always", googlePay: "always", link: "never" },
            paymentMethodOrder: ["applePay", "googlePay"],
          }}


        />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[color:var(--border)]" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Or pay by card
        </span>
        <div className="h-px flex-1 bg-[color:var(--border)]" />
      </div>
      <div className="relative">
        {!paymentElementReady && (
          <div className="space-y-3 animate-pulse">
            <div className="h-12 rounded-lg bg-[color:var(--surface)]" />
            <div className="h-12 rounded-lg bg-[color:var(--surface)]" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 rounded-lg bg-[color:var(--surface)]" />
              <div className="h-12 rounded-lg bg-[color:var(--surface)]" />
            </div>
          </div>
        )}
        <div
          className={
            "transition-opacity duration-300 " +
            (paymentElementReady ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none")
          }
        >
          <PaymentElement
            onReady={() => setPaymentElementReady(true)}
            options={{
              layout: "tabs",
              wallets: { applePay: "never", googlePay: "never" },
            }}
          />
        </div>
      </div>
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting || !validAmount || !walletsReady}
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
  const [debouncedAmount, setDebouncedAmount] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [preparedIntent, setPreparedIntent] = useState<PreparedIntent | null>(null);
  const [intentPreparing, setIntentPreparing] = useState(false);
  const createIntent = useServerFn(createPaymentIntent);

  const numericAmount = Number(amount);
  const validAmount = Number.isFinite(numericAmount) && numericAmount >= MIN_AMOUNT;

  // Debounce amount updates by 300ms — feeds elements.update() without rebuilding.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (validAmount) setDebouncedAmount(Math.round(numericAmount * 100));
    }, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [amount, numericAmount, validAmount]);

  const stripe = useMemo(() => getStripe(), []);
  const preparedIntentRef = useRef<PreparedIntent | null>(null);
  const prewarmRequestRef = useRef(0);

  useEffect(() => {
    preparedIntentRef.current = preparedIntent;
  }, [preparedIntent]);

  const createIntentForAmount = useCallback(
    async (amountCents: number): Promise<PreparedIntent> => {
      const res = await createIntent({ data: { amount: amountCents / 100 } });
      return {
        amountCents,
        clientSecret: res.clientSecret,
        id: res.id,
      };
    },
    [createIntent],
  );

  const ensureIntent = useCallback(
    async (amountCents: number): Promise<PreparedIntent> => {
      const cached = preparedIntentRef.current;
      if (cached?.amountCents === amountCents) return cached;

      const next = await createIntentForAmount(amountCents);
      preparedIntentRef.current = next;
      setPreparedIntent(next);
      return next;
    },
    [createIntentForAmount],
  );

  // Pre-create the PaymentIntent in the background after the amount settles.
  // This keeps Google Pay from waiting on a backend round trip after the wallet is approved.
  useEffect(() => {
    if (!validAmount) {
      prewarmRequestRef.current += 1;
      preparedIntentRef.current = null;
      setPreparedIntent(null);
      setIntentPreparing(false);
      return;
    }

    const amountCents = Math.round(numericAmount * 100);
    const cached = preparedIntentRef.current;
    if (cached?.amountCents === amountCents) {
      setIntentPreparing(false);
      return;
    }

    const requestId = prewarmRequestRef.current + 1;
    prewarmRequestRef.current = requestId;
    preparedIntentRef.current = null;
    setPreparedIntent(null);
    setIntentPreparing(true);

    const timeout = setTimeout(() => {
      void createIntentForAmount(amountCents)
        .then((next) => {
          if (prewarmRequestRef.current !== requestId) return;
          preparedIntentRef.current = next;
          setPreparedIntent(next);
        })
        .catch(() => {
          if (prewarmRequestRef.current !== requestId) return;
          preparedIntentRef.current = null;
          setPreparedIntent(null);
        })
        .finally(() => {
          if (prewarmRequestRef.current === requestId) setIntentPreparing(false);
        });
    }, 450);

    return () => clearTimeout(timeout);
  }, [createIntentForAmount, numericAmount, validAmount]);

  // Mount Stripe Elements immediately on page load in Deferred Intent mode.
  // Use a stable initial amount so the iframe never gets torn down.
  const elementsOptions = useMemo(
    () =>
      ({
        mode: "payment" as const,
        currency: "aud",
        amount: 1000, // placeholder; live-updated via elements.update()
        appearance: {
          theme: "stripe" as const,
          variables: {
            colorPrimary: "#0092e8",
            borderRadius: "10px",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        },
      }),
    [],
  );

  const liveAmountCents = validAmount
    ? Math.round(numericAmount * 100)
    : debouncedAmount;

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

          <div className="mx-auto mt-14 max-w-3xl">
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
                <div className="mb-6 rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-center text-sm text-muted-foreground">
                  <CreditCard className="mx-auto mb-2 h-5 w-5 text-[color:var(--brand)]" />
                  Enter an amount above to enable payment.
                </div>
              )}

              <Elements stripe={stripe} options={elementsOptions}>
                <CheckoutForm
                  amountCents={liveAmountCents || 1000}
                  validAmount={validAmount}
                  intentPreparing={intentPreparing}
                  preparedIntent={preparedIntent}
                  ensureIntent={ensureIntent}
                  onStatus={setStatus}
                />
              </Elements>

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
