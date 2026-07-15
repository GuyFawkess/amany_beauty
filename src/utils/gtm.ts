export interface GtmPageData {
  path?: string;
  title?: string;
  locale?: string;
}

export interface GtmEventData {
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Push a structured event to the GTM dataLayer.
 * Use this for all marketing events: WhatsApp clicks, Instagram clicks,
 * form submissions, Meta conversions, GA4 events, etc.
 *
 * Example:
 *   pushToDataLayer('whatsapp_click', { label: 'hero', phone: '+34...' })
 */
export function pushToDataLayer(
  eventName: string,
  data: GtmEventData = {}
): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
}
