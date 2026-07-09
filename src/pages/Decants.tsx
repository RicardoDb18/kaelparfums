import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard'

export default function Decants() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const decants = useMemo(() => {
    let result = products.filter(p =>
      p.concentrations.some(c => c.sizes.some(s => s.ml <= 10))
    )

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.notes.some(n => n.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => Math.min(...a.concentrations.flatMap(c => c.sizes.filter(s => s.ml <= 10).map(s => s.price))) - Math.min(...b.concentrations.flatMap(c => c.sizes.filter(s => s.ml <= 10).map(s => s.price))))
        break
      case 'price-desc':
        result.sort((a, b) => Math.min(...b.concentrations.flatMap(c => c.sizes.filter(s => s.ml <= 10).map(s => s.price))) - Math.min(...a.concentrations.flatMap(c => c.sizes.filter(s => s.ml <= 10).map(s => s.price))))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [search, sortBy])

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Decants</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3 mb-4">
            Muestras & Decants
          </h1>
          <p className="text-black/50 max-w-xl mx-auto">
            Prueba fragancias exclusivas antes de comprar el frasco completo. Decants de 3ml, 5ml y 10ml de las mejores casas de perfumería.
          </p>
        </div>

        <Link
          to="/promociones"
          className="block mb-10 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border border-gold/20 rounded-xl p-4 text-center hover:from-gold/20 transition-colors"
        >
          <span className="text-sm font-medium text-gold">
            🎉 Descuentos por volumen: 10% OFF en 3+ decants · 15% OFF en 5+ decants — Ver promociones
          </span>
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar decants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full sm:w-auto text-sm border border-black/10 rounded-lg px-3 py-3 focus:outline-none focus:border-gold"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
            <option value="name">Alfabético</option>
          </select>
        </div>

        {decants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black/50">No se encontraron decants con esos criterios.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {decants.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
