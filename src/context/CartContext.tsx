import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import type { Product } from '../types'

export interface CartItem {
  product: Product
  concentrationType: string
  ml: number
  price: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, concentrationType: string, ml: number, price: number, quantity: number) => void
  removeFromCart: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  decantCount: number
  subtotal: number
  discount: number
  total: number
  showToast: boolean
  toastMessage: string
  dismissToast: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const dismissToast = useCallback(() => setShowToast(false), [])

  const addToCart = useCallback((product: Product, concentrationType: string, ml: number, price: number, quantity: number) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.concentrationType === concentrationType && i.ml === ml
      )
      if (existingIndex >= 0) {
        const next = [...prev]
        next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + quantity }
        return next
      }
      return [...prev, { product, concentrationType, ml, price, quantity }]
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

  const clearCart = useCallback(() => setItems([]), [])

  const { totalItems, decantCount, subtotal, discount } = useMemo(() => {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0)
    const decantCount = items.reduce((s, i) => s + (i.ml <= 10 ? i.quantity : 0), 0)
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

    let discount = 0
    if (decantCount >= 5) discount = subtotal * 0.15
    else if (decantCount >= 3) discount = subtotal * 0.10

    return { totalItems, decantCount, subtotal, discount }
  }, [items])

  const total = subtotal - discount

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, decantCount, subtotal, discount, total,
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
