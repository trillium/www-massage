import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { z } from "zod"

import Template from "@/components/Template"
import AvailabilityPicker, { PickerProps } from "@/components/availability/AvailabilityPicker"
import {
  ALLOWED_DURATIONS,
  DEFAULT_APPOINTMENT_INTERVAL,
  DEFAULT_DURATION,
  OWNER_AVAILABILITY,
  DEFAULT_PRICING
} from "@/config"
import { useProvider, withProvider } from "@/context/AvailabilityContext"
import getAvailability from "@/lib/availability/getAvailability"
import getBusyTimes from "@/lib/availability/getBusyTimes"
import getPotentialTimes from "@/lib/availability/getPotentialTimes"
import {
  getDateRangeInterval,
  mapDatesToStrings,
  mapStringsToDates,
} from "@/lib/availability/helpers"
import Day from "@/lib/day"
import localeDayString from "@/lib/locale"

export type PageProps = InferGetServerSidePropsType<typeof fetchData>

export async function fetchData({ searchParams }: { searchParams: URLSearchParams} ) {
  const schema = z.object({
    duration: z
      .enum([...(ALLOWED_DURATIONS.map(String) as [string, ...string[]]), DEFAULT_APPOINTMENT_INTERVAL.toString()])
      .optional()
      .default(String(DEFAULT_DURATION))
      .transform(Number),
    timeZone: z.string().optional(),
    selectedDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/u)
      .optional(),
  })

  const { duration, timeZone, selectedDate } = schema.parse(searchParams)

  // Offer two weeks of availability.
  const start = Day.todayWithOffset(0)
  const end = Day.todayWithOffset(14)

  const busy = await getBusyTimes(
    getDateRangeInterval({
      start,
      end,
      timeZone,
    })
  )

  return {
    props: {
      start: start.toString(),
      end: end.toString(),
      busy: mapDatesToStrings(busy),
      duration,
      ...(timeZone && { timeZone }),
      ...(selectedDate && { selectedDate }),
    },
  }
}