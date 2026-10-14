import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.novotechhermosillo.com',
  // Si se publica en GitHub Pages bajo una subruta (ej. hicebone.github.io/Novotec/),
  // descomentar o configurar la propiedad base: '/Novotec/'
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date()
    })
  ]
});
