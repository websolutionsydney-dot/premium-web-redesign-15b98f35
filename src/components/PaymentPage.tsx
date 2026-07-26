import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Lock, ShieldCheck, CreditCard } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

const CLIENT_ID =
  "BAA5eRiknRKFnfybu5NjP0fCQ5euKWH4S4-Wa47O8gCjf1EihJw60F4jgJn77yZYLRDMjmx7HmrGrmhMUc";

type Status =
  | { kind: "idle" }
  | { kind: "processing" }
  | { kind: "success"; id: string }
  | { kind: "error"; message: string };

export function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const numericAmount = Number(amount);
  const validAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const amountFixed = validAmount ? numericAmount.toFixed(2) : "0.00";

  return (
    <SiteLayout>
      <section className="relative">
        <div className="container-editorial pt-32 pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow justify-center">
              <Lock className="h-3.5 w-3.5" /> Secure Checkout
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">Secure Invoice Payment</h1>
            <p className="mt-3 text-lg text-muted-foreground">Web Solution Sydney</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Enter your invoice amount and pay by PayPal, card, Apple Pay, or Google Pay.
              Eligible wallets appear automatically based on your device.
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
                  Choose payment method
                </span>
                <div className="h-px flex-1 bg-[color:var(--border)]" />
              </div>

              {!validAmount ? (
                <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center text-sm text-muted-foreground">
                  <CreditCard className="mx-auto mb-2 h-5 w-5 text-[color:var(--brand)]" />
                  Enter an amount above to continue to secure payment.
                </div>
              ) : (
                <PayPalScriptProvider
                  options={{
                    clientId: CLIENT_ID,
                    currency: "AUD",
                    intent: "capture",
                    components: "buttons",
                    "enable-funding": "card,paylater",
                  }}

                >

                  <div key={amountFixed}>
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay",
                      }}
                      disabled={status.kind === "processing"}
                      createOrder={(_data, actions) =>
                        actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "AUD",
                                value: amountFixed,
                              },
                              description: "Web Solution Sydney — Invoice Payment",
                            },
                          ],
                        })
                      }
                      onApprove={async (_data, actions) => {
                        setStatus({ kind: "processing" });
                        try {
                          const details = await actions.order?.capture();
                          setStatus({
                            kind: "success",
                            id: details?.id || "",
                          });
                        } catch (err) {
                          setStatus({
                            kind: "error",
                            message:
                              err instanceof Error ? err.message : "Capture failed",
                          });
                        }
                      }}
                      onError={(err) =>
                        setStatus({
                          kind: "error",
                          message:
                            err instanceof Error
                              ? err.message
                              : "Payment failed. Please try again.",
                        })
                      }
                      onCancel={() => setStatus({ kind: "idle" })}
                    />
                  </div>
                </PayPalScriptProvider>
              )}

              {status.kind === "success" && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
                  <div className="font-display text-lg">Payment successful</div>
                  <p className="mt-1">
                    Thank you — your payment has been received.
                    {status.id && (
                      <>
                        {" "}Transaction ID: <span className="font-mono">{status.id}</span>
                      </>
                    )}
                  </p>
                </div>
              )}

              {status.kind === "error" && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
                  <div className="font-display text-lg">Payment could not be processed</div>
                  <p className="mt-1">{status.message}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--brand)]" /> 256-bit SSL
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[color:var(--brand)]" /> PCI Compliant
                </span>
                <span>Powered by PayPal</span>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Prefer a hosted checkout?{" "}
              <a href="/quickpay" className="text-[color:var(--brand)] underline">
                Use quick PayPal checkout
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
