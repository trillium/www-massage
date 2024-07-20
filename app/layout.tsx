import React from "react"
import { Public_Sans } from "next/font/google"
import { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react';

import { ThemeProviders } from "@/app/ThemeProviders"

import "@/styles/global.css"
import ThemeSwitch from "@/components/ThemeSwitch"

import siteMetadata from "@/data/siteMetadata"
import { NavOptions } from "@/components/NavOptions"
import SectionContainer from "@/components/SectionContainer"

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
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <SectionContainer>
            <header className="relative flex items-center justify-between px-4 py-10 sm:px-0">
              <div></div>
              <nav className="flex items-center space-x-4 leading-5 sm:space-x-6">
                <NavOptions />
                <ThemeSwitch />
              </nav>
            </header>
            {children}
          </SectionContainer>
        </ThemeProviders>
        <Analytics />
      </body>
    </html>
  )
}
