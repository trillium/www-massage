"use client"

import type { InferGetServerSidePropsType } from "next"
import { useEffect } from "react"

import Template from "@/components/Template"
import AvailabilityPicker, {
  PickerProps,
} from "@/components/availability/AvailabilityPicker"
import { OWNER_AVAILABILITY, DEFAULT_PRICING } from "@/config"
import { useProvider, withProvider } from "@/context/AvailabilityContext"
import getAvailability from "@/lib/availability/getAvailability"
import getPotentialTimes from "@/lib/availability/getPotentialTimes"
import { mapStringsToDates } from "@/lib/availability/helpers"
import Day from "@/lib/day"
import localeDayString from "@/lib/locale"

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

function Page({
  start,
  end,
  busy,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    state: { duration, selectedDate },
    dispatch,
  } = useProvider()

  const pickerProps: PickerProps = {
    durationProps: {
      title: `Session Duration - $${DEFAULT_PRICING[duration]}`,
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
    // Run once, on initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
