// app/providers.js
"use client"
import { ReactNode } from "react"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
    custom_campaign_params: ["ref"],
  })
}

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
