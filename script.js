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

                // 🔽 Cerrar navbar en móvil
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }

                // 🔥 ALTURA DEL NAVBAR (IMPORTANTE)
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight : 80;

                // 🔥 POSICIÓN REAL (corrige el problema)
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

        // Obtener valores
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        const terminos = document.getElementById("terminos").checked;

        if (!contactForm.checkValidity()) {
            console.log("Formulario inválido");
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            if (formMessage) {
                formMessage.style.display = "block";
                formMessage.className = "alert alert-danger";
                formMessage.innerText = "Por favor completa todos los campos y acepta los términos.";
            }
            return;
        }

        // Número de WhatsApp (tu número)
        const numero = "526625085372";
        
        const texto = encodeURIComponent(`Hola, quiero solicitar un servicio:
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono}
Servicio: ${servicio}
Mensaje: ${mensaje}`);
        // Construcción limpia del mensaje para evitar espacios de indentación
        let mensajeWA = "Hola, quiero solicitar un servicio:\n";
        mensajeWA += "Nombre: " + nombre + "\n";
        mensajeWA += "Correo: " + email + "\n";
        mensajeWA += "Teléfono: " + telefono + "\n";
        mensajeWA += "Servicio: " + servicio + "\n";
        mensajeWA += "Mensaje: " + mensaje;

        const texto = encodeURIComponent(mensajeWA);

        // Crear enlace
        const url = `https://wa.me/${numero}?text=${texto}`;

        // Abrir WhatsApp
        window.open(url, "_blank");

        if (formMessage) {
            formMessage.style.display = "block";
            formMessage.className = "alert alert-success";
            formMessage.innerText = "Formulario enviado correctamente a WhatsApp";
        }
    });
}