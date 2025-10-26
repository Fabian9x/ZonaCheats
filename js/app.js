// Configuración de partículas
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 600
            }
        },
        "color": {
            "value": "#DC143C"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.8,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.2,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 20,
                "size_min": 0.5,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#DC143C",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Smooth scrolling para los enlaces de navegación
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Efecto parallax suave para el contenido
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-content');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Efecto de hover mejorado para los botones
    const buttons = document.querySelectorAll('.cta-button, .contact-form button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Validación del formulario
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                    input.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    input.style.boxShadow = 'none';
                }
            });
            
            if (isValid) {
                // Simular envío del formulario
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    alert('¡Mensaje enviado correctamente!');
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
});

// Función para cambiar el tema de las partículas dinámicamente
function changeParticleTheme(theme) {
    const themes = {
        'red': {
            color: '#DC143C',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 50%, #8B0000 100%)'
        },
        'white': {
            color: '#ffffff',
            background: 'linear-gradient(135deg, #2d1b1b 0%, #4a2c2c 50%, #8B0000 100%)'
        },
        'black': {
            color: '#000000',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d1b1b 100%)'
        },
        'classic': {
            color: '#DC143C',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 50%, #8B0000 100%)'
        }
    };
    
    if (themes[theme]) {
        const particlesContainer = document.getElementById('particles-js');
        particlesContainer.style.background = themes[theme].background;
        
        // Actualizar configuración de partículas
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.color.value = themes[theme].color;
            window.pJSDom[0].pJS.particles.line_linked.color = themes[theme].color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
}

