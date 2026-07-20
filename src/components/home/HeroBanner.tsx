import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    title: 'Decants Premium',
    subtitle: 'Prueba antes de invertir. Decants de 3ml, 5ml y 10ml',
    cta: 'Ver Decants',
    link: '/decants',
    accent: 'Muestras de Lujo',
  },
  {
    title: 'Perfumes Nicho',
    subtitle: 'Descubre fragancias exclusivas de las mejores casas del mundo',
    cta: 'Explorar Colección',
    link: '/shop?type=nicho',
    accent: 'Colección Premium',
  },
  {
    title: 'Perfumes de Diseñador',
    subtitle: 'Las fragancias más icónicas de las marcas más reconocidas',
    cta: 'Explorar Diseñadores',
    link: '/shop?type=diseñadores',
    accent: 'Colección Diseñadores',
  },
  {
    title: 'Perfumes Árabes',
    subtitle: 'Las fragancias en tendencia de la perfumería árabe, con aromas intensos y duraderos',
    cta: 'Explorar Árabes',
    link: '/shop?type=arabes',
    accent: 'Colección Oriental',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
          <img src={`${import.meta.env.BASE_URL}images/logokael.jpg`} alt="" className="absolute inset-0 w-full h-full object-contain opacity-[0.12]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,110,0.15),transparent_70%)]" />

          <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl">
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.25em] mb-5">
                {slide.accent}
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/60 mb-10 leading-relaxed">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 group"
              >
                {slide.cta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-gold' : 'w-3 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  )
}
