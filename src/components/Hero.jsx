import './Hero.css'
import DiscordWidget from './DiscordWidget'

const Hero = () => {
  // En desarrollo, usar ruta directa. En producción con base, usar BASE_URL
  const imagePath = import.meta.env.DEV 
    ? '/panelsupreme.png' 
    : `${import.meta.env.BASE_URL}panelsupreme.png`
  
  // ID del servidor de Discord - reemplazar con el ID real cuando lo tengas
  const discordServerId = '1047547367336980570' // Reemplazar con el ID del servidor
  
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Lado Izquierdo - Texto */}
        <div className="hero-left">
          <div className="hero-text">
            <h2 className="hero-title">
              ESPECIALISTAS EN EL<br />
              DESARROLLO DE<br />
              SOFTWARES
            </h2>
            <h3 className="hero-highlight">INDETECTABLES.</h3>
          </div>
        </div>

        {/* Centro - Imagen */}
        <div className="hero-center">
          <div className="hero-image-container">
            <img 
              src={imagePath}
              alt="ZonaCheats Panel" 
              className="hero-image"
            />
          </div>
        </div>

        {/* Lado Derecho - Discord Widget */}
        <div className="hero-right">
          <DiscordWidget serverId={discordServerId} />
        </div>
      </div>
    </section>
  )
}

export default Hero
