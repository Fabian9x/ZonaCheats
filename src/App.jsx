import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ParticlesBackground from './components/ParticlesBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingDiscordButton from './components/FloatingDiscordButton'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  return (
    <Router 
      basename={import.meta.env.DEV ? '/' : '/ZonaCheats/'}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="app">
        {/* <ParticlesBackground /> */}
        <Navbar />
        <FloatingDiscordButton />
        <div className="content">
          <main className="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/productos" element={<ProductsPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App

