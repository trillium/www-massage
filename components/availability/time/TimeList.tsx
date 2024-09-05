import { useState } from "react"
import Time from "./TimeButton"
import type { DateTimeInterval } from "@/lib/types"
import clsx from "clsx"

type TimeListProps = {
  availability: DateTimeInterval[]
}

export default function TimeList({ availability }: TimeListProps) {
  const [ready, setReady] = useState(false)
  return (
    <div className={clsx("grid grid-cols-2 gap-2", { hidden: !ready })}>
      {availability?.map((slot, index) => (
        <Time
          key={slot.start.toISOString() + slot.end.toISOString()}
          time={slot}
          setReady={setReady}
          ready={index === availability.length - 1}
        />
      ))}
    </div>
  )
}
