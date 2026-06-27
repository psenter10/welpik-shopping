import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: '100% Plant Based Natural Health Supplements India - Zeroharm Sciences',
  description: "India's 1st Nano formulated nutraceutical brand. Get 100% plant based natural wellness & healthcare supplements.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#f7f3ec] text-[#1b3a2e]">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
