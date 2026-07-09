import { Link } from 'react-router-dom'
import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

const brandColors: Record<string, string> = {
  Xerjoff: 'bg-zinc-800',
  'Maison Francis Kurkdjian': 'bg-zinc-800',
  Creed: 'bg-zinc-800',
  'Parfums de Marly': 'bg-zinc-800',
  'Tom Ford': 'bg-black',
  Kilian: 'bg-zinc-800',
  Amouage: 'bg-zinc-800',
  Mancera: 'bg-zinc-800',
  Montale: 'bg-zinc-800',
  Nishane: 'bg-zinc-800',
  Roja: 'bg-zinc-800',
  Nasomatto: 'bg-black',
  'Orto Parisi': 'bg-black',
  Dior: 'bg-zinc-800',
  Chanel: 'bg-black',
  'Yves Saint Laurent': 'bg-zinc-800',
  'Jean Paul Gaultier': 'bg-zinc-800',
  'Giorgio Armani': 'bg-zinc-800',
  'Paco Rabanne': 'bg-zinc-800',
  Versace: 'bg-zinc-800',
  'Carolina Herrera': 'bg-zinc-800',
  Lattafa: 'bg-zinc-800',
  Armaf: 'bg-zinc-800',
  Afnan: 'bg-zinc-800',
  Rasasi: 'bg-zinc-800',
  'Al Haramain': 'bg-zinc-800',
  'Swiss Arabian': 'bg-zinc-800',
  Ajmal: 'bg-zinc-800',
}

const typeColors: Record<string, string> = {
  arabes: 'bg-amber-900/80 text-amber-200 border-amber-700/50',
  disenador: 'bg-zinc-800 text-white border-zinc-600/50',
  nicho: 'bg-gold/20 text-gold border-gold/30',
}
const typeLabels: Record<string, string> = {
  arabes: 'Árabe',
  disenador: 'Diseñador',
  nicho: 'Nicho',
}

export default function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.concentrations.flatMap(c => c.sizes.map(s => s.price)))
  const hasDiscount = product.concentrations.some(c => c.sizes.some(s => s.originalPrice))

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className={`relative aspect-square ${brandColors[product.brand] || 'bg-zinc-800'} flex items-center justify-center overflow-hidden`}>
        <div className="text-white/5 text-8xl font-display font-bold select-none">
          {product.brand.charAt(0)}
        </div>
        <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${typeColors[product.categoryType]}`}>
          {typeLabels[product.categoryType]}
        </span>
        {product.isNew && (
          <span className="absolute top-3 left-[88px] bg-gold text-black text-xs font-semibold px-3 py-1 rounded-full">
            Nuevo
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
            -{product.concentrations[0]?.sizes[0] ? Math.round((1 - product.concentrations[0].sizes[0].price / (product.concentrations[0].sizes[0].originalPrice || product.concentrations[0].sizes[0].price)) * 100) : 0}%
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="font-display font-semibold text-lg text-black mb-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-zinc-200'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-black/40 ml-1">({product.reviews})</span>
        </div>
        <p className="text-xs text-black/50 mb-3 line-clamp-2">{product.description}</p>
        <p className="font-semibold text-black">
          Desde <span className="text-gold text-lg">S/{minPrice}</span>
          <span className="text-xs text-black/30 ml-1">PEN</span>
        </p>
        <div className="flex gap-1.5 mt-3">
          {product.concentrations.map(c => (
            <span key={c.type} className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
              {c.type}
            </span>
          ))}
          {product.concentrations[0]?.sizes.length && product.concentrations[0].sizes.filter(s => s.ml <= 10).length > 0 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-gold/10 text-gold">
              Decant
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
