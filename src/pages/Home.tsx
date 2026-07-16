import { useState } from 'react'
import HeroBanner from '../components/home/HeroBanner'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BrandSlider from '../components/home/BrandSlider'
import Newsletter from '../components/home/Newsletter'

const categories = [
  { name: 'Árabes', slug: 'type=arabes', count: '+30', gradient: 'from-amber-900 to-black', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Diseñador', slug: 'type=disenador', count: '+20', gradient: 'from-zinc-900 to-black', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { name: 'Nicho', slug: 'type=nicho', count: '+10', gradient: 'from-gold/80 to-black', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { name: 'Decants', slug: 'decants', count: '+50', gradient: 'from-black to-zinc-900', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
]

export default function Home() {
  const [perfumeQuery, setPerfumeQuery] = useState('')

  const handleQuote = () => {
    if (!perfumeQuery.trim()) return
    const msg = encodeURIComponent(`¡Hola! Quiero cotizar el perfume: ${perfumeQuery.trim()}`)
    window.open(`https://wa.me/51918123682?text=${msg}`, '_blank')
  }

  return (
    <main>
      <HeroBanner />
      <FeaturedProducts />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Categorías</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3">
              Explora por Categoría
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <a
                key={cat.slug}
                href={cat.slug === 'decants' ? '/decants' : `/shop?${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-8 min-h-[220px] flex flex-col justify-end cursor-pointer`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-5 right-5 h-8 w-8 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={cat.icon} />
                </svg>
                <h3 className="text-2xl font-display font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-white/50 text-sm">{cat.count} fragancias</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="cotiza" className="py-12 bg-zinc-50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">¿No encuentras lo que buscas?</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3 mb-4">
            Cotiza tu perfume ideal aquí
          </h2>
          <p className="text-black/50 mb-8">
            Escríbenos el nombre del perfume que deseas y te daremos un precio especial.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="text"
              value={perfumeQuery}
              onChange={e => setPerfumeQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleQuote() }}
              placeholder="Ej: Creed Aventus, Tom Ford Tobacco Vanille..."
              className="flex-1 px-5 py-3.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              onClick={handleQuote}
              className="px-8 py-3.5 bg-gold text-black font-semibold rounded-xl hover:bg-gold-light transition-colors shrink-0"
            >
              Cotizar
            </button>
          </div>
        </div>
      </section>

      <BrandSlider />
      <Newsletter />
    </main>
  )
}
