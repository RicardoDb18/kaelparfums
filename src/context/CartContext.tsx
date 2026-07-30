import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import type { Product } from '../types'

export interface CartItem {
  product: Product
  concentrationType: string
  ml: number
  price: number
  quantity: number
  onDemand?: boolean
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, concentrationType: string, ml: number, price: number, quantity: number, onDemand?: boolean) => void
  removeFromCart: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  decantCount: number
  subtotal: number
  discount: number
  couponCode: string
  couponDiscount: number
  applyCoupon: (code: string) => boolean
  clearCoupon: () => void
  total: number
  showToast: boolean
  toastMessage: string
  dismissToast: () => void
}

const CartContext = createContext<CartContextType | null>(null)

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem('kael_cart')
    if (saved) return JSON.parse(saved)
  } catch {}
  return []
}

const VALID_COUPONS = ['KAEL20', 'SEBAS1028']

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [couponCode, setCouponCode] = useState('')

  const dismissToast = useCallback(() => setShowToast(false), [])

  const persist = useCallback((next: CartItem[]) => {
    localStorage.setItem('kael_cart', JSON.stringify(next))
  }, [])

  const addToCart = useCallback((product: Product, concentrationType: string, ml: number, price: number, quantity: number, onDemand?: boolean) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.concentrationType === concentrationType && i.ml === ml
      )
      let next: CartItem[]
      if (existingIndex >= 0) {
        next = [...prev]
        next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + quantity }
      } else {
        next = [...prev, { product, concentrationType, ml, price, quantity, onDemand }]
      }
      persist(next)
      return next
    })
    setToastMessage(`${product.name} ${ml}ml x${quantity} agregado al carrito`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }, [persist])

  const removeFromCart = useCallback((index: number) => {
    setItems(prev => {
      const next = prev.filter((_, i) => i !== index)
      persist(next)
      return next
    })
  }, [persist])

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems(prev => {
      const next = [...prev]
      next[index] = { ...next[index], quantity: Math.max(1, quantity) }
      persist(next)
      return next
    })
  }, [persist])

  const clearCart = useCallback(() => {
    setItems([])
    persist([])
  }, [persist])

  const applyCoupon = useCallback((code: string) => {
    const trimmed = code.toUpperCase().trim()
    if (!VALID_COUPONS.includes(trimmed)) return false
    setCouponCode(trimmed)
    return true
  }, [])

  const clearCoupon = useCallback(() => {
    setCouponCode('')
  }, [])

  const { totalItems, decantCount, subtotal, discount, couponDiscount } = useMemo(() => {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0)

    const discountableItems = items.filter(i => !i.onDemand && i.product.categoryType !== 'nicho')
    const decantCount = discountableItems.reduce((s, i) => s + (i.ml <= 10 ? i.quantity : 0), 0)
    const decantSubtotal = discountableItems.reduce((s, i) => s + (i.ml <= 10 ? i.price * i.quantity : 0), 0)
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

    const discountRate = decantCount >= 6 ? 0.15 : decantCount >= 3 ? 0.10 : 0
    const discount = decantSubtotal * discountRate

    const couponDiscount = VALID_COUPONS.includes(couponCode)
      ? items.reduce((s, i) => s + (!i.onDemand && i.ml > 10 ? i.quantity * 20 : 0), 0)
      : 0

    return { totalItems, decantCount, subtotal, discount, couponDiscount }
  }, [items, couponCode])

  const total = subtotal - discount - couponDiscount

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, decantCount, subtotal, discount,
      couponCode, couponDiscount, applyCoupon, clearCoupon,
      total,
      showToast, toastMessage, dismissToast,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
