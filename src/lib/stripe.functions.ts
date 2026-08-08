import { createServerFn } from "@tanstack/react-start";

type CreateIntentInput = {
  amount: number;
  name?: string;
  email?: string;
};

export const createPaymentIntent = createServerFn({ method: "POST" })
  .inputValidator((input: CreateIntentInput) => {
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new Error("Invalid amount");
    }
    return {
      amount: input.amount,
      name: input.name?.trim() ?? "",
      email: input.email?.trim() ?? "",
    };
  })
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("Stripe secret key not configured");

    const headers = {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // 1. Find an existing customer by email, otherwise create one.
    let customerId: string | null = null;

    if (data.email) {
      const search = await fetch(
        `https://api.stripe.com/v1/customers?limit=1&email=${encodeURIComponent(data.email)}`,
        { headers },
      );
      if (search.ok) {
        const found = (await search.json()) as { data?: Array<{ id: string }> };
        customerId = found.data?.[0]?.id ?? null;
      }
    }

    if (!customerId) {
      const customerBody = new URLSearchParams();
      if (data.email) customerBody.append("email", data.email);
      if (data.name) customerBody.append("name", data.name);
      customerBody.append("description", "Web Solution Sydney — Invoice Payer");

      const customerRes = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers,
        body: customerBody,
      });

      if (!customerRes.ok) {
        const text = await customerRes.text();
        throw new Error(`Stripe error: ${text}`);
      }

      const customer = (await customerRes.json()) as { id: string };
      customerId = customer.id;
    }

    // 2. Create the PaymentIntent attached to that customer.
    const amountInCents = Math.round(data.amount * 100);

    const body = new URLSearchParams();
    body.append("amount", String(amountInCents));
    body.append("currency", "aud");
    body.append("automatic_payment_methods[enabled]", "true");
    body.append("description", "Web Solution Sydney — Invoice Payment");
    body.append("customer", customerId);
    body.append("setup_future_usage", "off_session");
    if (data.email) body.append("receipt_email", data.email);

    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers,
      body,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Stripe error: ${text}`);
    }

    const json = (await res.json()) as { client_secret: string; id: string };
    return { clientSecret: json.client_secret, id: json.id, customerId };
  });
