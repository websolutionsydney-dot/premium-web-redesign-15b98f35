import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";

export const getHostContext = createServerFn({ method: "GET" }).handler(async () => {
  const host = getRequestHost();
  const paymentHosts = new Set([
    "payments.websolutionsydney.com.au",
    "payments.websolutionscity.com.au",
  ]);
  const normalizedHost = host.trim().toLowerCase().split(":")[0] ?? "";

  return {
    isPaymentHost: paymentHosts.has(normalizedHost),
  };
});