import type {
  InferGetServerSidePropsType,
} from "next"
import { z } from "zod"

import ClientPage from "@/app/ClientPage"
import {
  ALLOWED_DURATIONS,
  DEFAULT_APPOINTMENT_INTERVAL,
  DEFAULT_DURATION,
} from "@/config"
import getBusyTimes from "@/lib/availability/getBusyTimes"
import {
  getDateRangeInterval,
  mapDatesToStrings,
} from "@/lib/availability/helpers"
import Day from "@/lib/day"

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

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: { searchParams: URLSearchParams }) {
  const { props } = await fetchData( { searchParams })
  return <ClientPage {...props} />
}