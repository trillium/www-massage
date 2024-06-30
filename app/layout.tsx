import React from "react"
import { Public_Sans } from "next/font/google"
import Head from "next/head"

import ClientLayout from "./ClientLayout"
import "../styles/global.css"

const public_sans = Public_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>{`Meet with ${
          process.env.NEXT_PUBLIC_OWNER_NAME ?? "me"
        }`}</title>
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
      </Head>
      <html lang="en" className={public_sans.className}>
        <body className="h-full">
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </>
  )
}
