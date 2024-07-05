import React from "react"
import { Public_Sans } from "next/font/google"
import { Metadata } from "next"

import "../styles/global.css"

const public_sans = Public_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
})

export const metadata: Metadata = {
  title: `Meet with ${process.env.NEXT_PUBLIC_OWNER_NAME ?? "me"}`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
        <>
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
        </>
      <>
        <style jsx global>{`
          html {
            font-family: ${public_sans.style.fontFamily};
          }
        `}</style>
        {children}
      </>
    </html>
  )
}
