# Novotec Hermosillo 2.0 — Rediseño Web Profesional, SEO y Accesibilidad Total

Sitio web oficial de **Novotec Hermosillo**, negocio especializado en soporte técnico, reparación de computadoras, laptops, formateo, eliminación de virus, redes y recuperación de datos en Hermosillo, Sonora.

Esta versión renovada (`novoai2`) reemplaza la arquitectura original basada en CDNs y Bootstrap por un proyecto estático de ultra-alto rendimiento desarrollado con **Astro 7**, **TypeScript** y **CSS semántico**, diseñado con accesibilidad digital de primer nivel bajo el estándar **WCAG 2.2 AA**, optimizado especialmente para lectores de pantalla como **NVDA** en Windows.

---

## Características Principales

1. **Accesibilidad Universal (WCAG 2.2 Nivel AA & NVDA):**
   - Enlace de salto inicial al contenido principal (`Skip Link`).
   - HTML5 semántico puro (`header`, `nav`, `main`, `aside`, `article`, `footer`).
   - Jerarquía lógica con 1 único encabezado H1 y estructura secuencial de H2 y H3.
   - Indicador de foco visible universal obligatorio (`3px outline` de alto contraste).
   - Acordeón de preguntas frecuentes implementado con `<details>` y `<summary>` nativos (lectura inmediata en lectores de pantalla sin scripts).
   - Formulario de contacto con etiquetas reales, `aria-invalid`, `aria-describedby` que anuncia el texto exacto del error y foco automático en el primer campo inválido.
   - Iconografía SVG nativa con `aria-hidden="true"` y `focusable="false"`.
   - Cumplimiento estricto de `prefers-reduced-motion`.

2. **Rendimiento Máximo y Core Web Vitals:**
   - 0 KB de JavaScript cliente innecesario (arquitectura de islas / HTML estático pre-renderizado).
   - Eliminación total de dependencias de CDNs externos (sin Bootstrap ni FontAwesome externos).
   - Bundle CSS minificado de apenas 24 KB.
   - Carga diferida (`loading="lazy"`) en imágenes fuera de pantalla e indicación explícita de `width` y `height` para erradicar el Cumulative Layout Shift (CLS).
   - Formato moderno WebP para todas las imágenes de servicio.

3. **SEO Técnico y Posicionamiento Local en Hermosillo, Sonora:**
   - Títulos y metadescripciones únicos orientados a búsqueda local.
   - Metadatos Open Graph y Twitter Cards completos con imagen representativa.
   - Geo tags para Hermosillo (`MX-SON`, coordenadas 29.072967, -110.955919).
   - Datos estructurados Schema.org completos en formato JSON-LD (`LocalBusiness`, `ElectronicsRepairShop`, `FAQPage`).
   - Generación automática de `sitemap-index.xml` y `sitemap-0.xml` mediante `@astrojs/sitemap`.
   - Archivo `robots.txt` optimizado.
   - Página amigable para errores 404 (`404.astro`).

4. **Funcionalidad Comercial Verificada:**
   - Enlace directo y botón para WhatsApp con el número oficial (+52 662 508 5372).
   - Formulario funcional que valida los datos, sanitiza el contenido y genera una solicitud estructurada directa a WhatsApp con confirmación accesible en pantalla.
   - Datos comerciales fidedignos (más de 25 años de experiencia, diagnóstico en 24-48h, respaldo de datos, garantía por escrito).

---

## Estructura del Proyecto

```text
novoai2/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── imagenes/          (imágenes y logotipos optimizados WebP)
│   └── logo2.png
├── src/
│   ├── components/
│   │   ├── SkipLink.astro       (Enlace de salto para lectores de pantalla)
│   │   ├── Header.astro         (Cabecera y navegación con menú móvil accesible)
│   │   ├── Hero.astro           (Portada con propuesta de valor y único H1)
│   │   ├── Services.astro       (Catálogo de los 6 servicios auténticos)
│   │   ├── Process.astro        (Proceso de atención en 4 pasos transparentes)
│   │   ├── Experience.astro     (25+ años de trayectoria y garantías)
│   │   ├── FAQ.astro            (Preguntas frecuentes nativas accesibles)
│   │   ├── ContactForm.astro    (Formulario accesible enlazado a WhatsApp)
│   │   ├── Footer.astro         (Pie de página con datos comerciales y redes)
│   │   ├── SchemaOrg.astro      (Datos estructurados JSON-LD)
│   │   └── Icon.astro           (Iconos SVG accesibles)
│   ├── layouts/
│   │   └── Layout.astro         (Plantilla base HTML5, SEO y Open Graph)
│   ├── pages/
│   │   ├── index.astro          (Página principal)
│   │   └── 404.astro            (Página de error 404)
│   └── styles/
│       ├── tokens.css           (Variables corporativas #0B5FFF, contraste WCAG)
│       ├── reset.css            (Reset accesible moderno)
│       └── global.css           (Estilos globales, foco visible y a11y)
├── dist/                        (Sitio estático compilado listo para publicación)
├── astro.config.mjs             (Configuración de Astro y plugin sitemap)
├── tsconfig.json                (Configuración de TypeScript estricto)
├── package.json                 (Dependencias de Astro 7 y TypeScript)
├── AUDITORIA_ORIGINAL.md        (Auditoría exhaustiva de la versión original elnovoai)
├── DECISION_TECNICA.md          (Evaluación de frameworks y decisión técnica)
├── INFORME_ACCESIBILIDAD.md     (Informe WCAG 2.2 AA y guía de pruebas con NVDA)
├── PLAN_DE_PRUEBAS.md           (Registro de pruebas ejecutadas y pendientes)
├── INSTRUCCIONES_PUBLICACION.md (Pasos de despliegue en GitHub Pages y servidores)
└── ESTADO_DEL_PROYECTO.md       (Resumen de avance y control de calidad)
```

---

## Requisitos y Comandos

### Requisitos previos
- Node.js versión 18 o superior (recomendado v22 o v24).
- npm versión 9 o superior.

### Comandos de trabajo

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo local:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

3. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera la distribución estática final en la carpeta `dist/`.

4. **Previsualizar la compilación de producción localmente:**
   ```bash
   npm run preview
   ```

---

## Documentación Técnica Detallada

Para consultar los informes y análisis específicos, revisa los documentos en la raíz del proyecto:
- [AUDITORIA_ORIGINAL.md](file:///C:/Users/elnov/Documents/novoai2/AUDITORIA_ORIGINAL.md): Hallazgos del proyecto previo.
- [DECISION_TECNICA.md](file:///C:/Users/elnov/Documents/novoai2/DECISION_TECNICA.md): Justificación arquitectónica de Astro.
- [INFORME_ACCESIBILIDAD.md](file:///C:/Users/elnov/Documents/novoai2/INFORME_ACCESIBILIDAD.md): Cumplimiento WCAG 2.2 AA y guía para NVDA.
- [PLAN_DE_PRUEBAS.md](file:///C:/Users/elnov/Documents/novoai2/PLAN_DE_PRUEBAS.md): Casos de prueba verificados.
- [INSTRUCCIONES_PUBLICACION.md](file:///C:/Users/elnov/Documents/novoai2/INSTRUCCIONES_PUBLICACION.md): Pasos para publicar en GitHub Pages.
- [ESTADO_DEL_PROYECTO.md](file:///C:/Users/elnov/Documents/novoai2/ESTADO_DEL_PROYECTO.md): Estado del trabajo entregado.
