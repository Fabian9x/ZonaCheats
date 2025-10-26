// ========================================
//     PRODUCTOS PAGE MANAGER
//     ========================================

class ProductsPageManager {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "Panel Supreme",
                image: "WINI_HAXTV_1_11_SP.png",
                price: "Desde S/.60",
                category: "premium",
                description: "Panel completo con todas las funciones premium",
                isNew: true,
                pricingOptions: [
                    {
                        duration: "30 Días",
                        priceSoles: "S/.60",
                        priceUSD: "$17 USD",
                        value: "30d"
                    },
                    {
                        duration: "60 Días", 
                        priceSoles: "S/.120",
                        priceUSD: "$32 USD",
                        value: "60d"
                    },
                    {
                        duration: "365 Días",
                        priceSoles: "S/.200", 
                        priceUSD: "$53 USD",
                        value: "365d"
                    }
                ]
            },
            {
                id: 2,
                name: "Panel Basic",
                image: "WINI_HAXTV_1_11_SP1.png",
                price: "Desde S/.50",
                category: "premium",
                description: "Panel básico con funciones esenciales",
                isNew: false,
                pricingOptions: [
                    {
                        duration: "30 Días",
                        priceSoles: "S/.50",
                        priceUSD: "$15 USD",
                        value: "30d"
                    },
                    {
                        duration: "60 Días", 
                        priceSoles: "S/.100",
                        priceUSD: "$27 USD",
                        value: "60d"
                    },
                    {
                        duration: "365 Días",
                        priceSoles: "S/.160", 
                        priceUSD: "$44 USD",
                        value: "365d"
                    }
                ]
            },
            {
                id: 3,
                name: "Panel Android",
                image: "ADDDDDDDDDDDDDDD.png",
                price: "Desde S/.50",
                category: "premium",
                description: "Panel optimizado para dispositivos Android",
                isNew: true,
                pricingOptions: [
                    {
                        duration: "30 Días",
                        priceSoles: "S/.50",
                        priceUSD: "$15 USD",
                        value: "30d"
                    },
                    {
                        duration: "60 Días", 
                        priceSoles: "S/.100",
                        priceUSD: "$27 USD",
                        value: "60d"
                    },
                    {
                        duration: "365 Días",
                        priceSoles: "S/.160", 
                        priceUSD: "$44 USD",
                        value: "365d"
                    }
                ]
            },
            {
                id: 4,
                name: "Panel Bypass UID",
                image: "fr.png",
                price: "Desde S/.48",
                category: "premium",
                description: "Panel con bypass de UID avanzado",
                isNew: false,
                pricingOptions: [
                    {
                        duration: "7 Días",
                        priceSoles: "S/.48",
                        priceUSD: "$13 USD",
                        value: "7d"
                    },
                    {
                        duration: "60 Días", 
                        priceSoles: "S/.120",
                        priceUSD: "$32 USD",
                        value: "60d"
                    },
                    {
                        duration: "365 Días",
                        priceSoles: "S/.180", 
                        priceUSD: "$60 USD",
                        value: "365d"
                    }
                ]
            },
            {
                id: 5,
                name: "Proyecto Hax",
                image: "ZONA_CHEAT_2.png",
                price: "$140",
                category: "premium",
                description: "Proyecto completo de hacking",
                isNew: true
            },
            {
                id: 6,
                name: "Optimizaciones de PC",
                image: "PROXIMO VIDEO XD.png",
                price: "$5",
                category: "free",
                description: "Optimizaciones gratuitas para mejorar el rendimiento",
                isNew: false
            },
            {
                id: 7,
                name: "PANEL GRATUITO",
                image: "image.png",
                price: "GRATIS",
                category: "free",
                description: "Panel completamente gratuito con funciones básicas para empezar",
                isNew: true
            }
        ];
        
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.productsPerPage = 9;
        
        this.init();
    }
    
    init() {
        this.renderProducts();
        this.setupEventListeners();
        this.renderPagination();
    }
    
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;
        
        const filteredProducts = this.getFilteredProducts();
        const paginatedProducts = this.getPaginatedProducts(filteredProducts);
        
        productsGrid.innerHTML = paginatedProducts.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}" class="product-card">
                <button class="buy-btn" onclick="showPurchaseModal(${product.id})">
                    ${product.price === 'GRATIS' ? 'DESCARGAR GRATIS' : 'COMPRAR AHORA'}
                </button>
            </div>
        `).join('');
    }
    
    getFilteredProducts() {
        if (this.currentFilter === 'all') {
            return this.products;
        }
        
        if (this.currentFilter === 'new') {
            return this.products.filter(product => product.isNew);
        }
        
        return this.products.filter(product => product.category === this.currentFilter);
    }
    
    getPaginatedProducts(products) {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        return products.slice(startIndex, endIndex);
    }
    
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        
        const filteredProducts = this.getFilteredProducts();
        const totalPages = Math.ceil(filteredProducts.length / this.productsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Botón anterior
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" onclick="productsManager.goToPage(${this.currentPage - 1})">‹</button>`;
        }
        
        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === this.currentPage ? 'active' : '';
            paginationHTML += `<button class="page-btn ${isActive}" onclick="productsManager.goToPage(${i})">${i}</button>`;
        }
        
        // Botón siguiente
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" onclick="productsManager.goToPage(${this.currentPage + 1})">›</button>`;
        }
        
        pagination.innerHTML = paginationHTML;
    }
    
    setupEventListeners() {
        // Filtros
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remover clase active de todos los botones
                filterButtons.forEach(b => b.classList.remove('active'));
                // Agregar clase active al botón clickeado
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.currentPage = 1;
                this.renderProducts();
                this.renderPagination();
            });
        });
        
        // Búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProducts(e.target.value);
            });
        }
    }
    
    searchProducts(query) {
        if (!query.trim()) {
            this.renderProducts();
            this.renderPagination();
            return;
        }
        
        const filteredProducts = this.getFilteredProducts().filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;
        
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    ${product.isNew ? '<span class="new-badge">NUEVO</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price ${product.price === 'GRATIS' ? 'gratis' : ''}">${product.price}</div>
                    <button class="buy-button" onclick="showPurchaseModal(${product.id})">
                        ${product.price === 'GRATIS' ? 'DESCARGAR GRATIS' : 'COMPRAR AHORA'}
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.renderProducts();
        this.renderPagination();
    }
}

