import type { APIRoute } from 'astro';
import crypto from 'node:crypto';

export const prerender = false;

interface IncomingEvent {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  user_data?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    city?: string;
    country?: string;
    external_id?: string;
  };
}

const META_GRAPH_URL = 'https://graph.facebook.com/v21.0';

function sha256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}

export const POST: APIRoute = async ({ request }) => {
  const pixelId = import.meta.env.META_PIXEL_ID;
  const accessToken = import.meta.env.META_CAPI_TOKEN;
  const testCode = import.meta.env.META_CAPI_TEST_CODE;

  if (!pixelId || !accessToken) {
    return new Response(
      JSON.stringify({ error: 'META_PIXEL_ID or META_CAPI_TOKEN not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: IncomingEvent;
  try {
    body = (await request.json()) as IncomingEvent;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const eventName = body.event_name;
  const eventId = body.event_id;
  if (!eventName || !eventId) {
    return new Response(
      JSON.stringify({ error: 'event_name and event_id required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ua = request.headers.get('user-agent') ?? undefined;

  const userData: Record<string, string | undefined> = {
    em: sha256(body.user_data?.email),
    ph: sha256(body.user_data?.phone),
    fn: sha256(body.user_data?.first_name),
    ln: sha256(body.user_data?.last_name),
    ct: sha256(body.user_data?.city),
    country: sha256(body.user_data?.country),
    external_id: sha256(body.user_data?.external_id),
    client_ip_address: ip,
    client_user_agent: ua,
  };

  // Strip undefined fields so Meta doesn't reject the payload.
  for (const key of Object.keys(userData)) {
    if (userData[key] === undefined) delete userData[key];
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: body.event_source_url,
        action_source: 'website',
        user_data: userData,
        custom_data: body.custom_data,
      },
    ],
    ...(testCode ? { test_event_code: testCode } : {}),
  };

  const url = `${META_GRAPH_URL}/${pixelId}/events?access_token=${accessToken}`;

  try {
    const metaRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const metaBody = await metaRes.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: metaRes.ok, meta: metaBody }), {
      status: metaRes.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Meta CAPI request failed', detail: String(err) }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
