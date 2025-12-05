import { useEffect, useRef, useState } from 'react'
import './VideoBanner.css'

const VideoBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const videoPath = import.meta.env.DEV 
    ? '/Animacion.mp4' 
    : `${import.meta.env.BASE_URL}Animacion.mp4`

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setShouldLoad(true)
            // Una vez que se carga, no necesitamos seguir observando
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '50px' // Se activa 50px antes de que entre en el viewport
      }
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
    if (shouldLoad && videoRef.current) {
      // Cargar el video cuando sea necesario
      videoRef.current.load()
    }
  }, [shouldLoad])

  return (
    <section ref={containerRef} className="video-banner-section">
      <div className="video-banner-container">
        {shouldLoad ? (
          <video 
            ref={videoRef}
            className="video-banner"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          >
            <source src={videoPath} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        ) : (
          <div className="video-placeholder" style={{ 
            width: '100%', 
            height: '200px',
            backgroundColor: 'transparent'
          }}></div>
        )}
      </div>
    </section>
  )
}

export default VideoBanner

