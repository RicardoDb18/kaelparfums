import { Link } from 'react-router-dom'
import { brands } from '../../data/products'

export default function BrandSlider() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Marcas</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3">
            Las Mejores Casas de Perfumería
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {brands.map(brand => (
            <Link
              key={brand.id}
              to={`/shop?brand=${brand.slug}`}
              className="group flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl hover:bg-gold/10 transition-all duration-300 border border-white/5 hover:border-gold/30"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-gold transition-colors">
                <span className="text-lg font-display font-bold text-white group-hover:text-black transition-colors">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-display font-medium text-white/80 group-hover:text-gold transition-colors text-center">
                {brand.name}
              </span>
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors mt-1">
                {brand.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
