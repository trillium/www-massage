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
  allowedDurations: number[]
  eventName: string
  sessionDuration: string
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
    sessionDuration: "",
    allowedDurations: []
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
      const newPathString =
        window.location.origin +
        "/" +
        state.eventName
          .replace(/\s|-/g, "_")
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "");
      setPathString(newPathString);
    }
  }, [state.eventName]);
  
  return (
    <>
      <div className="w-full flex justify-center items-center align-middle">
        <h2 className="text-lg py-2 font-bold text-primary-500 dark:text-primary-400">
          {pathString}
        </h2>
      </div>
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

export default ClientPage
