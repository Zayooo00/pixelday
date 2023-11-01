import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import './globals.css'

const font = VT323({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Pixel Day',
  description: 'Aesthethic pixel art organizer and notebook',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
