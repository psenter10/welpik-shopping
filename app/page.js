'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search, ShoppingCart, User, Menu, ChevronLeft, ChevronRight,
  Star, Truck, ShieldCheck, Award, Leaf, Heart,
  Facebook, Instagram, Youtube, Twitter, ArrowRight, Phone, Mail, MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { PRODUCTS } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import CartDrawer from '@/components/cart-drawer'

const heroBanners = [
  { img: 'https://www.zeroharm.in/cdn/shop/files/02-Brand-Welcome---Banner-Design_ce078f36-fd6a-43bd-99e2-cf1258d398a4.png?v=1762152933&width=3840' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/04-Mens-Health---Banner-Design_c3582052-9fe5-4b6b-a2d5-551bf0bce6a6.png?v=1762152933&width=3840' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/05-Womens-Health---Banner-Design_5d8d0ba2-30e3-4bbe-a34e-8d80ef1f841c.png?v=1762152933&width=3840' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/06-Digestion---Banner-Design_07aaadd2-19ba-49e7-a8e6-8c3071340dac.png?v=1762152933&width=3840' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/07-Weight-Management---Banner-Design_68556260-4344-4ce1-b500-f722848816e8.png?v=1762152933&width=3840' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/08-Beauty-Range---Banner-Design_1f5f2c81-6a80-4660-bbcc-7903dc599bfd.png?v=1762152933&width=3840' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/09-Diabetic-Range---Banner-Design_e9e3a07f-bf4a-4d90-8e3b-413e9a13bc36.png?v=1762152933&width=3840' },
]

const badges = [
  { icon: 'https://www.zeroharm.in/cdn/shop/files/Advanced_nanotechnology-01-01_600x.png?v=1702976184', label: 'Advanced Nanotechnology' },
  { icon: 'https://www.zeroharm.in/cdn/shop/files/clinically_proved-01_600x.png?v=1702976572', label: 'Clinically Proven' },
  { icon: 'https://www.zeroharm.in/cdn/shop/files/no_side_effects-01_600x.png?v=1702976602', label: 'No Side Effects' },
  { icon: 'https://www.zeroharm.in/cdn/shop/files/100_bioavailable-01_82bf2de5-b427-4fcb-8bb5-890c7ab938c9_600x.png?v=1702983428', label: '100% Bioavailable' },
]

const categories = [
  { img: 'https://www.zeroharm.in/cdn/shop/files/degistive_Health_3_100x.gif?v=1703161078', name: "Women's Health", href: '/collections/womens-health' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/fat_burner_1_100x.gif?v=1703161078', name: 'Weight Management', href: '/collections/all' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/degistive_Health_1_100x.gif?v=1703160656', name: 'Digestive Health', href: '/collections/gut-health' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/Sexual_Health_2_100x.gif?v=1703161857', name: 'Sexual Health', href: '/collections/mens-health' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/lung_health_2_100x.gif?v=1703161856', name: 'Lung Health', href: '/collections/lung-health' },
  { img: 'https://www.zeroharm.in/cdn/shop/files/Sexual_Health_2_100x.gif?v=1703161857', name: "Men's Health", href: '/collections/mens-health' },
]

