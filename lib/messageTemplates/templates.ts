/**
 * Creates a title "summary" for a calendar event.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
function eventSummary (
  {
    clientName,
    duration,
    price
  } : {
  clientName: string,
  duration: string
  price?: string}
  ) {
  let outStr = `${duration} minute massage with ${clientName}`
  if (price) {
    outStr = `${outStr}, ${price}`
  outStr = `${outStr} - TrilliumMassage`
  return `outStr`
  }
}

/**
 * Creates a description for a calendar event.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
function eventDescription(props: any /* HACK */ ) {
  let output = "Thanks for booking!"
  output += "\n\n"
  Object.entries(props).map(([key, value]) => {    
    output += `<b>${key}</b>: ${value}\n`
  })
  output += "\n\n"
  output += "Trillium Smith, LMT"
  output += "\n"
  output += `<a href="www.trilliummassage.la">www.trilliummassage.la</a>`

  return output
}

const templates = {
  eventSummary,
  eventDescription
}

export default templates