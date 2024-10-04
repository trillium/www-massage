"use client"

import type { InferGetServerSidePropsType } from "next"

import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import { PricingWrapper } from "@/components/availability/PricingWrapper"
import { DEFAULT_PRICING } from "@/config"

import PageProps from "@/app/page"
import { AllowedDurationsType } from "@/lib/types"
import { FormEvent, useEffect, useState } from "react"

import { dumpData } from "@/lib/dataLoading"

const pricing = DEFAULT_PRICING

// Need to refactor fetchData so it's easier to extend to other pages
const possibleDurations = [15, 30, 45, 60]

const allowedDurations: AllowedDurationsType = [
  60 * 1,
  60 * 1.5,
  60 * 2,
  60 * 2.5,
  60 * 3,
  60 * 3.5,
  60 * 4,
]

type StateType = {
  eventContainerString: string
  allowedDurations: number[]
  eventName: string
  sessionDuration?: string
  pricing?: { [key: number]: number };
}

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

  const [state, setState] = useState<StateType>({
    eventName: "",
    // sessionDuration: "",  
    eventContainerString: "__EVENT__",
    allowedDurations: [],
    pricing: { 15: 120 / 4, 30: 120 / 2 }
  })

  const [pathString, setPathString] = useState("");

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
    const value = parseInt(event.target.value, 10);
    const { allowedDurations } = state;

    const newDurations = allowedDurations.includes(value)
      ? allowedDurations.filter((duration) => duration !== value)
      : [...allowedDurations, value];

    setState({ ...state, allowedDurations: newDurations });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sanitizedName = state.eventName
          .replace(/\s|-/g, "_")
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "");
      const newPathString =
        window.location.origin +
        "/" +
        sanitizedName
      setPathString(newPathString);
      setState({ ...state, eventContainerString: sanitizedName + "__EVENT__"})
    }
  }, [state.eventName]);

  console.log(dumpData(state))

  return (
    <>
      <div className="w-full flex justify-center items-center align-middle">
        <h2 className="text-lg py-2 font-bold text-primary-500 dark:text-primary-400">
          {pathString}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <ol>
          <label
            htmlFor="eventName"
            className="block text-base font-medium text-gray-900 dark:text-gray-100">
            Booking Link Name
          </label>
          <input
            aria-label="Comment"
            type="text"
            name="eventName"
            id="eventName"
            value={state.eventName}
            className="pl-2 py-1 block w-full border-0 p-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6 mb-1"
            placeholder="e.g., WeWork Playa Vista"
            onChange={formOnChange}
            maxLength={300}
          />

          <label
            htmlFor="sessionDuration"
            className="block text-base font-medium text-gray-900 dark:text-gray-100">
            How long should sessions be?
          </label>
          <div className="flex flex-col space-y-2">
            {possibleDurations.map((duration) => (

              <div className="flex items-center"
                key={duration}
              >
                <input
                  checked={state.allowedDurations.includes(duration)}
                  id="checked-checkbox" type="checkbox" value={duration}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={formCheckboxOnChange}
                />
                <label htmlFor="checked-checkbox" className="ms-2 font-medium">{duration} minutes</label>
              </div>

            ))}
          </div>

          <li>Determine How Many Sessions</li>
          <li>Allow users to book single or multi duration</li>
          <li>User payment vs company payment</li>
          <input type="text" name="foo" onChange={formOnChange} />
        </ol>
        <button>Test button</button>
      </form>
      <AvailabilityPicker slots={slots} pickerProps={pickerProps} />
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre className="border m-4 p-2 rounded-md border-black" >{dumpData(state)}</pre>
      <textarea value={dumpData(state)} className="border m-4 p-2 rounded-md border-black w-full"/>
    </>
  )
}

export default ClientPage
