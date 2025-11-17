import './VideoBanner.css'

const VideoBanner = () => {
  const videoPath = import.meta.env.DEV 
    ? '/Animacion.mp4' 
    : `${import.meta.env.BASE_URL}Animacion.mp4`

  return (
    <section className="video-banner-section">
      <div className="video-banner-container">
        <video 
          className="video-banner"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoPath} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </section>
  )
}

export default VideoBanner

