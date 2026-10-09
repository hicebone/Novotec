document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const revealItems = document.querySelectorAll(".reveal");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const servicesSection = document.getElementById("servicios");
  const carouselEl = document.getElementById("serviciosCarousel");
  let activeLinkFrame = 0;

  /* ==========================================================================
     1. CARGA ROBUSTA Y DIFERIDA DE IMÁGENES (LAZY LOADING / HIDRATACIÓN)
     ========================================================================== */
  const loadDeferredImages = (root) => {
    if (!root) return;
    const deferredImages = root.querySelectorAll("img[data-src]");
    deferredImages.forEach((img) => {
      const realSrc = img.getAttribute("data-src");
      if (!realSrc) return;
      img.src = realSrc;
      img.removeAttribute("data-src");
    });
  };

  // Carga diferida mediante IntersectionObserver
  if (servicesSection) {
    if ("IntersectionObserver" in window) {
      const servicesObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            loadDeferredImages(servicesSection);
            observer.unobserve(entry.target);
          });
        },
        { root: null, rootMargin: "300px 0px", threshold: 0.05 }
      );
      servicesObserver.observe(servicesSection);
    } else {
      loadDeferredImages(servicesSection);
    }
  }

  // Si el usuario cambia de diapositiva antes de que la sección sea observada
  if (carouselEl) {
    carouselEl.addEventListener("slide.bs.carousel", () => {
      loadDeferredImages(carouselEl);
    });
  }

  /* ==========================================================================
     2. ACCESIBILIDAD POR TECLADO (CARRUSEL Y ACORDEÓN FAQ)
     ========================================================================== */
  // Navegación por flechas en el carrusel
  if (carouselEl) {
    carouselEl.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        window.bootstrap?.Carousel?.getOrCreateInstance(carouselEl)?.prev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        window.bootstrap?.Carousel?.getOrCreateInstance(carouselEl)?.next();
      }
    });
  }

  // Navegación accesible por flechas en el acordeón de Preguntas Frecuentes (WAI-ARIA)
  const faqButtons = Array.from(document.querySelectorAll("#faqAccordion .accordion-button"));
  faqButtons.forEach((btn, index) => {
    btn.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextBtn = faqButtons[(index + 1) % faqButtons.length];
        nextBtn?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const prevBtn = faqButtons[(index - 1 + faqButtons.length) % faqButtons.length];
        prevBtn?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        faqButtons[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        faqButtons[faqButtons.length - 1]?.focus();
      }
    });
  });

  /* ==========================================================================
     3. NAVEGACIÓN SUAVE Y DESPLAZAMIENTO
     ========================================================================== */
  const closeNav = () => {
    if (!navCollapse || !navCollapse.classList.contains("show")) return;
    const instance = window.bootstrap?.Collapse?.getOrCreateInstance(navCollapse);
    instance?.hide();
  };

  const scrollToTarget = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;

    const offset = navbar ? navbar.offsetHeight + 8 : 0;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({
      top,
      behavior: "smooth"
    });

    if (window.history?.replaceState && window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }

    if (typeof target.focus === "function") {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    closeNav();
    scrollToTarget(hash);
  });

  const setActiveLink = () => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const offset = (navbar?.offsetHeight || 0) + 28;
    let currentId = sections[0]?.id || "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  // Observador de revelación visual de elementos
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  window.addEventListener(
    "scroll",
    () => {
      if (activeLinkFrame) return;
      activeLinkFrame = window.requestAnimationFrame(() => {
        activeLinkFrame = 0;
        setActiveLink();
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", setActiveLink);
  setActiveLink();

  /* ==========================================================================
     4. FORMULARIO DE CONTACTO, SANITIZACIÓN Y WHATSAPP
     ========================================================================== */
  const sanitizeText = (val, maxLen = 500) => {
    if (typeof val !== "string") return "";
    return val
      .replace(/[<>]/g, "") // Retira caracteres < y > para evitar inyección
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Retira caracteres de control
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
      .slice(0, maxLen);
  };

  const setFieldState = (field, isValid) => {
    if (!field) return;
    field.classList.toggle("is-valid", isValid);
    field.classList.toggle("is-invalid", !isValid);
  };

  const showMessage = (type, html) => {
    if (!formMessage) return;
    formMessage.className = `alert alert-${type}`;
    formMessage.innerHTML = html;
    formMessage.classList.remove("d-none");
  };

  // Limpiar estilos de error conforme el usuario interactúa
  const formInputs = form ? form.querySelectorAll("input, select, textarea") : [];
  formInputs.forEach((input) => {
    const clearError = () => {
      if (input.classList.contains("is-invalid")) {
        input.classList.remove("is-invalid");
      }
    };
    input.addEventListener("input", clearError);
    input.addEventListener("change", clearError);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const servicio = document.getElementById("servicio");
    const mensaje = document.getElementById("mensaje");
    const terminos = document.getElementById("terminos");

    const cleanNombre = sanitizeText(nombre?.value, 80);
    const cleanEmail = sanitizeText(email?.value, 100);
    const cleanTelefono = sanitizeText(telefono?.value, 25);
    const cleanServicio = sanitizeText(servicio?.value, 80);
    const cleanMensaje = sanitizeText(mensaje?.value, 1000);
    const cleanTerminos = Boolean(terminos?.checked);

    const nombreOk = cleanNombre.length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
    const phoneOk = /^[0-9+\-\s()]{7,}$/.test(cleanTelefono);
    const servicioOk = Boolean(cleanServicio);
    const mensajeOk = cleanMensaje.length >= 10;
    const terminosOk = cleanTerminos;

    setFieldState(nombre, nombreOk);
    setFieldState(email, emailOk);
    setFieldState(telefono, phoneOk);
    setFieldState(servicio, servicioOk);
    setFieldState(mensaje, mensajeOk);
    setFieldState(terminos, terminosOk);

    const valid = nombreOk && emailOk && phoneOk && servicioOk && mensajeOk && terminosOk;

    if (!valid) {
      showMessage("danger", "Por favor revisa los campos señalados antes de continuar.");
      const primerInvalido = form.querySelector(".is-invalid");
      if (primerInvalido) {
        primerInvalido.focus();
      }
      return;
    }

    const numero = "526625085372";
    const texto = [
      "🛠️ *Solicitud de servicio - Novotec Hermosillo*",
      "",
      `👤 *Nombre:* ${cleanNombre}`,
      `📱 *Teléfono:* ${cleanTelefono}`,
      `📧 *Correo:* ${cleanEmail}`,
      `💻 *Servicio requerido:* ${cleanServicio}`,
      "",
      "📝 *Descripción del equipo o falla:*",
      cleanMensaje,
      "",
      "📍 *Origen:* Enviado desde el sitio web"
    ].join("\n");

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    // Intentar abrir WhatsApp en una nueva pestaña/app de forma limpia
    let popup = null;
    try {
      popup = window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      popup = null;
    }

    if (popup && !popup.closed) {
      popup.focus();
      showMessage(
        "success",
        `<strong>¡Listo!</strong> Se abrió WhatsApp con tu mensaje preparado para enviar.<br>` +
        `<span class="small">Si tu navegador no abrió la ventana automáticamente, <a href="${url}" target="_blank" rel="noopener noreferrer" class="alert-link text-decoration-underline fw-bold">haz clic aquí para abrir WhatsApp</a>.</span>`
      );
    } else {
      showMessage(
        "info",
        `<strong>Abriendo WhatsApp...</strong> Si no redirige automáticamente, <a href="${url}" class="alert-link text-decoration-underline fw-bold">haz clic aquí para abrir el chat</a>.`
      );
      window.location.href = url;
    }

    form.reset();
    form.querySelectorAll(".is-valid, .is-invalid").forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });
  });
});
