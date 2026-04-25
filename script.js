function inicializarLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') return;

            const destino = document.querySelector(href);

            if (destino) {
                e.preventDefault();

                // Cerrar navbar en móvil
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }

                // Ajuste navbar
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

// ===============================
// FORMULARIO WHATSAPP (CORREGIDO)
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const btn = document.getElementById("btnEnviar");
        const msg = document.getElementById("formMsg");

        btn.innerText = "Enviando...";
        btn.disabled = true;

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("mensaje").value;

        const texto = 
`Hola, quiero solicitar un servicio:
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono}
Servicio: ${servicio}
Mensaje: ${mensaje}`;

        const numero = "526625085372";

        const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);

        setTimeout(() => {
            window.location.href = url;

            msg.innerText = "✔ Abriendo WhatsApp...";
            msg.style.color = "green";

            btn.innerText = "Enviar por WhatsApp";
            btn.disabled = false;

            form.reset();
        }, 800);
    });

});