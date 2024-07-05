"use client"

import { ThemeProvider } from "next-themes"

const theme = "system"

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
