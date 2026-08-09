import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://iainriceai.github.io',
  base: '/iainrice.github.io',
  integrations: [sitemap()],
});
