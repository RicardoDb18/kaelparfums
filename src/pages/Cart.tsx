import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const typeLabels: Record<string, string> = {
  arabes: 'Árabe', disenador: 'Diseñador', nicho: 'Nicho',
}

export default function Cart() {
  const navigate = useNavigate()
  const { items, totalItems, decantCount, subtotal, discount, couponApplied, couponDiscount, total, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  if (items.length === 0) {
    return (
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-black">Tu Carrito</h1>
          </div>
          <div className="text-center py-24">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-black/10 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-display font-semibold text-black mb-3">Tu carrito está vacío</h2>
            <p className="text-black/50 mb-8">Explora nuestro catálogo y descubre fragancias exclusivas.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors">
              Ir al Catálogo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-black">Tu Carrito</h1>
            <p className="text-black/50 text-sm mt-1">{totalItems} artículo{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={clearCart} className="text-sm text-black/40 hover:text-black transition-colors">
            Vaciar carrito
          </button>
        </div>

        {discount > 0 && (
          <div className="mb-4 bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-xl p-4">
            <p className="text-sm font-medium text-gold">
              🎉 Descuento por volumen aplicado: {decantCount >= 5 ? '15% OFF' : '10% OFF'} ({decantCount} decants)
            </p>
          </div>
        )}

        {!couponApplied ? (
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const ok = applyCoupon(couponInput)
                  if (!ok) setCouponError('Cupón inválido')
                  else setCouponInput('')
                }
              }}
              placeholder="Cupón de descuento"
              className="flex-1 px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              onClick={() => {
                const ok = applyCoupon(couponInput)
                if (!ok) setCouponError('Cupón inválido')
                else setCouponInput('')
              }}
              className="px-5 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
            >
              Aplicar
            </button>
          </div>
        ) : (
          <div className="mb-6 bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gold">🎉 Cupón CYBERWOW aplicado</p>
              <p className="text-xs text-gold/60 mt-0.5">10% OFF en decants · 20% OFF en perfumes</p>
            </div>
            <button onClick={removeCoupon} className="text-xs text-black/40 hover:text-black transition-colors underline">
              Quitar
            </button>
          </div>
        )}
        {couponError && (
          <p className="text-xs text-red-500 mb-4 -mt-4">{couponError}</p>
        )}

        <div className="space-y-4 mb-10">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl border border-black/5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-black flex items-center justify-center shrink-0">
                <span className="text-white/10 text-lg sm:text-xl font-display font-bold">{item.product.brand.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <Link to={`/product/${item.product.id}`} className="font-display font-semibold text-black hover:text-gold transition-colors">
                  {item.product.name}
                </Link>
                <p className="text-xs text-black/40 mt-0.5">
                  {item.product.brand} · {item.concentrationType} · {item.ml}ml · {typeLabels[item.product.categoryType]}
                  {item.onDemand && <span className="text-amber-600 font-medium ml-1">· A pedido</span>}
                </p>
                <p className="text-sm font-medium text-gold mt-1">S/{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4 sm:gap-0">
                <div className="flex items-center border border-black/10 rounded-lg">
                  <button
                    onClick={() => updateQuantity(i, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-black/40 hover:text-black transition-colors text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-3 py-1.5 font-medium text-black text-sm min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(i, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-black/40 hover:text-black transition-colors text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <p className="font-semibold text-black sm:min-w-[5rem] text-right">S/{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(i)} className="p-1.5 text-black/20 hover:text-black/60 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-md sm:ml-auto w-full">
          <div className="bg-zinc-50 rounded-2xl border border-black/5 p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-black/50">Subtotal</span>
              <span className="text-black font-medium">S/{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gold">Descuento ({decantCount >= 5 ? '15%' : '10%'})</span>
                <span className="text-gold font-medium">-S/{discount.toFixed(2)}</span>
              </div>
            )}
            {couponApplied && couponDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gold">Cupón CYBERWOW</span>
                <span className="text-gold font-medium">-S/{couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-black/10 pt-3 flex justify-between">
              <span className="text-black font-semibold">Total</span>
              <span className="text-xl font-display font-bold text-gold">S/{total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full mt-4 px-8 py-4 bg-gold text-black font-semibold rounded-xl hover:bg-gold-light transition-colors text-lg">
            Proceder al Pago
          </button>
        </div>
      </div>
    </main>
  )
}
