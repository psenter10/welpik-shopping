'use client'
import Link from 'next/link'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, count, subtotal, savings } = useCart()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="bg-[#f7f3ec] p-0 w-full sm:max-w-md flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1b3a2e]" />
            <h3 className="font-serif text-xl text-[#1b3a2e]">Your Cart ({count})</h3>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-full bg-[#ede4d3] flex items-center justify-center mb-4">
              <ShoppingBag className="w-9 h-9 text-[#1b3a2e]" />
            </div>
            <div className="font-serif text-2xl text-[#1b3a2e] mb-2">Your cart is empty</div>
            <p className="text-stone-600 mb-6">Add wellness essentials to get started.</p>
            <Button onClick={() => setOpen(false)} className="bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full px-8">Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => (
                <div key={item.slug} className="flex gap-3 bg-white rounded-xl p-3 border border-stone-200">
                  <Link href={`/product/${item.slug}`} onClick={() => setOpen(false)} className="w-20 h-20 rounded-lg overflow-hidden bg-[#f4ede0] shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`} onClick={() => setOpen(false)} className="block">
                      <h4 className="text-sm font-medium text-[#1b3a2e] line-clamp-2 mb-1">{item.name}</h4>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-bold text-[#1b3a2e]">₹{item.price.toLocaleString()}</span>
                      {item.oldPrice && item.oldPrice > item.price && (
                        <span className="text-xs text-stone-400 line-through">₹{item.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-stone-300 rounded-full">
                        <button onClick={() => updateQty(item.slug, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-[#1b3a2e] hover:bg-stone-100 rounded-l-full"><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-sm font-medium text-[#1b3a2e]">{item.qty}</span>
                        <button onClick={() => updateQty(item.slug, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-[#1b3a2e] hover:bg-stone-100 rounded-r-full"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.slug)} className="text-stone-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 bg-white px-5 py-4 space-y-3">
              {savings > 0 && (
                <div className="flex justify-between text-sm text-emerald-700 font-medium">
                  <span>You save</span><span>₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-700">Subtotal</span>
                <span className="font-serif text-xl font-bold text-[#1b3a2e]">₹{subtotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-stone-500">Shipping & taxes calculated at checkout.</p>
              <Button className="w-full h-12 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-base font-semibold">
                Checkout • ₹{subtotal.toLocaleString()}
              </Button>
              <button onClick={() => setOpen(false)} className="w-full text-center text-sm text-[#1b3a2e] hover:underline py-2">Continue Shopping</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
