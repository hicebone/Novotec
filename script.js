document.addEventListener('DOMContentLoaded', () => {
    inicializarLinks();
    inicializarFormulario();
    inicializarScrollSpy();
});

function inicializarLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') return;

            const destino = document.querySelector(href);
            if (!destino) return;

            e.preventDefault();

            // 🔽 Cerrar navbar en móvil (más seguro)
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
                    || new bootstrap.Collapse(navbarCollapse, { toggle: false });

                bsCollapse.hide();
            }

            // 🔥 Altura del navbar
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 80;

            // 🔥 Scroll corregido
            const posicion = destino.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: posicion,
                behavior: 'smooth'
            });
        });
    });
}

function inicializarScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function inicializarFormulario() {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const btnSubmit = this.querySelector('button[type="submit"]');
        const originalBtnText = btnSubmit.innerHTML;

        const datos = {
            nombre: document.getElementById("nombre")?.value.trim(),
            email: document.getElementById("email")?.value.trim(),
            telefono: document.getElementById("telefono")?.value.trim(),
            servicio: document.getElementById("servicio")?.value,
            mensaje: document.getElementById("mensaje")?.value.trim(),
            terminos: document.getElementById("terminos")?.checked
        };

        // Validación más segura
        if (Object.values(datos).some(val => !val)) {
            alert("Por favor completa todos los campos y acepta los términos.");
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Enviando...
        `;

        const numero = "526625085372";

        const texto = `Hola, quiero solicitar un servicio:\n\n` +
            `Nombre: ${datos.nombre}\n` +
            `Correo: ${datos.email}\n` +
            `Teléfono: ${datos.telefono}\n` +
            `Servicio: ${datos.servicio}\n` +
            `Mensaje: ${datos.mensaje}`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        setTimeout(() => {
            window.open(url, "_blank");

            if (formMessage) {
                formMessage.style.display = "block";
                formMessage.className = "alert alert-success mt-3";
                formMessage.innerText = "¡Listo! Se abrió WhatsApp para completar tu solicitud.";
            }

            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalBtnText;
        }, 800);
    });
}