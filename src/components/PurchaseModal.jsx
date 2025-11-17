import { useState } from 'react'
import './PurchaseModal.css'

const PurchaseModal = ({ product, isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)

  if (!isOpen) return null

  const plans = [
    product.price7 && { days: 7, sol: product.price7.sol, usd: product.price7.usd },
    product.price30 && { days: 30, sol: product.price30.sol, usd: product.price30.usd },
    product.price60 && { days: 60, sol: product.price60.sol, usd: product.price60.usd },
    product.price365 && { days: 365, sol: product.price365.sol, usd: product.price365.usd }
  ].filter(Boolean)

  const handlePay = () => {
    if (!selectedPlan) return

    const message = `Hola, estoy interesado en comprar:\n\n` +
      `Producto: ${product.name}\n` +
      `Plan: ${selectedPlan.days} días\n` +
      `Precio: S/.${selectedPlan.sol} - ${selectedPlan.usd}USD\n\n` +
      `¿Podrías ayudarme con la compra?`

    const whatsappUrl = `https://wa.me/51971086152?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">SELECCIONA TU PLAN</h2>
        <p className="modal-subtitle">{product.name}</p>

        <div className="plans-container">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-option ${selectedPlan?.days === plan.days ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="plan-duration">{plan.days} DIAS</div>
              <div className="plan-price">S/.{plan.sol} - {plan.usd}USD</div>
            </div>
          ))}
        </div>

        <button
          className="pay-button"
          onClick={handlePay}
          disabled={!selectedPlan}
        >
          PAGAR
        </button>
      </div>
    </div>
  )
}

export default PurchaseModal

