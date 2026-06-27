'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Star, Heart, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchProducts, PRODUCTS } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import SiteHeader from '@/components/site-header'
import CartDrawer from '@/components/cart-drawer'

const TRENDING = ['Shilajit', 'Ashwagandha', 'Gut Army', 'Magnesium', 'Fertility', 'Lung Detox', 'Carb Cutter']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  )
}

function Highlight({ text, q }) {
  if (!q) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  return <>{text.slice(0, i)}<mark className="bg-amber-200 text-[#1b3a2e] px-0.5 rounded">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>
}

function SearchContent() {
  const params = useSearchParams()
  const router = useRouter()
  const initial = params.get('q') || ''
  const [q, setQ] = useState(initial)
  const { addItem } = useCart()

  useEffect(() => { setQ(initial) }, [initial])

  const results = useMemo(() => searchProducts(q), [q])
  const hasQuery = q.trim().length > 0

  const onSubmit = (e) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <SiteHeader />
      <CartDrawer />

      {/* Search hero */}
      <section className="bg-[#ede4d3] py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-amber-700 uppercase tracking-widest text-xs font-semibold mb-2">Search</div>
          <h1 className="font-serif text-3xl md:text-5xl text-[#1b3a2e] mb-6">Find your wellness fix</h1>
          <form onSubmit={onSubmit} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
            <Input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search supplements, ingredients, concerns..." className="pl-12 pr-28 h-14 bg-white border-stone-300 rounded-full text-base" />
            <Button type="submit" className="absolute right-1.5 top-1.5 h-11 px-6 rounded-full bg-[#1b3a2e] hover:bg-[#2a5444] text-white">Search</Button>
            {q && (
              <button type="button" onClick={() => setQ('')} className="absolute right-28 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          <div className="mt-6">
            <span className="text-sm text-stone-600 mr-2">Trending:</span>
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {TRENDING.map(t => (
                <button key={t} onClick={() => { setQ(t); router.push(`/search?q=${encodeURIComponent(t)}`) }} className="text-sm px-3 py-1 bg-white border border-stone-200 rounded-full text-[#1b3a2e] hover:border-[#1b3a2e]">{t}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {hasQuery && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b3a2e]">
              {results.length > 0 ? <>Showing <span className="text-amber-700">{results.length}</span> result{results.length > 1 ? 's' : ''} for "<span className="italic">{q}</span>"</> : <>No results for "<span className="italic">{q}</span>"</>}
            </h2>
            {results.length === 0 && (
              <p className="text-stone-600 mt-2">Try a different keyword or browse trending topics above.</p>
            )}
          </div>
        )}

        {hasQuery && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map(p => (
              <div key={p.slug} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col">
                <Link href={`/product/${p.slug}`} className="relative bg-[#f4ede0] aspect-square overflow-hidden block">
                  {p.discount > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-[#1b3a2e] text-white text-xs font-semibold px-2 py-1 rounded">-{p.discount}%</div>
                  )}
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">{p.category}</div>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="text-sm font-semibold text-[#1b3a2e] line-clamp-2 min-h-[2.5rem] mb-2 hover:text-amber-700">
                      <Highlight text={p.name} q={q} />
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={p.rating} />
                    <span className="text-xs text-stone-500">({p.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                    <span className="text-lg font-bold text-[#1b3a2e]">₹{p.price.toLocaleString()}</span>
                    <span className="text-sm text-stone-400 line-through">₹{p.oldPrice.toLocaleString()}</span>
                  </div>
                  <Button onClick={() => addItem(p, 1)} className="mt-auto bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasQuery && (
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b3a2e] mb-6">Popular Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {PRODUCTS.slice(0, 8).map(p => (
                <Link key={p.slug} href={`/product/${p.slug}`} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all duration-300">
                  <div className="relative bg-[#f4ede0] aspect-square overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#1b3a2e] line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                    <div className="text-lg font-bold text-[#1b3a2e] mt-2">₹{p.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasQuery && results.length === 0 && (
          <div className="py-10">
            <div className="font-serif text-xl text-[#1b3a2e] mb-5">You might like these</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {PRODUCTS.slice(0, 8).map(p => (
                <Link key={p.slug} href={`/product/${p.slug}`} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all">
                  <div className="relative bg-[#f4ede0] aspect-square overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#1b3a2e] line-clamp-2">{p.name}</h3>
                    <div className="text-base font-bold text-[#1b3a2e] mt-1">₹{p.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="bg-[#1b3a2e] text-[#f7f3ec] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#f7f3ec]/70">© 2025 ZeroHarm Sciences. UI clone for educational purposes.</div>
      </footer>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center text-[#1b3a2e]">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
