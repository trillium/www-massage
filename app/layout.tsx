import React from "react"
import { Public_Sans } from "next/font/google"
import { Metadata } from "next"

import { ThemeProviders } from "@/app/ThemeProviders"

import "@/styles/global.css"
import ThemeSwitch from "@/components/ThemeSwitch"

import siteMetadata from "./siteMetadata"

const public_sans = Public_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: `Meet with ${process.env.NEXT_PUBLIC_OWNER_NAME ?? "me"}`,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
}

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
        <ThemeProviders>
          <nav className="w-screen flex justify-end pr-4 pt-4">
            <ThemeSwitch />
          </nav>
          {children}
        </ThemeProviders>
      </body>
    </html>
  )
}