const bestSellers = PRODUCTS.slice(0, 8)
const newArrivals = PRODUCTS.slice(6, 14).concat(PRODUCTS.slice(0, 1)).slice(0, 8)
const _legacyBest = [
  { img: 'https://www.zeroharm.in/cdn/shop/files/1_20_b88cdbff-1a77-4fa1-b705-f8446ea84a0b.png?v=1766164278&width=533', name: 'ZeroHarm Back To Teens Tablets', rating: 4.57, reviews: 1079, price: 999, oldPrice: 1199, discount: 17 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/narie-boomup-ayurvedic-breast-increase-capsules-8997401.jpg?v=1766165339&width=533', name: 'Narie BoomUp Ayurvedic Capsules', rating: 4.26, reviews: 53, price: 999, oldPrice: 1499, discount: 33 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/GutarmyFi-02.jpg?v=1766166028&width=533', name: 'Gut Army Prebiotic & Probiotic Capsules', rating: 4.59, reviews: 1142, price: 999, oldPrice: 1199, discount: 17 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/2_2.jpg?v=1766167097&width=533', name: 'Himalayan Shilajit With Ashwagandha & Safed Musli', rating: 4.58, reviews: 1409, price: 1300, oldPrice: 1899, discount: 32 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/ayurvedic-zeroharm-narie-fertility-formula-tablets-to-conceive-naturally-9203153.jpg?v=1766167594&width=533', name: 'Narie Fertility Formula Tablets', rating: 4.58, reviews: 1333, price: 1399, oldPrice: 1499, discount: 7 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/1_29_aab564f1-f549-45da-82ff-0765e20b0907.png?v=1766208931&width=533', name: 'Lung Detox Tablets', rating: 4.66, reviews: 342, price: 1089, oldPrice: 1499, discount: 27 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/f1_1.webp?v=1773747564&width=533', name: 'Narie Fertility Formula', rating: 4.58, reviews: 1333, price: 1399, oldPrice: 1499, discount: 7 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/Untitled-1-01.png?v=1778836896&width=533', name: 'Ayurvedic Narie Fertility Tablets', rating: 4.58, reviews: 1333, price: 1399, oldPrice: 1499, discount: 7 },
]

const _legacyNew = [
  { img: 'https://www.zeroharm.in/cdn/shop/files/ayurvedic-blood-purifier-for-acne-6-herb-nano-formula-1924988.jpg?v=1766165506&width=533', name: 'Ayurvedic Blood Purifier For Acne', rating: 4.83, reviews: 64, price: 899, oldPrice: 1199, discount: 25 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/carb-cutter-4435497.jpg?v=1766168308&width=533', name: 'Carb Cutter', rating: 4.88, reviews: 164, price: 1449, oldPrice: 1699, discount: 15 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/holo-hypertens-3841161.jpg?v=1766165479&width=533', name: 'Holo Hypertens', rating: 4.82, reviews: 39, price: 999, oldPrice: 1399, discount: 29 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/holo-piles-care-4678226.jpg?v=1766168363&width=533', name: 'Holo Piles Care', rating: 4.86, reviews: 21, price: 1199, oldPrice: 1499, discount: 20 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/magnesium-glycinate-capsules-4754965.jpg?v=1766165396&width=533', name: 'Magnesium Glycinate Capsules', rating: 4.74, reviews: 77, price: 899, oldPrice: 1499, discount: 40 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/narie-boomup-ayurvedic-breast-increase-capsules-8997401.jpg?v=1766165339&width=533', name: 'Narie BoomUp Capsules', rating: 4.26, reviews: 53, price: 999, oldPrice: 1499, discount: 33 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/narie-desire-lift-3347406.jpg?v=1766165317&width=533', name: 'Narie Desire Lift', rating: 4.86, reviews: 44, price: 949, oldPrice: 1499, discount: 37 },
  { img: 'https://www.zeroharm.in/cdn/shop/files/gas-relief-4312314.jpg?v=1766168169&width=533', name: 'Gas Relief Capsules', rating: 4.78, reviews: 69, price: 999, oldPrice: 1499, discount: 33 },
]

const ingredients = [
  { name: 'Milk Thistle', img: 'https://www.zeroharm.in/cdn/shop/files/milk-thistle-01-01_800x.jpg?v=1706512969' },
  { name: 'Boswellic Acid', img: 'https://www.zeroharm.in/cdn/shop/files/boswellic_acid-01_155aca34-65d6-4246-b28e-86fa34b9844e_800x.jpg?v=1706512969' },
  { name: 'CoQ 10', img: 'https://www.zeroharm.in/cdn/shop/files/CoQ_10-01-01_800x.jpg?v=1706512969' },
  { name: 'Shilajit', img: 'https://www.zeroharm.in/cdn/shop/files/shilajit-01_800x.png?v=1706513146' },
  { name: 'Ashwagandha', img: 'https://www.zeroharm.in/cdn/shop/files/ashwagandha-01-01_1_800x.jpg?v=1706512720' },
  { name: 'Curcumin', img: 'https://www.zeroharm.in/cdn/shop/files/curcumin-01-01_65ff6439-0755-4aaa-89bd-726e591d0dbd_800x.jpg?v=1706512744' },
  { name: 'Shatavari', img: 'https://www.zeroharm.in/cdn/shop/files/shathavari-01-01_b1b9347e-0f66-45b8-a558-efdd3f8fb21a_800x.jpg?v=1706512819' },
  { name: 'Ginger', img: 'https://www.zeroharm.in/cdn/shop/files/ginger-01-01_800x.jpg?v=1706512819' },
  { name: 'Berberine', img: 'https://www.zeroharm.in/cdn/shop/files/berberin-01-01_800x.jpg?v=1706512819' },
  { name: 'ACV', img: 'https://www.zeroharm.in/cdn/shop/files/acv-01-01_b50c9749-422d-4d24-8330-0fde74ed6ba3_800x.jpg?v=1706512969' },
]

const steps = [
  { step: 1, title: 'Sourcing', img: 'https://www.zeroharm.in/cdn/shop/files/sourcing-01_600x.png?v=1703938872', desc: 'We select premium ingredients from original farms prioritizing quality. Wild grown for purity, our plants thrive in pristine conditions. Region-specific from NE, Himalayan, and South regions.' },
  { step: 2, title: 'Extraction', img: 'https://www.zeroharm.in/cdn/shop/files/Extraction-2-01_600x.png?v=1703936420', desc: 'We prioritize extracting maximum benefits through our aqueous extraction process. Non-solvent aqueous extraction ensures Zero Harm and effectiveness.' },
  { step: 3, title: 'Nanotechnology', img: 'https://www.zeroharm.in/cdn/shop/files/Nanotechnology--01_b73d61a9-763d-4def-a0a2-db1681541c15_600x.png?v=1703936420', desc: 'Our products are manufactured using cutting-edge patent pending nanotechnology, improving solubility, bioavailability, and stability of ingredients.' },
  { step: 4, title: 'Encapsulation', img: 'https://www.zeroharm.in/cdn/shop/files/Encapsulation-2-01_600x.png?v=1703936420', desc: 'Using our nano-technology, active ingredients are encapsulated, forming a protective layer that enhances cellular uptake and prevents leaching.' },
  { step: 5, title: 'Packaging', img: 'https://www.zeroharm.in/cdn/shop/files/packaging-01-01-01_600x.png?v=1703938872', desc: 'To ensure hygiene and preserve the efficacy, we utilize glass bottles for packaging, especially in hot and humid conditions.' },
]

const experts = [
  { name: 'Dr. Shalini Patodiya', title: 'Dermatologist & Holistic Wellness Expert', img: 'https://www.zeroharm.in/cdn/shop/files/ZH_Doctors_creative_website_set_1_W_357_x_H_337_pxl_19_12_23_Dr._Shalini_428a7601-054b-42fa-a250-c2334d97f7c4_600x.jpg?v=1738407955', quote: "ZeroHarm's comprehensive approach to holistic wellness is revolutionary. As an expert, I wholeheartedly endorse their dedication to nurturing health from within." },
  { name: 'Dr. Bharat Patodiya', title: 'Consultant Medical Oncologist, Lung & Breast Cancer Specialist', img: 'https://www.zeroharm.in/cdn/shop/files/ZH_Doctors_creative_website_set_1_W_357_x_H_337_pxl_19_12_23_Dr._Bharat_600x.jpg?v=1703054885', quote: "I've seen remarkable transformations with ZeroHarm's holistic care. Their commitment to overall well-being and natural health solutions is exemplary." },
  { name: 'Dr. Sudhakar Darbawar', title: 'Promoter & Director, 45 Years In Medical Field', img: 'https://www.zeroharm.in/cdn/shop/files/ZH_Doctors_creative_website_set_1_W_357_x_H_337_pxl_19_12_23_Dr._Sudhakar_600x.jpg?v=1703054885', quote: "ZeroHarm's holistic vision reshapes health standards. I proudly support their integrative approach that empowers individuals toward sustained well-being." },
  { name: 'Dr. Snehal R Pansare', title: 'Advisor-Obstetrician and Gynaecologist', img: 'https://www.zeroharm.in/cdn/shop/files/ZH_Doctors_creative_website_set_1_W_357_x_H_337_pxl_19_12_23_Dr._Snehal_600x.jpg?v=1703054885', quote: "Having witnessed ZeroHarm's impact firsthand, I believe in their holistic methods for women's care. Their comprehensive approach fosters empowerment and enduring health." },
  { name: 'Dr. Nitin Darbawar', title: 'Specialist', img: 'https://www.zeroharm.in/cdn/shop/files/ZH_Doctors_creative_website_set_1_W_357_x_H_337_pxl_19_12_23_Dr._Nitin_c8aaad73-0c9a-44a3-975e-674f75e1fea8_600x.jpg?v=1707912817', quote: "As a Specialist, I commend ZeroHarm's holistic approach. Their comprehensive solutions prioritize root causes, empowering patients toward lasting wellness." },
]

const blogs = [
  { img: 'https://www.zeroharm.in/cdn/shop/articles/best-time-to-take-menstrual-health-supplements-women_4b5bc0bc-bd43-4ee3-98b7-6d5098dc2a3d.webp?v=1780136204&width=533', title: 'When to Use Menstrual Cycle-Regulating Supplements', excerpt: "Let's be real: trying to figure out your monthly cycle can feel like navigating a maze. From the exhaustion of heavy..." },
  { img: 'https://www.zeroharm.in/cdn/shop/articles/shatavari-and-ashwagandha-for-female-fertility_2f1808ed-49ad-4804-a87e-d725fd8b3556.webp?v=1780746240&width=533', title: 'Shatavari vs Ashwagandha: Which Is Better for Fertility?', excerpt: 'Shatavari vs Ashwagandha depends on the root cause of fertility issues. Shatavari supports reproductive health, ovulation, and menstrual balance...' },
  { img: 'https://www.zeroharm.in/cdn/shop/articles/guide-to-irregular-periods-and-fertility.webp?v=1778935487&width=533', title: 'Irregular Periods and Fertility: Can You Still Get Pregnant?', excerpt: 'Irregular periods can make ovulation difficult to predict and affect fertility. Hormonal imbalance, PCOS, stress, and nutrition play a...' },
]

const earthStats = [
  { icon: 'https://www.zeroharm.in/cdn/shop/files/Group_1074.png?v=1699532324&width=3200', value: '13000+', label: 'Children Education Supported' },
  { icon: 'https://www.zeroharm.in/cdn/shop/files/Group_1075.png?v=1699532324&width=3200', value: '7681', label: 'Co2 Tonnes Removed' },
  { icon: 'https://www.zeroharm.in/cdn/shop/files/Group_1076.png?v=1699532324&width=3200', value: '101,602 Kgs+', label: 'Plastic Removal Assisted' },
  { icon: 'https://www.zeroharm.in/cdn/shop/files/Group_1077.png?v=1699532324&width=3200', value: '48 Scholarships', label: 'Higher Education Granted' },
]

const instagramFeed = [
  'https://bucket.useifsapp.com/posts/zeroharm_sciences/3886726321540247589.jpg',
  'https://bucket.useifsapp.com/posts/zeroharm_sciences/3927457755310683267.jpg',
  'https://bucket.useifsapp.com/posts/zeroharm_sciences/3925887702551370247.jpg',
  'https://bucket.useifsapp.com/posts/zeroharm_sciences/3925061087727315063.jpg',
  'https://bucket.useifsapp.com/posts/zeroharm_sciences/3924194588830895740.jpg',
  'https://bucket.useifsapp.com/posts/zeroharm_sciences/3923725402189031733.jpg',
]

const navLinks = [
  { label: 'Shop All', href: '/collections/all', items: ['All Products', 'Best Sellers', 'New Arrivals', 'Combos & Offers'] },
  { label: 'Mens Health', href: '/collections/mens-health', items: ['Stamina & Strength', 'Sexual Wellness', 'Hair Care', 'Testosterone'] },
  { label: 'Womens Health', href: '/collections/womens-health', items: ['Fertility', 'PCOS Care', 'Hormonal Balance', 'Beauty'] },
  { label: 'Gut Health', href: '/collections/gut-health', items: ['Probiotics', 'Digestion', 'Gas Relief', 'Bloating'] },
  { label: 'Weight', href: '/collections/all', items: ['Fat Burners', 'Metabolism', 'Appetite Control'] },
  { label: 'Beauty', href: '/collections/beauty', items: ['Skin Care', 'Hair Care', 'Anti-Aging'] },
  { label: 'Diabetic Care', href: '/collections/diabetic-care', items: ['Blood Sugar', 'Diabetes Support'] },
  { label: 'About Us', href: '/' },
  { label: 'Blog', href: '/' },
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
        <button onClick={(e) => { e.preventDefault() }} className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
          <Heart className="w-4 h-4 text-[#1b3a2e]" />
        </button>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="p-4 flex flex-col flex-1">
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

function App() {
  const [heroIdx, setHeroIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [expertIdx, setExpertIdx] = useState(0)
  const { count, setOpen: setCartOpen } = useCart()
  const router = useRouter()
  const [searchQ, setSearchQ] = useState('')

  const onSearch = (e) => {
    e.preventDefault()
    if (searchQ.trim()) router.push(`/search?q=${encodeURIComponent(searchQ.trim())}`)
  }

  const next = () => setHeroIdx((heroIdx + 1) % heroBanners.length)
  const prev = () => setHeroIdx((heroIdx - 1 + heroBanners.length) % heroBanners.length)

  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <CartDrawer />
      {/* Announcement bar */}
      <div className="bg-[#1b3a2e] text-[#f7f3ec] text-xs md:text-sm py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {Array.from({length: 2}).map((_,i)=> (
            <div key={i} className="flex gap-12 shrink-0">
              <span>FREE Shipping on Orders Above ₹999</span>
              <span>•</span>
              <span>India's 1st Nano Formulated Nutraceutical Brand</span>
              <span>•</span>
              <span>Clinically Proven | 100% Plant Based</span>
              <span>•</span>
              <span>Buy 3 @ ₹1999 Offer Live</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f7f3ec]/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2"><Menu className="w-6 h-6 text-[#1b3a2e]" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#f7f3ec]">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map(n => (
                    <Link key={n.label} href={n.href || '#'} className="text-[#1b3a2e] font-medium border-b border-stone-200 pb-3">{n.label}</Link>
                  ))}
                  <Link href="/account/login" className="text-[#1b3a2e] font-medium border-b border-stone-200 pb-3">Account</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <a href="#" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl md:text-3xl font-bold text-[#1b3a2e] tracking-tight">ZeroHarm</span>
              <span className="text-[10px] tracking-[0.3em] text-[#1b3a2e]/70 uppercase">Sciences</span>
            </div>
          </a>

          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search supplements, ingredients..." className="pl-10 bg-white border-stone-300 rounded-full h-11" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          </form>

          <div className="flex items-center gap-1 md:gap-3">
            <Link href="/search" className="p-2 md:hidden"><Search className="w-5 h-5 text-[#1b3a2e]" /></Link>
            <Link href="/account/login" className="p-2 hidden md:flex items-center gap-2"><User className="w-5 h-5 text-[#1b3a2e]" /></Link>
            <button onClick={() => setCartOpen(true)} className="p-2 relative">
              <ShoppingCart className="w-5 h-5 text-[#1b3a2e]" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1">{count}</span>
            </button>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center justify-center gap-7 py-3">
              {navLinks.map(n => (
                <li key={n.label} className="group relative">
                  <Link href={n.href || '#'} className="text-xs xl:text-sm font-medium text-[#1b3a2e] hover:text-amber-700 uppercase tracking-wide whitespace-nowrap">{n.label}</Link>
                  {n.items && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-stone-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
                      {n.items.map(it => (
                        <Link key={it} href={n.href || '#'} className="block px-4 py-2 text-sm text-[#1b3a2e] hover:bg-stone-100">{it}</Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[16/8] md:aspect-[16/6] overflow-hidden bg-[#1b3a2e]">
          {heroBanners.map((b, i) => (
            <img key={i} src={b.img} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <button onClick={prev} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
            <ChevronLeft className="w-5 h-5 text-[#1b3a2e]" />
          </button>
          <button onClick={next} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
            <ChevronRight className="w-5 h-5 text-[#1b3a2e]" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroBanners.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} className={`h-2 rounded-full transition-all ${i === heroIdx ? 'w-8 bg-white' : 'w-2 bg-white/60'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Badge marquee */}
      <section className="bg-[#1b3a2e] py-4 overflow-hidden border-y border-[#2a5444]">
        <div className="flex animate-marquee-slow whitespace-nowrap gap-16">
          {Array.from({length: 3}).map((_,k) => (
            <div key={k} className="flex items-center gap-16 shrink-0">
              {badges.map((b, i) => (
                <div key={`${k}-${i}`} className="flex items-center gap-3 shrink-0">
                  <img src={b.icon} alt={b.label} className="w-10 h-10 brightness-0 invert" />
                  <span className="text-[#f7f3ec] text-sm md:text-base font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Categories */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl text-center text-[#1b3a2e] mb-3">Shop by Categories</h2>
        <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">Discover plant-powered nano-formulated solutions tailored to your health goals.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <Link key={i} href={c.href} className="group flex flex-col items-center gap-3 text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#ede4d3] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shadow-sm">
                <img src={c.img} alt={c.name} className="w-3/4 h-3/4 object-contain" />
              </div>
              <span className="text-sm md:text-base font-medium text-[#1b3a2e] group-hover:text-amber-700">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="best">
            <div className="flex flex-col items-center mb-8">
              <TabsList className="bg-transparent gap-8">
                <TabsTrigger value="best" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1b3a2e] data-[state=active]:border-b-2 data-[state=active]:border-[#1b3a2e] rounded-none text-stone-500 text-xl md:text-2xl font-serif px-2 pb-2">Best Sellers</TabsTrigger>
                <TabsTrigger value="new" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1b3a2e] data-[state=active]:border-b-2 data-[state=active]:border-[#1b3a2e] rounded-none text-stone-500 text-xl md:text-2xl font-serif px-2 pb-2">New Arrivals</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="best">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {bestSellers.map((p, i) => <ProductCard key={i} p={p} />)}
              </div>
            </TabsContent>
            <TabsContent value="new">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {newArrivals.map((p, i) => <ProductCard key={i} p={p} />)}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-10">
            <Button variant="outline" className="rounded-full border-[#1b3a2e] text-[#1b3a2e] hover:bg-[#1b3a2e] hover:text-white px-8 h-11">View All</Button>
          </div>
        </div>
      </section>

      {/* Nano Tech */}
      <section className="py-16 md:py-24 bg-[#ede4d3]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#1b3a2e] relative">
              <img src="https://images.unsplash.com/photo-1597392582469-a697322d5c16?w=800" alt="" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b3a2e]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xs uppercase tracking-widest mb-2">Patented Tech</div>
                <div className="font-serif text-3xl">Nano Innovation</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-3">Our Science</div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1b3a2e] mb-6 leading-tight">What is Our Patented Nano-Technology</h2>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>Most supplements fail to deliver full benefits due to poor absorption.</p>
              <p>ZeroHarm's nanotechnology solves this by converting nutrients into ultra-small, nano-sized particles for faster absorption and higher bioavailability. These nano-particles bypass stomach acids, delivering nutrients directly into the bloodstream and reaching cells faster.</p>
              <p>Our nano-tablets dissolve only at pH 6-7.5, ensuring controlled release in the duodenum—the ideal absorption site. This means maximum nutrient delivery with a lower dosage, boosting efficiency.</p>
            </div>
            <Button className="mt-8 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full px-8 h-12">Discover the Science <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* Shop by Ingredients */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl text-center text-[#1b3a2e] mb-3">Shop by Ingredients</h2>
        <p className="text-center text-stone-600 mb-10">Pure, potent, and pristine — explore by hero ingredient.</p>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {ingredients.map((ing, i) => (
            <a key={i} href="#" className="group shrink-0 w-40 md:w-52 text-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm group-hover:shadow-xl transition-all">
                <img src={ing.img} alt={ing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mt-3 text-[#1b3a2e] font-medium text-sm md:text-base">{ing.name}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-[#1b3a2e] text-[#f7f3ec]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-3">Process</div>
            <h2 className="font-serif text-3xl md:text-5xl mb-3">NanoTech Innovation at Its Finest</h2>
            <p className="text-[#f7f3ec]/70 max-w-2xl mx-auto">From source to shelf — five rigorous steps that define every ZeroHarm formulation.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {steps.map((s, i) => (
              <button key={s.step} onClick={() => setStepIdx(i)} className={`rounded-2xl p-5 text-left transition-all ${stepIdx === i ? 'bg-[#f7f3ec] text-[#1b3a2e]' : 'bg-[#2a5444] hover:bg-[#33644f]'}`}>
                <div className={`text-xs uppercase tracking-widest mb-2 ${stepIdx === i ? 'text-amber-700' : 'text-amber-400'}`}>Step {s.step}</div>
                <div className="font-serif text-xl mb-2">{s.title}</div>
                <img src={s.img} alt={s.title} className="w-12 h-12" />
              </button>
            ))}
          </div>
          <div className="mt-10 bg-[#2a5444] rounded-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
            <img src={steps[stepIdx].img} alt={steps[stepIdx].title} className="w-40 h-40 mx-auto" />
            <div className="md:col-span-2">
              <div className="text-amber-400 uppercase tracking-widest text-xs mb-2">Step {steps[stepIdx].step}</div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4">{steps[stepIdx].title}</h3>
              <p className="text-[#f7f3ec]/85 leading-relaxed">{steps[stepIdx].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 md:py-24 bg-[#ede4d3]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-3">Meet the Founder</div>
            <h2 className="font-serif text-4xl md:text-6xl text-[#1b3a2e] mb-2 leading-tight">Sachin Darbarwar</h2>
            <p className="font-serif italic text-xl text-[#1b3a2e]/80 mb-6">"Our aim is to safeguard humanity from harm, that is how Zeroharm was born."</p>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>After leading Simply Fresh Private Limited, India's largest state-of-the-art precision farm, and working across technology ecosystems in Australia, I saw how innovation can transform industries. Yet in plant-based medicine, one limitation persisted — bioavailability.</p>
              <p>Powerful natural compounds often fall short due to poor absorption. Zeroharm was created to bridge this gap by combining nanotechnology with plant science, ensuring nutrients are delivered with precision and measurable effectiveness.</p>
            </div>
            <Button className="mt-8 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full px-8 h-12">About Us <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#1b3a2e]">
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900" alt="Sachin Darbarwar" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1b3a2e] to-transparent">
                <div className="text-white font-serif text-2xl">Sachin Darbarwar</div>
                <div className="text-white/80 text-sm">Founder & CEO, ZeroHarm Sciences</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl text-center text-[#1b3a2e] mb-3">What Leading Industry Experts Have to Say</h2>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">Endorsed by India's top doctors and wellness specialists.</p>
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#ede4d3]">
            <img src={experts[expertIdx].img} alt={experts[expertIdx].name} className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <div className="text-7xl text-amber-500 font-serif leading-none mb-2">“</div>
            <p className="text-lg md:text-xl text-stone-700 font-serif italic leading-relaxed mb-6">{experts[expertIdx].quote}</p>
            <div className="text-[#1b3a2e] font-serif text-2xl">{experts[expertIdx].name}</div>
            <div className="text-stone-600 text-sm mt-1">{experts[expertIdx].title}</div>
            <div className="flex gap-3 mt-8">
              {experts.map((_, i) => (
                <button key={i} onClick={() => setExpertIdx(i)} className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${expertIdx === i ? 'border-[#1b3a2e] scale-110' : 'border-transparent opacity-60'}`}>
                  <img src={experts[i].img} alt={experts[i].name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-2">Read & Learn</div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#1b3a2e]">Featured Blogs</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#1b3a2e] font-medium hover:underline">View all <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((b, i) => (
              <a key={i} href="#" className="group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#1b3a2e] mb-2 group-hover:text-amber-700 transition-colors">{b.title}</h3>
                <p className="text-stone-600 text-sm line-clamp-3 mb-3">{b.excerpt}</p>
                <span className="text-[#1b3a2e] font-medium text-sm flex items-center gap-1">Continue Reading <ArrowRight className="w-4 h-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Earth */}
      <section className="py-16 md:py-24 bg-[#1b3a2e] text-[#f7f3ec]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-3">Our Impact</div>
            <h2 className="font-serif text-3xl md:text-5xl mb-3">Caring For Earth, Starting With Education</h2>
            <p className="text-[#f7f3ec]/70 max-w-2xl mx-auto">Every purchase fuels a greener planet and brighter futures.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {earthStats.map((s, i) => (
              <div key={i} className="bg-[#2a5444] rounded-2xl p-6 text-center hover:bg-[#33644f] transition">
                <img src={s.icon} alt="" className="w-16 h-16 mx-auto mb-4 brightness-0 invert" />
                <div className="font-serif text-3xl md:text-4xl mb-2 text-amber-400">{s.value}</div>
                <div className="text-[#f7f3ec]/85 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-2">@zeroharm_sciences</div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1b3a2e]">Follow Us on Instagram</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4">
          {instagramFeed.map((img, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-xl bg-stone-100">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#1b3a2e]/0 group-hover:bg-[#1b3a2e]/40 transition-all flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#ede4d3] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-serif text-3xl md:text-4xl text-[#1b3a2e] mb-3">Get Wellness Tips, Offers & More</h3>
          <p className="text-stone-600 mb-6">Join our community to receive exclusive insights on plant-based health.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="h-12 rounded-full bg-white border-stone-300" />
            <Button className="h-12 px-8 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b3a2e] text-[#f7f3ec] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="font-serif text-3xl font-bold mb-3">ZeroHarm</div>
              <div className="text-xs tracking-[0.3em] uppercase text-[#f7f3ec]/60 mb-4">Sciences</div>
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
                {['All Products','Best Sellers','New Arrivals','Combos & Offers','Buy 3 @ ₹1999'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-amber-400">Company</h4>
              <ul className="space-y-2 text-sm text-[#f7f3ec]/80">
                {['About Us','Our Science','Sustainability','Blogs','Careers'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-amber-400">Support</h4>
              <ul className="space-y-3 text-sm text-[#f7f3ec]/80">
                <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /><span>+91 9154863402</span></li>
                <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /><span>support@zeroharm.in</span></li>
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
            <div>© 2025 ZeroHarm Sciences. All rights reserved. UI clone for educational purposes.</div>
            <div className="flex gap-6"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">Cookies</a></div>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a href="#" className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </div>
  )
}

export default App
