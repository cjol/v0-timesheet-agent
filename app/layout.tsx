import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import MainNav from "@/components/main-nav"
import { MatterProvider } from "@/contexts/matter-context"
import "./globals.css"

// Seem unused, but Next reads these vars from the module scope magically
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _geist = Geist({ subsets: ["latin"] })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FixMyTime",
  description: "Review and analyze timesheets",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <MatterProvider>
          <MainNav />
          {children}
          <Analytics />
        </MatterProvider>
      </body>
    </html>
  )
}
