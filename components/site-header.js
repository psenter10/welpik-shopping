'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, User, Menu, ChevronDown, ChevronUp, Truck, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

const SHOP_MENU = [
  {
    label: 'Wellness',
    href: '/collections/wellness',
    items: [
      { name: 'FocusIQ', href: '/product/focusiq', icon: '/Product Image/1.jpg' },
      { name: 'CalmCore', href: '/product/calmcore', icon: '/Product Image/2.jpg' },
      { name: 'SleepZen', href: '/product/sleepzen', icon: '/Product Image/3.jpg' },
      { name: 'ImmunoShield', href: '/product/immunoshield', icon: '/Product Image/5.jpg' },
      { name: 'PeakFuel', href: '/product/peakfuel', icon: '/Product Image/6.jpg' },
      { name: 'NeuroLift', href: '/product/neurolift', icon: '/Product Image/7.jpg' },
    ],
  },
  {
    label: 'Gut Health',
    href: '/collections/gut-health',
    items: [
      { name: 'GutGlow', href: '/product/gutglow', icon: '/Product Image/4.jpg' },
    ],
  },
  {
    label: 'Beauty',
    href: '/collections/beauty',
    items: [
      { name: 'HairFuel', href: '/product/hairfuel', icon: '/Product Image/13.jpg' },
      { name: 'GlowCollagen', href: '/product/glowcollagen', icon: '/Product Image/14.jpg' },
    ],
  },
  {
    label: 'Heart Health',
    href: '/collections/heart-health',
    items: [
      { name: 'HeartGuard', href: '/product/heartguard', icon: '/Product Image/8.jpg' },
    ],
  },
  {
    label: 'Diabetic Care',
    href: '/collections/diabetic-care',
    items: [
      { name: 'SugarBalance', href: '/product/sugarbalance', icon: '/Product Image/12.jpg' },
    ],
  },
  {
    label: 'Weight Management',
    href: '/collections/weight-management',
    items: [
      { name: 'FatBurn+', href: '/product/fatburn-plus', icon: '/Product Image/16.jpg' },
    ],
  },
]

const RESOURCES_ITEMS = [
  { name: 'Blog', href: '/' },
  { name: 'About Us', href: '/' },
  { name: 'Our Science', href: '/' },
  { name: 'Ingredients Library', href: '/collections/all' },
]

