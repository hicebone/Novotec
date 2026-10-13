# Auditoría Técnica y de Accesibilidad: Versión Original (`elnovoai`)

**Fecha de auditoría:** 13 de octubre de 2026  
**Proyecto auditado:** Novotec Hermosillo — Sitio web original (`C:\Users\elnov\Documents\elnovoai`)  
**Auditor:** Arquitecto Web, Especialista SEO & Auditor WCAG 2.2 AA  

---

## 1. Resumen Ejecutivo

El sitio web original de **Novotec Hermosillo** es una página de aterrizaje (landing page) desarrollada en HTML5 estático con Bootstrap 5.3.3, CSS personalizado y JavaScript vanilla. Promociona servicios de soporte técnico, reparación de computadoras y laptops, formateo, eliminación de virus, recuperación de datos y redes en la ciudad de Hermosillo, Sonora.

Aunque la versión original contiene datos comerciales valiosos y una base semántica aceptable en varias secciones, presenta importantes debilidades en:
1. **Accesibilidad con lectores de pantalla (NVDA)**: El carrusel interactivo genera confusión y contenido redundante; los mensajes de error del formulario no asocian `aria-describedby` ni `aria-invalid` con los campos correspondientes.
2. **Dependencias externas y rendimiento**: Dependencia crítica de 3 CDNs externos (Cloudflare Bootstrap CSS, Bootstrap JS y FontAwesome) más Google Fonts, lo que genera bloqueos de renderizado y riesgo de fallo sin conexión o en redes móviles inestables.
3. **Imágenes no optimizadas**: La carpeta original alberga imágenes PNG de más de 2.7 MB (`antivirus.png`, `instalacion.png`, `programas.png`, `recuperacion.png`, `redes.png` y `logo2.png` de 1.3 MB), sumando más de 14 MB que ralentizan severamente las conexiones lentas.
4. **Discrepancias SEO**: El archivo `index.html` declaraba un enlace canónico a `https://hicebone.github.io/Novotec/`, mientras que `robots.txt`, `sitemap.xml` y los datos estructurados `Schema.org` apuntaban a `https://www.novotechhermosillo.com/`.

---

## 2. Inventario de Archivos y Recursos Originales

- **Archivos raíz:**
  - `index.html` (598 líneas, 35.3 KB): Estructura principal de la página.
  - `styles.css` (784 líneas, 14.7 KB): Hojas de estilo personalizadas.
  - `script.js` (318 líneas, 11.2 KB): Comportamiento de carrusel diferido, navegación suave y validación de formulario para WhatsApp.
  - `robots.txt` (5 líneas): Directivas para motores de búsqueda.
  - `sitemap.xml` (12 líneas): Mapa de sitio XML con 1 sola URL.
  - `logo2.png` (1.30 MB): Versión pesada del logotipo.
  - `GEMINI.md` (5 líneas): Indicaciones de idioma (Español de México `es-MX`).
  - `.vscode/settings.json` (10 líneas): Configuración de telemetría y experimentos del editor.
- **Carpeta `imagenes/`:**
  - Archivos PNG de alta resolución (2 a 2.7 MB cada uno).
  - Archivos WebP optimizados y subcarpeta `opt/` con versiones ligeras (33 KB - 80 KB).
  - Logotipos: `logo.png` (53 KB) y `logo-optimized.png` (38 KB).

---

## 3. Análisis Detallado por Áreas

### 3.1. Arquitectura y Stack Tecnológico
- **Tecnología:** HTML5 plano + Bootstrap 5.3.3 + FontAwesome 6.5.2 + Google Fonts (Manrope).
- **Problema:** Se descargan bibliotecas completas de Bootstrap (CSS y JS) y FontAwesome cuando solo se utiliza una fracción mínima de estilos y unos 10 iconos. Esto penaliza el First Contentful Paint (FCP) y el Cumulative Layout Shift (CLS).

### 3.2. Accesibilidad Digital (WCAG 2.2 AA y NVDA en Windows)

