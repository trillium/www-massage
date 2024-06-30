import React from "react"

import ClientPage from "./ClientPage"

import * as zod from "zod"

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"

import {
  ALLOWED_DURATIONS,
  DEFAULT_DURATION,
} from "@/config"
import getBusyTimes from "@/lib/availability/getBusyTimes"
import {
  getDateRangeInterval,
  mapDatesToStrings,
} from "@/lib/availability/helpers"
import Day from "@/lib/day"

export type PageProps = InferGetServerSidePropsType<typeof fetchData>

export const fetchData = async ({ searchParams }: { searchParams: URLSearchParams }) => {
  const schema = zod.z.object({
    duration: zod.z
      .enum([...(ALLOWED_DURATIONS.map(String) as [string, ...string[]])])
      .optional()
      .default(String(DEFAULT_DURATION))
      .transform(Number),
    timeZone: zod.z.string().optional(),
    selectedDate: zod.z
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
