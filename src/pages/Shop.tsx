import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, brands } from '../data/products'
import type { CategoryType } from '../types'
import ProductCard from '../components/product/ProductCard'

const categoryTypes: { key: CategoryType | 'todas'; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'nicho', label: 'Nicho' },
  { key: 'disenador', label: 'Diseñador' },
  { key: 'arabes', label: 'Árabes' },
]

const genders = [
  { key: 'todas', label: 'Todos' },
  { key: 'masculino', label: 'Masculino' },
  { key: 'femenino', label: 'Femenino' },
  { key: 'unisex', label: 'Unisex' },
] as const

export default function Shop() {
  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get('type') as CategoryType | null
  const genderParam = searchParams.get('gender') as string | null
  const brandParam = searchParams.get('brand')

  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<CategoryType | 'todas'>(typeParam || 'todas')
  const [activeGender, setActiveGender] = useState<string>(genderParam || 'todas')
  const [activeBrand, setActiveBrand] = useState(brandParam || '')
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let result = [...products]

    if (activeType !== 'todas') {
      result = result.filter(p => p.categoryType === activeType)
    }

    if (activeGender !== 'todas') {
      result = result.filter(p => p.gender === activeGender)
    }

    if (activeBrand) {
      const brand = brands.find(b => b.slug === activeBrand)
      if (brand) {
        result = result.filter(p => p.brand === brand.name)
      }
    }

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
        result.sort((a, b) => Math.min(...a.concentrations.flatMap(c => c.sizes.map(s => s.price))) - Math.min(...b.concentrations.flatMap(c => c.sizes.map(s => s.price))))
        break
      case 'price-desc':
        result.sort((a, b) => Math.min(...b.concentrations.flatMap(c => c.sizes.map(s => s.price))) - Math.min(...a.concentrations.flatMap(c => c.sizes.map(s => s.price))))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [activeType, activeGender, activeBrand, search, sortBy])

  const typeTitle = activeType === 'todas' ? 'Catálogo'
    : activeType === 'arabes' ? 'Perfumes Árabes'
    : activeType === 'disenador' ? 'Perfumes de Diseñador'
    : 'Perfumes de Nicho'

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mb-2">
            {activeBrand
              ? brands.find(b => b.slug === activeBrand)?.name || 'Catálogo'
              : typeTitle}
          </h1>
          <p className="text-black/50">{filtered.length} fragancias encontradas</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 border border-black/10 rounded-lg text-sm text-black/60 hover:text-black transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros {showFilters ? '▲' : '▼'}
          </button>

          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 shrink-0`}>
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Buscar fragancias..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">Tipo</h3>
                <div className="space-y-1">
                  {categoryTypes.map(ct => (
                    <button
                      key={ct.key}
                      onClick={() => { setActiveType(ct.key); setActiveBrand('') }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeType === ct.key ? 'bg-gold/10 text-gold font-medium' : 'text-black/60 hover:text-black hover:bg-black/5'
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">Género</h3>
                <div className="space-y-1">
                  {genders.map(g => (
                    <button
                      key={g.key}
                      onClick={() => setActiveGender(g.key)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeGender === g.key ? 'bg-gold/10 text-gold font-medium' : 'text-black/60 hover:text-black hover:bg-black/5'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">Marcas</h3>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => setActiveBrand('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !activeBrand ? 'bg-gold/10 text-gold font-medium' : 'text-black/60 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    Todas las marcas
                  </button>
                  {brands.map(brand => (
                    <button
                      key={brand.id}
                      onClick={() => { setActiveBrand(brand.slug); setActiveType('todas') }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeBrand === brand.slug ? 'bg-gold/10 text-gold font-medium' : 'text-black/60 hover:text-black hover:bg-black/5'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-black/40">
                Mostrando {filtered.length} resultados
              </p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:border-gold"
              >
                <option value="default">Por defecto</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
                <option value="name">Alfabético</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-black/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-display font-semibold text-black mb-2">No encontramos resultados</h3>
                <p className="text-black/50 mb-4">Intenta con otros términos de búsqueda o filtros.</p>
                <button
                  onClick={() => { setSearch(''); setActiveType('todas'); setActiveGender('todas'); setActiveBrand('') }}
                  className="text-gold font-medium hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
