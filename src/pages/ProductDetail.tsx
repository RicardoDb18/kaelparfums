import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/product/ProductCard'

function typeLabel(t: string) {
  return t === 'arabes' ? 'Perfumes Árabes' : t === 'disenador' ? 'Perfumes de Diseñador' : 'Perfumes de Nicho'
}

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === id)
  const [selectedConcentration, setSelectedConcentration] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-display font-bold text-black mb-4">Producto no encontrado</h1>
          <Link to="/shop" className="text-gold font-medium hover:underline">Volver al catálogo</Link>
        </div>
      </main>
    )
  }

  const concentration = product.concentrations[selectedConcentration]
  const size = concentration?.sizes[selectedSize]
  const related = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 4)

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-black/40 mb-10">
          <Link to="/" className="hover:text-gold">Inicio</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold">Catálogo</Link>
          <span>/</span>
          <Link to={`/shop?type=${product.categoryType}`} className="hover:text-gold">{typeLabel(product.categoryType)}</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          <div className="aspect-square rounded-2xl bg-black flex items-center justify-center">
            {product.images[0] ? (
              <img src={import.meta.env.BASE_URL + product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-white/5 text-[12rem] font-display font-bold select-none">
                {product.brand.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <p className="text-gold text-sm font-medium uppercase tracking-wider mb-2">{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mb-5">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-zinc-200'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-black/50 ml-2">{product.rating} ({product.reviews} reseñas)</span>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                  product.categoryType === 'arabes' ? 'bg-amber-900/10 text-amber-800 border-amber-200'
                  : product.categoryType === 'disenador' ? 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  : 'bg-gold/10 text-gold-dark border-gold/30'
                }`}>
                  {product.categoryType === 'arabes' ? 'Árabe' : product.categoryType === 'disenador' ? 'Diseñador' : 'Nicho'}
                </span>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                  product.gender === 'masculino' ? 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  : product.gender === 'femenino' ? 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                }`}>
                  {product.gender === 'masculino' ? 'Masculino' : product.gender === 'femenino' ? 'Femenino' : 'Unisex'}
                </span>
              </div>
            </div>

            <p className="text-black/60 leading-relaxed mb-10">{product.description}</p>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">Notas Olfativas</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map(note => (
                  <span key={note} className="px-3 py-1.5 bg-zinc-50 text-black/70 text-sm rounded-full border border-black/5">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">Concentración</h3>
              <div className="flex gap-2">
                {product.concentrations.map((c, i) => (
                  <button
                    key={c.type}
                    onClick={() => { setSelectedConcentration(i); setSelectedSize(0) }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedConcentration === i
                        ? 'bg-gold text-black'
                        : 'bg-zinc-100 text-black/60 hover:bg-zinc-200'
                    }`}
                  >
                    {c.type}
                  </button>
                ))}
              </div>
            </div>

            {concentration && (
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">Tamaño</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {concentration.sizes.map((s, i) => (
                    <button
                      key={s.ml}
                      onClick={() => setSelectedSize(i)}
                      disabled={!s.inStock}
                      className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                        !s.inStock
                          ? 'border-black/5 text-black/20 cursor-not-allowed bg-zinc-50'
                          : selectedSize === i
                            ? 'border-gold bg-gold/5 text-gold-dark'
                            : 'border-black/10 text-black/60 hover:border-black/20'
                      }`}
                    >
                      <span className="block font-semibold">{s.ml}ml</span>
                      <span className="block text-xs mt-0.5">
                        {s.originalPrice && (
                          <span className="line-through text-black/30 mr-1">S/{s.originalPrice}</span>
                        )}
                        <span className={selectedSize === i ? 'text-gold-dark' : 'text-black/40'}>S/{s.price}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {size && size.inStock && (
              <>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center border border-black/10 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-black/50 hover:text-black transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-4 py-2 font-medium text-black min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-black/50 hover:text-black transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product, concentration.type, size.ml, size.price, quantity)}
                  className="flex-1 px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    Agregar al Carrito — S/{(size.price * quantity).toFixed(2)}
                  </button>
                </div>
                {size.ml <= 10 && (
                  <Link
                    to="/promociones"
                    className="block text-xs text-center text-gold font-medium mb-8 hover:underline"
                  >
                    🎉 Descuentos por volumen: 10% OFF en 3+ decants · 15% OFF en 5+ decants
                  </Link>
                )}
              </>
            )}

            <div className="border-t border-black/5 pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-black/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Envío seguro a todo el país
              </div>
              <div className="flex items-center gap-2 text-sm text-black/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Producto 100% original garantizado
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-black mb-8">
              Más de {product.brand}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
