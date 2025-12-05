import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import StatsSection from '../components/StatsSection'

// Lazy load componentes pesados
const ProductsCarousel = lazy(() => import('../components/ProductsCarousel'))
const VideoBanner = lazy(() => import('../components/VideoBanner'))

const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <Suspense fallback={<div style={{ minHeight: '400px' }}></div>}>
        <ProductsCarousel />
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '200px' }}></div>}>
        <VideoBanner />
      </Suspense>
    </>
  )
}

export default HomePage

