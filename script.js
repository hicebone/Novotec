document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const revealItems = document.querySelectorAll(".reveal");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const servicesCarousel = document.getElementById("serviciosCarousel");
  const carouselButtons = document.querySelectorAll("[data-carousel-action]");

  const closeNav = () => {
    if (!navCollapse || !navCollapse.classList.contains("show")) return;
    const instance = window.bootstrap?.Collapse?.getOrCreateInstance(navCollapse);
    instance?.hide();
  };

  const carousel = servicesCarousel ? window.bootstrap?.Carousel?.getOrCreateInstance(servicesCarousel) : null;
  let carouselPaused = false;

  const updateCarouselToggle = () => {
    const toggleButton = document.querySelector('[data-carousel-action="toggle"]');
    if (!toggleButton) return;

    const label = toggleButton.querySelector(".services-carousel-toggle-label");
    const icon = toggleButton.querySelector("i");

    toggleButton.setAttribute("aria-pressed", String(carouselPaused));

    if (label) label.textContent = carouselPaused ? "Reanudar" : "Pausar";
    if (icon) {
      icon.classList.toggle("fa-pause", !carouselPaused);
      icon.classList.toggle("fa-play", carouselPaused);
    }
  };

  carouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-carousel-action");
      if (!carousel || !action) return;

      if (action === "prev") {
        carousel.prev();
        return;
      }

      if (action === "next") {
        carousel.next();
        return;
      }

      if (action === "toggle") {
        carouselPaused = !carouselPaused;
        if (carouselPaused) {
          carousel.pause();
        } else {
          carousel.cycle();
        }
        updateCarouselToggle();
      }
    });
  });

  updateCarouselToggle();

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

  window.addEventListener("scroll", setActiveLink, { passive: true });
  window.addEventListener("resize", setActiveLink);
  setActiveLink();

  const setFieldState = (field, isValid) => {
    if (!field) return;
    field.classList.toggle("is-valid", isValid);
    field.classList.toggle("is-invalid", !isValid);
  };

  const showMessage = (type, text) => {
    if (!formMessage) return;
    formMessage.className = `alert alert-${type}`;
    formMessage.textContent = text;
    formMessage.classList.remove("d-none");
  };

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

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    const phoneOk = /^[0-9+\-\s()]{7,}$/.test(values.telefono);
    const valid =
      values.nombre.length >= 2 &&
      emailOk &&
      phoneOk &&
      values.servicio &&
      values.mensaje.length >= 10 &&
      values.terminos;

    setFieldState(nombre, values.nombre.length >= 2);
    setFieldState(email, emailOk);
    setFieldState(telefono, phoneOk);
    setFieldState(servicio, Boolean(values.servicio));
    setFieldState(mensaje, values.mensaje.length >= 10);
    setFieldState(terminos, values.terminos);

    if (!valid) {
      showMessage("danger", "Revisa los campos marcados antes de continuar.");
      return;
    }

    const numero = "526625085372";
    const texto = [
      "Hola, quiero solicitar un servicio tecnico.",
      `Nombre: ${values.nombre}`,
      `Correo: ${values.email}`,
      `Telefono: ${values.telefono}`,
      `Servicio: ${values.servicio}`,
      `Mensaje: ${values.mensaje}`
    ].join("\n");

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    const popup = window.open(url, "_blank", "noopener,noreferrer");

    if (!popup) {
      window.location.assign(url);
      showMessage("success", "Si tu navegador bloqueó la ventana nueva, te llevamos a WhatsApp en esta misma pestaña.");
      return;
    }

    showMessage("success", "Abrimos WhatsApp con tu mensaje listo para enviar.");
    form.reset();
    form.querySelectorAll(".is-valid, .is-invalid").forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });
  });
});
