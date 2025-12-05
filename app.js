// Products Data
const products = [
  {
    id: 1,
    name: 'PROYECTO SUPREME',
    image: 'proyectosupreme.png',
    alt: 'Proyecto Supreme',
    price30: { sol: 50, usd: 15 },
    price60: { sol: 100, usd: 27 },
    price365: { sol: 160, usd: 44 }
  },
  {
    id: 2,
    name: 'PANEL ANDROID',
    image: 'panelandroid.png',
    alt: 'Panel Android',
    price30: { sol: 50, usd: 15 },
    price60: { sol: 100, usd: 27 },
    price365: { sol: 160, usd: 44 }
  },
  {
    id: 3,
    name: 'PANEL BYPASS',
    image: 'panelbypass.png',
    alt: 'Panel Bypass',
    price7: { sol: 40, usd: 11 },
    price60: { sol: 120, usd: 32 },
    price365: { sol: 180, usd: 60 }
  },
  {
    id: 4,
    name: 'PANEL BASIC',
    image: 'panelbasic.png',
    alt: 'Panel Basic',
    price30: { sol: 70, usd: 20 },
    price60: { sol: 140, usd: 38 },
    price365: { sol: 220, usd: 60 }
  },
  {
    id: 5,
    name: 'PANEL SUPREME',
    image: 'panelsupreme.png',
    alt: 'Panel Supreme',
    price30: { sol: 90, usd: 25 },
    price60: { sol: 180, usd: 48 },
    price365: { sol: 280, usd: 75 }
  }
]

// Carousel functionality
let currentIndex = 0
let selectedProduct = null
let selectedPlan = null

function initCarousel() {
  const productsTrack = document.getElementById('productsTrack')
  const carouselDots = document.getElementById('carouselDots')
  
  if (!productsTrack || !carouselDots) return
  
  // Render products
  products.forEach((product, index) => {
    const productItem = document.createElement('div')
    productItem.className = 'product-slide-item'
    productItem.innerHTML = `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.alt}" class="product-image" loading="lazy">
        </div>
        <div class="product-name">${product.name}</div>
        <button class="buy-button" data-product-id="${product.id}">COMPRAR AHORA</button>
      </div>
    `
    productsTrack.appendChild(productItem)
    
    // Create dot
    const dot = document.createElement('button')
    dot.className = `dot ${index === 0 ? 'active' : ''}`
    dot.setAttribute('aria-label', `Ir al producto ${index + 1}`)
    dot.addEventListener('click', () => goToSlide(index))
    carouselDots.appendChild(dot)
  })
  
  // Event listeners
  document.getElementById('prevBtn')?.addEventListener('click', prevSlide)
  document.getElementById('nextBtn')?.addEventListener('click', nextSlide)
  
  // Buy button listeners
  document.querySelectorAll('.buy-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-product-id'))
      const product = products.find(p => p.id === productId)
      if (product) {
        openPurchaseModal(product)
      }
    })
  })
  
  // Auto slide
  setInterval(() => {
    nextSlide()
  }, 4000)
}

function nextSlide() {
  const maxIndex = Math.max(0, products.length - 3)
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
  updateCarousel()
}

function prevSlide() {
  const maxIndex = Math.max(0, products.length - 3)
  currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1
  updateCarousel()
}

function goToSlide(index) {
  const maxIndex = Math.max(0, products.length - 3)
  currentIndex = Math.min(index, maxIndex)
  updateCarousel()
}

function updateCarousel() {
  const productsTrack = document.getElementById('productsTrack')
  const dots = document.querySelectorAll('.dot')
  
  if (!productsTrack) return
  
  const itemWidth = `calc((100% - 4rem) / 3)`
  const translateX = `calc(-${currentIndex} * (${itemWidth} + 2rem))`
  productsTrack.style.transform = `translateX(${translateX})`
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex)
  })
}

// Purchase Modal
function openPurchaseModal(product) {
  selectedProduct = product
  selectedPlan = null
  
  const modal = document.getElementById('purchaseModal')
  const productName = document.getElementById('modalProductName')
  const plansContainer = document.getElementById('plansContainer')
  const payButton = document.getElementById('payButton')
  
  if (!modal || !productName || !plansContainer) return
  
  productName.textContent = product.name
  plansContainer.innerHTML = ''
  
  // Create plans
  const plans = [
    product.price7 && { days: 7, sol: product.price7.sol, usd: product.price7.usd },
    product.price30 && { days: 30, sol: product.price30.sol, usd: product.price30.usd },
    product.price60 && { days: 60, sol: product.price60.sol, usd: product.price60.usd },
    product.price365 && { days: 365, sol: product.price365.sol, usd: product.price365.usd }
  ].filter(Boolean)
  
  plans.forEach((plan) => {
    const planOption = document.createElement('div')
    planOption.className = 'plan-option'
    planOption.innerHTML = `
      <div class="plan-duration">${plan.days} DIAS</div>
      <div class="plan-price">S/.${plan.sol} - ${plan.usd}USD</div>
    `
    planOption.addEventListener('click', () => {
      document.querySelectorAll('.plan-option').forEach(opt => opt.classList.remove('selected'))
      planOption.classList.add('selected')
      selectedPlan = plan
      payButton.disabled = false
    })
    plansContainer.appendChild(planOption)
  })
  
  payButton.disabled = true
  modal.classList.add('active')
}

function closePurchaseModal() {
  const modal = document.getElementById('purchaseModal')
  if (modal) {
    modal.classList.remove('active')
    selectedProduct = null
    selectedPlan = null
  }
}

