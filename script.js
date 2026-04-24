document.addEventListener('DOMContentLoaded', () => {
    inicializarLinks();
    configurarFormulario();
});

function inicializarLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') return;

            const destino = document.querySelector(href);

            if (destino) {
                e.preventDefault();

                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }

                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight : 80;

                const posicion = destino.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: posicion,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function configurarFormulario() {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        const terminos = document.getElementById("terminos")?.checked;

        // Validación extra manual
        if (!nombre || !email || !telefono || !servicio || !mensaje || !terminos) {
            contactForm.classList.add('was-validated');

            if (formMessage) {
                formMessage.style.display = "block";
                formMessage.className = "alert alert-danger";
                formMessage.innerText = "Por favor completa todos los campos y acepta los términos.";
            }
            return;
        }

        // Número de WhatsApp
        const numero = "526625085372";

        // Mensaje optimizado (más profesional)
        let mensajeWA = `Hola, me interesa contratar un servicio de Novotec:%0A%0A`;
        mensajeWA += `👤 Nombre: ${nombre}%0A`;
        mensajeWA += `📧 Correo: ${email}%0A`;
        mensajeWA += `📱 Teléfono: ${telefono}%0A`;
        mensajeWA += `🛠 Servicio: ${servicio}%0A`;
        mensajeWA += `📝 Detalles: ${mensaje}`;

        const url = `https://wa.me/${numero}?text=${mensajeWA}`;

        window.open(url, "_blank");

        // Mensaje éxito
        if (formMessage) {
            formMessage.style.display = "block";
            formMessage.className = "alert alert-success";
            formMessage.innerText = "Redirigiendo a WhatsApp...";
        }

        // Limpiar formulario
        contactForm.reset();
        contactForm.classList.remove('was-validated');
    });
}