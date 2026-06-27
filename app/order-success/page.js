'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Package, Truck, Mail, ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

function SuccessContent() {
  const params = useSearchParams()
  const id = params.get('id') || 'ZH000000'
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('zh_last_order')
      if (raw) setOrder(JSON.parse(raw))
    } catch (e) {}
  }, [])

  const eta = new Date()
  eta.setDate(eta.getDate() + (order?.shipping === 'express' ? 2 : 5))
  const etaStr = eta.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-serif text-2xl font-bold text-[#1b3a2e]">ZeroHarm</span>
            <span className="text-[10px] tracking-[0.3em] text-[#1b3a2e]/70 uppercase">Sciences</span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Success card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10 text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="w-10 h-10 text-emerald-700" strokeWidth={3} />
          </div>
          <div className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-2">Order Confirmed</div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1b3a2e] mb-3">Thank you{order?.form?.firstName ? `, ${order.form.firstName}` : ''}!</h1>
          <p className="text-stone-600 mb-6">Your wellness journey just got an upgrade. We've sent a confirmation to {order?.form?.email || 'your email'}.</p>
          <div className="inline-block bg-[#f7f3ec] border border-stone-200 rounded-xl px-6 py-3">
            <div className="text-xs uppercase tracking-widest text-stone-500">Order Number</div>
            <div className="font-serif text-2xl font-bold text-[#1b3a2e]">#{id}</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 mb-6">
          <h2 className="font-serif text-xl text-[#1b3a2e] mb-5">What happens next?</h2>
          <div className="space-y-5">
            {[
              { icon: Mail, title: 'Order confirmation', desc: "You'll receive an email confirmation shortly.", done: true },
              { icon: Package, title: 'Packed with care', desc: 'Your order is being packed in eco-friendly glass bottles.', done: false },
              { icon: Truck, title: 'On its way', desc: 'Tracking link will be shared on your phone/email.', done: false },
              { icon: Calendar, title: `Expected delivery: ${etaStr}`, desc: order?.shipping === 'express' ? 'Express • 1-2 business days' : 'Standard • 3-5 business days', done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${s.done ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-[#1b3a2e]'}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-[#1b3a2e]">{s.title}</div>
                  <div className="text-sm text-stone-600">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order details */}
        {order && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 mb-6">
            <h2 className="font-serif text-xl text-[#1b3a2e] mb-5">Order details</h2>
            <div className="space-y-4 mb-6">
              {order.items?.map(it => (
                <div key={it.slug} className="flex gap-3 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#f4ede0] shrink-0">
                    <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#1b3a2e] text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{it.qty}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#1b3a2e] line-clamp-2">{it.name}</div>
                    <div className="text-xs text-stone-500">Qty {it.qty}</div>
                  </div>
                  <div className="font-semibold text-[#1b3a2e]">₹{(it.price * it.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-stone-200">
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">Shipping Address</div>
                <div className="text-sm text-[#1b3a2e]">
                  <div className="font-medium">{order.form?.firstName} {order.form?.lastName}</div>
                  <div className="text-stone-600">{order.form?.address}</div>
                  {order.form?.apartment && <div className="text-stone-600">{order.form.apartment}</div>}
                  <div className="text-stone-600">{order.form?.city}, {order.form?.state} {order.form?.pincode}</div>
                  <div className="text-stone-600">India</div>
                  <div className="text-stone-600 mt-1">📞 +91 {order.form?.phone}</div>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">Payment Method</div>
                <div className="text-sm text-[#1b3a2e] font-medium capitalize mb-4">{order.payment === 'upi' ? 'UPI' : order.payment === 'cod' ? 'Cash on Delivery' : order.payment}</div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">Total Paid</div>
                <div className="font-serif text-2xl font-bold text-[#1b3a2e]">₹{order.total?.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button className="w-full h-12 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full">Continue Shopping <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
          <Button variant="outline" className="flex-1 h-12 border-[#1b3a2e] text-[#1b3a2e] hover:bg-[#1b3a2e] hover:text-white rounded-full">Track Order</Button>
        </div>

        <div className="text-center text-xs text-stone-500 mt-8">
          Need help? Email us at <a href="mailto:support@zeroharm.in" className="underline">support@zeroharm.in</a> or call +91 9154863402
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center text-[#1b3a2e]">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
