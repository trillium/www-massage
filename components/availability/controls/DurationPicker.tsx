import clsx from "clsx"

import { ALLOWED_DURATIONS } from "@/config"
import { setDuration } from "@/redux/slices/availabilitySlice"
import { useAppDispatch, useReduxAvailability } from "@/app/hooks"

export default function DurationPicker({ title }: { title: string }) {
  const { duration } = useReduxAvailability()
  const dispatchRedux = useAppDispatch()

  return (
    <div>
      <label
        htmlFor="duration"
        className="block text-sm font-medium leading-0 text-gray-900 dark:text-gray-100">
        {title || "Duration"}
      </label>
      <div className="isolate inline-flex rounded-md shadow-sm mt-1 h-9">
        {ALLOWED_DURATIONS.map((theDuration, i) => (
          <button
            key={theDuration}
            onClick={() => {
              dispatchRedux(setDuration(theDuration))
            }}
            type="button"
            className={clsx(
              "relative inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 outline-primary-600",
              {
                "rounded-l-md": i === 0,
                "rounded-r-md": i === ALLOWED_DURATIONS.length - 1,
                "-ml-px": i > 0,
                "bg-white text-gray-900 ring-gray-300 hover:bg-gray-200":
                  theDuration !== duration,
                "bg-primary-500 text-white ring-primary-400 shadow-inner shadow-primary-900":
                  theDuration === duration,
              }
            )}>
            {theDuration}m
          </button>
        ))}
      </div>
    </div>
  )
}
