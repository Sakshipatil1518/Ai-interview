
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '../lib/languageContext'
import { AuthProvider } from '../lib/authContext'

export const metadata: Metadata = {
  title: 'InterviewAI - Smart Interview Practice Platform',
  description: 'Practice technical interviews with AI-powered feedback and real-time code execution',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
