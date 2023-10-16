import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web scraping',
  description: 'Scraping with you favorite stores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} h-screen flex flex-col`}>
        <Header />
        <main className='max-w-7xl mx-auto mb-auto px-5'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
