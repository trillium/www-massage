import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"
import { redirect } from "next/navigation"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import createCalendarAppointment from "@/lib/availability/createAppointment"
import getHash from "@/lib/hash"

const AppointmentPropsSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  start: z.string(),
  end: z.string(),
  timeZone: z.string(),
  location: z.enum(["meet", "phone"]),
  duration: z
    .string()
    .refine((value) => !Number.isNaN(Number.parseInt(value)), {
      message: "Duration must be a valid integer.",
    }),
})

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
    return
  }

  const searchParams = req.nextUrl.searchParams
  console.log("searchParams@", searchParams)
  const data = searchParams.get('data')
  const key = searchParams.get("key")
  
  console.log(data, key)
  // const { data, key } = req.query

  if (!data) {
    return NextResponse.json({ error: "Data is missing" }, { status: 400 })
  }
  // Make sure the hash matches before doing anything
  const hash = getHash(decodeURIComponent(data as string))

  if (hash !== key) {
    return NextResponse.json({ error: "Invalid key" }, { status: 403 })
  }

  const object = JSON.parse(decodeURIComponent(data as string))

  // ...and validate it using Zod's safeParse method
  const validationResult = AppointmentPropsSchema.safeParse(object)

  if (!validationResult.success) {
    return NextResponse.json(
      { error: "Malformed request in data validation" },
      { status: 400 }
    )
  }

  const validObject = validationResult.data

  // Check if start and end dates are valid
  if (
    Number.isNaN(Date.parse(validObject.start)) ||
    Number.isNaN(Date.parse(validObject.end))
  ) {
    return NextResponse.json(
      { error: "Malformed request in date parsing" },
      { status: 400 }
    )
  }

  // Create the confirmed appointment
  const response = await createCalendarAppointment({
    ...validObject,
    requestId: hash,
    summary: `${validObject.duration} minute meeting with ${process.env.NEXT_PUBLIC_OWNER_NAME ?? "me"}`,
  })

  const details = await response.json()

  const htmlLink = details.htmlLink
  const regex = /eid=([^&]+)/
  const match = htmlLink.match(regex)

  // If we have a link to the event, take us there.
  if (match && match[1]) {
    redirect(`/booked?url=${encodeURIComponent(match[1])}`)
    return
  }

  // Otherwise, something's wrong.
  return NextResponse.json(
    { error: "Error trying to create an appointment" },
    { status: 500 }
  )
}
