'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zh_cart')
      if (stored) setItems(JSON.parse(stored))
    } catch (e) {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem('zh_cart', JSON.stringify(items)) } catch (e) {}
    }
  }, [items, hydrated])

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === product.slug)
      if (existing) return prev.map(i => i.slug === product.slug ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { slug: product.slug, name: product.name, img: product.img, price: product.price, oldPrice: product.oldPrice, qty }]
    })
    setOpen(true)
  }

  const removeItem = (slug) => setItems(prev => prev.filter(i => i.slug !== slug))
  const updateQty = (slug, qty) => setItems(prev => qty <= 0 ? prev.filter(i => i.slug !== slug) : prev.map(i => i.slug === slug ? { ...i, qty } : i))
  const clear = () => setItems([])

  const count = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const savings = items.reduce((s, i) => s + i.qty * Math.max(0, (i.oldPrice || i.price) - i.price), 0)

  return (
    <CartContext.Provider value={{ items, open, setOpen, addItem, removeItem, updateQty, clear, count, subtotal, savings }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
