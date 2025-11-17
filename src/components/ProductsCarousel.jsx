import { useState, useEffect } from 'react'
import './ProductsCarousel.css'
import PurchaseModal from './PurchaseModal'

const ProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getImagePath = (imageName) => {
    return import.meta.env.DEV 
      ? `/${imageName}` 
      : `${import.meta.env.BASE_URL}${imageName}`
  }

  const products = [
    {
      id: 1,
      name: 'PROYECTO SUPREME',
      image: getImagePath('proyectosupreme.png'),
      alt: 'Proyecto Supreme',
      price30: { sol: 50, usd: 15 },
      price60: { sol: 100, usd: 27 },
      price365: { sol: 160, usd: 44 }
    },
    {
      id: 2,
      name: 'PANEL ANDROID',
      image: getImagePath('panelandroid.png'),
      alt: 'Panel Android',
      price30: { sol: 50, usd: 15 },
      price60: { sol: 100, usd: 27 },
      price365: { sol: 160, usd: 44 }
    },
    {
      id: 3,
      name: 'PANEL BYPASS',
      image: getImagePath('panelbypass.png'),
      alt: 'Panel Bypass',
      price7: { sol: 40, usd: 11 },
      price60: { sol: 120, usd: 32 },
      price365: { sol: 180, usd: 60 }
    },
    {
      id: 4,
      name: 'PANEL BASIC',
      image: getImagePath('panelbasic.png'),
      alt: 'Panel Basic',
      price30: { sol: 70, usd: 20 },
      price60: { sol: 140, usd: 38 },
      price365: { sol: 220, usd: 60 }
    },
    {
      id: 5,
      name: 'PANEL SUPREME',
      image: getImagePath('panelsupreme.png'),
      alt: 'Panel Supreme',
      price30: { sol: 90, usd: 25 },
      price60: { sol: 180, usd: 48 },
      price365: { sol: 280, usd: 75 }
    }
  ]

  // Animación automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Avanzar de uno en uno, pero no más allá de products.length - 3
        const maxIndex = Math.max(0, products.length - 3)
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [products.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Avanzar de uno en uno, pero no más allá de products.length - 3
      const maxIndex = Math.max(0, products.length - 3)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Retroceder de uno en uno
      const maxIndex = Math.max(0, products.length - 3)
      return prevIndex === 0 ? maxIndex : prevIndex - 1
    })
  }

  const goToSlide = (index) => {
    const maxIndex = Math.max(0, products.length - 3)
    setCurrentIndex(Math.min(index, maxIndex))
  }


  return (
    <section className="products-section">
      <h2 className="products-title">NUEVOS PRODUCTOS</h2>
      
      <div className="carousel-container">
        <button 
          className="carousel-button prev" 
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="products-slider-wrapper">
          <div 
            className="products-slider-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * ((100% - 4rem) / 3 + 2rem)))`
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="product-slide-item">
                <div className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.alt}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23fff" font-size="20"%3EImagen del producto%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                  <div className="product-name">{product.name}</div>
                  <button 
                    className="buy-button"
                    onClick={() => {
                      setSelectedProduct(product)
                      setIsModalOpen(true)
                    }}
                  >
                    COMPRAR AHORA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-button next" 
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {products.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al producto ${index + 1}`}
          />
        ))}
      </div>

      <PurchaseModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
      />
    </section>
  )
}

export default ProductsCarousel

