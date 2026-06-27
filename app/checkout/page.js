'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronRight, ChevronDown, Lock, Truck, Tag, Check, ShieldCheck,
  CreditCard, Smartphone, Wallet, Banknote, Building2, ArrowLeft, Edit2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
  'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh',
  'Jammu and Kashmir','Ladakh','Puducherry'
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, savings, count, clear } = useCart()
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false)

  const [form, setForm] = useState({
    email: '',
    emailUpdates: true,
    country: 'India',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    saveInfo: true,
  })
  const [shipping, setShipping] = useState('standard')
  const [payment, setPayment] = useState('upi')
  const [upi, setUpi] = useState('')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(0)
  const [discountMsg, setDiscountMsg] = useState('')
  const [placing, setPlacing] = useState(false)

  // Redirect to home if cart empty
  useEffect(() => {
    if (count === 0 && !placing) {
      const t = setTimeout(() => { if (count === 0) router.push('/') }, 300)
      return () => clearTimeout(t)
    }
  }, [count, router, placing])

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const shippingCost = shipping === 'express' ? 99 : (subtotal >= 999 ? 0 : 49)
  const codFee = payment === 'cod' ? 49 : 0
  const total = Math.max(0, subtotal + shippingCost + codFee - discountApplied)

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase()
    if (!code) return
    if (code === 'ZH10') {
      const d = Math.round(subtotal * 0.1)
      setDiscountApplied(d); setDiscountMsg(`ZH10 applied — 10% off (₹${d.toLocaleString()})`)
    } else if (code === 'NANO200') {
      setDiscountApplied(200); setDiscountMsg('NANO200 applied — ₹200 off')
    } else if (code === 'FIRST500' && subtotal >= 1500) {
      setDiscountApplied(500); setDiscountMsg('FIRST500 applied — ₹500 off')
    } else {
      setDiscountApplied(0); setDiscountMsg('Invalid code. Try ZH10, NANO200 or FIRST500')
    }
  }

  const placeOrder = (e) => {
    e?.preventDefault?.()
    setPlacing(true)
    setTimeout(() => {
      const orderId = 'ZH' + Math.floor(100000 + Math.random() * 900000)
      try {
        localStorage.setItem('zh_last_order', JSON.stringify({
          orderId, total, items, form, payment, shipping, placedAt: new Date().toISOString()
        }))
      } catch (e) {}
      clear()
      router.push(`/order-success?id=${orderId}`)
    }, 1400)
  }

  if (count === 0) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center">
        <div className="text-center">
          <div className="font-serif text-3xl text-[#1b3a2e] mb-3">Your cart is empty</div>
          <Link href="/" className="text-[#1b3a2e] underline">Return to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      {/* Top secure bar */}
      <div className="bg-[#1b3a2e] text-[#f7f3ec] text-xs py-2 text-center flex items-center justify-center gap-2">
        <Lock className="w-3 h-3" /> Secure SSL Checkout • Trusted by 1L+ customers
      </div>

      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold text-[#1b3a2e]">ZeroHarm</span>
              <span className="text-[10px] tracking-[0.3em] text-[#1b3a2e]/70 uppercase">Sciences</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-stone-600">
            <Lock className="w-4 h-4 text-emerald-700" /> Secure Checkout
          </div>
        </div>
      </header>

      {/* Mobile summary toggle */}
      <div className="lg:hidden bg-[#ede4d3] border-b border-stone-200 sticky top-0 z-30">
        <button onClick={() => setMobileSummaryOpen(o => !o)} className="w-full px-4 py-3 flex items-center justify-between text-[#1b3a2e]">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Tag className="w-4 h-4" /> {mobileSummaryOpen ? 'Hide' : 'Show'} order summary
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileSummaryOpen ? 'rotate-180' : ''}`} />
          </div>
          <span className="font-bold">₹{total.toLocaleString()}</span>
        </button>
        {mobileSummaryOpen && <div className="px-4 pb-4"><OrderSummary items={items} subtotal={subtotal} savings={savings} shippingCost={shippingCost} codFee={codFee} discount={discountApplied} discountMsg={discountMsg} total={total} discountCode={discountCode} setDiscountCode={setDiscountCode} applyDiscount={applyDiscount} compact /></div>}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_400px] gap-10">

        {/* LEFT: forms */}
        <form onSubmit={placeOrder} className="space-y-8">

          {/* Express checkout */}
          <div>
            <div className="text-center text-xs uppercase tracking-widest text-stone-500 mb-3">Express Checkout</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button type="button" className="h-12 rounded-lg bg-[#5A31F4] text-white font-semibold text-sm flex items-center justify-center gap-1">shop<span className="font-bold">Pay</span></button>
              <button type="button" className="h-12 rounded-lg bg-black text-white font-semibold text-sm flex items-center justify-center gap-1"><span></span>Pay</button>
              <button type="button" className="h-12 rounded-lg bg-[#5F259F] text-white font-semibold text-sm flex items-center justify-center col-span-2 sm:col-span-1">PhonePe</button>
            </div>
            <div className="flex items-center my-6 gap-3">
              <div className="flex-1 h-px bg-stone-300" />
              <span className="text-xs uppercase tracking-widest text-stone-500">OR</span>
              <div className="flex-1 h-px bg-stone-300" />
            </div>
          </div>

          {/* Contact */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-[#1b3a2e]">Contact</h2>
              <a href="#" className="text-sm text-[#1b3a2e] underline">Log in</a>
            </div>
            <Input required type="email" placeholder="Email" value={form.email} onChange={e => update('email', e.target.value)} className="h-12 bg-white border-stone-300" />
            <label className="flex items-center gap-2 mt-3 text-sm text-stone-700 cursor-pointer">
              <input type="checkbox" checked={form.emailUpdates} onChange={e => update('emailUpdates', e.target.checked)} className="w-4 h-4 accent-[#1b3a2e]" />
              Email me with news and offers
            </label>
          </section>

          {/* Delivery */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="font-serif text-xl text-[#1b3a2e] mb-4">Delivery</h2>
            <div className="space-y-3">
              <div className="relative">
                <label className="absolute left-3 top-1 text-[10px] text-stone-500 uppercase tracking-wide">Country/Region</label>
                <select value={form.country} onChange={e => update('country', e.target.value)} className="w-full h-14 pt-5 pb-1 px-3 rounded-md border border-stone-300 bg-white text-sm text-[#1b3a2e]">
                  <option>India</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input required placeholder="First name" value={form.firstName} onChange={e => update('firstName', e.target.value)} className="h-12 border-stone-300" />
                <Input required placeholder="Last name" value={form.lastName} onChange={e => update('lastName', e.target.value)} className="h-12 border-stone-300" />
              </div>
              <Input required placeholder="Address" value={form.address} onChange={e => update('address', e.target.value)} className="h-12 border-stone-300" />
              <Input placeholder="Apartment, suite, etc. (optional)" value={form.apartment} onChange={e => update('apartment', e.target.value)} className="h-12 border-stone-300" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Input required placeholder="City" value={form.city} onChange={e => update('city', e.target.value)} className="h-12 border-stone-300" />
                <select required value={form.state} onChange={e => update('state', e.target.value)} className="h-12 px-3 rounded-md border border-stone-300 bg-white text-sm text-[#1b3a2e]">
                  <option value="">State</option>
                  {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                <Input required placeholder="PIN code" inputMode="numeric" maxLength={6} value={form.pincode} onChange={e => update('pincode', e.target.value.replace(/\D/g, ''))} className="h-12 border-stone-300" />
              </div>
              <Input required type="tel" placeholder="Phone" inputMode="numeric" maxLength={10} value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g, ''))} className="h-12 border-stone-300" />
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input type="checkbox" checked={form.saveInfo} onChange={e => update('saveInfo', e.target.checked)} className="w-4 h-4 accent-[#1b3a2e]" />
                Save this information for next time
              </label>
            </div>
          </section>

          {/* Shipping */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="font-serif text-xl text-[#1b3a2e] mb-4">Shipping method</h2>
            <div className="space-y-2">
              {[
                { id: 'standard', label: 'Standard Shipping', sub: '3-5 business days', cost: subtotal >= 999 ? 'FREE' : '₹49' },
                { id: 'express', label: 'Express Shipping', sub: '1-2 business days', cost: '₹99' },
              ].map(opt => (
                <label key={opt.id} className={`flex items-center justify-between gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${shipping === opt.id ? 'border-[#1b3a2e] bg-[#f7f3ec]' : 'border-stone-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ship" checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="w-4 h-4 accent-[#1b3a2e]" />
                    <div>
                      <div className="font-medium text-[#1b3a2e]">{opt.label}</div>
                      <div className="text-xs text-stone-500">{opt.sub}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${opt.cost === 'FREE' ? 'text-emerald-700' : 'text-[#1b3a2e]'}`}>{opt.cost}</div>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="font-serif text-xl text-[#1b3a2e] mb-1">Payment</h2>
            <p className="text-sm text-stone-500 mb-4 flex items-center gap-1"><Lock className="w-3 h-3" /> All transactions are secure and encrypted.</p>

            <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-200">
              <PaymentOption id="upi" current={payment} onSelect={setPayment} icon={<Smartphone className="w-5 h-5" />} title="UPI" subtitle="Pay via PhonePe, Google Pay, Paytm" badge="Recommended">
                <div className="text-sm text-stone-700 mb-3">Enter your UPI ID. You'll receive a payment request on your UPI app.</div>
                <Input placeholder="yourname@upi" value={upi} onChange={e => setUpi(e.target.value)} className="h-12 border-stone-300 mb-3" />
                <div className="flex gap-2 flex-wrap">
                  {['PhonePe','GPay','Paytm','BHIM','Amazon Pay'].map(p => (
                    <span key={p} className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">{p}</span>
                  ))}
                </div>
              </PaymentOption>

              <PaymentOption id="card" current={payment} onSelect={setPayment} icon={<CreditCard className="w-5 h-5" />} title="Credit / Debit Card" subtitle="Visa, Mastercard, Rupay, Amex">
                <div className="space-y-3">
                  <Input placeholder="Card number" inputMode="numeric" maxLength={19} value={card.number} onChange={e => setCard({ ...card, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() })} className="h-12 border-stone-300" />
                  <Input placeholder="Name on card" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} className="h-12 border-stone-300" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="MM / YY" maxLength={7} value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} className="h-12 border-stone-300" />
                    <Input placeholder="CVV" type="password" inputMode="numeric" maxLength={4} value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })} className="h-12 border-stone-300" />
                  </div>
                </div>
              </PaymentOption>

              <PaymentOption id="netbanking" current={payment} onSelect={setPayment} icon={<Building2 className="w-5 h-5" />} title="Net Banking" subtitle="All major Indian banks">
                <select className="w-full h-12 px-3 rounded-md border border-stone-300 bg-white text-sm">
                  <option>Select Bank</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra</option>
                  <option>Yes Bank</option>
                </select>
              </PaymentOption>

              <PaymentOption id="wallet" current={payment} onSelect={setPayment} icon={<Wallet className="w-5 h-5" />} title="Wallets" subtitle="Paytm, MobiKwik, Freecharge, Amazon Pay">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Paytm','MobiKwik','Amazon Pay','Freecharge'].map(w => (
                    <button key={w} type="button" className="h-11 rounded-lg border border-stone-300 text-sm text-[#1b3a2e] hover:border-[#1b3a2e]">{w}</button>
                  ))}
                </div>
              </PaymentOption>

              <PaymentOption id="cod" current={payment} onSelect={setPayment} icon={<Banknote className="w-5 h-5" />} title="Cash on Delivery" subtitle="Pay when you receive (+ ₹49 handling fee)">
                <div className="text-sm text-stone-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  An additional ₹49 will be charged as COD handling fee. Please keep exact change ready.
                </div>
              </PaymentOption>
            </div>
          </section>

          {/* Billing same as shipping */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="font-serif text-xl text-[#1b3a2e] mb-4">Billing address</h2>
            <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-[#1b3a2e] bg-[#f7f3ec] cursor-pointer">
              <input type="radio" defaultChecked className="w-4 h-4 accent-[#1b3a2e]" />
              <span className="text-sm text-[#1b3a2e] font-medium">Same as shipping address</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer mt-2">
              <input type="radio" name="bill" className="w-4 h-4 accent-[#1b3a2e]" />
              <span className="text-sm text-stone-700">Use a different billing address</span>
            </label>
          </section>

          {/* Place order */}
          <Button type="submit" disabled={placing} className="w-full h-14 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-base font-semibold disabled:opacity-60">
            {placing ? (
              <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span> Processing payment...</span>
            ) : (
              <>Pay Now • ₹{total.toLocaleString()}</>
            )}
          </Button>

          <div className="text-center text-xs text-stone-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Your payment information is encrypted and secure.
          </div>

          <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <Link href="/" className="hover:underline flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Return to cart</Link>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Refund policy</a>
              <a href="#" className="hover:underline">Shipping policy</a>
              <a href="#" className="hover:underline">Privacy policy</a>
              <a href="#" className="hover:underline">Terms of service</a>
            </div>
          </div>
        </form>

        {/* RIGHT: order summary (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <OrderSummary items={items} subtotal={subtotal} savings={savings} shippingCost={shippingCost} codFee={codFee} discount={discountApplied} discountMsg={discountMsg} total={total} discountCode={discountCode} setDiscountCode={setDiscountCode} applyDiscount={applyDiscount} />
          </div>
        </aside>
      </div>
    </div>
  )
}

function PaymentOption({ id, current, onSelect, icon, title, subtitle, badge, children }) {
  const active = current === id
  return (
    <div>
      <button type="button" onClick={() => onSelect(id)} className={`w-full p-4 flex items-center gap-3 text-left ${active ? 'bg-[#f7f3ec]' : 'bg-white hover:bg-stone-50'}`}>
        <input type="radio" checked={active} onChange={() => onSelect(id)} className="w-4 h-4 accent-[#1b3a2e]" />
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-[#1b3a2e] text-white' : 'bg-stone-100 text-[#1b3a2e]'}`}>{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#1b3a2e]">{title}</span>
            {badge && <span className="text-[10px] uppercase tracking-wide bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{badge}</span>}
          </div>
          <div className="text-xs text-stone-500">{subtitle}</div>
        </div>
      </button>
      {active && <div className="p-4 pt-0 pl-16">{children}</div>}
    </div>
  )
}

