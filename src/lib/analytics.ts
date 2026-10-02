/**
 * Analytics hooks (placeholder). Events are pushed to `window.dataLayer`
 * (GTM-compatible) and re-dispatched as a DOM event so any provider can
 * subscribe without touching components. No keys are hardcoded.
 */
export type AnalyticsEvent =
  | "page_view"
  | "view_item"
  | "select_variant"
  | "customize_change"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase"
  | "contact_submit"
  | "newsletter_signup";

type Params = Record<string, string | number | boolean | undefined | object>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const payload = { event, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("iw:analytics", { detail: payload }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
