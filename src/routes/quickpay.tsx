import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/KWZ3KBSGUFPD8";

export const Route = createFileRoute("/quickpay")({
  head: () => ({
    meta: [
      { title: "Quick Pay — Web Solution Sydney" },
      { name: "description", content: "Redirecting to secure PayPal checkout." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Quick Pay — Web Solution Sydney" },
      { property: "og:description", content: "Secure PayPal checkout redirect." },
    ],
  }),
  component: QuickPay,
});

function QuickPay() {
  useEffect(() => {
    window.location.href = PAYPAL_LINK;
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--brand)] border-t-transparent" />
        <h1 className="font-display text-2xl">Redirecting to secure PayPal checkout…</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          If you are not redirected,{" "}
          <a href={PAYPAL_LINK} className="text-[color:var(--brand)] underline">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
