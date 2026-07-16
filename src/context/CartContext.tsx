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
  couponApplied: boolean
  couponDiscount: number
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  total: number
  showToast: boolean
  toastMessage: string
  dismissToast: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const VALID_COUPON = 'CYBERWOW'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const dismissToast = useCallback(() => setShowToast(false), [])

  const addToCart = useCallback((product: Product, concentrationType: string, ml: number, price: number, quantity: number, onDemand?: boolean) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.concentrationType === concentrationType && i.ml === ml
      )
      if (existingIndex >= 0) {
        const next = [...prev]
        next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + quantity }
        return next
      }
      return [...prev, { product, concentrationType, ml, price, quantity, onDemand }]
    })
    setToastMessage(`${product.name} ${ml}ml x${quantity} agregado al carrito`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }, [])

  const removeFromCart = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems(prev => {
      const next = [...prev]
      next[index] = { ...next[index], quantity: Math.max(1, quantity) }
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setCouponCode('')
    setCouponApplied(false)
  }, [])

  const applyCoupon = useCallback((code: string) => {
    if (code.trim().toUpperCase() === VALID_COUPON) {
      setCouponCode(VALID_COUPON)
      setCouponApplied(true)
      return true
    }
    return false
  }, [])

  const removeCoupon = useCallback(() => {
    setCouponCode('')
    setCouponApplied(false)
  }, [])

  const { totalItems, decantCount, subtotal, discount, couponDiscount } = useMemo(() => {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0)

    const discountableItems = items.filter(i => !i.onDemand && i.product.categoryType !== 'nicho')
    const decantCount = discountableItems.reduce((s, i) => s + (i.ml <= 10 ? i.quantity : 0), 0)
    const decantSubtotal = discountableItems.reduce((s, i) => s + (i.ml <= 10 ? i.price * i.quantity : 0), 0)
    const perfumeSubtotal = discountableItems.reduce((s, i) => s + (i.ml > 10 ? i.price * i.quantity : 0), 0)
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

    const discountRate = decantCount >= 5 ? 0.15 : decantCount >= 3 ? 0.10 : 0
    let discount = decantSubtotal * discountRate

    let couponDiscount = 0
    if (couponApplied) {
      const decantCoupon = discountableItems.reduce((s, i) => {
        if (i.ml > 10) return s
        const lineTotal = i.price * i.quantity
        return s + lineTotal * (1 - discountRate) * 0.10
      }, 0)
      const perfumeCoupon = discountableItems.reduce((s, i) => {
        if (i.ml <= 10) return s
        const lineTotal = i.price * i.quantity
        return s + lineTotal * 0.20
      }, 0)
      couponDiscount = decantCoupon + perfumeCoupon
    }

    return { totalItems, decantCount, subtotal, discount, couponDiscount }
  }, [items, couponApplied])

  const total = subtotal - discount - couponDiscount

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, decantCount, subtotal, discount,
      couponCode, couponApplied, couponDiscount, applyCoupon, removeCoupon,
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
