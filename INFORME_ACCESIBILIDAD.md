# Informe de Accesibilidad Digital (WCAG 2.2 Nivel AA & NVDA)

**Proyecto:** Novotec Hermosillo 2.0 (`novoai2`)  
**Estándar de conformidad:** W3C WCAG 2.2 Nivel AA  
**Lector de pantalla objetivo prioritario:** NVDA (NonVisual Desktop Access) en Windows  
**Modalidad de navegación:** Exclusiva por teclado y lector de pantalla sin visión  

---

## 1. Resumen de Conformidad

El rediseño implementado en `novoai2` ha sido concebido desde la arquitectura base para garantizar que una persona ciega que utilice **NVDA** pueda operar, navegar, informarse y contactar al negocio con total autonomía, rapidez y sin barreras técnicas.

Se eliminaron los componentes problemáticos de la versión anterior (como el carrusel redundante de Bootstrap) y se sustituyeron por estructuras semánticas nativas de HTML5, directivas ARIA precisas y control estricto del foco.

---

## 2. Implementaciones Específicas por Criterio WCAG 2.2 AA

### 2.1. Estructura Semántica y Jerarquía de Encabezados (SC 1.3.1, SC 2.4.6, SC 2.4.1)

- **Regiones y Landmarks nativos:**
  - `<header>` con `role="banner"` implícito.
  - `<nav aria-label="Navegación principal">` con su respectivo propósito declarado.
  - `<main id="contenido-principal" tabindex="-1">` como punto neurálgico del documento.
  - `<aside aria-label="Información de contacto">` para datos de ubicación, teléfono y horarios.
  - `<footer>` con `role="contentinfo"` implícito.
- **Enlace de salto inicial (`Skip Link`):**
  - Ubicado como el primer elemento interactivo del DOM:  
    `<a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>`.
  - Oculto visualmente fuera de la pantalla mediante `transform: translateY(-200%)` pero completamente disponible para NVDA. Al recibir foco mediante la tecla `Tab`, se despliega en la esquina superior con fondo azul corporativo, borde blanco y tipografía legible, saltando directamente al contenedor `<main>`.
- **Estructura unificada de encabezados:**
  - **Único H1:**  
    `<h1>Reparación de computadoras en Hermosillo rápida, honesta y confiable</h1>`.
  - **H2 para cada sección principal:**
    - `<h2>Soluciones técnicas profesionales para tu equipo</h2>` (Servicios).
    - `<h2>Cómo cuidamos tu equipo en 4 pasos</h2>` (Proceso de atención).
    - `<h2>Más de 25 años resolviendo problemas reales en Hermosillo</h2>` (Experiencia).
    - `<h2>Dudas habituales sobre nuestro servicio</h2>` (Preguntas frecuentes).
    - `<h2>Hablemos de tu equipo en Hermosillo</h2>` (Contacto).
  - **H3 para cada tarjeta de servicio, compromiso y bloque de contenido secundario:**
    - Orden estrictamente secuencial, sin saltos de nivel (no hay H4 sin H3 previo).

### 2.2. Navegación por Teclado y Gestión del Foco (SC 2.1.1, SC 2.1.2, SC 2.4.7, SC 2.5.8)

- **Navegabilidad total:** Cualquier acción del sitio puede ejecutarse mediante `Tab`, `Shift+Tab`, `Enter`, `Espacio` y `Escape`.
- **Indicador de foco visible de alto contraste:**
  - Se configuró `:focus-visible` con `outline: 3px solid var(--color-focus); outline-offset: 3px;` sobre fondos claros y `outline: 3px solid #ffffff;` sobre fondos oscuros.
  - Queda terminantemente prohibido el uso de `outline: none` sin sustituto.
- **Sin trampas de teclado:** El foco entra y sale de cualquier bloque o control libremente.
- **Tamaño de destino táctil y de puntero (SC 2.5.8):** Todos los botones y enlaces interactivos cuentan con una altura y anchura mínima efectiva de 48px por 48px.
- **Controles nativos:**
  - Enlaces (`<a>`) únicamente para desplazarse o navegar.
  - Botones (`<button>`) únicamente para ejecutar acciones (abrir menú móvil, enviar formulario).
  - No existen elementos `<div>` o `<span>` disfrazados de botones con eventos de clic.

### 2.3. Formulario Accesible y Notificación de Errores (SC 3.3.1, SC 3.3.2, SC 3.3.3, SC 4.1.3)

El formulario de cotización fue blindado para evitar la frustración habitual en lectores de pantalla:

1. **Etiquetas reales asociadas:**  
   Cada campo posee un `<label>` explícito con atributo `for` que coincide exactamente con el `id` del control. No se depende de marcadores de posición (`placeholder`).
2. **Campos obligatorios:**  
   Declarados con el atributo HTML `required` y `aria-required="true"`, más indicador visual en el label.
3. **Validación y anuncio de errores:**
   - Si un campo no cumple la validación, el script añade `aria-invalid="true"`.
   - Se asocia el mensaje de error textual específico mediante `aria-describedby="[campo]-error"`.
   - Cuando el usuario navega al campo con error, NVDA anuncia de forma inmediata: *"inválido, [Nombre del campo], edición, [Mensaje de error]"*.
   - El primer campo inválido recibe automáticamente el foco (`firstInvalidEl.focus()`).
