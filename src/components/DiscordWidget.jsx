import { useEffect, useRef } from 'react'
import './DiscordWidget.css'

const DiscordWidget = ({ serverId }) => {
  const widgetRef = useRef(null)

  useEffect(() => {
    // El widget de Discord se carga dinámicamente
    if (serverId && widgetRef.current) {
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
      
      widgetRef.current.appendChild(iframe)
    }
  }, [serverId])

  if (!serverId) {
    return (
      <div className="discord-widget-placeholder">
        <p>ID del servidor de Discord requerido</p>
      </div>
    )
  }

  return (
    <div className="discord-widget-container">
      <div className="discord-widget-header">
        <h3 className="discord-widget-title">ÚNETE A NUESTRO DISCORD</h3>
        <p className="discord-widget-subtitle">Comunidad activa en tiempo real</p>
      </div>
      <div ref={widgetRef} className="discord-widget-embed"></div>
    </div>
  )
}

export default DiscordWidget

