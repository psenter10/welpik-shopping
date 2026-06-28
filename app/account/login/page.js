'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Phone, Mail, Lock, ShieldCheck, Truck, Leaf, ArrowLeft, Edit2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth() || {}
  const [mode, setMode] = useState('phone') // 'phone' | 'email'
  const [step, setStep] = useState('input') // 'input' | 'otp'
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const [error, setError] = useState('')
  const otpRefs = useRef([])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  const sendOtp = (e) => {
    e?.preventDefault?.()
    setError('')
    if (mode === 'phone' && !/^[6-9]\d{9}$/.test(phone)) { setError('Enter a valid 10-digit Indian mobile number'); return }
    if (mode === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setResendIn(30)
      setOtp(['', '', '', '', '', ''])
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }, 700)
  }

  const onOtpChange = (i, v) => {
    const ch = v.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = ch
    setOtp(next)
    if (ch && i < 5) otpRefs.current[i + 1]?.focus()
    if (next.every(x => x)) verifyOtp(next.join(''))
  }

  const onOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  const verifyOtp = (code) => {
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // accept any 6-digit OTP
      if (code.length === 6) {
        const info = mode === 'phone' ? { phone, name: name || undefined } : { email, name: name || undefined }
        login?.(info)
        router.push('/account')
      } else {
        setError('Invalid OTP. Try again.')
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] flex flex-col">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo/welpik-logo.png" alt="Welpik" className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-sm text-stone-600 hover:text-[#1b3a2e] flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back to store</Link>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2">
        {/* Left: Form */}
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="text-amber-700 uppercase tracking-widest text-xs font-semibold mb-2">{step === 'otp' ? 'Verify' : 'Welcome'}</div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1b3a2e] mb-3">
              {step === 'otp' ? 'Enter the OTP' : 'Login or Sign Up'}
            </h1>
            <p className="text-stone-600 mb-8">
              {step === 'otp'
                ? <>We've sent a 6-digit code to <span className="font-medium text-[#1b3a2e]">{mode === 'phone' ? `+91 ${phone}` : email}</span> <button onClick={() => setStep('input')} className="inline-flex items-center text-sm underline ml-1"><Edit2 className="w-3 h-3 mr-0.5" />Change</button></>
                : 'Get personalized recommendations, faster checkout, and track your orders.'}
            </p>

            {step === 'input' && (
              <>
                {/* Tabs */}
                <div className="flex bg-white border border-stone-200 rounded-full p-1 mb-6">
                  <button onClick={() => setMode('phone')} className={`flex-1 h-10 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition ${mode === 'phone' ? 'bg-[#1b3a2e] text-white' : 'text-stone-600'}`}>
                    <Phone className="w-4 h-4" /> Phone
                  </button>
                  <button onClick={() => setMode('email')} className={`flex-1 h-10 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition ${mode === 'email' ? 'bg-[#1b3a2e] text-white' : 'text-stone-600'}`}>
                    <Mail className="w-4 h-4" /> Email
                  </button>
                </div>

                <form onSubmit={sendOtp} className="space-y-4">
                  {mode === 'phone' ? (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1b3a2e] font-medium text-sm">+91 │</div>
                      <Input type="tel" inputMode="numeric" maxLength={10} placeholder="Mobile number" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} className="h-14 pl-16 text-base bg-white border-stone-300 rounded-lg" />
                    </div>
                  ) : (
                    <Input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="h-14 text-base bg-white border-stone-300 rounded-lg" />
                  )}

                  <Input placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)} className="h-14 text-base bg-white border-stone-300 rounded-lg" />

                  {error && <div className="text-red-600 text-sm">{error}</div>}

                  <Button type="submit" disabled={loading} className="w-full h-14 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-base font-semibold">
                    {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span> Sending OTP...</span> : 'Send OTP'}
                  </Button>
                </form>

                <div className="flex items-center my-7 gap-3">
                  <div className="flex-1 h-px bg-stone-300" />
                  <span className="text-xs uppercase tracking-widest text-stone-500">OR</span>
                  <div className="flex-1 h-px bg-stone-300" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="h-12 rounded-full border border-stone-300 bg-white text-sm font-medium text-[#1b3a2e] flex items-center justify-center gap-2 hover:border-[#1b3a2e]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google
                  </button>
                  <button type="button" className="h-12 rounded-full border border-stone-300 bg-white text-sm font-medium text-[#1b3a2e] flex items-center justify-center gap-2 hover:border-[#1b3a2e]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    Apple
                  </button>
                </div>

                <p className="text-xs text-stone-500 text-center mt-7 leading-relaxed">
                  By continuing you agree to our <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>.
                </p>
              </>
            )}

            {step === 'otp' && (
              <div>
                <div className="flex gap-2 mb-5" onPaste={(e) => {
                  const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
                  if (text.length === 6) {
                    e.preventDefault()
                    setOtp(text.split(''))
                    setTimeout(() => verifyOtp(text), 100)
                  }
                }}>
                  {otp.map((d, i) => (
                    <input key={i} ref={el => otpRefs.current[i] = el} value={d} onChange={(e) => onOtpChange(i, e.target.value)} onKeyDown={(e) => onOtpKey(i, e)} inputMode="numeric" maxLength={1} className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white border-2 border-stone-300 rounded-lg text-[#1b3a2e] focus:border-[#1b3a2e] focus:outline-none" />
                  ))}
                </div>

                {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

                <Button onClick={() => verifyOtp(otp.join(''))} disabled={loading || otp.some(d => !d)} className="w-full h-14 bg-[#1b3a2e] hover:bg-[#2a5444] text-white rounded-full text-base font-semibold">
                  {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span> Verifying...</span> : 'Verify & Continue'}
                </Button>

                <div className="text-center mt-6 text-sm text-stone-600">
                  Didn't receive the code?{' '}
                  {resendIn > 0 ? (
                    <span className="text-stone-500">Resend in {resendIn}s</span>
                  ) : (
                    <button onClick={sendOtp} className="text-[#1b3a2e] font-medium underline">Resend OTP</button>
                  )}
                </div>

                <div className="text-center mt-3 text-xs text-stone-500">Tip: Enter any 6-digit number for demo</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Brand panel */}
        <div className="hidden lg:flex bg-[#1b3a2e] text-[#f7f3ec] items-center justify-center px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="https://www.zeroharm.in/cdn/shop/files/02-Brand-Welcome---Banner-Design_ce078f36-fd6a-43bd-99e2-cf1258d398a4.png?v=1762152933&width=1920" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-md">
            <div className="text-amber-400 uppercase tracking-widest text-xs font-semibold mb-3">Members get more</div>
            <h2 className="font-serif text-4xl xl:text-5xl leading-tight mb-6">Plant-powered wellness, made personal.</h2>
            <ul className="space-y-4">
              {[
                { icon: Truck, t: 'Free Shipping', s: 'Always — on orders ₹999+' },
                { icon: Leaf, t: '100% Plant-Based', s: 'No harsh chemicals or fillers' },
                { icon: ShieldCheck, t: 'Clinically Proven', s: 'Doctor recommended formulations' },
                { icon: Lock, t: 'Secure & Private', s: 'Your data is encrypted' },
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium">{f.t}</div>
                    <div className="text-sm text-[#f7f3ec]/70">{f.s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