function handlePay() {
  if (!selectedProduct || !selectedPlan) return
  
  const message = `Hola, estoy interesado en comprar:\n\n` +
    `Producto: ${selectedProduct.name}\n` +
    `Plan: ${selectedPlan.days} días\n` +
    `Precio: S/.${selectedPlan.sol} - ${selectedPlan.usd}USD\n\n` +
    `¿Podrías ayudarme con la compra?`
  
  const whatsappUrl = `https://wa.me/51971086152?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
  closePurchaseModal()
}

// Stats Counter
function initStatsCounter() {
  const statsSection = document.getElementById('stats-section')
  if (!statsSection) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  
  observer.observe(statsSection)
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number')
  
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'))
    const prefix = counter.getAttribute('data-prefix') || ''
    const suffix = counter.getAttribute('data-suffix') || ''
    const duration = 2000
    const steps = 30
    const increment = target / steps
    let current = 0
    let step = 0
    
    const timer = setInterval(() => {
      step++
      current = Math.min(Math.floor(increment * step), target)
      counter.textContent = prefix + current.toLocaleString('es-ES') + suffix
      
      if (step >= steps) {
        counter.textContent = prefix + target.toLocaleString('es-ES') + suffix
        clearInterval(timer)
      }
    }, duration / steps)
  })
}

// Discord Widget
function initDiscordWidget() {
  const widgetContainer = document.getElementById('discord-widget-container')
  const widgetEmbed = document.getElementById('discord-widget-embed')
  
  if (!widgetContainer || !widgetEmbed) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadDiscordWidget()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '100px' }
  )
  
  observer.observe(widgetContainer)
}

function loadDiscordWidget() {
  const widgetEmbed = document.getElementById('discord-widget-embed')
  if (!widgetEmbed) return
  
  const serverId = '1047547367336980570'
  widgetEmbed.innerHTML = ''
  
  const iframe = document.createElement('iframe')
  iframe.src = `https://discord.com/widget?id=${serverId}&theme=dark`
  iframe.width = '350'
  iframe.height = '500'
  iframe.allowTransparency = 'true'
  iframe.frameBorder = '0'
  iframe.sandbox = 'allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
  iframe.className = 'discord-iframe'
  iframe.loading = 'lazy'
  
  widgetEmbed.appendChild(iframe)
}

// Video Banner Lazy Load
function initVideoBanner() {
  const video = document.querySelector('.video-banner')
  if (!video) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.load()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '50px' }
  )
  
  observer.observe(video)
}

// Products Page Grid
function initProductsPage() {
  const productsGrid = document.getElementById('productsGrid')
  if (!productsGrid) return
  
  const productsWithDescriptions = [
    {
      id: 1,
      name: 'PROYECTO SUPREME',
      image: 'proyectosupreme.png',
      description: 'Panel básico con funciones esenciales',
      price30: { sol: 50, usd: 15 },
      price60: { sol: 100, usd: 27 },
      price365: { sol: 160, usd: 44 }
    },
    {
      id: 2,
      name: 'PANEL ANDROID',
      image: 'panelandroid.png',
      description: 'Panel optimizado para dispositivos Android',
      price30: { sol: 50, usd: 15 },
      price60: { sol: 100, usd: 27 },
      price365: { sol: 160, usd: 44 }
    },
    {
      id: 3,
      name: 'PANEL BYPASS',
      image: 'panelbypass.png',
      description: 'Panel avanzado con sistema de bypass',
      price7: { sol: 40, usd: 11 },
      price60: { sol: 120, usd: 32 },
      price365: { sol: 180, usd: 60 }
    },
    {
      id: 4,
      name: 'PANEL BASIC',
      image: 'panelbasic.png',
      description: 'Panel profesional con todas las funciones',
      price30: { sol: 70, usd: 20 },
      price60: { sol: 140, usd: 38 },
      price365: { sol: 220, usd: 60 }
    },
    {
      id: 5,
      name: 'PANEL SUPREME',
      image: 'panelsupreme.png',
      description: 'Panel premium con soporte prioritario',
      price30: { sol: 90, usd: 25 },
      price60: { sol: 180, usd: 48 },
      price365: { sol: 280, usd: 75 }
    }
  ]
  
  productsWithDescriptions.forEach((product) => {
    const productCard = document.createElement('div')
    productCard.className = 'product-card-page'
    productCard.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image-page" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-name-page">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <button class="product-buy-button" data-product-id="${product.id}">COMPRAR AHORA</button>
      </div>
    `
    productsGrid.appendChild(productCard)
  })
  
  // Buy button listeners for products page
  document.querySelectorAll('.product-buy-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-product-id'))
      const product = productsWithDescriptions.find(p => p.id === productId)
      if (product) {
        openPurchaseModal(product)
      }
    })
  })
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm')
  if (!contactForm) return
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    }
    
    const message = `Hola, mi nombre es ${formData.name}.\n\n` +
      `Email: ${formData.email}\n\n` +
      `Mensaje: ${formData.message}\n\n` +
      `Me gustaría ponerme en contacto contigo.`
    
    const whatsappUrl = `https://wa.me/51971086152?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Reset form
    contactForm.reset()
  })
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initCarousel()
  initStatsCounter()
  initDiscordWidget()
  initVideoBanner()
  initProductsPage()
  initContactForm()
  
  // Modal event listeners
  document.getElementById('closeModal')?.addEventListener('click', closePurchaseModal)
  document.getElementById('payButton')?.addEventListener('click', handlePay)
  document.getElementById('purchaseModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'purchaseModal') {
      closePurchaseModal()
    }
  })
})

