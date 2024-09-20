"use client"

import type { InferGetServerSidePropsType } from "next"

import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { PricingWrapper } from "@/components/availability/PricingWrapper"
import { DEFAULT_PRICING } from "@/config"

import PageProps from "@/app/page"
import { AllowedDurationsType } from "@/lib/types"

const pricing = DEFAULT_PRICING

// Need to refactor fetchData so it's easier to extend to other pages

const allowedDurations: AllowedDurationsType = [
  60*2,
  60*2.5,
  60*3,
  60*3.5,
  60*4
]

function Page({
  start,
  end,
  busy,
  selectedDate,
  duration,
}: InferGetServerSidePropsType<typeof PageProps>) {
  const { slots, pickerProps } = PricingWrapper({
    start,
    end,
    busy,
    pricing,
    selectedDate,
    duration,
    allowedDurations
  })

  return (
    <>
      <AvailabilityPicker slots={slots} pickerProps={pickerProps} />
    </>
  )
}

export default Page
