'use client'

import { useState, useMemo, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronDown, Filter, X, SlidersHorizontal, Star, Heart, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getCollection, COLLECTIONS } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import SiteHeader from '@/components/site-header'
import CartDrawer from '@/components/cart-drawer'
import SiteFooter from '@/components/site-footer'

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Best Rated' },
  { id: 'discount', label: 'Biggest Discount' },
]

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  )
}

function ProductCard({ p }) {
  const { addItem } = useCart()
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={`/product/${p.slug}`} className="relative bg-[#f4ede0] aspect-square overflow-hidden block">
        {p.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-[#1b3a2e] text-white text-xs font-semibold px-2 py-1 rounded">-{p.discount}%</div>
        )}
        <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
          <Heart className="w-4 h-4 text-[#1b3a2e]" />
        </button>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">{p.category}</div>
        <Link href={`/product/${p.slug}`}>
          <h3 className="text-sm font-semibold text-[#1b3a2e] line-clamp-2 min-h-[2.5rem] mb-2 hover:text-amber-700">{p.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={p.rating} />
          <span className="text-xs text-stone-500">{p.rating} ({p.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3 flex-wrap">
          <span className="text-lg font-bold text-[#1b3a2e]">₹{p.price.toLocaleString()}</span>
          <span className="text-sm text-stone-400 line-through">₹{p.oldPrice.toLocaleString()}</span>
        </div>
        <Button onClick={() => addItem(p, 1)} className="mt-auto bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-sm">Add to Cart</Button>
      </div>
    </div>
  )
}

function FilterPanel({ filters, setFilters, allCategories, allPriceMax }) {
  const toggleCat = (c) => {
    setFilters(f => ({ ...f, categories: f.categories.includes(c) ? f.categories.filter(x => x !== c) : [...f.categories, c] }))
  }
  return (
    <div className="space-y-6">
      <div>
        <div className="font-serif text-lg text-[#1b3a2e] mb-3">Category</div>
        <div className="space-y-2">
          {allCategories.map(c => (
            <label key={c} className="flex items-center gap-2 text-sm text-[#1b3a2e] cursor-pointer">
              <input type="checkbox" checked={filters.categories.includes(c)} onChange={() => toggleCat(c)} className="w-4 h-4 accent-[#1b3a2e]" />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="font-serif text-lg text-[#1b3a2e] mb-3">Price Range</div>
        <div className="flex items-center justify-between text-sm text-stone-600 mb-2">
          <span>₹0</span>
          <span>₹{filters.maxPrice.toLocaleString()}</span>
        </div>
        <input type="range" min={500} max={allPriceMax} step={50} value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))} className="w-full accent-[#1b3a2e]" />
        <div className="flex gap-2 mt-3">
          {[999, 1299, allPriceMax].map(v => (
            <button key={v} onClick={() => setFilters(f => ({ ...f, maxPrice: v }))} className={`flex-1 text-xs py-1.5 rounded-full border ${filters.maxPrice === v ? 'border-[#1b3a2e] bg-[#1b3a2e] text-white' : 'border-stone-300 text-stone-600'}`}>≤ ₹{v}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-serif text-lg text-[#1b3a2e] mb-3">Rating</div>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map(r => (
            <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="rating" checked={filters.minRating === r} onChange={() => setFilters(f => ({ ...f, minRating: f.minRating === r ? 0 : r }))} className="w-4 h-4 accent-[#1b3a2e]" />
              <span className="flex items-center gap-1 text-[#1b3a2e]">{r}+ <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /></span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="font-serif text-lg text-[#1b3a2e] mb-3">Offers</div>
        <label className="flex items-center gap-2 text-sm text-[#1b3a2e] cursor-pointer">
          <input type="checkbox" checked={filters.onSale} onChange={() => setFilters(f => ({ ...f, onSale: !f.onSale }))} className="w-4 h-4 accent-[#1b3a2e]" />
          On Sale Only
        </label>
      </div>

      <button onClick={() => setFilters({ categories: [], maxPrice: allPriceMax, minRating: 0, onSale: false })} className="text-sm text-[#1b3a2e] underline">Clear all filters</button>
    </div>
  )
}

export default function CollectionPage({ params }) {
  const { slug } = use(params)
  const collection = getCollection(slug)
  if (!collection) notFound()

  const allCategories = useMemo(() => Array.from(new Set(collection.products.map(p => p.category))).sort(), [collection.products])
  const allPriceMax = useMemo(() => Math.max(...collection.products.map(p => p.price), 2000), [collection.products])

  const [filters, setFilters] = useState({ categories: [], maxPrice: allPriceMax, minRating: 0, onSale: false })
  const [sort, setSort] = useState('featured')
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = collection.products.filter(p => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (p.price > filters.maxPrice) return false
      if (filters.minRating && p.rating < filters.minRating) return false
      if (filters.onSale && p.discount <= 0) return false
      return true
    })
    switch (sort) {
      case 'price-asc': list = [...list].sort((a,b) => a.price - b.price); break
      case 'price-desc': list = [...list].sort((a,b) => b.price - a.price); break
      case 'rating': list = [...list].sort((a,b) => b.rating - a.rating); break
      case 'discount': list = [...list].sort((a,b) => b.discount - a.discount); break
    }
    return list
  }, [collection.products, filters, sort])

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <SiteHeader />
      <CartDrawer />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-stone-600">
        <Link href="/" className="hover:text-[#1b3a2e]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collections/all" className="hover:text-[#1b3a2e]">Collections</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1b3a2e] font-medium">{collection.title}</span>
      </div>

      {/* Hero */}
      <section className="bg-[#ede4d3] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-amber-700 uppercase tracking-widest text-xs font-semibold mb-2">Collection</div>
          <h1 className="font-serif text-4xl md:text-6xl text-[#1b3a2e] mb-3">{collection.title}</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">{collection.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {Object.entries(COLLECTIONS).slice(0, 7).map(([s, c]) => (
              <Link key={s} href={`/collections/${s}`} className={`px-4 py-2 rounded-full text-sm border transition ${slug === s ? 'bg-[#1b3a2e] text-white border-[#1b3a2e]' : 'border-stone-300 text-[#1b3a2e] hover:bg-white'}`}>
                {c.title.replace(' Supplements','').replace(' Care','').replace(' & Skincare','')}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between border-b border-stone-200 sticky top-[68px] lg:top-[112px] bg-[#f7f3ec]/95 backdrop-blur z-20">
        <div className="text-sm text-stone-600">
          Showing <span className="font-semibold text-[#1b3a2e]">{filtered.length}</span> of {collection.products.length} products
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden border-stone-300 text-[#1b3a2e] rounded-full h-10"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#f7f3ec] overflow-y-auto">
              <div className="font-serif text-2xl text-[#1b3a2e] mb-5 mt-2">Filters</div>
              <FilterPanel filters={filters} setFilters={setFilters} allCategories={allCategories} allPriceMax={allPriceMax} />
            </SheetContent>
          </Sheet>

          <div className="relative">
            <button onClick={() => setSortOpen(o => !o)} className="flex items-center gap-2 text-sm font-medium text-[#1b3a2e] bg-white border border-stone-300 rounded-full h-10 px-4">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Sort:</span> {SORT_OPTIONS.find(o => o.id === sort).label}
              <ChevronDown className={`w-4 h-4 transition ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 rounded-lg shadow-xl py-2 z-30">
                {SORT_OPTIONS.map(o => (
                  <button key={o.id} onClick={() => { setSort(o.id); setSortOpen(false) }} className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-stone-100 ${sort === o.id ? 'text-[#1b3a2e] font-medium' : 'text-stone-600'}`}>
                    {o.label}
                    {sort === o.id && <Check className="w-4 h-4 text-emerald-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {(filters.categories.length > 0 || filters.minRating || filters.onSale || filters.maxPrice < allPriceMax) && (
        <div className="max-w-7xl mx-auto px-4 pt-4 flex flex-wrap gap-2">
          {filters.categories.map(c => (
            <span key={c} className="inline-flex items-center gap-1 text-xs bg-[#1b3a2e] text-white px-3 py-1 rounded-full">
              {c}
              <button onClick={() => setFilters(f => ({ ...f, categories: f.categories.filter(x => x !== c) }))}><X className="w-3 h-3" /></button>
            </span>
          ))}
          {filters.minRating > 0 && <span className="inline-flex items-center gap-1 text-xs bg-[#1b3a2e] text-white px-3 py-1 rounded-full">{filters.minRating}+ stars <button onClick={() => setFilters(f => ({ ...f, minRating: 0 }))}><X className="w-3 h-3" /></button></span>}
          {filters.onSale && <span className="inline-flex items-center gap-1 text-xs bg-[#1b3a2e] text-white px-3 py-1 rounded-full">On Sale <button onClick={() => setFilters(f => ({ ...f, onSale: false }))}><X className="w-3 h-3" /></button></span>}
          {filters.maxPrice < allPriceMax && <span className="inline-flex items-center gap-1 text-xs bg-[#1b3a2e] text-white px-3 py-1 rounded-full">≤ ₹{filters.maxPrice} <button onClick={() => setFilters(f => ({ ...f, maxPrice: allPriceMax }))}><X className="w-3 h-3" /></button></span>}
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-44 bg-white rounded-2xl border border-stone-200 p-6">
            <div className="font-serif text-xl text-[#1b3a2e] mb-5">Filters</div>
            <FilterPanel filters={filters} setFilters={setFilters} allCategories={allCategories} allPriceMax={allPriceMax} />
          </div>
        </aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="font-serif text-3xl text-[#1b3a2e] mb-3">No products match your filters</div>
              <p className="text-stone-600 mb-6">Try adjusting your filters or clearing them.</p>
              <Button onClick={() => setFilters({ categories: [], maxPrice: allPriceMax, minRating: 0, onSale: false })} className="bg-[#1b3a2e] text-white rounded-full px-6">Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map(p => <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
