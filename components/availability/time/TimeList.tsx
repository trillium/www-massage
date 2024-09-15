import TimeButton from "./TimeButton"
import type { DateTimeInterval } from "@/lib/types"

type TimeListProps = {
  availability: DateTimeInterval[]
}
export default function TimeList({ availability }: TimeListProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {availability?.map((slot) => (
        <TimeButton
          key={slot.start.toISOString() + slot.end.toISOString()}
          time={slot}
        />
      ))}
    </div>
  )
}
