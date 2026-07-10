import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

type ShippingMethod = 'shalom' | 'delivery' | 'tienda' | null

export default function Checkout() {
  const { items, total, discount, decantCount, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [method, setMethod] = useState<ShippingMethod>(null)
  const [form, setForm] = useState({
    nombres: '', dni: '', celular: '', destino: '', direccion: '', referencia: '', distrito: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (method === 'shalom') {
      if (!form.nombres || !form.dni || !form.celular || !form.destino) return
    }

    if (method === 'delivery') {
      if (!form.nombres || !form.celular || !form.direccion) return
    }

    if (method === 'tienda') {
      if (!form.nombres || !form.celular) return
    }

    const methodLabel = method === 'shalom' ? 'Envío por Shalom' : method === 'delivery' ? 'Envío por delivery (Lima)' : 'Recojo en tienda'

    let lines = [
      '🛒 *Nuevo Pedido — Kael Parfums*',
      '',
      '👤 *Datos del cliente*',
      `Nombres: ${form.nombres}`,
      `Celular: ${form.celular}`,
    ]

    if (method === 'shalom') {
      lines.push(`DNI: ${form.dni}`, `Destino Shalom: ${form.destino}`)
    }

    lines.push('', '📦 *Método de envío*', methodLabel)

    if (method === 'delivery') {
      lines.push(`Dirección: ${form.direccion}`)
      if (form.distrito) lines.push(`Distrito: ${form.distrito}`)
      if (form.referencia) lines.push(`Referencia: ${form.referencia}`)
    }

    lines.push('', '🧾 *Productos*')
    items.forEach(item => {
      lines.push(`• ${item.product.name} (${item.concentrationType} ${item.ml}ml) x${item.quantity} — S/${(item.price * item.quantity).toFixed(2)}`)
    })

    lines.push('', '💰 *Resumen*', `Subtotal: S/${subtotal.toFixed(2)}`)
    if (discount > 0) lines.push(`Descuento (${decantCount >= 5 ? '15%' : '10%'}): -S/${discount.toFixed(2)}`)
    lines.push(`*Total: S/${total.toFixed(2)}*`)

    const msg = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/51918123682?text=${msg}`, '_blank')

    setSubmitted(true)
    setTimeout(() => {
      clearCart()
      navigate('/')
    }, 4000)
  }

  if (items.length === 0 && !submitted) {
    return (
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-display font-bold text-black mb-4">Carrito vacío</h1>
          <Link to="/shop" className="text-gold font-medium hover:underline">Ir al catálogo</Link>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="pt-28 pb-20">
        <div className="max-w-lg mx-auto px-6 text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-black mb-3">¡Pedido recibido!</h1>
          <p className="text-black/50 mb-2">Nos pondremos en contacto contigo para coordinar la entrega.</p>
          <p className="text-black/30 text-sm">Redirigiendo al inicio...</p>
        </div>
      </main>
    )
  }

  const shippingOptions: { value: NonNullable<ShippingMethod>; label: string; desc: string }[] = [
    { value: 'shalom', label: 'Envío por Shalom', desc: 'Delivery a todo el Perú vía Shalom' },
    { value: 'delivery', label: 'Envío por delivery', desc: 'Delivery en Lima Metropolitana' },
    { value: 'tienda', label: 'Recojo en tienda', desc: 'Recoge tu pedido en nuestra tienda' },
  ]

  const iconMap: Record<string, ReactNode> = {
    shalom: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    delivery: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    tienda: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  }

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <Link to="/cart" className="text-sm text-black/40 hover:text-gold transition-colors">&larr; Volver al carrito</Link>
          <h1 className="text-3xl font-display font-bold text-black mt-2">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="text-lg font-display font-semibold text-black mb-5">Método de envío</h2>
            <div className="space-y-3 mb-8">
              {shippingOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {       setMethod(opt.value); setForm({ nombres: '', dni: '', celular: '', destino: '', direccion: '', referencia: '', distrito: '' }) }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    method === opt.value
                      ? 'border-gold bg-gold/5'
                      : 'border-black/10 hover:border-black/20'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    method === opt.value ? 'bg-gold text-black' : 'bg-zinc-100 text-black/40'
                  }`}>
                    {iconMap[opt.value]}
                  </span>
                  <div>
                    <p className="font-medium text-black text-sm">{opt.label}</p>
                    <p className="text-xs text-black/40">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {method && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      Nombres y apellidos <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text" name="nombres" value={form.nombres} onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      Celular <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel" name="celular" value={form.celular} onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="999 888 777"
                    />
                  </div>
                </div>

                {method === 'shalom' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        DNI <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text" name="dni" value={form.dni} onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                        placeholder="8 dígitos (mayor de edad)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        Destino — Nombre de la agencia Shalom <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text" name="destino" value={form.destino} onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                        placeholder="Ej: Shalom — Arequipa"
                      />
                    </div>
                  </>
                )}

                {method === 'delivery' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        Dirección <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text" name="direccion" value={form.direccion} onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                        placeholder="Av. / Jr. / Calle, N°"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-1.5">Distrito</label>
                        <input
                          type="text" name="distrito" value={form.distrito} onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                          placeholder="Distrito"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-1.5">Referencia</label>
                        <input
                          type="text" name="referencia" value={form.referencia} onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                          placeholder="Cerca de..."
                        />
                      </div>
                    </div>
                  </>
                )}

                {method === 'tienda' && (
                  <div className="bg-zinc-50 rounded-xl border border-black/5 p-4 text-sm text-black/50">
                    <p className="font-medium text-black mb-1">Dirección de tienda</p>
                    <p>Pueblo Libre, Lima</p>
                    <p className="mt-2 text-xs">Te contactaremos para coordinar el recojo.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-2 px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Confirmar Pedido — S/{total.toFixed(2)}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-zinc-50 rounded-2xl border border-black/5 p-6 sticky top-28">
              <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">Resumen</h3>
              <div className="space-y-3 mb-4">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-black/50 truncate max-w-[180px]">
                      {item.product.name} ({item.ml}ml) x{item.quantity}
                    </span>
                    <span className="text-black font-medium">S/{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/10 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">Subtotal</span>
                  <span className="text-black">S/{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gold">Descuento ({decantCount >= 5 ? '15%' : '10%'})</span>
                    <span className="text-gold">-S/{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-black/10">
                  <span className="font-semibold text-black">Total</span>
                  <span className="font-display font-bold text-lg text-gold">S/{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
