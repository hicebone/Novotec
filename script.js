document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const revealItems = document.querySelectorAll(".reveal");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const servicesSection = document.getElementById("servicios");
  let activeLinkFrame = 0;

  const loadDeferredImages = (root) => {
    if (!root) return;

    root.querySelectorAll("img[data-src]").forEach((img) => {
      const realSrc = img.getAttribute("data-src");
      if (!realSrc) return;

      img.src = realSrc;
      img.removeAttribute("data-src");
    });
  };

  if (servicesSection) {
    const loadWhenVisible = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        loadDeferredImages(servicesSection);
        observer.unobserve(entry.target);
      });
    };

    if ("IntersectionObserver" in window) {
      const servicesObserver = new IntersectionObserver(loadWhenVisible, {
        root: null,
        rootMargin: "220px 0px",
        threshold: 0.08
      });

      servicesObserver.observe(servicesSection);
    } else {
      loadDeferredImages(servicesSection);
    }
  }

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));

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

    const values = {
      nombre: nombre?.value.trim() ?? "",
      email: email?.value.trim() ?? "",
      telefono: telefono?.value.trim() ?? "",
      servicio: servicio?.value ?? "",
      mensaje: mensaje?.value.trim() ?? "",
      terminos: Boolean(terminos?.checked)
    };

    const nombreOk = values.nombre.length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    const phoneOk = /^[0-9+\-\s()]{7,}$/.test(values.telefono);
    const servicioOk = Boolean(values.servicio);
    const mensajeOk = values.mensaje.length >= 3;
    const terminosOk = values.terminos;

    setFieldState(nombre, nombreOk);
    setFieldState(email, emailOk);
    setFieldState(telefono, phoneOk);
    setFieldState(servicio, servicioOk);
    setFieldState(mensaje, mensajeOk);
    setFieldState(terminos, terminosOk);

    const valid = nombreOk && emailOk && phoneOk && servicioOk && mensajeOk && terminosOk;

    if (!valid) {
      showMessage("danger", "Por favor revisa los campos señalados en rojo antes de enviar.");
      // Mover foco al primer campo inválido
      const primerInvalido = form.querySelector(".is-invalid");
      if (primerInvalido) {
        primerInvalido.focus();
      }
      return;
    }

    const numero = "526625085372";
    const texto = [
      "🔧 *Solicitud de servicio - Novotec*",
      "",
      `👤 *Nombre:* ${values.nombre}`,
      `📱 *Teléfono:* ${values.telefono}`,
      `📧 *Correo:* ${values.email}`,
      `💻 *Servicio requerido:* ${values.servicio}`,
      "",
      `📝 *Mensaje:*`,
      values.mensaje
    ].join("\n");

    const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(texto)}`;

    // Intentar abrir en pestaña nueva
    let popup = null;
    try {
      popup = window.open(url, "_blank");
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
      // Si el navegador bloqueó la ventana emergente, dar enlace directo y redirigir
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
