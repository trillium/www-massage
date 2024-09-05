import clsx from "clsx"
import { useEffect, type DetailedHTMLProps, type HTMLAttributes } from "react"
import { format } from "date-fns"

import { formatLocalTime } from "@/lib/availability/helpers"
import type { DateTimeInterval } from "@/lib/types"

import { setSelectedTime } from "@/redux/slices/availabilitySlice"
import { setModal } from "@/redux/slices/modalSlice"
import { useAppDispatch, useReduxAvailability } from "@/app/hooks"

type TimeProps = {
  time: DateTimeInterval
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & any

export default function Time({ time: { start, end }, ...props }: TimeProps) {
  const { ready, setReady } = props
  const { timeZone } = useReduxAvailability()
  const dispatchRedux = useAppDispatch()


  useEffect( () => {
    if (ready) {
      setReady(true)
    }
  }, [ready, setReady])
  return (
    <button
      type="button"
      className={clsx(
        "rounded-md border-slate-300 border bg-white py-2 px-3 shadow-sm transition-all",
        "text-sm font-semibold text-gray-900",
        "hocus:bg-primary-50/20 hocus:shadow-sm hocus:shadow-primary-100 hocus:border-primary-500 dark:hocus:text-gray-200",
        "active:mt-0.5 active:-mb-0.5  outline-primary-600"
      )}
      onClick={() => {
        dispatchRedux(
          setSelectedTime({
            start: format(start, "yyyy-MM-dd'T'HH:mm:ssXXX"),
            end: format(end, "yyyy-MM-dd'T'HH:mm:ssXXX"),
          })
        )
        dispatchRedux(setModal({ status: "open" }))
      }}
      {...props}>
      {formatLocalTime(start, { timeZone })} –{" "}
      {formatLocalTime(end, { timeZone })}
    </button>
  )
}
