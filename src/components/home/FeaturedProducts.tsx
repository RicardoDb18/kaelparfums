import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../product/ProductCard'

export default function FeaturedProducts() {
  const featured = products.filter(p => p.isNew).slice(0, 4)

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Destacados</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3">
              Novedades
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-black/60 font-medium hover:text-gold transition-colors group"
          >
            Ver Todos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
