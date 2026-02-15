// Fichero: script.js

document.addEventListener('DOMContentLoaded', function () {

    // --- Lógica para el carrusel de testimonios ---
    const testimonials = [
        {
            name: 'María Rodríguez',
            comment: '¡El mejor trato que mis mascotas han recibido! El personal es muy amable y profesional. 💖',
            rating: 5,
            icon: 'fas fa-star',
            img: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
            name: 'Juan Pérez',
            comment: 'Llevé a mi perro para una cirugía y todo salió perfecto. Se recuperó muy rápido. ¡Gracias! 👨‍⚕️',
            rating: 5,
            icon: 'fas fa-star',
            img: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        {
            name: 'Ana García',
            comment: 'La peluquería dejó a mi gatita como una reina. 👑 El servicio es impecable y cuidadoso.',
            rating: 5,
            icon: 'fas fa-star',
            img: 'https://randomuser.me/api/portraits/women/3.jpg'
        },
        {
            name: 'Carlos Martínez',
            comment: 'Excelente atención en la consulta general. Resolvieron todas mis dudas. 👍',
            rating: 4,
            icon: 'fas fa-thumbs-up',
            img: 'https://randomuser.me/api/portraits/men/4.jpg'
        },
        {
            name: 'Laura Fernández',
            comment: 'Un equipo increíblemente dedicado. Se nota que aman a los animales. 🐾❤️',
            rating: 5,
            icon: 'fas fa-heart',
            img: 'https://randomuser.me/api/portraits/women/5.jpg'
        },
        {
            name: 'Pedro Sánchez',
            comment: 'Siempre disponibles para emergencias, lo cual me da mucha tranquilidad. 🚑',
            rating: 5,
            icon: 'fas fa-star',
            img: 'https://randomuser.me/api/portraits/men/6.jpg'
        },
        {
            name: 'Sofía López',
            comment: 'El mejor lugar para el cuidado de mi conejo. Lo tratan con una delicadeza especial. 🐰',
            rating: 5,
            icon: 'fas fa-star',
            img: 'https://randomuser.me/api/portraits/women/7.jpg'
        },
        {
            name: 'David Gómez',
            comment: 'Mi perro solía tener miedo del veterinario, pero aquí se siente como en casa. 😊',
            rating: 5,
            icon: 'fas fa-smile',
            img: 'https://randomuser.me/api/portraits/men/8.jpg'
        },
        {
            name: 'Isabel Díaz',
            comment: 'Precios justos y un servicio de primera. No podría pedir más. ¡Totalmente recomendado! ✅',
            rating: 5,
            icon: 'fas fa-check-circle',
            img: 'https://randomuser.me/api/portraits/women/9.jpg'
        },
        {
            name: 'Miguel Torres',
            comment: 'El seguimiento post-operatorio fue excelente. Llamaron para saber cómo estaba mi perrita. 📞',
            rating: 5,
            icon: 'fas fa-star',
            img: 'https://randomuser.me/api/portraits/men/10.jpg'
        }
    ];

    const carouselInner = document.querySelector('#testimonialCarousel .carousel-inner');
    const itemsPerView = 4;
    let activeSlide = true;

    for (let i = 0; i < testimonials.length; i += itemsPerView) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (activeSlide) {
            carouselItem.classList.add('active');
            activeSlide = false;
        }

        const row = document.createElement('div');
        row.classList.add('row');

        const chunk = testimonials.slice(i, i + itemsPerView);
        
        chunk.forEach(testimonial => {
            const col = document.createElement('div');
            // Ajustar las clases de columna para la responsividad
            col.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'mb-4');

            let ratingHTML = '';
            for (let j = 0; j < testimonial.rating; j++) {
                ratingHTML += `<i class="${testimonial.icon}"></i>`;
            }

            col.innerHTML = `
                <div class="testimonial-card h-100">
                    <i class="fas fa-quote-left"></i>
                    <img src="${testimonial.img}" alt="Cliente ${testimonial.name}" class="testimonial-img">
                    <p class="mb-3">"${testimonial.comment}"</p>
                    <div class="rating mb-2">${ratingHTML}</div>
                    <p class="client-name">${testimonial.name}</p>
                </div>
            `;
            row.appendChild(col);
        });

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);
    }

    // --- Validación del Formulario de Contacto ---
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('email-feedback');
    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío por defecto
        event.stopPropagation();

        let isValid = true;
        
        // Validación de Bootstrap
        if (!form.checkValidity()) {
            isValid = false;
        }
        
        // Validación específica de email
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            emailFeedback.textContent = 'Por favor, ingresa un formato de correo válido (ej: tu@email.com).';
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }

        form.classList.add('was-validated');

        if (isValid) {
            // Simulación de envío y apertura de cliente de correo
            const nombre = document.getElementById('nombre').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Crea el enlace mailto
            const mailtoLink = `mailto:info@vetamigos.com?subject=Contacto desde la web de ${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje)}`;

            // Muestra la ventana modal
            modal.show();

            // Intenta abrir el cliente de correo.
            // Se usa un pequeño retraso para que el usuario vea la modal antes de que el navegador intente cambiar de foco.
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);

            // Limpia el formulario después de un tiempo
            setTimeout(() => {
                form.reset();
                form.classList.remove('was-validated');
            }, 2000);
        }
    });

    // Función para validar el formato del email usando una expresión regular
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    // --- Scroll suave para los enlaces de navegación ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Solo previene el comportamiento por defecto si es un ancla en la página
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
