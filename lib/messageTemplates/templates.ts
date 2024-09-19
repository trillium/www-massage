import { AppointmentProps } from "../types"

/**
 * Creates a title "summary" for a calendar event.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
function eventSummary({
  clientName,
  duration,
}: {
  clientName: string
  duration: string
}) {
  return `${duration} minute massage with ${clientName} - TrilliumMassage`
}

/**
 * Creates a description for a calendar event.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
function eventDescription({
  start,
  end,
  summary,
  email,
  location,
  firstName,
  eventBaseString,
  eventContainerString,
}: Partial<AppointmentProps>) {
  let output = "Thanks for booking!"
  output += "\n\n"
  output += `<b>Name</b>: ${firstName}\n`
  output += `<b>Date</b>: ${new Date(start || "").toDateString()}\n`
  output += `<b>Start</b>: ${new Date(start || "").toLocaleTimeString()}\n`
  output += `<b>End</b>: ${new Date(end || "").toLocaleTimeString()}\n`
  output += `<b>Summary</b>: ${summary}\n`
  output += `<b>Email</b>: ${email}\n`
  output += `<b>Location</b>: ${location}\n`
  output += "\n\n"
  output += "Trillium Smith, LMT"
  output += "\n"
  output += `<a href="www.trilliummassage.la">www.trilliummassage.la</a>`

  if (eventBaseString) {
    output += "\n"
    output += eventBaseString
  }
  if (eventContainerString) {
    output += "\n"
    output += eventContainerString
  }

  return output
}

const templates = {
  eventSummary,
  eventDescription,
}

export default templates