// Agregar controles de tema (opcional)
function addThemeControls() {
    const themeControls = document.createElement('div');
    themeControls.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
            <button onclick="changeParticleTheme('red')" style="background: #DC143C; color: white; border: 2px solid white; padding: 10px; margin: 5px; border-radius: 5px; cursor: pointer;">Rojo</button>
            <button onclick="changeParticleTheme('white')" style="background: #ffffff; color: #DC143C; border: 2px solid #DC143C; padding: 10px; margin: 5px; border-radius: 5px; cursor: pointer;">Blanco</button>
            <button onclick="changeParticleTheme('black')" style="background: #000000; color: white; border: 2px solid white; padding: 10px; margin: 5px; border-radius: 5px; cursor: pointer;">Negro</button>
            <button onclick="changeParticleTheme('classic')" style="background: linear-gradient(45deg, #DC143C, #8B0000); color: white; border: 2px solid white; padding: 10px; margin: 5px; border-radius: 5px; cursor: pointer;">Clásico</button>
        </div>
    `;
    document.body.appendChild(themeControls);
}

// Descomenta la siguiente línea si quieres agregar controles de tema
// addThemeControls();

// Discord Botón con Contador
document.addEventListener('DOMContentLoaded', function() {
    const discordBtn = document.getElementById('discordBtn');
    const onlineCount = document.getElementById('onlineCount');
    
    // Función para obtener miembros en línea (simulada)
    // En producción, esto se conectaría a la Discord API
    function updateDiscordCount() {
        // Simulación de datos - reemplaza con tu lógica real
        const mockOnlineCount = Math.floor(Math.random() * 50) + 20; // 20-70 miembros
        onlineCount.textContent = mockOnlineCount;
        
        // Actualizar cada 30 segundos
        setTimeout(updateDiscordCount, 30000);
    }
    
    // Función para redirigir a Discord
    function redirectToDiscord() {
        // Reemplaza con tu enlace de Discord real
        const discordInvite = 'https://discord.gg/zycPUDpD';
        window.open(discordInvite, '_blank');
    }
    
    // Event listener para el botón
    if (discordBtn) {
        discordBtn.addEventListener('click', redirectToDiscord);
    }
    
    // Inicializar contador
    updateDiscordCount();
    
    // Función real para conectar con Discord API (requiere bot token)
    /*
    async function getRealDiscordCount() {
        try {
            const response = await fetch('https://discord.com/api/guilds/TU_SERVER_ID', {
                headers: {
                    'Authorization': 'Bot TU_BOT_TOKEN'
                }
            });
            const data = await response.json();
            onlineCount.textContent = data.approximate_member_count || '--';
        } catch (error) {
            console.error('Error obteniendo datos de Discord:', error);
            onlineCount.textContent = '--';
        }
    }
    */

    // Video functionality
    const wallVideo = document.getElementById('wallVideo');
    
    if (wallVideo) {
        // Intersection Observer para detectar cuando el video es visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video es visible, reproducir
                    wallVideo.play();
                    wallVideo.classList.add('playing');
                } else {
                    // Video no es visible, pausar
                    wallVideo.pause();
                    wallVideo.classList.remove('playing');
                }
            });
        }, {
            threshold: 0.5 // Se activa cuando el 50% del video es visible
        });
        
        videoObserver.observe(wallVideo);
        
        // Asegurar que el video esté en loop y muteado
        wallVideo.loop = true;
        wallVideo.muted = true;
    }

    // Carrusel functionality
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');
    
    if (carouselTrack && prevBtn && nextBtn && carouselDots) {
        let currentIndex = 0;
        const cards = carouselTrack.querySelectorAll('.product-item');
        const totalCards = cards.length;
        const cardsPerView = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        // Ahora los slides son el total de cards menos las que se muestran a la vez + 1
        const totalSlides = totalCards - cardsPerView + 1;
        
        // Crear indicadores de puntos
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }
        
        function updateCarousel() {
            // Calcular el desplazamiento: mover una tarjeta a la vez
            // Cada tarjeta ocupa (100 / cardsPerView)% del ancho visible
            const cardWidth = 100 / cardsPerView;
            const translateX = -currentIndex * cardWidth;
            carouselTrack.style.transform = `translateX(${translateX}%)`;
            
            // Actualizar puntos activos
            const dots = carouselDots.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Debug: mostrar información en consola
            console.log(`Slide actual: ${currentIndex + 1}/${totalSlides}, Cards por vista: ${cardsPerView}, Total cards: ${totalCards}, TranslateX: ${translateX}%`);
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Inicializar carrusel
        updateCarousel();
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play del carrusel
        let autoPlayInterval = setInterval(nextSlide, 5000);
        
        // Pausar auto-play al hacer hover
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
        
        // Responsive handling
        window.addEventListener('resize', () => {
            const newCardsPerView = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
            if (newCardsPerView !== cardsPerView) {
                location.reload(); // Recargar para recalcular
            }
        });
    }

    // Botón flotante de redes sociales
    const socialToggle = document.getElementById('socialToggle');
    const socialButtons = document.getElementById('socialButtons');
    
    if (socialToggle && socialButtons) {
        let isOpen = false;
        
        socialToggle.addEventListener('click', () => {
            isOpen = !isOpen;
            
            if (isOpen) {
                socialButtons.classList.add('active');
                socialToggle.classList.add('active');
            } else {
                socialButtons.classList.remove('active');
                socialToggle.classList.remove('active');
            }
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (isOpen && !socialToggle.contains(e.target) && !socialButtons.contains(e.target)) {
                isOpen = false;
                socialButtons.classList.remove('active');
                socialToggle.classList.remove('active');
            }
        });
    }

    // Animación de contadores en la sección de estadísticas
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        const statNumbers = statsSection.querySelectorAll('.stat-number');
        let hasAnimated = false;
        
        // Función para animar un número
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Formatear el número
                let displayValue;
                if (element.textContent.includes('%')) {
                    displayValue = Math.floor(current) + '%';
                } else if (element.textContent.includes('+')) {
                    displayValue = '+' + Math.floor(current).toLocaleString('en-US');
                } else {
                    displayValue = Math.floor(current).toLocaleString('en-US');
                }
                
                element.textContent = displayValue;
            }, 16);
        }
        
        // Observer para detectar cuando la sección es visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    
                    // Animar cada número
                    statNumbers.forEach(element => {
                        const text = element.textContent;
                        let targetNumber;
                        
                        // Extraer el número del texto
                        if (text.includes('%')) {
                            targetNumber = parseInt(text.replace('%', ''));
                        } else {
                            targetNumber = parseInt(text.replace(/[+,]/g, ''));
                        }
                        
                        // Iniciar la animación
                        animateCounter(element, targetNumber, 2000);
                    });
                }
            });
        }, {
            threshold: 0.3 // Se activa cuando el 30% de la sección es visible
        });
        
        statsObserver.observe(statsSection);
    }

    // Menú Hamburguesa
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
    
    // Funcionalidad de botones desplegables del footer (solo móvil)
    const dropdownButtons = document.querySelectorAll('.footer-dropdown-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const dropdown = document.getElementById(targetId);
            
            // Toggle active class en el botón
            this.classList.toggle('active');
            
            // Toggle active class en el dropdown
            dropdown.classList.toggle('active');
        });
    });
});
