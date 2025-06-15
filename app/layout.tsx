import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ViAdverNLI Dashboard - Phân tích Bộ dữ liệu Fact-checking Tiếng Việt',
  description: 'Dashboard phân tích hiệu suất các mô hình AI trên bộ dữ liệu ViAdverNLI và các datasets fact-checking tiếng Việt',
  generator: 'Next.js',
  keywords: ['ViAdverNLI', 'fact-checking', 'NLP', 'tiếng Việt', 'AI'],
  authors: [{ name: 'ViAdverNLI Team' }],
  openGraph: {
    title: 'ViAdverNLI Dashboard',
    description: 'Phân tích và so sánh hiệu suất các mô hình AI trên dữ liệu fact-checking tiếng Việt',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
