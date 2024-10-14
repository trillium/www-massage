"use client"

export default function Booked({ url }: { url: string }) {
  if (!url || typeof url !== "string") {
    return (
      <div className="py-8 sm:py-16 mx-auto max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-primary-700">
          There was an error with the url parameter.
        </h1>
      </div>
    )
  }
  return (
    <div className="py-8 sm:py-16 mx-auto max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight text-primary-600 dark:text-primary-500">
        The appointment has been confirmed.
      </h1>
      <p className="mt-6 text-xl text-gray-800 dark:text-gray-200 font-medium">
        It’s now on your calendar and an invite has been sent to them.{" "}
        <a
          href={"https://www.google.com/calendar/event?eid=" + url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline">
          View it on Google Calendar
        </a>
      </p>
    </div>
  )
}
