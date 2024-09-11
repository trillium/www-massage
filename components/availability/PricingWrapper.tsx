"use client"

import type { InferGetServerSidePropsType } from "next"
import { useCallback, useEffect } from "react"
import format from "date-fns-tz/format"

import { PickerProps } from "@/components/availability/AvailabilityPicker"
import { DEFAULT_PRICING, OWNER_AVAILABILITY } from "@/config"
import getAvailability from "@/lib/availability/getAvailability"
import getPotentialTimes from "@/lib/availability/getPotentialTimes"
import { mapStringsToDates } from "@/lib/availability/helpers"
import Day from "@/lib/day"

import PageProps from "@/app/page"
import { setDuration, setSelectedDate } from "@/redux/slices/availabilitySlice"
import { useAppDispatch, useReduxAvailability } from "@/app/hooks"
import { DateTimeInterval } from "@/lib/types"

export function PricingWrapper({
  start,
  end,
  busy,
  selectedDate,
  duration,
  free,
}: InferGetServerSidePropsType<typeof PageProps> & { free: DateTimeInterval }) {
  const dispatchRedux = useAppDispatch()
  const {
    duration: durationRedux,
    timeZone,
    selectedDate: selectedDateRedux,
  } = useReduxAvailability()

  const pickerProps: PickerProps = {
    durationProps: {
      title: `Session Duration - $${
        DEFAULT_PRICING[durationRedux || duration]
      }`,
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
    duration: durationRedux || duration,
    availabilitySlots: OWNER_AVAILABILITY,
    containers: free,
  })

  const offers = getAvailability({
    busy: mapStringsToDates(busy),
    potential: potential,
  })

  const slots = offers.filter((slot) => {
    return (
      slot.start >= startDay.toInterval("Etc/GMT").start &&
      slot.end <= endDay.toInterval("Etc/GMT").end
    )
  })

  // const firstAvail = format(slots[0].start, "yyyy-MM-dd", { timeZone })

  const initialURLParamsData = useCallback(() => {
    if (selectedDate) {
      dispatchRedux(setSelectedDate(selectedDate))
    } else {
      if (slots.length > 0) {
        const firstAvail = format(slots[0].start, "yyyy-MM-dd", { timeZone })
        dispatchRedux(setSelectedDate(firstAvail))
      }
    }
    if (duration) {
      dispatchRedux(setDuration(duration))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initialURLParamsData()
  }, [initialURLParamsData])

  type UrlParams = {
    duration?: string
    selectedDate?: string
    timeZone?: string
  }

  const createNewUrlParams = useCallback(() => {
    const newParamsObj: UrlParams = {}
    if (durationRedux) newParamsObj.duration = durationRedux.toString()
    if (selectedDateRedux) newParamsObj.selectedDate = selectedDateRedux
    if (timeZone != "America/Los_Angeles") newParamsObj.timeZone = timeZone
    const newUrl = new URLSearchParams({ ...newParamsObj })
    // Push to the window.
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${newUrl.toString()}`
    )
  }, [durationRedux, selectedDateRedux, timeZone])

  useEffect(() => {
    createNewUrlParams()
  }, [createNewUrlParams])

  return { slots, pickerProps }
}
