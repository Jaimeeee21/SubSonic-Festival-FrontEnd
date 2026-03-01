// ========== Menú Hamburguesa ========== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú cuando se hace click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== Carrusel de Eventos =========
let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const eventCards = document.querySelectorAll('.event-card');
const carouselDots = document.getElementById('carouselDots');

// Crear indicadores de puntos
if (eventCards.length > 0) {
    eventCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
}

function moveCarousel(direction) {
    currentSlide += direction;
    
    if (currentSlide >= eventCards.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = eventCards.length - 1;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const offsetPercentage = currentSlide * 100;
    carouselTrack.style.transform = `translateX(-${offsetPercentage}%)`;
    
    // Actualizar puntos
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto-avanzar el carrusel cada 5 segundos
setInterval(() => {
    moveCarousel(1);
}, 5000);

// ========== Scroll suave y función para scroll =========
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== Navbar transparente en scroll =========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// ========== Botón Flotante de Contacto =========
// El botón ahora es un link que lleva a faq.html

// ========== Validación del Formulario de Contacto =========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });

        if (isValid) {
            // Simular envío
            showNotification('¡Mensaje enviado correctamente!', 'success');
            contactForm.reset();
            
            // Limpiar estilos
            inputs.forEach(input => {
                input.style.borderColor = '#e5e7eb';
            });
        } else {
            showNotification('Por favor completa todos los campos', 'error');
        }
    });
}

// ========== Notificación =========
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981; color: white;' : 'background: #ef4444; color: white;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== Animación de Entrada a Artistas =========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.artist-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ========== Animación de Tarjetas de Información =========
document.querySelectorAll('.info-card').forEach((card, index) => {
    card.style.opacity = '0';
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    cardObserver.observe(card);
});

// ========== Contador de Artistas =========
function countArtists() {
    const artistCards = document.querySelectorAll('.artist-card');
    console.log(`Total de artistas: ${artistCards.length}`);
    return artistCards.length;
}

// Llamar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 SUBSONIC Festival - Página Cargada');
    countArtists();
    
    // Agregar estilos de animación si no existen
    if (!document.querySelector('style[data-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-animation', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ========== Botones de Entradas =========
document.querySelectorAll('.ticket-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const ticketType = e.target.closest('.ticket-card').querySelector('h3').textContent;
        const price = e.target.closest('.ticket-card').querySelector('.price').textContent;
        showNotification(`Seleccionaste: ${ticketType} - ${price}`, 'success');
        console.log(`Entrada seleccionada: ${ticketType}`);
    });
});

// ========== Efectos de Hover en Cards =========
document.querySelectorAll('.artist-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ========== Scroll Activo en Navegación =========
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== Número de Entradas Vendidas (Simulado) =========
let ticketsSold = Math.floor(Math.random() * 500) + 100;

function updateTicketsSold() {
    ticketsSold += Math.floor(Math.random() * 5) + 1;
    
    // Simular actualización asincrónica
    setInterval(() => {
        ticketsSold += Math.floor(Math.random() * 3) + 1;
        console.log(`Entradas vendidas: ${ticketsSold}`);
    }, 30000); // Actualizar cada 30 segundos
}

// Llamar función
updateTicketsSold();

// ========== Utilidad: Copiar email al portapapeles =========
function copyToClipboard(email) {
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copiado al portapapeles', 'success');
    });
}

// ========== Event Delegation para Formularios =========
document.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.target.value.trim()) {
            e.target.style.borderColor = '#e5e7eb';
        }
    }
});

// ========== Número de Visitantes en Vivo (Simulado) =========
function updateVisitors() {
    const baseVisitors = 1250;
    const currentVisitors = baseVisitors + Math.floor(Math.random() * 500);
    return currentVisitors;
}

// Log de visitantes actuales
console.log(`👥 Visitantes en vivo: ${updateVisitors()}`);

// ========== Funciones Auxiliares =========
function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Mostrar fecha/hora actual en consola
console.log(`Fecha actual: ${formatDate(new Date())}`);

// ========== API Mock para Información del Festival =========
const festivalInfo = {
    nombre: 'SUBSONIC Festival 2026',
    fecha: {
        inicio: '2026-08-15',
        fin: '2026-08-17'
    },
    ubicacion: 'Parque Central',
    totalArtistas: 6,
    capacidadMáxima: 50000,
    presupuesto: 'Premium'
};

console.log('Festival Info:', festivalInfo);

// ========== Chat simplificado (Placeholder) =========
function initializeChat() {
    console.log('💬 Chat de soporte inicializado');
    return {
        isAvailable: true,
        responseTime: '< 2 minutos',
        language: 'es'
    };
}

// Inicializar chat
const chatService = initializeChat();

// ========== Toggle entre Login y Registro =========
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm && registerForm) {
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
    }
}

// ========== Manejo de errores global =========
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesa rechazada no capturada:', e.reason);
});

// ========== Accordion de FAQ =========
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Cerrar otros items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle el item actual
                item.classList.toggle('active');
            });
        }
    });
});

console.log('✨ SUBSONIC Festival - Todos los scripts cargados correctamente');
