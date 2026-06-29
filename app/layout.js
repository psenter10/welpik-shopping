import './globals.css'
import { Inter, Nunito } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', weight: ['400', '600', '700', '800'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: '100% Plant Based Natural Health Supplements India - Welpik',
  description: "India's 1st Nano formulated nutraceutical brand. Get 100% plant based natural wellness & healthcare supplements.",
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body className="font-sans antialiased bg-[#f7f3ec] text-[#1b3a2e]">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
