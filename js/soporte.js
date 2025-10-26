// ===== SOPORTE PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== FAQ FUNCTIONALITY =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            item.classList.toggle('active');
        });
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactoForm = document.getElementById('contactoForm');
    
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactoForm);
            const data = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                asunto: formData.get('asunto'),
                mensaje: formData.get('mensaje')
            };
            
            // Validar datos
            if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Simular envío (aquí podrías integrar con un servicio real)
            showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            contactoForm.reset();
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.contacto-card, .faq-item, .contacto-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== INICIALIZAR MENÚ HAMBURGUESA =====
    initializeHamburgerMenu();
    
    // ===== INICIALIZAR BOTÓN FLOTANTE =====
    initializeFloatingSocial();
});

// Función para inicializar el menú hamburguesa
function initializeHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (hamburgerBtn && mobileMenu) {
        // Toggle menú al hacer click en el botón
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevenir scroll cuando el menú está abierto
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Función para inicializar el botón flotante de redes sociales
function initializeFloatingSocial() {
    const socialToggle = document.getElementById('socialToggle');
    const socialButtons = document.getElementById('socialButtons');
    
    if (socialToggle && socialButtons) {
        // Toggle del botón flotante
        socialToggle.addEventListener('click', () => {
            socialButtons.classList.toggle('active');
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (socialButtons.classList.contains('active') && 
                !socialButtons.contains(e.target) && 
                !socialToggle.contains(e.target)) {
                socialButtons.classList.remove('active');
            }
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ===== VALIDACIÓN DE EMAIL =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== FORM VALIDATION ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#f44336';
                showNotification('Por favor ingresa un email válido', 'error');
            } else {
                this.style.borderColor = 'rgba(220, 20, 60, 0.3)';
            }
        });
    }
    
    if (nombreInput) {
        nombreInput.addEventListener('input', function() {
            if (this.value.length < 2) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = 'rgba(220, 20, 60, 0.3)';
            }
        });
    }
});

// ===== COPY TO CLIPBOARD FUNCTIONALITY =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('Error al copiar', 'error');
    });
}

// ===== DISCORD BUTTON FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const discordButtons = document.querySelectorAll('a[href*="discord"]');
    
    discordButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Opcional: agregar analytics o tracking aquí
            console.log('Usuario hizo clic en Discord');
        });
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // ESC para cerrar FAQ abiertos
    if (e.key === 'Escape') {
        const activeFaq = document.querySelector('.faq-item.active');
        if (activeFaq) {
            activeFaq.classList.remove('active');
        }
    }
    
    // Enter en FAQ questions
    if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
        e.target.click();
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy loading para imágenes (si se agregan en el futuro)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
