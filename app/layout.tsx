import React from "react"
import { Public_Sans } from "next/font/google"
import { Metadata } from "next"

import { ThemeProvider } from 'next-themes'

import "../styles/global.css"
import ThemeSwitch from "@/components/ThemeSwitch"

const public_sans = Public_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
})

export const metadata: Metadata = {
  title: `Meet with ${process.env.NEXT_PUBLIC_OWNER_NAME ?? "me"}`,
}

const theme = "system"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={public_sans.className} suppressHydrationWarning>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <body className="h-full">
        <ThemeProvider attribute="class" defaultTheme={theme}>
          <nav className="w-screen flex justify-end pr-4 pt-4">
            <ThemeSwitch />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