| Elemento / Criterio | Estado Original | Diagnóstico y Barrera Detectada |
| :--- | :---: | :--- |
| **Idioma (`lang="es-MX"`)** | Conforme | Definido correctamente en `<html>`. |
| **Enlace de salto (`Skip Link`)** | Parcial | Presente (`Ir al contenido principal`), pero su clase CSS `.sr-only-focusable` cambiaba de `position: absolute` a `static`, provocando saltos de diseño. |
| **Carrusel de servicios** | Inaccesible / Confuso | Presenta 6 diapositivas con imágenes que duplican los 6 servicios listados en tarjetas inferiores. Para usuarios de NVDA, genera ruido acústico, navegación farragosa y desorientación. |
| **Formulario y validación** | Parcial | Los campos tenían `<label>` con `for`, pero en caso de error solo se aplicaba la clase CSS `.is-invalid`. Carecía de `aria-invalid="true"` y de `aria-describedby` que vincule el texto de ayuda o error con el input. NVDA no anuncia el motivo del error al posicionarse en el campo. |
| **Contraste de color** | Parcial | Tonos como `--text-accent` (`#9bc8ff`) sobre fondos claros o degradados no alcanzaban la relación mínima 4.5:1 exigida por WCAG 2.2 nivel AA. |
| **Iconografía** | Parcial | Dependiente de fuentes de FontAwesome. Si la fuente web falla o bloquea, los lectores o navegadores pueden mostrar glifos vacíos. Faltaba estandarizar `aria-hidden="true"` y `focusable="false"` en elementos SVG nativos. |

### 3.3. SEO Técnico y Datos Comerciales
- **Datos auténticos identificados:**
  - **Nombre del negocio:** Novotec Hermosillo (Novotec Reparación de Computadoras).
  - **Ubicación:** Hermosillo, Sonora, México.
  - **Coordenadas:** Latitud 29.072967, Longitud -110.955919.
  - **Teléfono / WhatsApp:** +52 662 508 5372 (`526625085372`).
  - **Facebook oficial:** `https://facebook.com/elnovotech`.
  - **Años de trayectoria:** Más de 25 años de experiencia técnica.
  - **Horario:** Lunes a Viernes de 09:00 a 18:00, Sábados de 09:00 a 14:00.
  - **Servicios reales:**
    1. Reparación de laptops.
    2. Reparación de computadoras de escritorio (PC).
    3. Seguridad informática y eliminación de virus.
    4. Recuperación de datos y archivos.
    5. Instalación de software y formateo.
    6. Redes e Internet.
  - **Preguntas frecuentes:** 4 preguntas y respuestas legítimas (tiempos 24-48h, respaldo preventivo de datos, tipos de computadoras atendidas, garantía por escrito).
- **Problemas SEO detectados:**
  - Discrepancia entre la URL canónica (`hicebone.github.io/Novotec/`) y los metadatos Open Graph / Schema (`novotechhermosillo.com`).
  - Falta de etiquetas `canonical` consistentes y páginas de error 404 personalizadas.
  - No existía sitemap generado dinámicamente con las mejores prácticas.

### 3.4. Rendimiento y Carga Móvil
- **Peticiones HTTP externas bloqueantes:**
  - `cdnjs.cloudflare.com/.../bootstrap.min.css`
  - `fonts.googleapis.com/.../Manrope`
  - `cdnjs.cloudflare.com/.../all.min.css` (FontAwesome)
  - `cdnjs.cloudflare.com/.../bootstrap.bundle.min.js`
  - `googletagmanager.com/gtag/js`
- **Impacto:** En conexiones 3G/4G con alta latencia, la página espera la resolución de 3 dominios DNS externos antes de renderizar el primer píxel.

---

## 4. Oportunidades de Mejora para `novoai2`

1. **Migración a Astro 5 con TypeScript**:
   - Salida estática 100% HTML pre-renderizado (Zero JavaScript por defecto).
   - Generación automática de `sitemap.xml` mediante `@astrojs/sitemap`.
   - Eliminación total de Bootstrap y FontAwesome; sustitución por CSS modular moderno con variables semánticas e iconos SVG accesibles embebidos (`aria-hidden="true"`, `focusable="false"`).
2. **Accesibilidad Absoluta para NVDA (WCAG 2.2 AA)**:
   - Eliminación del carrusel redundante en favor de un catálogo de servicios claro y estructurado con tarjetas semánticas (`<article>`), encabezados secuenciales (H2 para la sección, H3 para cada servicio) y navegación fluida.
   - Enlace de salto a contenido principal (`SkipLink`) fijo, visible al tabular y sin alterar el flujo del documento.
   - Formulario 100% accesible: `aria-invalid`, `aria-describedby` que anuncia exactamente el mensaje de error de cada campo, y región en vivo `aria-live="polite"` que confirma la preparación del mensaje de WhatsApp.
   - Respeto riguroso de `prefers-reduced-motion` e indicadores de foco de alto contraste (`outline: 3px solid #0B5FFF`, `outline-offset: 3px`).
3. **Optimización de Activos**:
   - Empleo prioritario de los recursos optimizados WebP (`opt/`) y del logotipo optimizado (`logo-optimized.png`), garantizando que la carga total inicial sea inferior a 200 KB en lugar de los 14+ MB potenciales de la versión previa.
   - Soporte tanto para dominio personalizado (`novotechhermosillo.com`) como para despliegue en GitHub Pages (`hicebone.github.io/Novotec/`), parametrizable en la configuración.
