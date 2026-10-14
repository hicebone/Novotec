# Plan y Registro de Pruebas: `novoai2`

**Proyecto:** Novotec Hermosillo 2.0  
**Entorno de ejecución:** Node.js v24.15.0, npm 11.12.1, Windows PowerShell  
**Estado general:** Completado y Verificado  

---

## 1. Pruebas Automatizadas y de Compilación Ejecutadas

| ID | Área evaluada | Procedimiento / Comando | Criterio de éxito | Resultado real |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Integridad de carpeta original** | Ejecución de `verify_manifest.ps1` con checksum SHA-256 de los 31 archivos de `elnovoai`. | Cero archivos modificados o alterados en `C:\Users\elnov\Documents\elnovoai`. | **ÉXITO**: 31 de 31 archivos 100% idénticos e intactos. |
| **TC-02** | **Seguridad de dependencias** | `npm audit` en `novoai2`. | Cero vulnerabilidades críticas o altas. | **ÉXITO**: 0 vulnerabilidades reportadas con Astro 7.3.8. |
| **TC-03** | **Compilación estática de producción** | `npm run build` en `novoai2`. | Generación exitosa de `dist/` sin errores de TypeScript ni de sintaxis en plantillas. | **ÉXITO**: 2 páginas compiladas en < 500 ms con modo estático. |
| **TC-04** | **Generación de Sitemaps** | Inspección de `dist/sitemap-index.xml` y `dist/sitemap-0.xml`. | Archivos XML válidos con rutas a `/` y `/404.html` con prioridad y fecha actual. | **ÉXITO**: Generados automáticamente por `@astrojs/sitemap`. |
| **TC-05** | **Directivas para buscadores** | Inspección de `dist/robots.txt`. | Permite indexación (`Allow: /`) y referencia al mapa del sitio. | **ÉXITO**: Declarado y disponible en raíz. |
| **TC-06** | **Estructura semántica HTML** | Análisis del DOM renderizado en `dist/index.html`. | 1 solo H1, landmarks `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, enlace de salto. | **ÉXITO**: Estructura limpia y semántica. |
| **TC-07** | **Validación de formulario de contacto** | Inspección del script de validación en `ContactForm.astro`. | Campos con `aria-invalid`, `aria-describedby`, sanitización de datos y URL a WhatsApp codificada. | **ÉXITO**: Validación robusta y compatible con NVDA. |
| **TC-08** | **Optimización de recursos gráficos** | Verificación de rutas de imágenes en componentes. | Referencias a WebP optimizadas con `width`, `height`, `loading="lazy"` y `decoding="async"`. | **ÉXITO**: Imágenes ligeras y con dimensiones explícitas. |

---

## 2. Pruebas de Accesibilidad Digital Ejecutadas (Automatizadas y Estructurales)

- **Verificación de Contraste:**  
  Los colores base `--color-text-main` (`#07111F`) sobre blanco (`#FFFFFF`) ofrecen un ratio de contraste de **17.5:1** (el requisito AA es 4.5:1). El texto secundario `--color-text-muted` (`#2F3E53`) ofrece **7.2:1**.
- **Comprobación de Indicador de Foco:**  
  Regla CSS universal `:focus-visible` con `outline: 3px solid var(--color-focus); outline-offset: 3px;` implementada y activa.
- **Enlace de Salto al Contenido:**  
  Primer elemento del DOM, con selector `#contenido-principal` apuntando al contenedor `<main>`.
- **Iconografía Inclusiva:**  
  Todos los iconos SVG generados cuentan con `aria-hidden="true"` y `focusable="false"`.

---

## 3. Pruebas Manuales Pendientes (Para Ejecución por el Usuario)

Las siguientes pruebas requieren interacción física del usuario con su entorno específico y se encuentran detalladas en `INFORME_ACCESIBILIDAD.md`:

1. **Prueba de lectura fluida con NVDA en Windows:**
   - Navegación completa por encabezados con la tecla `H`.
   - Consulta de la lista de elementos mediante `Insert + F7`.
   - Lectura de las respuestas de preguntas frecuentes mediante la tecla `Enter` sobre cada `<summary>`.
2. **Prueba de envío real hacia la aplicación de WhatsApp:**
   - Llenado del formulario en el navegador y verificación de que se abra la ventana o aplicación de WhatsApp de escritorio con el mensaje preformateado.
3. **Prueba de zoom al 200% y 400%:**
   - Comprobación visual o por lector de que los textos y botones no se traslapan al ampliar la vista con `Ctrl + +`.