const MOBILE_NAV = [
  { label: 'Shop All', href: '/collections/all' },
  { label: 'Wellness', href: '/collections/wellness' },
  { label: 'Gut Health', href: '/collections/gut-health' },
  { label: 'Beauty', href: '/collections/beauty' },
  { label: 'Heart Health', href: '/collections/heart-health' },
  { label: 'Diabetic Care', href: '/collections/diabetic-care' },
  { label: 'Weight Management', href: '/collections/weight-management' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
]

export default function SiteHeader({ showAnnouncement = true }) {
  const { count, setOpen: setCartOpen } = useCart()
  const { user } = useAuth() || {}
  const router = useRouter()
  const [shopOpen, setShopOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(SHOP_MENU[0])
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')

  const closeAll = () => { setShopOpen(false); setResourcesOpen(false) }

  const onSearch = (e) => {
    e.preventDefault()
    if (q.trim()) { closeAll(); setSearchOpen(false); router.push(`/search?q=${encodeURIComponent(q.trim())}`) }
  }

  return (
    <>
      {showAnnouncement && (
        <div className="bg-[#1b3a2e] text-[#f7f3ec] text-xs py-2 text-center tracking-wide">
          FREE Shipping on Orders Above ₹999 &nbsp;•&nbsp; Clinically Proven &nbsp;•&nbsp; 100% Plant Based
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center gap-4">

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Menu" className="p-2 text-stone-700"><Menu className="w-5 h-5" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white w-72 p-0">
                <div className="p-6 border-b border-stone-100">
                  <Image src="/logo/welpik-logo.png" alt="Welpik" width={110} height={38} className="object-contain" />
                </div>
                <div className="flex flex-col px-4 py-4 gap-0.5">
                  {MOBILE_NAV.map(n => (
                    <Link key={n.label} href={n.href} className="text-sm font-medium text-stone-700 hover:text-[#1b3a2e] border-b border-stone-100 py-3 px-2">{n.label}</Link>
                  ))}
                  <Link href="/order-success" className="text-sm font-medium text-stone-700 hover:text-[#1b3a2e] border-b border-stone-100 py-3 px-2">Track Your Order</Link>
                  <Link href="/account/login" className="text-sm font-medium text-stone-700 hover:text-[#1b3a2e] py-3 px-2">Account</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={closeAll}>
            <Image src="/logo/welpik-logo.png" alt="Welpik" width={120} height={40} className="object-contain" priority />
          </Link>

          {/* Desktop Nav — center */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {/* Shop with mega menu */}
            <button
              onMouseEnter={() => { setShopOpen(true); setResourcesOpen(false) }}
              onClick={() => { setShopOpen(v => !v); setResourcesOpen(false) }}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap ${shopOpen ? 'text-[#1b3a2e] underline underline-offset-4 decoration-[#1b3a2e]' : 'text-stone-700 hover:text-[#1b3a2e]'}`}
            >
              Shop {shopOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Ingredients */}
            <Link
              href="/collections/all"
              onMouseEnter={closeAll}
              className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-[#1b3a2e] rounded transition-colors whitespace-nowrap"
            >
              Ingredients
            </Link>

            {/* Resources dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => { setResourcesOpen(true); setShopOpen(false) }}
                onClick={() => { setResourcesOpen(v => !v); setShopOpen(false) }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-stone-700 hover:text-[#1b3a2e] rounded transition-colors whitespace-nowrap"
              >
                Resources <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {resourcesOpen && (
                <div
                  onMouseLeave={() => setResourcesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-48 bg-white border border-stone-200 rounded-xl shadow-xl py-1.5 z-50"
                >
                  {RESOURCES_ITEMS.map(it => (
                    <Link key={it.name} href={it.href} onClick={closeAll} className="block px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#1b3a2e] transition-colors">{it.name}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* New Arrivals */}
            <Link
              href="/collections/new-arrivals"
              onMouseEnter={closeAll}
              className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-[#1b3a2e] rounded transition-colors whitespace-nowrap"
            >
              New Arrivals
            </Link>

            {/* Track your order CTA */}
            <Link
              href="/order-success"
              onMouseEnter={closeAll}
              className="ml-3 flex items-center gap-2 px-5 py-2 text-sm font-medium text-[#1b3a2e] border border-[#1b3a2e] rounded-full hover:bg-[#1b3a2e] hover:text-white transition-colors whitespace-nowrap"
            >
              <Truck className="w-4 h-4" />
              Track your order
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-0.5 ml-auto lg:ml-0">
            <button
              onClick={() => { setSearchOpen(v => !v); closeAll() }}
              aria-label="Search"
              className="p-2 text-stone-600 hover:text-[#1b3a2e] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href={user ? '/account' : '/account/login'} onClick={closeAll} aria-label="Account" className="p-2 text-stone-600 hover:text-[#1b3a2e] transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button onClick={() => { setCartOpen(true); closeAll() }} aria-label="Cart" className="p-2 relative text-stone-600 hover:text-[#1b3a2e] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] min-w-[17px] h-[17px] rounded-full flex items-center justify-center font-bold">{count}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-stone-100 bg-white px-4 py-3">
            <form onSubmit={onSearch} className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  autoFocus
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search supplements, ingredients..."
                  className="w-full h-10 pl-9 pr-4 rounded-full border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3a2e]/20 focus:border-[#1b3a2e]"
                />
              </div>
              <button type="submit" className="px-5 h-10 bg-[#1b3a2e] text-white text-sm font-medium rounded-full hover:bg-[#2a5444] transition-colors">Search</button>
              <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mega menu */}
        {shopOpen && (
          <div
            onMouseLeave={() => setShopOpen(false)}
            className="absolute left-0 right-0 bg-white border-t border-b border-stone-200 shadow-2xl z-50"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex gap-0">
              {/* Category sidebar */}
              <div className="w-52 flex-shrink-0 pr-4 border-r border-stone-100 flex flex-col gap-0.5">
                <Link
                  href="/collections/all"
                  onClick={() => setShopOpen(false)}
                  className="text-sm font-semibold text-[#1b3a2e] underline underline-offset-2 py-2 px-3 hover:text-amber-700 transition-colors"
                >
                  Shop all
                </Link>
                {SHOP_MENU.map(cat => (
                  <button
                    key={cat.label}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`flex items-center justify-between text-sm py-2.5 px-3 rounded-lg text-left w-full transition-colors ${activeCategory.label === cat.label ? 'bg-stone-100 font-semibold text-[#1b3a2e]' : 'text-stone-600 hover:bg-stone-50 hover:text-[#1b3a2e]'}`}
                  >
                    {cat.label}
                    <span className="text-stone-300 text-base">›</span>
                  </button>
                ))}
              </div>

              {/* Products grid */}
              <div className="flex-1 pl-8">
                <p className="text-[11px] text-stone-400 uppercase tracking-widest font-semibold mb-5">{activeCategory.label}</p>
                <div className="grid grid-cols-3 xl:grid-cols-5 gap-3">
                  {activeCategory.items.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setShopOpen(false)}
                      className="flex flex-col items-center gap-2.5 p-3 rounded-xl hover:bg-stone-50 transition-colors text-center group"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#1b3a2e] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                        <img src={item.icon} alt={item.name} className="w-9 h-9 object-contain" />
                      </div>
                      <span className="text-xs font-medium text-stone-700 leading-snug group-hover:text-[#1b3a2e]">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
      </div>
        )}
      </header>
    </>
  )
}
