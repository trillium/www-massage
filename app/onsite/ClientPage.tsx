"use client"

import type { InferGetServerSidePropsType } from "next"

import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { PricingWrapper } from "@/components/availability/PricingWrapper"
import { DEFAULT_PRICING } from "@/config"

import PageProps from "@/app/page"
import { AllowedDurationsType } from "@/lib/types"
import { FormEvent, useState } from "react"

const pricing = DEFAULT_PRICING

// Need to refactor fetchData so it's easier to extend to other pages

const allowedDurations: AllowedDurationsType = [
  60 * 2,
  60 * 2.5,
  60 * 3,
  60 * 3.5,
  60 * 4,
]

function Page({
  start,
  end,
  busy,
  selectedDate,
  duration,
}: InferGetServerSidePropsType<typeof PageProps>) {
  const { slots, pickerProps } = PricingWrapper({
    start,
    end,
    busy,
    pricing,
    selectedDate,
    duration,
    allowedDurations,
  })

  const [state, setState] = useState({})

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
    // dispatchRedux: AppDispatch,
    // router: ReturnType<typeof useRouter>
  ) {
    event.preventDefault()
    console.log(
      JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))
    )
  }
  
  function handleChange(
    event: FormEvent<HTMLFormElement>
  ) {
    const {value, name} = event.target
    const newState = {...state}
    console.log(event)
  }

  const formOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setState({ ...state, [target.name]: target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input type="hidden" readOnly name="test1" value={"Test1"} />
      <input type="hidden" readOnly name="test2" value={"Test2"} />
        <ol>
          <li>Choose url</li>
          <li>Determine How Many Sessions</li>
          <li>Allow users to book single or multi duration</li>
          <li>User payment vs company payment</li>
          <input type="text" name="foo" onChange={formOnChange} />
        </ol>
        <button>Test button</button>
      </form>
      <AvailabilityPicker slots={slots} pickerProps={pickerProps} />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}

export default Page
