"use client"

import type { InferGetServerSidePropsType } from "next"
import { useEffect } from "react"

import { PickerProps } from "@/components/availability/AvailabilityPicker"
import { OWNER_AVAILABILITY } from "@/config"
import { useProvider } from "@/context/AvailabilityContext"
import getAvailability from "@/lib/availability/getAvailability"
import getPotentialTimes from "@/lib/availability/getPotentialTimes"
import { mapStringsToDates } from "@/lib/availability/helpers"
import Day from "@/lib/day"
import localeDayString from "@/lib/locale"

import PageProps from "@/app/page"

export function PricingWrapper({
  start,
  end,
  busy,
  pricing,
}: InferGetServerSidePropsType<typeof PageProps>) {
  const {
    state: { duration, selectedDate },
    dispatch,
  } = useProvider()

  const pickerProps: PickerProps = {
    durationProps: {
      title: `Session Duration - $${pricing[duration]}`,
    },
    tzPickerProps: {
      showPicker: false,
    },
  }

  const startDay = Day.dayFromString(start)
  const endDay = Day.dayFromString(end)

  const potential = getPotentialTimes({
    start: startDay,
    end: endDay,
    duration,
    availabilitySlots: OWNER_AVAILABILITY,
  })

  const offers = getAvailability({
    busy: mapStringsToDates(busy),
    potential,
  })

  const slots = offers.filter((slot) => {
    return (
      slot.start >= startDay.toInterval("Etc/GMT").start &&
      slot.end <= endDay.toInterval("Etc/GMT").end
    )
  })

  // If we got this far and there's no selectedDate, set it to the first date
  // with some availability.
  useEffect(() => {
    if (!selectedDate && slots.length > 0) {
      const date: Date = slots[0].start
      const dateString: string = localeDayString(date)

      dispatch({
        type: "SET_SELECTED_DATE",
        payload: Day.dayFromString(dateString), //payload from date respecting timezone
      })
    }
    dispatch({
      type: "SET_PRICE",
      payload: pricing[duration], //payload from date respecting timezone
    })
    // Run once, on initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { slots, pickerProps }
}
