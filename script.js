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
                const posicion = destino.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: posicion,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();
    const terminos = document.getElementById("terminos").checked;

    // Validación básica
    if (!nombre || !email || !telefono || !servicio || !mensaje || !terminos) {
        alert("Por favor completa todos los campos y acepta los términos.");
        return;
    }

    // Número de WhatsApp (tu número)
    const numero = "526625085372";

    // Crear mensaje
    const texto = `Hola, quiero solicitar un servicio:%0A
Nombre: ${nombre}%0A
Correo: ${email}%0A
Teléfono: ${telefono}%0A
Servicio: ${servicio}%0A
Mensaje: ${mensaje}`;

    // Crear enlace
    const url = `https://wa.me/${numero}?text=${texto}`;

    // Abrir WhatsApp
    window.open(url, "_blank");

    // Mostrar mensaje de éxito después de abrir WhatsApp
    document.getElementById("formMessage").style.display = "block";
    document.getElementById("formMessage").className = "alert alert-success";
    document.getElementById("formMessage").innerText = "Formulario enviado correctamente a WhatsApp";
});