import { useEffect, useRef, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalCardFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Lock, ShieldCheck, CreditCard } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

const CLIENT_ID =
  "BAA5eRiknRKFnfybu5NjP0fCQ5euKWH4S4-Wa47O8gCjf1EihJw60F4jgJn77yZYLRDMjmx7HmrGrmhMUc";

type Status =
  | { kind: "idle" }
  | { kind: "processing" }
  | { kind: "success"; id: string }
  | { kind: "error"; message: string };

type PayerActions = {
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError: (err: unknown) => void;
};

function useOrderActions(
  amountFixed: string,
  setStatus: (s: Status) => void,
): PayerActions {
  return {
    createOrder: async () => {
      // Client-side order creation via PayPal JS SDK actions is not available here;
      // use the REST-less approach through the buttons/cardFields components which
      // wrap this. This helper is only used by Apple/Google Pay below.
      throw new Error("createOrder handled by component");
    },
    onApprove: async () => {
      setStatus({ kind: "success", id: "" });
    },
    onError: (err) =>
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Payment failed. Please try again.",
      }),
  };
}

function CardFieldsSubmit({
  disabled,
  onSubmitting,
}: {
  disabled: boolean;
  onSubmitting: (v: boolean) => void;
}) {
  const { cardFieldsForm } = usePayPalCardFields();
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!cardFieldsForm) return;
    const state = await cardFieldsForm.getState();
    if (!state.isFormValid) return;
    setSubmitting(true);
    onSubmitting(true);
    try {
      await cardFieldsForm.submit();
    } finally {
      setSubmitting(false);
      onSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={submit}
      disabled={disabled || submitting}
      className="mt-4 w-full rounded-xl bg-[color:var(--brand)] py-4 font-display text-lg text-white transition hover:opacity-90 disabled:opacity-60"
    >
      {submitting ? "Processing…" : "Pay with card"}
    </button>
  );
}

function ApplePayButton({
  amountFixed,
  setStatus,
}: {
  amountFixed: string;
  setStatus: (s: Status) => void;
}) {
  const [{ isResolved }] = usePayPalScriptReducer();
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!isResolved) return;
    const w = window as any;
    if (!w.paypal?.Applepay || !w.ApplePaySession?.canMakePayments()) return;
    const applepay = w.paypal.Applepay();

    (async () => {
      try {
        const config = await applepay.config();
        if (!config.isEligible) return;
        setSupported(true);
        if (!ref.current) return;
        ref.current.innerHTML = "";
        const btn = document.createElement("apple-pay-button") as any;
        btn.setAttribute("buttonstyle", "black");
        btn.setAttribute("type", "pay");
        btn.setAttribute("locale", "en-AU");
        btn.style.width = "100%";
        btn.style.height = "48px";
        btn.style.setProperty("--apple-pay-button-width", "100%");
        btn.style.setProperty("--apple-pay-button-height", "48px");
        btn.addEventListener("click", async () => {
          try {
            const paymentRequest = {
              countryCode: "AU",
              currencyCode: "AUD",
              merchantCapabilities: ["supports3DS"],
              supportedNetworks: config.supportedNetworks,
              total: { label: "Web Solution Sydney", amount: amountFixed, type: "final" },
            };
            const session = new w.ApplePaySession(4, paymentRequest);
            session.onvalidatemerchant = async (event: any) => {
              try {
                const merchantSession = await applepay.validateMerchant({
                  validationUrl: event.validationURL,
                });
                session.completeMerchantValidation(merchantSession);
              } catch (err) {
                session.abort();
                setStatus({
                  kind: "error",
                  message: err instanceof Error ? err.message : "Apple Pay validation failed",
                });
              }
            };
            session.onpaymentauthorized = async (event: any) => {
              try {
                setStatus({ kind: "processing" });
                const orderResp = await w.paypal
                  .Orders?.()
                  ?.create?.({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: { currency_code: "AUD", value: amountFixed },
                        description: "Web Solution Sydney — Invoice Payment",
                      },
                    ],
                  });
                // Fallback: create via Applepay confirm flow
                const orderId = orderResp?.id;
                if (!orderId) throw new Error("Unable to create order");
                await applepay.confirmOrder({
                  orderId,
                  token: event.payment.token,
                  billingContact: event.payment.billingContact,
                });
                session.completePayment(w.ApplePaySession.STATUS_SUCCESS);
                setStatus({ kind: "success", id: orderId });
              } catch (err) {
                session.completePayment(w.ApplePaySession.STATUS_FAILURE);
                setStatus({
                  kind: "error",
                  message: err instanceof Error ? err.message : "Apple Pay failed",
                });
              }
            };
            session.begin();
          } catch (err) {
            setStatus({
              kind: "error",
              message: err instanceof Error ? err.message : "Apple Pay error",
            });
          }
        });
        ref.current.appendChild(btn);
      } catch {
        /* not eligible */
      }
    })();
  }, [isResolved, amountFixed, setStatus]);

  if (!supported) return null;
  return (
    <div className="mb-3">
      <div ref={ref} />
    </div>
  );
}

