# Decisión Técnica y Arquitectura del Proyecto: `novoai2`

**Proyecto:** Novotec Hermosillo 2.0  
**Ubicación:** `C:\Users\elnov\Documents\novoai2`  
**Rol:** Arquitecto de Software Sénior & Auditor de Rendimiento Web  

---

## 1. Evaluación de Alternativas Tecnológicas

Para la renovación de la plataforma web de Novotec Hermosillo se analizaron cuatro arquitecturas potenciales frente a los requerimientos de negocio, SEO local, rendimiento crítico y accesibilidad absoluta para lectores de pantalla (NVDA).

| Criterio | HTML5 + JS Vanilla (Original) | React + Vite (SPA) | Next.js 15 (App Router / SSR) | **Astro 7 (Elegido)** |
| :--- | :--- | :--- | :--- | :--- |
| **SEO y Metadatos** | Manual; propenso a desincronizaciones en sitemaps y Open Graph. | Deficiente por defecto (SPA requiere SSR/prerender para evitar penalizaciones de bots). | Excelente, pero excesivamente complejo para una landing comercial. | **Sobresaliente**: Pre-renderizado estático puro con `@astrojs/sitemap` y metadatos fuertemente tipados. |
| **Core Web Vitals & Rendimiento** | Dependiente de CDNs externos no versionados ni cacheados localmente. | Carga de bundle JavaScript reactivo (300KB+ de runtime antes de renderizar). | Hidratación reactiva completa que consume tiempo de CPU móvil (INP/TBT). | **Máximo**: 0 KB de JavaScript cliente por defecto. Carga HTML instantánea (< 50ms) y LCP < 0.8s. |
| **Accesibilidad Digital (WCAG 2.2 AA & NVDA)** | Frágil: dependía de plugins Bootstrap y librerías externas. | Difícil de blindar: foco en SPAs exige gestión manual de rutas y live regions. | Buena semántica, pero la hidratación puede provocar desajustes de foco y latencia en lectores. | **Total**: HTML nativo estructurado, sin falsos botones, foco predecible, `aria-describedby` riguroso. |
| **Mantenimiento y Dependencias** | Archivo monolítico HTML de 600 líneas difícil de escalar. | Excesivo ecosistema de dependencias y hooks. | Sobrediseñado (overhead de Node server o export estático con configuración pesada). | **Óptimo**: Componentes modulares `.astro` fáciles de leer y editar, con TypeScript nativo. |
| **Consumo de JavaScript** | ~150 KB (Bootstrap JS + script.js). | ~300 KB - 500 KB (React runtime + Router). | ~200 KB - 400 KB de hidratación React. | **Mínimo absoluto**: Sólo unas líneas de JS vanilla nativo para el formulario accesible y el menú móvil. |
| **Compatibilidad con Alojamiento** | Compatible con cualquier servidor. | Requiere configuración de fallback para SPA en GitHub Pages. | Requiere servidor Node o modo estático limitado. | **Universal**: Genera una carpeta `dist/` con HTML, CSS e imágenes puras, 100% compatible con GitHub Pages y servidores Apache/Nginx. |

---

## 2. Decisión Arquitectónica Principal

Se ha seleccionado formalmente **Astro 7 con TypeScript y CSS Moderno basado en Variables de Diseño y Accesibilidad (Tokens)** como la arquitectura del proyecto `novoai2`.

### Justificación de la Elección

1. **Prioridad Absoluta en SEO Local**:  
   El negocio compite en el mercado de soporte informático en Hermosillo, Sonora. Con Astro, el 100% del código HTML, títulos, encabezados semánticos, metadescripciones, Open Graph y datos estructurados Schema.org (`LocalBusiness`, `ElectronicsRepairShop`, `FAQPage`) se generan en tiempo de compilación. Los motores de búsqueda indexan el contenido completo sin necesidad de esperar la ejecución de JavaScript.

2. **Rendimiento Extremo (Core Web Vitals)**:  
   Al erradicar dependencias pesadas como Bootstrap y FontAwesome, el sitio elimina peticiones de bloqueo DNS/CSS/JS. El diseño utiliza CSS nativo moderno con variables (`tokens.css`), Flexbox y CSS Grid, junto con iconos SVG embebidos y directivas de carga diferida en imágenes WebP optimizadas con atributos explícitos `width` y `height`, evitando cualquier Cumulative Layout Shift (CLS).

3. **Garantía de Accesibilidad para Usuarios Ciegos con NVDA**:  
   A diferencia de las librerías complejas que inyectan wrappers anidados y cambian el DOM tras la carga, Astro entrega HTML plano y robusto desde el primer byte. El usuario que navega con teclado (`Tab`, `Shift+Tab`, `Enter`, `Espacio`) y atajos de NVDA (`H` para encabezados, `K` para enlaces, `F` para formularios) percibe una estructura inmediata, coherente y sin sobresaltos.

4. **Independencia de Servicios de Pago y Compatibilidad Total**:  
   El resultado de `npm run build` es una distribución estática universal alojable en GitHub Pages sin costes de infraestructura, con opción directa de enlazar a dominio propio (`novotechhermosillo.com`) o subruta (`hicebone.github.io/Novotec/`).

---

## 3. Estructura de Directorios del Nuevo Proyecto

```text
C:\Users\elnov\Documents\novoai2\
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── robots.txt
│   ├── imagenes/          (imágenes y logotipos optimizados heredados)
│   └── logo2.png
├── src/
│   ├── components/
│   │   ├── SkipLink.astro       (Enlace de salto para lectores de pantalla)
│   │   ├── Header.astro         (Navegación principal accesible con toggler)
│   │   ├── Hero.astro           (Propuesta de valor clara y llamadas a la acción)
│   │   ├── TrustBadges.astro    (Indicadores de confianza: 25+ años, diagnóstico)
│   │   ├── Services.astro       (Catálogo semántico de los 6 servicios reales)
│   │   ├── Process.astro        (Proceso de atención transparente en 4 pasos)
│   │   ├── Experience.astro     (Historia y garantías verificables en Hermosillo)
│   │   ├── FAQ.astro            (Preguntas frecuentes nativas accesibles con details/summary)
│   │   ├── ContactForm.astro    (Formulario accesible integrado con WhatsApp)
│   │   ├── Footer.astro         (Pie de página con datos comerciales y enlaces)
│   │   ├── SchemaOrg.astro      (Datos estructurados JSON-LD LocalBusiness + FAQ)
│   │   └── Icon.astro           (Iconos SVG nativos con aria-hidden)
│   ├── layouts/
│   │   └── BaseLayout.astro     (Estructura HTML5, metadatos SEO, Open Graph)
│   ├── pages/
│   │   ├── index.astro          (Página principal)
│   │   └── 404.astro            (Página amigable de error 404)
│   └── styles/
│       ├── tokens.css           (Variables de color corporativo #0B5FFF, espaciado, fuentes)
│       ├── reset.css            (Reset accesible y box-sizing)
│       └── global.css           (Estilos globales, foco visible, animaciones y reduced-motion)
├── astro.config.mjs             (Configuración de Astro y plugin sitemap)
├── tsconfig.json                (Configuración estricta de TypeScript)
├── package.json                 (Astro 7.3.8 + @astrojs/sitemap + TypeScript)
└── [DOCUMENTOS_DEL_PROYECTO.md] (README, AUDITORIA, ACCESIBILIDAD, PLAN_PRUEBAS, etc.)
```
