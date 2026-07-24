import { createFileRoute } from "@tanstack/react-router";
import { PaymentPage } from "@/components/PaymentPage";

export const Route = createFileRoute("/pay")({
  head: () => ({
    meta: [
      { title: "Secure Invoice Payment — Web Solution Sydney" },
      {
        name: "description",
        content:
          "Pay your Web Solution Sydney invoice securely with credit or debit card via PayPal.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Secure Invoice Payment — Web Solution Sydney" },
      {
        property: "og:description",
        content: "Pay your invoice securely by card. Powered by PayPal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaymentPage,
});
