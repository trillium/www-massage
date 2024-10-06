"use client"

import type { InferGetServerSidePropsType } from "next"

import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { PricingWrapper } from "@/components/availability/PricingWrapper"
import { DEFAULT_PRICING } from "@/config"

import PageProps from "@/app/page"
import { AllowedDurationsType, ChairAppointmentBlockProps } from "@/lib/types"
import { FormEvent, useEffect, useState } from "react"

import { dumpData } from "@/lib/dataLoading"

const pricing = DEFAULT_PRICING

// Need to refactor fetchData so it's easier to extend to other pages
const possibleDurations = [15, 30, 45, 60]

const paymentOptionsList = [
  "Client pays their own session",
  "Massage session block prepaid in full",
  "Split individual booking fees with cleint",
]

const allowedDurations: AllowedDurationsType = [
  60 * 1,
  60 * 1.5,
  60 * 2,
  60 * 2.5,
  60 * 3,
  60 * 3.5,
  60 * 4,
]

function ClientPage({
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

  const [state, setState] = useState<ChairAppointmentBlockProps>({
    eventName: "",
    eventContainerString: "__EVENT__",
    allowedDurations: [],
    pricing: {
      15: (120 * 1) / 4,
      30: (120 * 2) / 4,
      45: (120 * 3) / 4,
      60: (120 * 4) / 4,
    },
    paymentOptions: "",
    leadTime: 0,
  })

  const [pathString, setPathString] = useState("")

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

  const formOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setState({ ...state, [target.name]: target.value })
  }

  const formCheckboxOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    const { allowedDurations } = state

    const newDurations = allowedDurations.includes(value)
      ? allowedDurations.filter((duration) => duration !== value)
      : [...allowedDurations, value]

    setState((state) => ({ ...state, allowedDurations: newDurations }))
  }

  const { eventName } = state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sanitizedName =
        eventName
          .replace(/\s|-/g, "_")
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "") || "your_name_here"
      const newPathString = window.location.origin + "/" + sanitizedName
      setPathString(newPathString)
      setState((state) => ({
        ...state,
        eventContainerString: sanitizedName + "__EVENT__",
      }))
    }
  }, [eventName])

  return (
    <>
      <div className="w-full flex justify-center items-center align-middle">
        <h2 className="text-lg py-2 font-bold text-primary-500 dark:text-primary-400">
          Your link: {pathString}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <ol>
          <label
            htmlFor="eventName"
            className="block text-xl font-semibold text-gray-900 dark:text-gray-100">
            Let&rsquo;s pick a name for your booking:
          </label>
          <input
            aria-label="Comment"
            type="text"
            name="eventName"
            id="eventName"
            value={state.eventName}
            className="pl-2 py-1 block w-full p-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6 mb-1 dark:border-white border-slate-100 border-2 rounded-md"
            placeholder="e.g., WeWork Playa Vista"
            onChange={formOnChange}
            maxLength={300}
          />

          <label
            htmlFor="sessionDuration"
            className="pt-4 block text-xl font-semibold text-gray-900 dark:text-gray-100">
            How long should sessions be?
          </label>
          <div className="pl-4 flex flex-col space-y-2">
            {possibleDurations.map((duration) => (
              <div className="flex items-center" key={duration}>
                <input
                  checked={state.allowedDurations.includes(duration)}
                  id={`checked-checkbox-${duration}`}
                  type="checkbox"
                  value={duration}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={formCheckboxOnChange}
                />
                <label
                  htmlFor={`checked-checkbox-${duration}`}
                  className="ms-2 font-medium">
                  {duration} minutes
                </label>
              </div>
            ))}
          </div>

          <label
            htmlFor="sessionDuration"
            className="pt-4 block text-xl font-semibold text-gray-900 dark:text-gray-100">
            Payment options
          </label>
          <div className="pl-4 flex flex-col space-y-2">
            {paymentOptionsList.map((option) => (
              <div className="flex items-center" key={option}>
                <input
                  id={`checked-checkbox-${option}`}
                  type="radio"
                  name="paymentOptions"
                  value={option}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={formOnChange}
                />
                <label
                  htmlFor={`checked-checkbox-${option}`}
                  className="ms-2 font-medium">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </ol>
        <button>Test button</button>
      </form>
      <AvailabilityPicker slots={slots} pickerProps={pickerProps} />
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <textarea
        readOnly
        value={dumpData(state)}
        rows={10}
        className="border m-4 p-2 rounded-md border-black w-full"
      />
    </>
  )
}

export default ClientPage
