"use client"

import type { InferGetServerSidePropsType } from "next"

import Template from "@/components/Template"
import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { PricingWrapper } from "@/components/availability/PricingWrapper"
import { DEFAULT_PRICING } from "@/config"
import { DateTimeInterval, GoogleCalendarV3Event } from "@/lib/types"

import PageProps from "./page"
import { mapStringsToDates } from "@/lib/availability/helpers"

const pricing = DEFAULT_PRICING

// Need to refactor fetchData so it's easier to extend to other pages

function Page({
  start,
  end,
  busy,
  selectedDate,
  duration,
  free,
}: InferGetServerSidePropsType<typeof PageProps>) {
  const freeDateTimeInterval: DateTimeInterval[] = mapStringsToDates(free)
  
  const { slots, pickerProps } = PricingWrapper({
    start,
    end,
    busy,
    pricing,
    selectedDate,
    duration,
    free: freeDateTimeInterval,
  })

  return (
    <main className="max-w-2xl sm:mx-auto mx-4 pb-24">
      <Template title="Book a session with Trillium :)" />
      <AvailabilityPicker slots={slots} pickerProps={pickerProps} />
    </main>
  )
}

export default Page
