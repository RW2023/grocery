import type { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: 'Grocery List App',
  description: 'Grocery list app built with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
