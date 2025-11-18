import { useEffect, useRef } from 'react'

// Configuración adaptada a la paleta rojo, negro y blanco
const particlesConfig = {
  particles: {
    number: {
      value: 12,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ff0000'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 80,
      color: '#ff0000',
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse'
      },
      onclick: {
        enable: false,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: false
}

const ParticlesBackground = () => {
  const containerRef = useRef(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return

    const loadParticles = async () => {
      // Cargar configuración desde JSON si está disponible
      let config = particlesConfig
      try {
        const jsonPath = import.meta.env.DEV 
          ? '/particles.json' 
          : `${import.meta.env.BASE_URL}particles.json`
        const response = await fetch(jsonPath)
        if (response.ok) {
          const jsonConfig = await response.json()
          // Adaptar colores a solo rojo
          jsonConfig.particles.color.value = '#ff0000'
          jsonConfig.particles.line_linked.color = '#ff0000'
          jsonConfig.particles.shape.stroke.color = '#000000'
          // Desactivar interactividad del mouse para mejor rendimiento
          if (jsonConfig.interactivity && jsonConfig.interactivity.events) {
            jsonConfig.interactivity.events.onhover = { enable: false, mode: 'repulse' }
            jsonConfig.interactivity.events.onclick = { enable: false, mode: 'push' }
          }
          // Desactivar retina_detect para mejor rendimiento
          if (jsonConfig.retina_detect !== undefined) {
            jsonConfig.retina_detect = false
          }
          config = jsonConfig
        }
      } catch (error) {
        console.log('Usando configuración por defecto')
      }

      // Función para inicializar particles
      const initParticles = () => {
        const container = document.getElementById('particles-js')
        if (!container) {
          console.error('Contenedor particles-js no encontrado')
          return
        }

        if (window.particlesJS) {
          try {
            window.particlesJS('particles-js', config)
            initializedRef.current = true
            console.log('Particles inicializadas correctamente')
          } catch (error) {
            console.error('Error al inicializar particles:', error)
          }
        } else {
          console.error('particlesJS no está disponible')
        }
      }

      // Esperar a que particlesJS esté disponible (máximo 50 intentos = 5 segundos)
      let attempts = 0
      const maxAttempts = 50
      
      const checkAndInit = () => {
        attempts++
        if (window.particlesJS) {
          initParticles()
        } else if (attempts < maxAttempts) {
          // Intentar de nuevo después de un breve delay
          setTimeout(checkAndInit, 100)
        } else {
          console.error('particlesJS no se cargó después de varios intentos')
        }
      }

      // Si particlesJS ya está cargado
      if (window.particlesJS) {
        setTimeout(initParticles, 300)
      } else {
        // Esperar a que el script se cargue
        setTimeout(checkAndInit, 200)
      }
    }

    loadParticles()
  }, [])

  return <div id="particles-js" ref={containerRef} className="particles-container"></div>
}

export default ParticlesBackground
