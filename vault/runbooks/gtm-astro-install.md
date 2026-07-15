# Runbook: Instalar Google Tag Manager en Astro

> Procedimiento reutilizable para proyectos Astro con ViewTransitions. Usado por primera vez en Amani Beauty (2026-07-15).

## Objetivo

Instalar Google Tag Manager (GTM) en un proyecto Astro de forma limpia, modular y escalable para marketing digital. El Pixel de Meta, GA4, conversiones y eventos personalizados se gestionan **desde el contenedor GTM**, no desde el código.

## Pre-requisitos

- Proyecto Astro con ViewTransitions activado (`transition:animate` en el layout principal).
- Tener el GTM ID del cliente (formato `GTM-XXXXXXX`).
- El sitio se deploya en un VPS con Coolify usando Docker.

## Pasos

### 1. Crear componentes de GTM

#### `src/components/layout/GoogleTagManager.astro`

```astro
---
interface Props {
  id: string;
}

const { id } = Astro.props;
---

<!-- Google Tag Manager -->
<script is:inline define:vars={{ id }}>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', id);

  // Push pageview on initial load and after every Astro view transition
  function pushGtmPageview() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: {
        path: window.location.pathname,
        title: document.title,
        locale: document.documentElement.lang || '',
      },
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pushGtmPageview);
  } else {
    pushGtmPageview();
  }

  document.addEventListener('astro:page-load', pushGtmPageview);
</script>
<!-- End Google Tag Manager -->
```

#### `src/components/layout/GoogleTagManagerBody.astro`

```astro
---
interface Props {
  id: string;
}

const { id } = Astro.props;
---

<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${id}`}
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 2. Integrar en el layout principal

En `src/components/layout/Layout.astro`:

```astro
---
import GoogleTagManager from './GoogleTagManager.astro';
import GoogleTagManagerBody from './GoogleTagManagerBody.astro';

const gtmId = import.meta.env.GTM_ID;
---

<!doctype html>
<html lang={lang}>
  <head>
    <!-- ... -->
    {gtmId && <GoogleTagManager id={gtmId} />}
  </head>
  <body>
    {gtmId && <GoogleTagManagerBody id={gtmId} />}
    <!-- ... -->
  </body>
</html>
```

Importante: el body snippet debe ser el **primer hijo** de `<body>`.

### 3. Añadir script de tracking de clicks

Al final del `<body>` en `Layout.astro`:

```html
<script is:inline>
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-gtm-event]');
    if (!el) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: el.dataset.gtmEvent,
      gtm_location: el.dataset.gtmLocation || '',
      gtm_label: el.dataset.gtmLabel || '',
      url: el.href || '',
    });
  });
</script>
```

### 4. Helper para eventos programáticos

#### `src/utils/gtm.ts`

```ts
export interface GtmEventData {
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function pushToDataLayer(eventName: string, data: GtmEventData = {}): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
}
```

### 5. Marcar elementos para tracking

Ejemplos:

```html
<!-- WhatsApp -->
<a
  href="https://wa.me/..."
  data-gtm-event="whatsapp_click"
  data-gtm-location="contact_section"
  data-gtm-label="contact_es"
>
  Reservar por WhatsApp
</a>

<!-- Instagram -->
<a
  href="https://instagram.com/..."
  data-gtm-event="instagram_click"
  data-gtm-location="footer"
  data-gtm-label="footer_es"
>
  Instagram
</a>

<!-- Formulario -->
<button type="submit" data-gtm-event="form_submit" data-gtm-location="contact_form">
  Enviar
</button>
```

Para eventos programáticos:

```ts
import { pushToDataLayer } from '../utils/gtm';

pushToDataLayer('contact_form_submit', { form: 'contact', lang: 'es' });
```

### 6. Variables de entorno

Añadir en `.env.example`:

```env
GTM_ID=GTM-XXXXXXX
```

Y en Coolify:

```env
GTM_ID=GTM-XXXXXXX
```

**Nunca hardcodear el GTM ID en el código.**

### 7. Configurar GTM para Meta Pixel

1. Crear etiqueta **Custom HTML** para el Pixel base (sin `fbq('track', 'PageView')`).
2. Crear etiqueta **Custom HTML** para `PageView` con trigger **All Pages**.
3. Crear triggers tipo **Custom Event** para eventos del dataLayer:
   - `whatsapp_click` → etiqueta Meta Pixel Event `Contact`
   - `instagram_click` → etiqueta Meta Pixel Event personalizado
   - `form_submit` → etiqueta Meta Pixel Event `SubmitApplication`
   - `pageview` → etiqueta GA4 page_view o Meta PageView

### 8. Verificación

1. Redeployar en Coolify.
2. Verificar código fuente (`Ctrl+U`) buscando `googletagmanager.com` y `GTM-XXXXXXX`.
3. Usar **Preview** de GTM para confirmar que el contenedor se carga.
4. Verificar que no hay duplicados de PageView.

## Errores comunes

- **"No se ha detectado su etiqueta"**: la web no se ha redeployado, falta `GTM_ID` en Coolify, o se está probando con un GTM ID de otro cliente.
- **Duplicados de PageView**: no incluir `fbq('track', 'PageView')` en el snippet base; gestionarlo desde GTM.
- **No se trackean clicks en SPA**: asegurar que el script de click tracking esté en el layout global y no dentro de un componente que se destruye.

## Referencias

- Commit de referencia en Amani: `f4afbf6`
- Patrón usado: GTM head + body + dataLayer pageview + declarative click tracking