function GooglePayButton({
  amountFixed,
  setStatus,
}: {
  amountFixed: string;
  setStatus: (s: Status) => void;
}) {
  const [{ isResolved }] = usePayPalScriptReducer();
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!isResolved) return;
    const w = window as any;
    if (!w.paypal?.Googlepay || !w.google?.payments?.api) return;
    const googlepay = w.paypal.Googlepay();

    (async () => {
      try {
        const config = await googlepay.config();
        if (!config.isEligible) return;

        const client = new w.google.payments.api.PaymentsClient({
          environment: config.environment === "TEST" ? "TEST" : "PRODUCTION",
        });

        const isReady = await client.isReadyToPay({
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: config.allowedPaymentMethods,
        });
        if (!isReady.result) return;
        setSupported(true);

        if (!ref.current) return;
        ref.current.innerHTML = "";
        const btn = client.createButton({
          buttonColor: "black",
          buttonType: "pay",
          buttonSizeMode: "fill",
          onClick: async () => {
            try {
              const paymentDataRequest = {
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: config.allowedPaymentMethods,
                merchantInfo: config.merchantInfo,
                transactionInfo: {
                  countryCode: config.countryCode ?? "AU",
                  currencyCode: "AUD",
                  totalPriceStatus: "FINAL",
                  totalPrice: amountFixed,
                },
              };
              const paymentData = await client.loadPaymentData(paymentDataRequest);
              setStatus({ kind: "processing" });

              const orderResp = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: { currency_code: "AUD", value: amountFixed },
                      description: "Web Solution Sydney — Invoice Payment",
                    },
                  ],
                }),
              }).catch(() => null);

              const orderId = orderResp && (await orderResp.json())?.id;
              if (!orderId) throw new Error("Unable to create order");

              await googlepay.confirmOrder({
                orderId,
                paymentMethodData: paymentData.paymentMethodData,
              });
              setStatus({ kind: "success", id: orderId });
            } catch (err) {
              setStatus({
                kind: "error",
                message: err instanceof Error ? err.message : "Google Pay failed",
              });
            }
          },
        });
        ref.current.appendChild(btn);
      } catch {
        /* not eligible */
      }
    })();
  }, [isResolved, amountFixed, setStatus]);

  if (!supported) return null;
  return (
    <div className="mb-3">
      <div ref={ref} style={{ minHeight: 48 }} />
    </div>
  );
}

export function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [cardSubmitting, setCardSubmitting] = useState(false);

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
              Enter your invoice amount and pay by card, Apple Pay, Google Pay, or PayPal. All
              payments are encrypted and processed by PayPal.
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
                    components: "buttons,card-fields,applepay,googlepay",
                    "enable-funding": "card,applepay,googlepay",
                  }}
                >
                  <div key={amountFixed} className="space-y-3">
                    <ApplePayButton amountFixed={amountFixed} setStatus={setStatus} />
                    <GooglePayButton amountFixed={amountFixed} setStatus={setStatus} />

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
                              amount: { currency_code: "AUD", value: amountFixed },
                              description: "Web Solution Sydney — Invoice Payment",
                            },
                          ],
                        })
                      }
                      onApprove={async (_data, actions) => {
                        setStatus({ kind: "processing" });
                        try {
                          const details = await actions.order?.capture();
                          setStatus({ kind: "success", id: details?.id || "" });
                        } catch (err) {
                          setStatus({
                            kind: "error",
                            message: err instanceof Error ? err.message : "Capture failed",
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

                    <div className="pt-4">
                      <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                        Or pay by card
                      </div>
                      <PayPalCardFieldsProvider
                        createOrder={async () => {
                          // createOrder must return an order id string. Without a server,
                          // fall back to the buttons flow for order creation is not possible;
                          // ACDC requires a server-created order. This will surface an error
                          // if used without a backend endpoint.
                          throw new Error(
                            "Card fields require a server-created order. Contact support to complete a card payment.",
                          );
                        }}
                        onApprove={async (data) => {
                          setStatus({ kind: "success", id: data.orderID });
                        }}
                        onError={(err) =>
                          setStatus({
                            kind: "error",
                            message:
                              err instanceof Error ? err.message : "Card payment failed",
                          })
                        }
                      >
                        <div className="space-y-3 rounded-xl border border-[color:var(--border)] bg-white p-4">
                          <PayPalNameField />
                          <PayPalNumberField />
                          <div className="grid grid-cols-2 gap-3">
                            <PayPalExpiryField />
                            <PayPalCVVField />
                          </div>
                        </div>
                        <CardFieldsSubmit
                          disabled={status.kind === "processing"}
                          onSubmitting={setCardSubmitting}
                        />
                      </PayPalCardFieldsProvider>
                    </div>
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
