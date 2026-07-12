import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SiteShell } from "@/components/SiteShell"

export const metadata: Metadata = {
  metadataBase: new URL("https://trace-clothing.vercel.app"),
  title: "TRACE — Lascia la tua traccia",
  description: "Basic curato. Vestibilità collaudate, materiali migliori, logo discreto.",
  openGraph: {
    title: "TRACE — Lascia la tua traccia",
    description: "Basic curato. Vestibilità collaudate, materiali migliori, logo discreto.",
    type: "website",
    locale: "it_IT",
    siteName: "TRACE",
    images: [{ url: "/og-image.png" }],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.colorScheme='dark'`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#080808] text-[#e0dcd5] antialiased">
        <SiteShell>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteShell>
      </body>
    </html>
  )
}
