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

                const posicion = destino.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: posicion,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Esperar a que cargue el DOM (IMPORTANTE)
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const mensajeBox = document.getElementById("formMessage");

    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        const terminos = document.getElementById("terminos").checked;

        if (!nombre || !email || !telefono || !servicio || !mensaje || !terminos) {
            alert("Por favor completa todos los campos y acepta los términos.");
            return;
        }

        const numero = "526625085372";

        const texto = `Hola, quiero solicitar un servicio:%0A
Nombre: ${nombre}%0A
Correo: ${email}%0A
Teléfono: ${telefono}%0A
Servicio: ${servicio}%0A
Mensaje: ${mensaje}`;

        const url = `https://wa.me/${numero}?text=${texto}`;

        window.open(url, "_blank");

        // Mostrar mensaje SOLO cuando se envía
        if (mensajeBox) {
            mensajeBox.style.display = "block";
            mensajeBox.className = "alert alert-success";
            mensajeBox.innerText = "Formulario enviado correctamente a WhatsApp";
        }

        form.reset();
    });

    inicializarLinks();
});