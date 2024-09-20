import { z } from "zod"

import {
  DEFAULT_APPOINTMENT_INTERVAL,
  DEFAULT_DURATION,
  DEFAULT_PRICING,
  VALID_DURATIONS,
} from "@/config"
import Day from "@/lib/day"
import { getEventsBySearchQuery } from "../availability/getEventsBySearchQuery"
import { GoogleCalendarV3Event } from "../types"

export async function fetchContainersByQuery({
  searchParams,
  query,
}: {
  searchParams: URLSearchParams
  query: string
}) {
  const schema = z.object({
    duration: z
      .enum([
        ...(VALID_DURATIONS.map(String) as [string, ...string[]]),
        DEFAULT_APPOINTMENT_INTERVAL.toString(),
      ])
      .optional()
      .default(String(DEFAULT_DURATION))
      .transform(Number),
    timeZone: z.string().optional(),
    selectedDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/u)
      .optional(),
  })

  let duration: number | undefined = undefined
  let timeZone: string | undefined = undefined
  let selectedDate: string | undefined = undefined

  try {
    const parsedParams = schema.parse(searchParams)
    try {
      duration = parsedParams.duration
    } catch {
      duration = undefined
    }

    try {
      timeZone = parsedParams.timeZone
    } catch {
      timeZone = undefined
    }

    try {
      selectedDate = parsedParams.selectedDate
    } catch {
      selectedDate = undefined
    }
  } catch (error) {
    console.error("Failed to parse searchParams:", error)
  }

  if (duration == undefined) {
    // if validation faisl
    duration = DEFAULT_DURATION
  }

  // Offer three weeks of availability predefined event based container availability.
  const start = Day.todayWithOffset(0)
  const end = Day.todayWithOffset(21)

  const startDate = new Date(Day.todayWithOffset(0).toString())
  const endDate = new Date(Day.todayWithOffset(21).toString())

  const searchQuery = query + "__EVENT__"
  const member_string = query + "__EVENT__MEMBER__"
  const container_string = query + "__EVENT__CONTAINER__"

  const events = await getEventsBySearchQuery(searchQuery, {
    start: startDate,
    end: endDate,
  })

  const members = events.filter((e: GoogleCalendarV3Event) => {
    return (
      e.summary.includes(member_string) ||
      (e.description && e.description.includes(member_string))
    )
  })

  const busyQuery = members.map((e: GoogleCalendarV3Event) => {
    return { start: e.start.dateTime, end: e.end.dateTime }
  })

  const containers = events.filter((e: GoogleCalendarV3Event) => {
    return (
      e.summary.includes(container_string) ||
      (e.description && e.description.includes(container_string))
    )
  })
  const containersMapped = containers.map((e: GoogleCalendarV3Event) => {
    let obj = {}
    try {
      obj = JSON.parse(e.description || "")
    } catch {}

    return {
      start: e.start.dateTime,
      end: e.end.dateTime,
      location: e.location,
      ...obj,
    }
  })

  return {
    props: {
      start: start.toString(),
      end: end.toString(),
      busy: busyQuery,
      containers: containersMapped,
      duration,
      ...(timeZone && { timeZone }),
      ...(selectedDate && { selectedDate }),
      price: DEFAULT_PRICING[DEFAULT_DURATION],
    },
  }
}
