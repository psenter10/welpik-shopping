'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

const NAV = [
  { label: 'Shop All', href: '/collections/all' },
  { label: 'Mens Health', href: '/collections/mens-health' },
  { label: 'Womens Health', href: '/collections/womens-health' },
  { label: 'Gut Health', href: '/collections/gut-health' },
  { label: 'Beauty', href: '/collections/beauty' },
  { label: 'Diabetic Care', href: '/collections/diabetic-care' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
]

export default function SiteHeader({ showAnnouncement = true, compact = false }) {
  const { count, setOpen: setCartOpen } = useCart()
  const { user } = useAuth() || {}
  const router = useRouter()
  const [q, setQ] = useState('')

  const onSearch = (e) => {
    e.preventDefault()
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <>
      {showAnnouncement && (
        <div className="bg-[#1b3a2e] text-[#f7f3ec] text-xs md:text-sm py-2 text-center">
          FREE Shipping on Orders Above ₹999 • Clinically Proven • 100% Plant Based
        </div>
      )}
      <header className="sticky top-0 z-40 bg-[#f7f3ec]/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2"><Menu className="w-6 h-6 text-[#1b3a2e]" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#f7f3ec]">
                <div className="flex flex-col gap-1 mt-8">
                  {NAV.map(n => (
                    <Link key={n.label} href={n.href} className="text-[#1b3a2e] font-medium border-b border-stone-200 py-3">{n.label}</Link>
                  ))}
                  <Link href="/account/login" className="text-[#1b3a2e] font-medium py-3">Account</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl md:text-3xl font-bold text-[#1b3a2e] tracking-tight">ZeroHarm</span>
              <span className="text-[10px] tracking-[0.3em] text-[#1b3a2e]/70 uppercase">Sciences</span>
            </div>
          </Link>

          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search supplements, ingredients..." className="pl-10 bg-white border-stone-300 rounded-full h-11" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          </form>

          <div className="flex items-center gap-1 md:gap-3">
            <Link href={user ? '/account' : '/account/login'} className="p-2 hidden md:flex items-center gap-2 hover:text-amber-700">
              <User className="w-5 h-5 text-[#1b3a2e]" />
              {user && <span className="text-sm text-[#1b3a2e]">Hi, {(user.name || user.phone || 'You').split(' ')[0]}</span>}
            </Link>
            <Link href="/search" className="p-2 md:hidden"><Search className="w-5 h-5 text-[#1b3a2e]" /></Link>
            <button onClick={() => setCartOpen(true)} className="p-2 relative">
              <ShoppingCart className="w-5 h-5 text-[#1b3a2e]" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1">{count}</span>
            </button>
          </div>
        </div>

        {!compact && (
          <nav className="hidden lg:block border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex items-center justify-center gap-7 py-3">
                {NAV.map(n => (
                  <li key={n.label}>
                    <Link href={n.href} className="text-xs xl:text-sm font-medium text-[#1b3a2e] hover:text-amber-700 uppercase tracking-wide whitespace-nowrap">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
