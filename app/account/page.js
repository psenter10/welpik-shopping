'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Package, MapPin, Heart, User, LogOut, ChevronRight, ShieldCheck,
  Truck, Leaf, Edit2, Plus, Award, Phone, Mail, ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import SiteHeader from '@/components/site-header'
import CartDrawer from '@/components/cart-drawer'

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, hydrated } = useAuth() || {}
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (hydrated && !user) router.push('/account/login')
  }, [hydrated, user, router])

  useEffect(() => {
    try {
      const last = localStorage.getItem('zh_last_order')
      if (last) {
        const o = JSON.parse(last)
        setOrders([{
          id: o.orderId,
          date: o.placedAt,
          status: 'Processing',
          items: o.items || [],
          total: o.total,
          payment: o.payment,
        }])
      }
    } catch (e) {}
  }, [])

  if (!hydrated || !user) {
    return <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center text-[#1b3a2e]">Loading...</div>
  }

  const initial = (user.name || user.phone || user.email || 'U').charAt(0).toUpperCase()
  const displayName = user.name || (user.phone ? `+91 ${user.phone}` : user.email)

  const TABS = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <SiteHeader />
      <CartDrawer />

      {/* Hero */}
      <section className="bg-[#ede4d3] py-10">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1b3a2e] text-amber-400 flex items-center justify-center font-serif text-3xl md:text-4xl font-bold">
            {initial}
          </div>
          <div className="flex-1">
            <div className="text-amber-700 uppercase tracking-widest text-xs font-semibold mb-1">Welcome back</div>
            <h1 className="font-serif text-2xl md:text-4xl text-[#1b3a2e]">Hi, {displayName}!</h1>
            <p className="text-stone-600 text-sm mt-1">Manage orders, addresses and your wellness journey.</p>
          </div>
          <Button onClick={() => { logout(); router.push('/') }} variant="outline" className="hidden md:flex border-[#1b3a2e] text-[#1b3a2e] hover:bg-[#1b3a2e] hover:text-white rounded-full">
            <LogOut className="w-4 h-4 mr-2" /> Log out
          </Button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-5 py-4 text-left border-b border-stone-100 last:border-b-0 transition ${activeTab === t.id ? 'bg-[#1b3a2e] text-white' : 'text-[#1b3a2e] hover:bg-stone-50'}`}>
                <t.icon className="w-5 h-5" />
                <span className="flex-1 font-medium">{t.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
            <button onClick={() => { logout(); router.push('/') }} className="w-full flex items-center gap-3 px-5 py-4 text-left text-red-700 hover:bg-red-50 border-t border-stone-200">
              <LogOut className="w-5 h-5" /> <span className="flex-1 font-medium">Log out</span>
            </button>
          </div>

          {/* Perks */}
          <div className="mt-6 bg-[#1b3a2e] rounded-2xl p-5 text-[#f7f3ec]">
            <div className="flex items-center gap-2 text-amber-400 mb-2"><Award className="w-5 h-5" /><span className="font-serif text-lg">Member Perks</span></div>
            <ul className="text-sm text-[#f7f3ec]/85 space-y-1.5">
              <li>• Free shipping on ₹999+</li>
              <li>• Early access to new launches</li>
              <li>• Birthday gift on us</li>
              <li>• Personalized recommendations</li>
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div>
          {activeTab === 'orders' && (
            <div>
              <h2 className="font-serif text-3xl text-[#1b3a2e] mb-6">My Orders</h2>
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#ede4d3] flex items-center justify-center"><ShoppingBag className="w-8 h-8 text-[#1b3a2e]" /></div>
                  <div className="font-serif text-2xl text-[#1b3a2e] mb-2">No orders yet</div>
                  <p className="text-stone-600 mb-6">Start your wellness journey — explore plant-powered formulas.</p>
                  <Link href="/collections/all"><Button className="bg-[#1b3a2e] text-white rounded-full px-8 h-11">Shop now</Button></Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(o => (
                    <div key={o.id} className="bg-white rounded-2xl border border-stone-200 p-5">
                      <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-stone-500">Order</div>
                          <div className="font-serif text-xl text-[#1b3a2e]">#{o.id}</div>
                          <div className="text-xs text-stone-500 mt-1">{new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {o.status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        {o.items.map(it => (
                          <div key={it.slug} className="flex gap-3 items-center">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#f4ede0] shrink-0">
                              <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                              <span className="absolute -top-1.5 -right-1.5 bg-[#1b3a2e] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{it.qty}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-[#1b3a2e] line-clamp-1">{it.name}</div>
                              <div className="text-xs text-stone-500">Qty {it.qty}</div>
                            </div>
                            <div className="font-semibold text-[#1b3a2e] text-sm">₹{(it.price * it.qty).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tracking */}
                      <div className="bg-[#f7f3ec] rounded-xl p-4 mb-4">
                        <div className="flex justify-between mb-3">
                          <span className="text-xs uppercase tracking-widest text-stone-500">Status</span>
                          <span className="text-xs text-stone-500">Updated just now</span>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <div className="absolute top-3 left-0 right-0 h-0.5 bg-stone-300"></div>
                          <div className="absolute top-3 left-0 h-0.5 bg-emerald-600" style={{ width: '33%' }}></div>
                          {['Placed','Packed','Shipped','Delivered'].map((s, i) => (
                            <div key={s} className="relative flex flex-col items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 0 ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-stone-300 text-stone-400'}`}>
                                {i + 1}
                              </div>
                              <div className={`text-[11px] mt-2 ${i <= 0 ? 'text-emerald-700 font-medium' : 'text-stone-500'}`}>{s}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-stone-500">Total</span>
                          <span className="font-serif text-2xl font-bold text-[#1b3a2e]">₹{(o.total || 0).toLocaleString()}</span>
                          <span className="text-xs text-stone-500 capitalize">via {o.payment === 'upi' ? 'UPI' : o.payment === 'cod' ? 'COD' : o.payment}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-stone-300 text-[#1b3a2e] rounded-full">Track Order</Button>
                          <Button variant="outline" size="sm" className="border-stone-300 text-[#1b3a2e] rounded-full">Invoice</Button>
                          <Button size="sm" className="bg-[#1b3a2e] text-white rounded-full hover:bg-[#2a5444]">Reorder</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-3xl text-[#1b3a2e]">Saved Addresses</h2>
                <Button className="bg-[#1b3a2e] text-white rounded-full hover:bg-[#2a5444]"><Plus className="w-4 h-4 mr-1" /> Add Address</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border-2 border-[#1b3a2e] p-5 relative">
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wide bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Default</span>
                  <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">Home</div>
                  <div className="font-medium text-[#1b3a2e]">{user.name || 'You'}</div>
                  <div className="text-sm text-stone-600 mt-1">Plot 42, Banjara Hills, Road No. 12<br />Hyderabad, Telangana 500034<br />India</div>
                  <div className="text-sm text-stone-600 mt-2 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +91 {user.phone || '9876543210'}</div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="border-stone-300 text-[#1b3a2e] rounded-full"><Edit2 className="w-3 h-3 mr-1" /> Edit</Button>
                    <Button size="sm" variant="outline" className="border-stone-300 text-red-700 rounded-full">Delete</Button>
                  </div>
                </div>
                <button className="bg-white rounded-2xl border-2 border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-stone-500 hover:border-[#1b3a2e] hover:text-[#1b3a2e] transition min-h-[200px]">
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="font-medium">Add a new address</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="font-serif text-3xl text-[#1b3a2e] mb-6">My Wishlist</h2>
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#ede4d3] flex items-center justify-center"><Heart className="w-8 h-8 text-[#1b3a2e]" /></div>
                <div className="font-serif text-2xl text-[#1b3a2e] mb-2">Your wishlist is empty</div>
                <p className="text-stone-600 mb-6">Tap the heart on any product to save it for later.</p>
                <Link href="/collections/all"><Button className="bg-[#1b3a2e] text-white rounded-full px-8 h-11">Discover Products</Button></Link>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="font-serif text-3xl text-[#1b3a2e] mb-6">Profile Details</h2>
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <Row icon={User} label="Full Name" value={user.name || 'Not set'} />
                <Row icon={Phone} label="Mobile Number" value={user.phone ? `+91 ${user.phone}` : 'Not set'} />
                <Row icon={Mail} label="Email" value={user.email || 'Not set'} />
                <Row icon={Award} label="Loyalty Tier" value="Wellness Insider" badge />
                <div className="pt-2">
                  <Button className="bg-[#1b3a2e] text-white rounded-full hover:bg-[#2a5444]"><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</Button>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <Stat icon={Truck} label="Orders" value={orders.length} />
                <Stat icon={Heart} label="Wishlist" value={0} />
                <Stat icon={Award} label="Reward Points" value={250} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ icon: Icon, label, value, badge }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-b-0">
      <div className="w-10 h-10 rounded-full bg-[#ede4d3] flex items-center justify-center text-[#1b3a2e]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-widest text-stone-500">{label}</div>
        <div className="font-medium text-[#1b3a2e] flex items-center gap-2">
          {value}
          {badge && <span className="text-[10px] uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">VIP</span>}
        </div>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 text-center">
      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#ede4d3] flex items-center justify-center text-[#1b3a2e]"><Icon className="w-5 h-5" /></div>
      <div className="font-serif text-3xl font-bold text-[#1b3a2e]">{value}</div>
      <div className="text-xs uppercase tracking-widest text-stone-500">{label}</div>
    </div>
  )
}
