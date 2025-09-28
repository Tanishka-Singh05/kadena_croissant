import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chainweb AI Agents',
  description: 'AI-powered reputation analysis and strategy agents for Chainweb ZK Reputation System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-primary-50 via-secondary-light to-primary-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
