"use client"

import type { InferGetServerSidePropsType } from "next"

import Template from "@/components/Template"
import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { PricingWrapper } from "@/components/availability/PricingWrapper"
import { withProvider } from "@/context/AvailabilityContext"
import { DEFAULT_PRICING } from "@/config"

import PageProps from "./page"

const pricing = DEFAULT_PRICING

// Need to refactor fetchData so it's easier to extend to other pages

function Page({
  start,
  end,
  busy,
}: InferGetServerSidePropsType<typeof PageProps>) {
  const { slots, pickerProps } = PricingWrapper({ start, end, busy, pricing })

  return (
    <main className="max-w-2xl sm:mx-auto mx-4 pb-24">
      <Template
        title="Book a session with Trillium :)"
        text="Select a date and time and fill out the form to request an appointment time."
      />
      <AvailabilityPicker slots={slots} pickerProps={pickerProps} />
    </main>
  )
}

export default withProvider(Page)