4. **Región en vivo para confirmación de envío:**
   - Se incluye un contenedor `<div id="formStatus" role="status" aria-live="polite"></div>`.
   - Tras validar exitosamente, se anuncia que se ha preparado y abierto WhatsApp con la cotización estructurada, ofreciendo además un enlace de respaldo claro por si el navegador bloquea ventanas emergentes.

### 2.4. Preguntas Frecuentes (FAQ) Nativas

- Se descartaron librerías de acordeón que inyectan wrappers JS inaccesibles.
- Se implementaron elementos nativos `<details>` y `<summary>`.
- **Comportamiento en NVDA:** Al navegar por la lista de preguntas, NVDA anuncia: *"botón contraído, ¿Cuánto tiempo tarda la reparación de una computadora...?"*. Al pulsar `Enter` o `Espacio`, el elemento se expande al instante y NVDA anuncia *"expandido"*, permitiendo continuar la lectura de la respuesta con las flechas del cursor sin scripts intermedios.

### 2.5. Iconografía e Imágenes

- **Iconos SVG:** Todos los iconos gráficos SVG incluyen `aria-hidden="true"` y `focusable="false"`. No generan ruido ni caracteres no legibles en NVDA.
- **Imágenes informativas:** Cuentan con textos alternativos contextuales y detallados (`alt="Técnico especialista reparando una laptop en taller de Novotec Hermosillo"`).
- **Logotipos:** Incluyen `alt="Logo de Novotec Hermosillo"` y su enlace padre especifica `aria-label="Novotec Hermosillo - Ir a inicio"`.

### 2.6. Movimiento Reducido y Contraste de Color

- Se respeta rigurosamente `@media (prefers-reduced-motion: reduce)`, desactivando cualquier transición o efecto de desplazamiento suave.
- Todos los pares de color de texto sobre fondo cumplen y superan el ratio 4.5:1 exigido por WCAG 2.2 AA (el texto principal alcanza 17.5:1 y el secundario 7.2:1).

---

## 3. Guía Paso a Paso para Pruebas Manuales con NVDA en Windows

El usuario puede verificar la accesibilidad del proyecto siguiendo este protocolo exacto:

1. **Compilar y servir el proyecto localmente:**
   ```powershell
   cd C:\Users\elnov\Documents\novoai2
   npm run preview
   ```
   Abrir en el navegador el enlace local (habitualmente `http://localhost:4321/`).

2. **Comprobación del Enlace de Salto:**
   - Con NVDA activo, recargar la página (`F5`).
   - Presionar la tecla `Tab` una sola vez.
   - **Resultado esperado en NVDA:** Anuncia *"Saltar al contenido principal, enlace"*.
   - Presionar `Enter`.
   - **Resultado esperado:** El foco salta directamente al inicio del contenido principal (`#contenido-principal`), evitando el menú de navegación.

3. **Comprobación de la Jerarquía de Encabezados (Tecla `H`):**
   - Presionar la tecla `H` de forma repetida para recorrer los encabezados del sitio.
   - **Resultado esperado:**
     - Nivel 1: *"Reparación de computadoras en Hermosillo rápida, honesta y confiable"* (único H1).
     - Nivel 2: *"Soluciones técnicas profesionales para tu equipo"* (Servicios).
     - Nivel 3: *"Reparación de Laptops"*, *"Reparación de Computadoras PC"*, etc.
     - Nivel 2: *"Cómo cuidamos tu equipo en 4 pasos"* (Proceso).
     - Nivel 2: *"Más de 25 años resolviendo problemas reales en Hermosillo"* (Experiencia).
     - Nivel 2: *"Dudas habituales sobre nuestro servicio"* (Preguntas Frecuentes).
     - Nivel 2: *"Hablemos de tu equipo en Hermosillo"* (Contacto).
   - Presionar `Shift + H` para retroceder ordenadamente.

4. **Comprobación de la Lista de Elementos (`Insert + F7`):**
   - Presionar `Insert + F7` (o `BloqMayús + F7`).
   - En la pestaña **Encabezados**, comprobar que la jerarquía es coherente y sin saltos.
   - En la pestaña **Enlaces**, verificar que todos los enlaces describen su destino (ej. *"Cotizar por WhatsApp el servicio de Reparación de Laptops"*, *"Llamar al taller Novotec"*), sin frases genéricas como *"clic aquí"*.
   - En la pestaña **Campos de formulario**, comprobar la lista completa de inputs con sus etiquetas.

5. **Comprobación del Acordeón FAQ:**
   - Navegar a la sección de Preguntas Frecuentes con la tecla `H` o flechas.
   - Al llegar a un elemento de pregunta, NVDA anuncia *"botón contraído"*.
   - Presionar `Enter` o `Espacio`.
   - **Resultado esperado:** NVDA anuncia *"expandido"* y con la flecha abajo se lee la respuesta correspondiente.

6. **Comprobación del Formulario Accesible:**
   - Navegar con la tecla `F` hasta el formulario de contacto.
   - Sin llenar los campos, tabular hasta el botón *"Enviar cotización por WhatsApp"* y pulsar `Espacio` o `Enter`.
   - **Resultado esperado:**
     - La región de estado anuncia: *"Hay errores en el formulario. Por favor, revisa los campos señalados antes de continuar"*.
     - El foco se traslada automáticamente al primer campo inválido (`Nombre completo`).
     - Al posicionarse en el campo, NVDA anuncia: *"inválido, Nombre completo, requerido, cuadro de edición, Por favor escribe tu nombre completo..."*.
   - Rellenar datos de prueba y presionar nuevamente enviar: WhatsApp se abre con el texto formateado y la región de estado confirma el envío.
