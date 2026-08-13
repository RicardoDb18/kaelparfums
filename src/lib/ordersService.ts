import { APPS_SCRIPT_URL, WHATSAPP_LINK } from '../constants'

export type ShippingMethod = 'shalom' | 'delivery' | 'tienda'

export interface AdminOrderLine {
  name: string
  ml: number
  price: number
  quantity: number
  onDemand: boolean
}

export interface AdminOrderClient {
  nombres: string
  celular: string
  dni: string
  destino: string
  direccion: string
  distrito: string
  referencia: string
}

export interface AdminOrder {
  estado: string
  client: AdminOrderClient
  shippingMethod: ShippingMethod
  lines: AdminOrderLine[]
  subtotal: number
  discount: number
  couponCode: string
  couponDiscount: number
  total: number
  notas: string
  source: 'admin' | 'web'
  fecha: string
}

interface SubmitResult {
  ok: boolean
  message: string
}

export async function submitOrder(order: AdminOrder): Promise<SubmitResult> {
  if (!APPS_SCRIPT_URL) {
    return { ok: false, message: 'Falta configurar APPS_SCRIPT_URL en src/constants.ts' }
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(order),
    })

    const text = await res.text()

    if (!res.ok) {
      return { ok: false, message: `El servidor respondió ${res.status}: ${text.slice(0, 200)}` }
    }

    try {
      const data = JSON.parse(text)
      if (data && data.ok === false) {
        return { ok: false, message: data.error || 'Error al guardar el pedido' }
      }
      return { ok: true, message: `Pedido guardado en la fila ${data?.row ?? ''}`.trim() }
    } catch {
      return { ok: true, message: 'Pedido enviado a la hoja de cálculo' }
    }
  } catch (err) {
    const cast = err as Error
    return { ok: false, message: `No se pudo conectar con el backend: ${cast?.message || 'error desconocido'}` }
  }
}

export const SHIPPING_LABEL: Record<ShippingMethod, string> = {
  shalom: 'Envío por Shalom',
  delivery: 'Envío por delivery (Lima)',
  tienda: 'Recojo en tienda',
}

export function buildOrderWhatsAppMessage(order: AdminOrder): string {
  const c = order.client
  let lines: string[] = [
    '🛒 *Pedido — Kael Parfums*',
    '',
    `Estado: ${order.estado}`,
    '',
    '👤 *Datos del cliente*',
    `Nombres: ${c.nombres}`,
    `Celular: ${c.celular}`,
  ]

  if (order.shippingMethod === 'shalom') {
    lines.push(`DNI: ${c.dni}`, `Destino Shalom: ${c.destino}`)
  }

  lines.push('', '📦 *Método de envío*', SHIPPING_LABEL[order.shippingMethod])

  if (order.shippingMethod === 'delivery') {
    lines.push(`Dirección: ${c.direccion}`)
    if (c.distrito) lines.push(`Distrito: ${c.distrito}`)
    if (c.referencia) lines.push(`Referencia: ${c.referencia}`)
  }

  lines.push('', '🧾 *Productos*')
  order.lines.forEach(l => {
    lines.push(
      `• ${l.name} x${l.quantity}${l.onDemand ? ' [A pedido]' : ''} — S/${(l.price * l.quantity).toFixed(2)}`
    )
  })

  lines.push('', '💰 *Resumen*', `Subtotal: S/${order.subtotal.toFixed(2)}`)
  if (order.discount > 0) lines.push(`Descuento decants: -S/${order.discount.toFixed(2)}`)
  if (order.couponDiscount > 0) lines.push(`Cupón ${order.couponCode}: -S/${order.couponDiscount.toFixed(2)}`)
  lines.push(`*Total: S/${order.total.toFixed(2)}*`)

  if (order.notas) lines.push('', `📝 *Notas*`, order.notas)

  return lines.join('\n')
}

export function openOrderInWhatsApp(order: AdminOrder) {
  window.open(WHATSAPP_LINK(buildOrderWhatsAppMessage(order)), '_blank')
}