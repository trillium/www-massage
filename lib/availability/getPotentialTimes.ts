import { addMinutes, eachDayOfInterval, set } from "date-fns"

import type Day from "../day"
import type { AvailabilitySlotsMap, DateTimeInterval } from "../types"
import mergeOverlappingIntervals from "./mergeOverlappingIntervals"
import { DEFAULT_APPOINTMENT_INTERVAL } from "../../config"

export default function getPotentialTimes({
  start,
  end,
  duration,
  availabilitySlots,
}: {
  start: Day
  end: Day
  duration: number
  availabilitySlots: AvailabilitySlotsMap
}): DateTimeInterval[] {
  const intervals: DateTimeInterval[] = []

  if (start >= end || duration <= 0) {
    return intervals
  }

  const INTERVAL = duration < DEFAULT_APPOINTMENT_INTERVAL ? duration : DEFAULT_APPOINTMENT_INTERVAL

  // Sort the slots by start time
  const days = eachDayOfInterval({
    start: start.toInterval("Etc/GMT").start,
    end: end.toInterval("Etc/GMT").end,
  })
  days.forEach((day) => {
    const dayOfWeek = day.getDay()

    const slotsForDay = availabilitySlots[dayOfWeek] ?? []

    for (const slot of slotsForDay) {
      const slotStart = set(day, {
        hours: slot.start.hour,
        minutes: slot.start.minute,
      })

      const slotEnd = set(day, {
        hours: slot.end.hour,
        minutes: slot.end.minute,
      }) // TODO: handle overnight slots

      let currentIntervalStart = slotStart

      while (
        // while the beginning of the current interval is before the end of the slot
        currentIntervalStart < slotEnd &&
        // and adding the duration to the beginning of the current interval is before the end of the slot
        addMinutes(currentIntervalStart, duration) <= slotEnd
      ) {
        // add the duration to the beginning of the current interval to get the end of the current interval 
        const currentIntervalEnd = addMinutes(currentIntervalStart, duration)

        // add the current interval to the list of intervals
        intervals.push({
          start: currentIntervalStart,
          end: currentIntervalEnd,
        })

        // set the beginning of the next interval to the end of the current interval plus INTERVAL time
        currentIntervalStart = addMinutes(currentIntervalStart, INTERVAL)
      }
    }
  })
  // return intervals even if they overlap
  return intervals
}