// Funciones globales para los modales
function showPurchaseModal(productId) {
    const product = productsManager.products.find(p => p.id === productId);
    if (!product) return;
    
    // Crear modal de compra
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    let pricingSection = '';
    if (product.pricingOptions && product.pricingOptions.length > 0) {
        pricingSection = `
            <div class="pricing-options">
                <h4>Selecciona tu plan:</h4>
                <div class="pricing-grid">
                    ${product.pricingOptions.map(option => `
                        <div class="pricing-option" data-value="${option.value}">
                            <div class="duration">${option.duration}</div>
                            <div class="price-soles">${option.priceSoles}</div>
                            <div class="price-usd">${option.priceUSD}</div>
                        </div>
                    `).join('')}
                </div>
                <p class="pricing-help">* Selecciona una opción para continuar con la compra</p>
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Comprar ${product.name}</h2>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="product-details">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price ${product.price === 'GRATIS' ? 'gratis' : ''}">${product.price}</div>
                    </div>
                </div>
                ${pricingSection}
                <div class="purchase-form">
                    <h4>${product.price === 'GRATIS' ? 'Descarga Gratuita' : 'Información de Compra'}</h4>
                    <form>
                        <input type="email" placeholder="Email" required id="emailInput">
                        <input type="text" placeholder="Nombre completo" required>
                        <button type="submit" class="purchase-btn">
                            ${product.price === 'GRATIS' ? 'DESCARGAR GRATIS' : 'Proceder al Pago'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar funcionalidad a las opciones de precios
    if (product.pricingOptions && product.pricingOptions.length > 0) {
        const pricingOptions = modal.querySelectorAll('.pricing-option');
        const purchaseBtn = modal.querySelector('.purchase-btn');
        
        // Función para actualizar el estado del botón
        function updatePurchaseButton() {
            const selectedOption = modal.querySelector('.pricing-option.selected');
            if (selectedOption) {
                purchaseBtn.disabled = false;
                purchaseBtn.style.opacity = '1';
                purchaseBtn.style.cursor = 'pointer';
                purchaseBtn.textContent = 'Proceder al Pago';
            } else {
                purchaseBtn.disabled = true;
                purchaseBtn.style.opacity = '0.5';
                purchaseBtn.style.cursor = 'not-allowed';
                purchaseBtn.textContent = 'Selecciona un plan';
            }
        }
        
        // Inicializar el botón como deshabilitado
        updatePurchaseButton();
        
        pricingOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remover selección anterior
                pricingOptions.forEach(opt => opt.classList.remove('selected'));
                // Agregar selección actual
                this.classList.add('selected');
                // Actualizar el botón
                updatePurchaseButton();
            });
        });
        
        // Validar antes de enviar el formulario
        const form = modal.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const emailInput = form.querySelector('input[type="email"]');
            const nameInput = form.querySelector('input[type="text"]');
            const email = emailInput.value.trim();
            const name = nameInput.value.trim();
            
            // Validar email
            if (!isValidEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                emailInput.focus();
                return;
            }
            
            // Validar nombre
            if (name.length < 2) {
                showNotification('Por favor ingresa tu nombre completo', 'error');
                nameInput.focus();
                return;
            }
            
            let selectedPlan = null;
            
            // Validar plan solo si el producto tiene opciones de precios
            if (product.pricingOptions && product.pricingOptions.length > 0) {
                const selectedOption = modal.querySelector('.pricing-option.selected');
                if (!selectedOption) {
                    showNotification('Por favor selecciona un plan antes de continuar', 'error');
                    return;
                }
                
                selectedPlan = {
                    duration: selectedOption.querySelector('.duration').textContent,
                    priceSoles: selectedOption.querySelector('.price-soles').textContent,
                    priceUSD: selectedOption.querySelector('.price-usd').textContent,
                    value: selectedOption.dataset.value
                };
            }
            
            // Generar mensaje para Discord (sin mensaje adicional)
            const discordMessage = generateDiscordMessage(product, selectedPlan, name, email);
            
            // Redirigir a Discord con el mensaje pre-grabado
            redirectToDiscordWithMessage(discordMessage);
            
            const actionText = product.price === 'GRATIS' ? 'descarga' : 'pedido';
            showNotification(`Redirigiendo a Discord para completar tu ${actionText}...`, 'success');
            
            // Cerrar modal después de un breve delay
            setTimeout(() => {
                closeModal();
            }, 1500);
        });
    }
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showNotification(message, type = 'info') {
    // Remover notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Inicializar cuando se carga la página
let productsManager;
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que se carguen los componentes
    setTimeout(() => {
        productsManager = new ProductsPageManager();
        
        // Verificar si hay un hash en la URL para auto-filtrar
        const hash = window.location.hash;
        if (hash === '#free-products') {
            // Activar el filtro de productos gratuitos
            const freeFilterBtn = document.querySelector('[data-filter="free"]');
            if (freeFilterBtn) {
                freeFilterBtn.click();
            }
        }
        
        // Inicializar menú hamburguesa para productos.html
        initializeHamburgerMenu();
        
        // Inicializar botón flotante de redes sociales
        initializeFloatingSocial();
    }, 100);
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para generar mensaje de Discord con toda la información del pedido
function generateDiscordMessage(product, selectedPlan, name, email) {
    const timestamp = new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let discordMessage = `🎮 **NUEVO PEDIDO - ${product.name.toUpperCase()}** 🎮\n\n`;
    
    // Información del cliente
    discordMessage += `👤 **INFORMACIÓN DEL CLIENTE:**\n`;
    discordMessage += `• **Nombre:** ${name}\n`;
    discordMessage += `• **Email:** ${email}\n`;
    discordMessage += `• **Fecha:** ${timestamp}\n\n`;
    
    // Información del producto
    discordMessage += `🛒 **DETALLES DEL PRODUCTO:**\n`;
    discordMessage += `• **Producto:** ${product.name}\n`;
    discordMessage += `• **Descripción:** ${product.description}\n`;
    
    // Información del plan seleccionado
    if (selectedPlan) {
        discordMessage += `• **Plan seleccionado:** ${selectedPlan.duration}\n`;
        discordMessage += `• **Precio:** ${selectedPlan.priceSoles} | ${selectedPlan.priceUSD}\n`;
    } else {
        discordMessage += `• **Precio:** ${product.price}\n`;
    }
    
    // Footer
    discordMessage += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    discordMessage += `✅ **Estado:** Pendiente de procesamiento\n`;
    discordMessage += `🔗 **Origen:** Página de Productos\n`;
    discordMessage += `⏰ **Hora:** ${timestamp}`;
    
    return discordMessage;
}

// Función para redirigir a Discord con mensaje pre-grabado
function redirectToDiscordWithMessage(message) {
    // URL del servidor de Discord (reemplaza con tu servidor)
    const discordServerUrl = 'https://discord.gg/Zt6bxFDNwm';
    
    // Crear un elemento temporal para copiar el mensaje al portapapeles
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = message;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    // Mostrar notificación de que el mensaje fue copiado
    showNotification('Mensaje copiado al portapapeles. Redirigiendo a Discord...', 'info');
    
    // Redirigir a Discord después de un breve delay
    setTimeout(() => {
        window.open(discordServerUrl, '_blank');
    }, 1000);
}

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