"use client"

import clsx from "clsx"
import {
  useAppDispatch,
  useReduxAvailability,
  useReduxFormData,
} from "../hooks"
import { formatLocalDate, formatLocalTime } from "@/lib/availability/helpers"
import BookSessionButton from "@/components/BookSessionButton"

export default function Confirmation() {
  const formData = useReduxFormData()
  const { selectedTime, timeZone } = useReduxAvailability()

  let dateString
  let startString
  let endString

  if (selectedTime) {
    dateString = formatLocalDate(selectedTime.start, { timeZone })
    startString = formatLocalTime(selectedTime.start, { timeZone })
    endString = formatLocalTime(selectedTime.end, {
      timeZone,
      timeZoneName: "shortGeneric",
    })
  }

  return (
    <>
      <div className="py-4 sm:py-8 sm:px-0 px-4 w-full max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-primary-500 dark:text-primary-400 sm:text-5xl">
          Thanks!
        </h1>
        <p className="mt-6 text-xl text-gray-800 dark:text-gray-200 font-medium">
          Your request has been received!
        </p>
        <p className="mt-6 text-xl text-gray-800 dark:text-gray-200 font-medium">
          I&apos;ll review the appointment and get back to you shortly!
        </p>
      </div>
      <div
        className={clsx(
          "flex items-center justify-center h-full max-lg:py-0 rounded-3xl w-full max-xl:max-w-3xl max-xl:mx-auto",
          "bg-gray-100 dark:bg-slate-900 border-2 border-primary-400"
        )}>
        <div className="w-full h-full relative flex-grow p-2">
          <div className="border-l-4 relative border-l-primary-400 bg-primary-50/30 dark:bg-primary-50/10 p-3 mt-3 mb-4 rounded-md">
            <div className="flex w-full flex-row justify-between items-center">
              <div>
                <p className="text-base md:text-lg font-semibold text-primary-800 dark:text-primary-400">
                  {dateString}
                </p>
                <p className="text-sm md:text-base">
                  {startString} - {endString}
                </p>
              </div>
              <p className="text-base md:text-xl font-bold">Pending</p>
            </div>
          </div>
          <p className="pl-4 bg-none font-bold text-lg text-gray-700 dark:text-gray-100">
            {formData.firstName} {formData.lastName}
          </p>
          <p className="pl-6 bg-none font-bold text-base  text-gray-500 dark:text-gray-300">
            {formData.location}
          </p>
          <p className="pl-6 bg-none font-bold text-base  text-gray-500 dark:text-gray-300">
            {formData.phone}
          </p>
          <p className="pl-6 bg-none font-bold text-base  text-gray-500 dark:text-gray-300">
            {formData.email}
          </p>
        </div>
      </div>

      <div className="pt-12 flex flex-grow items-center justify-center">
        <BookSessionButton title="Book Another Session!" href="/" />
      </div>
    </>
  )
}
