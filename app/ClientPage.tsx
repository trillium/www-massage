"use client"

import type { InferGetServerSidePropsType } from "next"
import { useEffect, Suspense } from "react"

import Template from "@/components/Template"
import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { OWNER_AVAILABILITY } from "@/config"
import { useProvider, withProvider } from "@/context/AvailabilityContext"
import getAvailability from "@/lib/availability/getAvailability"
import getPotentialTimes from "@/lib/availability/getPotentialTimes"
import { mapStringsToDates } from "@/lib/availability/helpers"
import Day from "@/lib/day"
import localeDayString from "@/lib/locale"

import PageProps from "./page"

function Page({
  start,
  end,
  busy,
}: InferGetServerSidePropsType<typeof PageProps>) {
  const {
    state: { duration, selectedDate },
    dispatch,
  } = useProvider()

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
      <Template />
      <Suspense fallback={<Loading />}>
        <AvailabilityPicker slots={slots} />
      </Suspense>
    </main>
  )
}

const Loading = () => {
  return <div>LOADING</div>
}
export default withProvider(Page)
