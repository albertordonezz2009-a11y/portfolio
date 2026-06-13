/**
 * B2B Portfolio Logic
 * Handles dynamic content generation, scroll effects, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Animaciones al hacer Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // El elemento se animará cuando el 15% sea visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Header dinámico (Cambia de estilo al hacer scroll)
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
                    this.reset();
                    // Volver al inicio del portfolio
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert('Hubo un problema al enviar el mensaje. Recuerda que para que funcione debes abrir la página a través de un servidor local (ej: Live Server en VSCode) o tenerla subida a internet.');
                }
            })
            .catch(error => {
                alert('Error de red. Recuerda que el envío no funciona si abres el archivo localmente con doble clic (file:///). Usa un servidor local.');
            });
        });
    }
});
