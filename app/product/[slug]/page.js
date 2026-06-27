'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import {
  Search, ShoppingCart, User, Menu, ChevronLeft, ChevronRight,
  Star, Truck, ShieldCheck, Award, Leaf, Heart, Plus, Minus,
  Facebook, Instagram, Youtube, Twitter, ArrowRight, Phone, Mail, MapPin,
  Check, Sparkles, FlaskConical, Pill
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { PRODUCTS, getProduct } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import CartDrawer from '@/components/cart-drawer'

function StarRating({ rating, size = 'sm' }) {
  const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${cls} ${i <= Math.round(rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  )
}

function MiniHeader() {
  const { count, setOpen } = useCart()
  return (
    <>
      <div className="bg-[#1b3a2e] text-[#f7f3ec] text-xs md:text-sm py-2 text-center">
        FREE Shipping on Orders Above ₹999 • Clinically Proven • 100% Plant Based
      </div>
      <header className="sticky top-0 z-50 bg-[#f7f3ec]/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl md:text-3xl font-bold text-[#1b3a2e] tracking-tight">ZeroHarm</span>
              <span className="text-[10px] tracking-[0.3em] text-[#1b3a2e]/70 uppercase">Sciences</span>
            </div>
          </Link>
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <Input placeholder="Search supplements, ingredients..." className="pl-10 bg-white border-stone-300 rounded-full h-11" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          </div>
          <div className="flex items-center gap-1 md:gap-3">
            <button className="p-2 hidden md:block"><User className="w-5 h-5 text-[#1b3a2e]" /></button>
            <button onClick={() => setOpen(true)} className="p-2 relative">
              <ShoppingCart className="w-5 h-5 text-[#1b3a2e]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1">{count}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default function ProductPage({ params }) {
  const { slug } = use(params)
  const product = getProduct(slug)
  if (!product) notFound()

  const { addItem } = useCart()
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const related = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4)
  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.img]

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <MiniHeader />
      <CartDrawer />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-stone-600">
        <Link href="/" className="hover:text-[#1b3a2e]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/" className="hover:text-[#1b3a2e]">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1b3a2e] font-medium">{product.name}</span>
      </div>

      {/* Main Product */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Gallery */}
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-3 w-20">
              {gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-lg overflow-hidden bg-[#f4ede0] border-2 transition ${activeImg === i ? 'border-[#1b3a2e]' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#f4ede0] relative">
                <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[#1b3a2e] text-white text-sm font-semibold px-3 py-1.5 rounded">
                    -{product.discount}% OFF
                  </div>
                )}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
                  <Heart className="w-5 h-5 text-[#1b3a2e]" />
                </button>
              </div>
              {/* Mobile thumbs */}
              <div className="flex md:hidden gap-2 mt-3">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden bg-[#f4ede0] border-2 ${activeImg === i ? 'border-[#1b3a2e]' : 'border-transparent opacity-70'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="text-amber-700 uppercase tracking-widest text-xs font-semibold mb-2">{product.category}</div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1b3a2e] mb-2 leading-tight">{product.name}</h1>
            <p className="text-stone-600 mb-4">{product.tagline}</p>
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-stone-600"><span className="font-semibold text-[#1b3a2e]">{product.rating}</span> / 5.0 · {product.reviews.toLocaleString()} reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl font-bold text-[#1b3a2e]">₹{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-xl text-stone-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
              )}
              {product.discount > 0 && (
                <span className="text-sm font-semibold text-emerald-700">Save ₹{(product.oldPrice - product.price).toLocaleString()}</span>
              )}
            </div>
            <p className="text-xs text-stone-500 mb-6">Inclusive of all taxes</p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.benefits.slice(0, 4).map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#1b3a2e]">
                  <Check className="w-4 h-4 mt-0.5 text-emerald-700 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Servings */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-stone-200 rounded-xl p-3 bg-white">
                <div className="text-xs text-stone-500 mb-1">Pack Size</div>
                <div className="text-sm font-semibold text-[#1b3a2e] flex items-center gap-2"><Pill className="w-4 h-4" />{product.servings}</div>
              </div>
              <div className="border border-stone-200 rounded-xl p-3 bg-white">
                <div className="text-xs text-stone-500 mb-1">Dosage</div>
                <div className="text-sm font-semibold text-[#1b3a2e]">{product.dosage}</div>
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center border-2 border-[#1b3a2e] rounded-full h-12 px-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-[#1b3a2e] hover:bg-stone-100 rounded-full"><Minus className="w-4 h-4" /></button>
                <span className="px-4 font-semibold text-[#1b3a2e] min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-[#1b3a2e] hover:bg-stone-100 rounded-full"><Plus className="w-4 h-4" /></button>
              </div>
              <Button onClick={handleAdd} className="flex-1 h-12 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-base font-semibold">
                {added ? <><Check className="w-5 h-5 mr-2" /> Added to Cart!</> : <><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>}
              </Button>
            </div>
            <Button onClick={() => { addItem(product, qty); router.push('/checkout') }} variant="outline" className="w-full h-12 border-2 border-[#1b3a2e] text-[#1b3a2e] hover:bg-[#1b3a2e] hover:text-white rounded-full text-base font-semibold mb-6">
              Buy It Now
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-stone-200">
              <div className="flex items-center gap-2 text-sm text-stone-700"><Truck className="w-5 h-5 text-amber-700" /> Free shipping ₹999+</div>
              <div className="flex items-center gap-2 text-sm text-stone-700"><ShieldCheck className="w-5 h-5 text-amber-700" /> Secure checkout</div>
              <div className="flex items-center gap-2 text-sm text-stone-700"><Leaf className="w-5 h-5 text-amber-700" /> 100% Plant-based</div>
              <div className="flex items-center gap-2 text-sm text-stone-700"><Award className="w-5 h-5 text-amber-700" /> Clinically tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nano */}
      <section className="bg-[#ede4d3] py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#1b3a2e] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl text-[#1b3a2e] mb-2">10x Absorption</h3>
            <p className="text-sm text-stone-600">Nano-sized particles bypass stomach acids for direct bloodstream delivery.</p>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#1b3a2e] flex items-center justify-center">
              <FlaskConical className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl text-[#1b3a2e] mb-2">Patented Tech</h3>
            <p className="text-sm text-stone-600">Aqueous extraction + nano encapsulation. Zero chemical solvents.</p>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#1b3a2e] flex items-center justify-center">
              <Leaf className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl text-[#1b3a2e] mb-2">Plant-Based</h3>
            <p className="text-sm text-stone-600">Wild-grown botanicals. No side effects. No artificial fillers.</p>
          </div>
        </div>
      </section>

      {/* Tabs: Description / Ingredients / Reviews */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <Tabs defaultValue="desc">
          <TabsList className="bg-transparent gap-6 mb-8 border-b border-stone-200 w-full rounded-none justify-start h-auto pb-0">
            <TabsTrigger value="desc" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1b3a2e] data-[state=active]:border-b-2 data-[state=active]:border-[#1b3a2e] rounded-none text-stone-500 text-base md:text-lg font-serif px-2 pb-3">Description</TabsTrigger>
            <TabsTrigger value="ing" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1b3a2e] data-[state=active]:border-b-2 data-[state=active]:border-[#1b3a2e] rounded-none text-stone-500 text-base md:text-lg font-serif px-2 pb-3">Ingredients</TabsTrigger>
            <TabsTrigger value="ben" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1b3a2e] data-[state=active]:border-b-2 data-[state=active]:border-[#1b3a2e] rounded-none text-stone-500 text-base md:text-lg font-serif px-2 pb-3">Benefits</TabsTrigger>
            <TabsTrigger value="rev" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1b3a2e] data-[state=active]:border-b-2 data-[state=active]:border-[#1b3a2e] rounded-none text-stone-500 text-base md:text-lg font-serif px-2 pb-3">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="desc" className="text-stone-700 leading-relaxed space-y-4">
            <p className="text-lg">{product.description}</p>
            <p>Crafted with ZeroHarm's patented nano-technology, this formulation ensures maximum bioavailability — allowing the active botanicals to reach your cells where they're needed most. Made with ingredients sourced from pristine farms across the Himalayan, North-East, and Southern regions of India.</p>
            <p>Every batch is rigorously tested for purity and potency. No fillers, no harsh chemicals, no side effects.</p>
          </TabsContent>

          <TabsContent value="ing">
            <div className="grid sm:grid-cols-2 gap-4">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-[#ede4d3] flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#1b3a2e]" />
                  </div>
                  <div className="font-medium text-[#1b3a2e]">{ing}</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ben">
            <ul className="space-y-3">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-700">
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-lg">{b}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="rev">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1 bg-[#1b3a2e] text-white rounded-2xl p-6 text-center">
                <div className="text-5xl font-serif mb-2">{product.rating}</div>
                <StarRating rating={product.rating} size="md" />
                <div className="text-sm text-white/70 mt-2">Based on {product.reviews.toLocaleString()} reviews</div>
              </div>
              <div className="md:col-span-2 space-y-4">
                {[
                  { name: 'Priya S.', rating: 5, title: 'Life-changing!', body: 'Started seeing results in just 2 weeks. The nano-tech really works — energy levels up, no side effects.' },
                  { name: 'Rahul M.', rating: 5, title: 'Premium quality', body: 'Glass bottle packaging, no chemical smell, and authentic Ayurvedic ingredients. Worth every rupee.' },
                  { name: 'Anita K.', rating: 4, title: 'Steady improvement', body: 'Consistent results after 1 month of use. Doctor-recommended and gentle on the stomach.' },
                ].map((r, i) => (
                  <div key={i} className="bg-white border border-stone-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-[#1b3a2e]">{r.name}</div>
                      <StarRating rating={r.rating} />
                    </div>
                    <div className="font-medium text-[#1b3a2e] mb-1">{r.title}</div>
                    <p className="text-stone-600 text-sm">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="font-serif text-3xl md:text-4xl text-[#1b3a2e] mb-8 text-center">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {related.map(p => (
            <Link key={p.slug} href={`/product/${p.slug}`} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative bg-[#f4ede0] aspect-square overflow-hidden">
                {p.discount > 0 && (
                  <div className="absolute top-3 left-3 z-10 bg-[#1b3a2e] text-white text-xs font-semibold px-2 py-1 rounded">-{p.discount}%</div>
                )}
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-[#1b3a2e] line-clamp-2 min-h-[2.5rem] mb-2">{p.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={p.rating} />
                  <span className="text-xs text-stone-500">({p.reviews})</span>
                </div>
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="text-lg font-bold text-[#1b3a2e]">₹{p.price.toLocaleString()}</span>
                  <span className="text-sm text-stone-400 line-through">₹{p.oldPrice.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer mini */}
      <footer className="bg-[#1b3a2e] text-[#f7f3ec] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-serif text-3xl font-bold mb-2">ZeroHarm</div>
          <div className="text-xs tracking-[0.3em] uppercase text-[#f7f3ec]/60 mb-6">Sciences</div>
          <div className="flex gap-3 justify-center mb-6">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#f7f3ec]/30 flex items-center justify-center hover:bg-[#f7f3ec] hover:text-[#1b3a2e] transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="text-xs text-[#f7f3ec]/60">© 2025 ZeroHarm Sciences. UI clone for educational purposes.</div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-3 flex gap-3">
        <div className="flex-1">
          <div className="text-xs text-stone-500">Price</div>
          <div className="font-bold text-[#1b3a2e]">₹{product.price.toLocaleString()}</div>
        </div>
        <Button onClick={handleAdd} className="h-12 px-6 bg-[#1b3a2e] text-white rounded-full font-semibold">
          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
        </Button>
      </div>
    </div>
  )
}
