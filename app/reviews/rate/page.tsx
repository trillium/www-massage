import React from "react"
import { z } from "zod"
import getHash from "@/lib/hash"
import ClientPage from "./ClientPage"

type ReviewRequestType = {
  name: string
  date: string
  hash: string
}

const schema = z.object({
  name: z.string(),
  start: z.string(),
  end: z.string(),
  hash: z.string(),
})

const data = {
  firstName: "Z",
  lastName: "Zoccolante",
  start: "2024-08-22T20:15:00-07:00",
  end: "2024-08-22T21:15:00-07:00",
  price: 0,
  duration: 60,
}

export default async function Page({ searchParams }: { searchParams: Object }) {
  let props

  const dataHash: string = getHash(JSON.stringify(data))
  const stringArray: string[][] = Object.entries({
    ...data,
    hash: dataHash,
  }).map(([key, value]) => [key, value.toString()])
  try {
    const { hash, ...parse } = schema.parse(searchParams)
    const paramsHash = getHash(JSON.stringify(parse))
    const validated = hash === paramsHash
    if (validated) {
      props = {
        ...parse,
        uri: "?" + new URLSearchParams(stringArray).toString(),
        data,
      }
    } else {
      props = { error: "Hash mismatch" }
    }
  } catch (error) {
    props = {
      error: "Invalid parameters",
      data,
      hash: getHash(JSON.stringify(data)),
      uri: "?" + new URLSearchParams(stringArray).toString(),
      // I want the searchParams string for uri here
    }
  }

  return <ClientPage {...props} />
}
