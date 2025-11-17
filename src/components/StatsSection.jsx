import { useEffect, useRef, useState } from 'react'
import './StatsSection.css'

const stats = [
  {
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 21V19C8 17.9391 7.57857 16.9217 6.82843 16.1716C6.07828 15.4214 5.06087 15 4 15C2.93913 15 1.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 11C5.65685 11 7 9.65685 7 8C7 6.34315 5.65685 5 4 5C2.34315 5 1 6.34315 1 8C1 9.65685 2.34315 11 4 11Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: 10430,
    prefix: '+',
    suffix: '',
    text: 'Miembros en nuestro servidor de Discord',
    key: 'members'
  },
  {
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16H12.01" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: 100,
    prefix: '',
    suffix: '%',
    text: 'Seguridad y efectividad',
    key: 'security'
  },
  {
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: 432,
    prefix: '+',
    suffix: '',
    text: 'Clientes activos',
    key: 'clients'
  }
]

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    members: 0,
    security: 0,
    clients: 0
  })
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true)
            hasAnimated.current = true
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 segundos
    const steps = 60
    const stepDuration = duration / steps

    const timers = []

    stats.forEach((stat) => {
      let currentStep = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        currentStep++
        const currentValue = Math.min(
          Math.floor(increment * currentStep),
          stat.value
        )

        setCounters((prev) => ({
          ...prev,
          [stat.key]: currentValue
        }))

        if (currentStep >= steps) {
          clearInterval(timer)
          // Asegurar que llegue al valor final
          setCounters((prev) => ({
            ...prev,
            [stat.key]: stat.value
          }))
        }
      }, stepDuration)

      timers.push(timer)
    })

    return () => {
      timers.forEach(timer => clearInterval(timer))
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-number">
              {stat.prefix}
              {counters[stat.key].toLocaleString('es-ES')}
              {stat.suffix}
            </div>
            <div className="stat-text">{stat.text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection

