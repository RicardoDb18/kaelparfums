import { Link } from 'react-router-dom'
import { brands, products } from '../data/products'

export default function Brands() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Marcas</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3">
            Nuestras Marcas
          </h1>
          <p className="text-black/50 mt-3 max-w-xl mx-auto">
            Trabajamos con las casas de perfumería más prestigiosas del mundo para ofrecerte lo mejor en fragancias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map(brand => {
            const brandProducts = products.filter(p => p.brand === brand.name)
            return (
              <Link
                key={brand.id}
                to={`/shop?brand=${brand.slug}`}
                className="group bg-white rounded-2xl border border-black/5 p-8 hover:shadow-md hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors">
                  <span className="text-2xl font-display font-bold text-black group-hover:text-white transition-colors">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-black mb-2 group-hover:text-gold transition-colors">
                  {brand.name}
                </h3>
                <p className="text-black/50 text-sm mb-4">{brand.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/30">{brandProducts.length} fragancias</span>
                  <span className="text-sm text-gold font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explorar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
