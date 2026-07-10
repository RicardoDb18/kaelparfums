import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-light text-gold">Kael Parfums</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Inicio</Link>
            <Link to="/shop?type=arabes" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Árabes</Link>
            <Link to="/shop?type=disenador" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Diseñador</Link>
            <Link to="/shop?type=nicho" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Nicho</Link>
            <Link to="/decants" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Decants</Link>
            <Link to="/promociones" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Promociones</Link>
            <Link to="/brands" className="text-sm font-medium text-gold hover:text-gold-light transition-colors">Marcas</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-black/70 hover:text-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">{totalItems}</span>}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-black/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-black/5">
          <div className="px-6 py-4 space-y-3">
            <Link to="/" className="block text-sm font-medium text-black/70 hover:text-gold" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/shop?type=arabes" className="block text-sm font-medium text-black/70 hover:text-gold" onClick={() => setMenuOpen(false)}>Árabes</Link>
            <Link to="/shop?type=disenador" className="block text-sm font-medium text-black/70 hover:text-gold" onClick={() => setMenuOpen(false)}>Diseñador</Link>
            <Link to="/shop?type=nicho" className="block text-sm font-medium text-black/70 hover:text-gold" onClick={() => setMenuOpen(false)}>Nicho</Link>
            <Link to="/decants" className="block text-sm font-medium text-black/70 hover:text-gold" onClick={() => setMenuOpen(false)}>Decants</Link>
            <Link to="/promociones" className="block text-sm font-medium text-gold hover:text-gold-light" onClick={() => setMenuOpen(false)}>Promociones</Link>
            <Link to="/brands" className="block text-sm font-medium text-black/70 hover:text-gold" onClick={() => setMenuOpen(false)}>Marcas</Link>
          </div>
        </div>
      )}
    </header>
  )
}
