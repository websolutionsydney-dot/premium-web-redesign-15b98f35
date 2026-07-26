import { createServerFn } from "@tanstack/react-start";

export const createPaymentIntent = createServerFn({ method: "POST" })
  .inputValidator((input: { amount: number }) => {
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new Error("Invalid amount");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("Stripe secret key not configured");

    const amountInCents = Math.round(data.amount * 100);

    const body = new URLSearchParams();
    body.append("amount", String(amountInCents));
    body.append("currency", "aud");
    body.append("automatic_payment_methods[enabled]", "true");
    body.append("description", "Web Solution Sydney — Invoice Payment");

    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Stripe error: ${text}`);
    }

    const json = (await res.json()) as { client_secret: string; id: string };
    return { clientSecret: json.client_secret, id: json.id };
  });
