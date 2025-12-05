import { useEffect, useRef, useState } from 'react'
import './DiscordWidget.css'

const DiscordWidget = ({ serverId }) => {
  const widgetRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Solo cargar el widget cuando sea visible (lazy load)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // El widget de Discord se carga dinámicamente solo cuando es visible
    if (shouldLoad && serverId && widgetRef.current) {
      // Limpiar contenido anterior
      widgetRef.current.innerHTML = ''
      
      // Crear el iframe del widget de Discord
      const iframe = document.createElement('iframe')
      iframe.src = `https://discord.com/widget?id=${serverId}&theme=dark`
      iframe.width = '350'
      iframe.height = '500'
      iframe.allowTransparency = 'true'
      iframe.frameBorder = '0'
      iframe.sandbox = 'allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
      iframe.className = 'discord-iframe'
      iframe.loading = 'lazy'
      
      widgetRef.current.appendChild(iframe)
    }
  }, [serverId, shouldLoad])

  if (!serverId) {
    return (
      <div className="discord-widget-placeholder">
        <p>ID del servidor de Discord requerido</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="discord-widget-container">
      <div className="discord-widget-header">
        <h3 className="discord-widget-title">ÚNETE A NUESTRO DISCORD</h3>
        <p className="discord-widget-subtitle">Comunidad activa en tiempo real</p>
      </div>
      <div ref={widgetRef} className="discord-widget-embed">
        {!shouldLoad && (
          <div style={{ 
            width: '350px', 
            height: '500px', 
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            Cargando...
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscordWidget

