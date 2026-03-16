import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Use Vercel's automatic URL or localhost for development
  site: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:4321',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
