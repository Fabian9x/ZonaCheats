import { useState } from 'react'
import '../components/ProductsPage.css'
import PurchaseModal from '../components/PurchaseModal'

const ProductsPage = () => {
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
      description: 'Panel básico con funciones esenciales',
      price30: { sol: 50, usd: 15 },
      price60: { sol: 100, usd: 27 },
      price365: { sol: 160, usd: 44 }
    },
    {
      id: 2,
      name: 'PANEL ANDROID',
      image: getImagePath('panelandroid.png'),
      description: 'Panel optimizado para dispositivos Android',
      price30: { sol: 50, usd: 15 },
      price60: { sol: 100, usd: 27 },
      price365: { sol: 160, usd: 44 }
    },
    {
      id: 3,
      name: 'PANEL BYPASS',
      image: getImagePath('panelbypass.png'),
      description: 'Panel avanzado con sistema de bypass',
      price7: { sol: 40, usd: 11 },
      price60: { sol: 120, usd: 32 },
      price365: { sol: 180, usd: 60 }
    },
    {
      id: 4,
      name: 'PANEL BASIC',
      image: getImagePath('panelbasic.png'),
      description: 'Panel profesional con todas las funciones',
      price30: { sol: 70, usd: 20 },
      price60: { sol: 140, usd: 38 },
      price365: { sol: 220, usd: 60 }
    },
    {
      id: 5,
      name: 'PANEL SUPREME',
      image: getImagePath('panelsupreme.png'),
      description: 'Panel premium con soporte prioritario',
      price30: { sol: 90, usd: 25 },
      price60: { sol: 180, usd: 48 },
      price365: { sol: 280, usd: 75 }
    }
  ]

  return (
    <section className="products-page">
      <div className="products-page-container">
        <h1 className="products-page-title">NUESTROS PRODUCTOS</h1>
        <p className="products-page-subtitle">Elige el panel que mejor se adapte a tus necesidades</p>
        
        <div className="products-grid-page">
          {products.map((product) => (
            <div key={product.id} className="product-card-page">
              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image-page"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23fff" font-size="20"%3EImagen del producto%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-name-page">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <button 
                  className="product-buy-button"
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

export default ProductsPage