function OrderSummary({ items, subtotal, savings, shippingCost, codFee, discount, discountMsg, total, discountCode, setDiscountCode, applyDiscount, compact }) {
  return (
    <div className={`bg-white rounded-xl border border-stone-200 ${compact ? 'p-4' : 'p-6'} space-y-5`}>
      {!compact && <h3 className="font-serif text-xl text-[#1b3a2e]">Order summary</h3>}

      {/* Items */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {items.map(item => (
          <div key={item.slug} className="flex gap-3 items-center">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#f4ede0] shrink-0">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#1b3a2e] text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.qty}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#1b3a2e] line-clamp-2">{item.name}</div>
              {item.oldPrice && item.oldPrice > item.price && (
                <div className="text-xs text-stone-400 line-through">₹{(item.oldPrice * item.qty).toLocaleString()}</div>
              )}
            </div>
            <div className="text-sm font-semibold text-[#1b3a2e]">₹{(item.price * item.qty).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Discount */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <div className="flex gap-2">
          <Input placeholder="Discount code (try ZH10)" value={discountCode} onChange={e => setDiscountCode(e.target.value)} className="h-11 border-stone-300" />
          <Button type="button" onClick={applyDiscount} variant="outline" className="h-11 rounded-md border-[#1b3a2e] text-[#1b3a2e] hover:bg-[#1b3a2e] hover:text-white px-5">Apply</Button>
        </div>
        {discountMsg && (
          <div className={`text-xs flex items-center gap-1 ${discount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
            {discount > 0 && <Check className="w-3 h-3" />} {discountMsg}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="space-y-2 pt-3 border-t border-stone-200 text-sm">
        <div className="flex justify-between text-stone-700"><span>Subtotal · {items.reduce((s,i)=>s+i.qty,0)} items</span><span>₹{subtotal.toLocaleString()}</span></div>
        {savings > 0 && <div className="flex justify-between text-emerald-700"><span>You save</span><span>– ₹{savings.toLocaleString()}</span></div>}
        {discount > 0 && <div className="flex justify-between text-emerald-700"><span>Discount</span><span>– ₹{discount.toLocaleString()}</span></div>}
        <div className="flex justify-between text-stone-700"><span>Shipping</span><span>{shippingCost === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${shippingCost}`}</span></div>
        {codFee > 0 && <div className="flex justify-between text-stone-700"><span>COD fee</span><span>₹{codFee}</span></div>}
      </div>

      <div className="flex items-baseline justify-between pt-3 border-t border-stone-200">
        <div>
          <div className="text-xs text-stone-500 uppercase tracking-wide">Total</div>
          <div className="text-xs text-stone-500">INR · Inclusive of all taxes</div>
        </div>
        <div className="font-serif text-3xl font-bold text-[#1b3a2e]">₹{total.toLocaleString()}</div>
      </div>

      {savings + discount > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2">
          <Tag className="w-4 h-4 text-emerald-700 mt-0.5" />
          <div className="text-sm text-emerald-800 font-medium">You're saving ₹{(savings + discount).toLocaleString()} on this order!</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-200">
        <div className="flex items-center gap-2 text-xs text-stone-600"><ShieldCheck className="w-4 h-4 text-amber-700" /> Secure payment</div>
        <div className="flex items-center gap-2 text-xs text-stone-600"><Truck className="w-4 h-4 text-amber-700" /> Free shipping ₹999+</div>
      </div>
    </div>
  )
}
