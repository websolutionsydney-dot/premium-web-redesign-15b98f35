import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";

const PAYMENT_HOSTS = new Set([
  "payments.websolutionsydney.com.au",
  "payments.websolutionscity.com.au",
]);

function normalizeHost(host: string) {
  return host.trim().toLowerCase().split(":")[0] ?? "";
}

export function isPaymentHostname(host: string) {
  return PAYMENT_HOSTS.has(normalizeHost(host));
}

export const getHostContext = createServerFn({ method: "GET" }).handler(async () => {
  const host = getRequestHost();

  return {
    isPaymentHost: isPaymentHostname(host),
  };
});