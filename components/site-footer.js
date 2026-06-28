'use client'

import {
  Truck, ShieldCheck, Award, Leaf,
  Facebook, Instagram, Youtube, Twitter,
  Phone, Mail, MapPin
} from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="bg-[#1b3a2e] text-[#f7f3ec] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="font-serif text-3xl font-bold mb-3">Welpik</div>
            <p className="text-[#f7f3ec]/75 mb-6 max-w-sm leading-relaxed">India's 1st Nano formulated nutraceutical brand. 100% plant-based, clinically proven supplements crafted with patented nanotechnology.</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#f7f3ec]/30 flex items-center justify-center hover:bg-[#f7f3ec] hover:text-[#1b3a2e] transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-amber-400">Shop</h4>
            <ul className="space-y-2 text-sm text-[#f7f3ec]/80">
              {['All Products', 'Best Sellers', 'New Arrivals', 'Combos & Offers', 'Buy 3 @ ₹1999'].map(l => (
                <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-amber-400">Company</h4>
            <ul className="space-y-2 text-sm text-[#f7f3ec]/80">
              {['About Us', 'Our Science', 'Sustainability', 'Blogs', 'Careers'].map(l => (
                <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-amber-400">Support</h4>
            <ul className="space-y-3 text-sm text-[#f7f3ec]/80">
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /><span>+91 9154863402</span></li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /><span>support@welpik.in</span></li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>Hyderabad, Telangana, India</span></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#f7f3ec]/10 py-8">
          <div className="flex items-center gap-3"><Truck className="w-6 h-6 text-amber-400" /><div><div className="font-medium text-sm">Free Shipping</div><div className="text-xs text-[#f7f3ec]/60">On orders above ₹999</div></div></div>
          <div className="flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-amber-400" /><div><div className="font-medium text-sm">Secure Payments</div><div className="text-xs text-[#f7f3ec]/60">100% safe checkout</div></div></div>
          <div className="flex items-center gap-3"><Award className="w-6 h-6 text-amber-400" /><div><div className="font-medium text-sm">Clinically Tested</div><div className="text-xs text-[#f7f3ec]/60">Doctor recommended</div></div></div>
          <div className="flex items-center gap-3"><Leaf className="w-6 h-6 text-amber-400" /><div><div className="font-medium text-sm">100% Plant Based</div><div className="text-xs text-[#f7f3ec]/60">Natural & ayurvedic</div></div></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#f7f3ec]/10 text-xs text-[#f7f3ec]/60">
          <div>© 2025 Welpik. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
