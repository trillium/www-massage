import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"

import { formatLocalTime } from "@/lib/availability/helpers"
import type { DateTimeInterval } from "@/lib/types"

import { setSelectedTime } from "@/redux/slices/availabilitySlice"
import { setModal } from "@/redux/slices/modalSlice"
import { useAppDispatch, useReduxAvailability } from "@/app/hooks"

type TimeProps = {
  time: DateTimeInterval
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Time({ time: { start, end }, ...props }: TimeProps) {
  const { timeZone } = useReduxAvailability()
  const dispatchRedux = useAppDispatch()

  return (
    <button
      type="button"
      className={clsx(
        "rounded-md border-slate-300 border bg-white py-2 px-3 shadow-sm transition-all",
        "text-sm font-semibold text-gray-900",
        "hocus:bg-primary-50/20 hocus:shadow-sm hocus:shadow-primary-100 hocus:-mt-0.5 hocus:mb-0.5 hocus:border-primary-500 dark:hocus:text-gray-200",
        "active:mt-0.5 active:-mb-0.5  outline-primary-600"
      )}
      onClick={() => {
        dispatchRedux(setSelectedTime({ start: start.toString(), end: end.toString() }))
        dispatchRedux(setModal({ status: "open" }))
      }}
      {...props}>
      {formatLocalTime(start, { timeZone })} –{" "}
      {formatLocalTime(end, { timeZone })}
    </button>
  )
}
