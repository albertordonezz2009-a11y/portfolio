document.addEventListener("DOMContentLoaded", () => {
    
    // Configuración del Intersection Observer para la animación Fade-In
    const observerOptions = {
        root: null, // usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // El elemento se animará cuando el 15% sea visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadimos la clase visible para activar CSS transition
                entry.target.classList.add('visible');
                
                // Dejamos de observar el elemento una vez que ha aparecido
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos con la clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Efecto sutil en la barra de navegación al hacer scroll (opcional para dar feeling premium)
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });
});
