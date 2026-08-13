import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ADMIN_PASSWORD } from '../constants'
import { openOrderInWhatsApp, submitOrder, type AdminOrder, type AdminOrderLine } from '../lib/ordersService'

const SESSION_KEY = 'kael_admin_session'
const ORDERS_KEY = 'kael_orders'

type ShippingMethod = AdminOrder['shippingMethod']

const STATUS_OPTIONS = ['Nuevo', 'Pago pendiente', 'Pagado', 'Enviado', 'Entregado', 'Anulado']
const COUPON_OPTIONS = ['', 'KAEL20', 'SEBAS1028']

interface LineDraft {
  key: number
  name: string
  ml: number
  price: string
  quantity: string
  onDemand: boolean
}

interface StoredOrder {
  fecha: string
  mensaje: string
  order: AdminOrder
}

function parseMl(name: string): number {
  const match = name.match(/(\d+)\s*ml/i)
  return match ? Number(match[1]) : 0
}

let nextKey = 1

export default function Admin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(SESSION_KEY) === '1')
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')

  const [status, setStatus] = useState('Nuevo')
  const [method, setMethod] = useState<ShippingMethod>('tienda')
  const [client, setClient] = useState({ nombres: '', celular: '', dni: '', destino: '', direccion: '', distrito: '', referencia: '' })
  const [notas, setNotas] = useState('')
  const [coupon, setCoupon] = useState('')
  const [lines, setLines] = useState<LineDraft[]>([{ key: 0, name: '', ml: 0, price: '', quantity: '1', onDemand: false }])
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [stored, setStored] = useState<StoredOrder[]>(() => {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') } catch { return [] }
  })

  const usedMl = (row: LineDraft) => row.ml || parseMl(row.name)

  const catalogOptions = useMemo(() => {
    const opts: { id: string; label: string; name: string; ml: number; price: number }[] = []
    for (const p of products) {
      for (const c of p.concentrations) {
        for (const s of c.sizes) {
          opts.push({
            id: `${p.id}|${c.type}|${s.ml}`,
            label: `${p.name} — ${c.type} ${s.ml}ml — S/${s.price.toFixed(2)}${s.inStock ? '' : ' (agotado)'}`,
            name: `${p.name} (${c.type} ${s.ml}ml)`,
            ml: s.ml,
            price: s.price,
          })
        }
      }
    }
    return opts
  }, [])

  const parsed = useMemo(() => {
    const mapped = lines.map(l => ({
      ml: usedMl(l),
      price: Number(l.price) || 0,
      quantity: Number(l.quantity) || 0,
      onDemand: l.onDemand,
    }))
    const subtotal = mapped.reduce((s, l) => s + l.price * l.quantity, 0)
    const decantable = mapped.filter(l => !l.onDemand && l.ml <= 10)
    const decantCount = decantable.reduce((s, l) => s + l.quantity, 0)
    const decantSubtotal = decantable.reduce((s, l) => s + l.price * l.quantity, 0)
    const rate = decantCount >= 6 ? 0.15 : decantCount >= 3 ? 0.1 : 0
    const discount = decantSubtotal * rate
    const couponDiscount = coupon
      ? mapped.filter(l => !l.onDemand && l.ml > 10).reduce((s, l) => s + l.quantity * 20, 0)
      : 0
    const total = subtotal - discount - couponDiscount
    return { subtotal, discount, couponDiscount, total, decantCount }
  }, [lines, coupon])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      setPwError('')
    } else {
      setPwError('Contraseña incorrecta')
    }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value })
  }

  const updateLine = (key: number, patch: Partial<LineDraft>) => {
    setLines(prev => prev.map(l => (l.key === key ? { ...l, ...patch } : l)))
  }

  const addLine = () => {
    setLines(prev => [...prev, { key: nextKey++, name: '', ml: 0, price: '', quantity: '1', onDemand: false }])
  }

  const removeLine = (key: number) => {
    setLines(prev => (prev.length > 1 ? prev.filter(l => l.key !== key) : prev))
  }

  const parseLineLabel = (row: LineDraft, name: string) => {
    const exact = catalogOptions.find(o => o.label === name)
    if (exact) {
      updateLine(row.key, { name: exact.name, ml: exact.ml, price: String(exact.price) })
    } else {
      updateLine(row.key, { name, ml: parseMl(name) })
    }
  }

  const buildOrder = (): AdminOrder => ({
    estado: status,
    client: { ...client },
    shippingMethod: method,
    lines: lines
      .filter(l => l.name.trim() && (Number(l.price) || 0) > 0)
      .map<AdminOrderLine>(l => ({
        name: l.name.trim(),
        ml: usedMl(l),
        price: Number(l.price) || 0,
        quantity: Number(l.quantity) || 1,
        onDemand: l.onDemand,
      })),
    subtotal: parsed.subtotal,
    discount: parsed.discount,
    couponCode: coupon,
    couponDiscount: parsed.couponDiscount,
    total: parsed.total,
    notas,
    source: 'admin',
    fecha: new Date().toISOString(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!client.nombres || !client.celular) {
      setResult({ ok: false, message: 'Completa Nombres y Celular' })
      return
    }
    const order = buildOrder()
    if (order.lines.length === 0) {
      setResult({ ok: false, message: 'Agrega al menos un producto' })
      return
    }
    setSaving(true)
    setResult(null)
    const res = await submitOrder(order)
    setSaving(false)
    setResult(res)
    if (res.ok) {
      const entry: StoredOrder = {
        fecha: order.fecha,
        mensaje: `${order.client.celular} — S/${order.total.toFixed(2)}`,
        order,
      }
      const next = [entry, ...stored].slice(0, 30)
      setStored(next)
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
      setLines([{ key: nextKey++, name: '', ml: 0, price: '', quantity: '1', onDemand: false }])
      setNotas('')
      setCoupon('')
    }
  }

  if (!authed) {
    return (
      <main className="pt-28 pb-20">
        <div className="max-w-sm mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-black mb-1">Panel de Administración</h1>
            <p className="text-sm text-black/40">Ingresa tu contraseña para continuar</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password" value={pw} onChange={e => setPw(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
            />
            {pwError && <p className="text-sm text-red-600">{pwError}</p>}
            <button type="submit" className="w-full px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors">
              Entrar
            </button>
            <p className="text-center text-sm text-black/30">
              <Link to="/" className="hover:text-gold transition-colors">&larr; Volver a la tienda</Link>
            </p>
          </form>
        </div>
      </main>
    )
  }

  const inputCls = 'w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors'
  const labelCls = 'block text-sm font-medium text-black mb-1.5'

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-black">Panel de Administración</h1>
            <p className="text-sm text-black/40 mt-1">Registra pedidos manuales y envíalos a tu Google Sheet de pedidos.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-black/40 hover:text-gold transition-colors">Ver tienda</Link>
            <button onClick={logout} className="text-sm text-red-600 hover:underline">Salir</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-zinc-50 rounded-2xl border border-black/5 p-6">
              <h2 className="text-lg font-display font-semibold text-black mb-5">Nuevo pedido</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Estado</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Método de envío</label>
                    <select value={method} onChange={e => setMethod(e.target.value as ShippingMethod)} className={inputCls}>
                      <option value="shalom">Envío por Shalom</option>
                      <option value="delivery">Envío por delivery (Lima)</option>
                      <option value="tienda">Recojo en tienda</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-3">Datos del cliente</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Nombres y apellidos <span className="text-gold">*</span></label>
                      <input type="text" name="nombres" value={client.nombres} onChange={handleClientChange} className={inputCls} placeholder="Nombre completo" />
                    </div>
                    <div>
                      <label className={labelCls}>Celular <span className="text-gold">*</span></label>
                      <input type="tel" name="celular" value={client.celular} onChange={handleClientChange} className={inputCls} placeholder="999 888 777" />
                    </div>
                    {method === 'shalom' && (
                      <>
                        <div>
                          <label className={labelCls}>DNI</label>
                          <input type="text" name="dni" value={client.dni} onChange={handleClientChange} className={inputCls} placeholder="8 dígitos" />
                        </div>
                        <div>
                          <label className={labelCls}>Destino — Agencia Shalom</label>
                          <input type="text" name="destino" value={client.destino} onChange={handleClientChange} className={inputCls} placeholder="Ej: Shalom — Arequipa" />
                        </div>
                      </>
                    )}
                    {method === 'delivery' && (
                      <>
                        <div>
                          <label className={labelCls}>Dirección</label>
                          <input type="text" name="direccion" value={client.direccion} onChange={handleClientChange} className={inputCls} placeholder="Av. / Jr. / Calle, N°" />
                        </div>
                        <div>
                          <label className={labelCls}>Distrito</label>
                          <input type="text" name="distrito" value={client.distrito} onChange={handleClientChange} className={inputCls} placeholder="Distrito" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Referencia</label>
                          <input type="text" name="referencia" value={client.referencia} onChange={handleClientChange} className={inputCls} placeholder="Cerca de..." />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-black uppercase tracking-wider">Productos</h3>
                    <button type="button" onClick={addLine} className="text-sm text-gold font-medium hover:underline">+ Agregar producto</button>
                  </div>

                  <div className="space-y-4">
                    {lines.map(line => (
                      <div key={line.key} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-12 sm:col-span-5">
                          <label className={labelCls}>Producto</label>
                          <input
                            list="catalog"
                            value={line.name}
                            onChange={e => parseLineLabel(line, e.target.value)}
                            className={inputCls}
                            placeholder="Escribe o elige del catálogo"
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <label className={labelCls}>Precio (S/)</label>
                          <input
                            type="number" min="0" step="0.01"
                            value={line.price}
                            onChange={e => updateLine(line.key, { price: e.target.value })}
                            className={inputCls}
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <label className={labelCls}>Cant.</label>
                          <input
                            type="number" min="1"
                            value={line.quantity}
                            onChange={e => updateLine(line.key, { quantity: e.target.value })}
                            className={inputCls}
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-black mb-1.5">&nbsp;</label>
                          <label className="flex items-center gap-2 text-xs text-black/50 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={line.onDemand}
                              onChange={e => updateLine(line.key, { onDemand: e.target.checked })}
                              className="accent-gold"
                            />
                            A pedido
                          </label>
                        </div>
                        <div className="col-span-2 sm:col-span-2 flex sm:flex-col items-center sm:items-end gap-2 sm:border-l sm:border-black/10 sm:pl-4">
                          <label className="hidden sm:block text-sm font-medium text-black mb-1.5">&nbsp;</label>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            className="text-xs text-red-600 hover:underline whitespace-nowrap"
                          >
                            Quitar
                          </button>
                        </div>
                        <div className="col-span-10 sm:col-span-6 text-xs text-black/40 sm:hidden">
                          {(parsed.subtotal > 0 || line.price) && `Subtotal línea: S/${(((Number(line.price) || 0) * (Number(line.quantity) || 0))).toFixed(2)}`}
                        </div>
                      </div>
                    ))}
                  </div>
                  <datalist id="catalog">
                    {catalogOptions.map(o => <option key={o.id} value={o.label} />)}
                  </datalist>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Cupón</label>
                    <select value={coupon} onChange={e => setCoupon(e.target.value)} className={inputCls}>
                      {COUPON_OPTIONS.map(c => <option key={c} value={c}>{c === '' ? 'Sin cupón' : c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Notas</label>
                    <input type="text" value={notas} onChange={e => setNotas(e.target.value)} className={inputCls} placeholder="Comentarios (opcional)" />
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/50">Subtotal</span>
                    <span>S/{parsed.subtotal.toFixed(2)}</span>
                  </div>
                  {parsed.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gold">Descuento decants ({parsed.decantCount} decants)</span>
                      <span className="text-gold">-S/{parsed.discount.toFixed(2)}</span>
                    </div>
                  )}
                  {parsed.couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Cupón {coupon}</span>
                      <span className="text-green-600">-S/{parsed.couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-black/10">
                    <span className="font-semibold">Total</span>
                    <span className="font-display font-bold text-lg text-gold">S/{parsed.total.toFixed(2)}</span>
                  </div>
                </div>

                {result && (
                  <p className={`text-sm ${result.ok ? 'text-green-600' : 'text-red-600'}`}>{result.message}</p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {saving ? 'Guardando ...' : 'Guardar pedido'}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-zinc-50 rounded-2xl border border-black/5 p-6 sticky top-28">
              <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">Últimos pedidos registrados</h3>
              {stored.length === 0 ? (
                <p className="text-sm text-black/30">Aún no hay pedidos registrados en este dispositivo.</p>
              ) : (
                <ul className="space-y-4">
                  {stored.map((o, i) => (
                    <li key={i} className="border-b border-black/5 pb-3 last:border-0">
                      <p className="text-sm font-medium text-black">{o.order.client.nombres}</p>
                      <p className="text-xs text-black/40">{o.mensaje}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-black/30">{new Date(o.fecha).toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
                        <button
                          type="button"
                          onClick={() => openOrderInWhatsApp(o.order)}
                          className="text-xs text-green-600 hover:underline"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}