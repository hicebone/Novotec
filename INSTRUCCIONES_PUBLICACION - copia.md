# Guía e Instrucciones de Publicación: `novoai2`

**Proyecto:** Novotec Hermosillo 2.0  
**Ubicación de trabajo:** `C:\Users\elnov\Documents\novoai2`  
**Directorio de distribución listo para publicar:** `C:\Users\elnov\Documents\novoai2\dist`  

---

## 1. Introducción y Modos de Publicación

El proyecto `novoai2` está configurado con **Astro 7 en modo de salida estática (`output: "static"`)**. Al ejecutar el comando de compilación, Astro genera dentro de la carpeta `dist/` un sitio web completamente autónomo en HTML, CSS, JavaScript e imágenes optimizadas.

No requiere ningún servidor Node.js en producción, base de datos ni servicios de hosting costosos. Puede alojarse de forma 100% gratuita y de alto rendimiento en:
- **GitHub Pages** (Alojamiento original del repositorio).
- **Netlify**, **Vercel** o **Cloudflare Pages**.
- Cualquier servidor web tradicional (Apache, Nginx, cPanel).

---

## 2. Preparación según el Dominio de Destino

### Caso 1: Publicación en Dominio Propio (ej. `https://www.novotechhermosillo.com`)
Esta es la configuración predeterminada en `astro.config.mjs`.  
No requiere cambios:
```javascript
export default defineConfig({
  site: 'https://www.novotechhermosillo.com',
  // base no se requiere cuando está en la raíz del dominio
  integrations: [sitemap()]
});
```

### Caso 2: Publicación en GitHub Pages bajo subruta (ej. `https://hicebone.github.io/Novotec/`)
Si se aloja en GitHub Pages sin dominio propio (bajo el nombre del repositorio `Novotec`), abre `astro.config.mjs` y añade la propiedad `base`:
```javascript
export default defineConfig({
  site: 'https://hicebone.github.io',
  base: '/Novotec/',
  integrations: [sitemap()]
});
```

---

## 3. Despliegue Automatizado con GitHub Actions (Recomendado)

Si tienes tu repositorio alojado en GitHub, puedes publicar automáticamente en cada cambio creando el archivo `.github/workflows/deploy.yml` dentro de `novoai2`:

```yaml
name: Desplegar sitio en GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Clonar repositorio
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Compilar sitio estático
        run: npm run build

      - name: Subir artefacto de Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Publicar en GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

En la configuración del repositorio en GitHub:
1. Ve a **Settings** > **Pages**.
2. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.

---

## 4. Despliegue Manual o en Hosting Tradicional

1. **Compilar el proyecto:**
   Abre una terminal PowerShell en `novoai2`:
   ```powershell
   cd C:\Users\elnov\Documents\novoai2
   npm run build
   ```
2. **Subir los archivos:**
   Toma el contenido de la carpeta `dist/` (todos los archivos y carpetas que contiene: `index.html`, `404.html`, `robots.txt`, `sitemap-index.xml`, `imagenes/`, `_astro/`) y súbelo a la carpeta pública de tu servidor (ej. `public_html` o la rama `gh-pages`).

---

## 5. Verificación Posterior a la Publicación

Una vez publicado el sitio en la red, comprueba:
1. Que el dominio cargue por HTTPS con certificado SSL válido.
2. Que el archivo `https://tu-dominio/robots.txt` y `https://tu-dominio/sitemap-index.xml` respondan con código 200 OK.
3. Que el botón de WhatsApp abra el chat con el número `+52 662 508 5372`.
4. Que al ingresar una URL inexistente (ej. `https://tu-dominio/pagina-que-no-existe`), se muestre la página personalizada `404.html`.
