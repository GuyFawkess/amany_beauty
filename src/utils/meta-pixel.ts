/**
 * Meta Pixel client-side helpers.
 * Generates a unique event_id, fires fbq() on the browser AND posts to
 * /api/meta-conversions so the same event_id deduplicates browser and server.
 *
 * Usage:
 *   import { trackMetaEvent } from '../utils/meta-pixel';
 *   trackMetaEvent('Contact', { content_name: 'whatsapp_click' });
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface MetaEventData {
  [key: string]: unknown;
}

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Fire a Meta Pixel event and forward it server-side via CAPI with the same
 * event_id so Meta deduplicates browser + server hits.
 */
export function trackMetaEvent(
  eventName: string,
  data: MetaEventData = {}
): void {
  if (typeof window === 'undefined') return;

  const eventId = generateEventId();

  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, data, { eventID: eventId });
  }

  fetch('/api/meta-conversions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: data,
    }),
    keepalive: true,
  }).catch(() => {
    // Silent: CAPI failure should never break UX.
  });
}

/**
 * Send a pageview event through the same pipeline.
 * Astro ViewTransitions fires astro:page-load on every navigation,
 * so we hook there to keep PageView events in sync with SPA navigations.
 */
export function trackMetaPageview(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  const eventId = generateEventId();
  window.fbq('track', 'PageView', undefined, { eventID: eventId });

  fetch('/api/meta-conversions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: 'PageView',
      event_id: eventId,
      event_source_url: window.location.href,
    }),
    keepalive: true,
  }).catch(() => {});
}
