import getAccessToken from "./getAccessToken" // Reuse existing function to get access token

export async function getEventsBySearchQuery(searchQuery: string, {start, end}: {start: any, end: any}) {
  const accessToken = await getAccessToken()
  const calendarId = "primary" // Use 'primary' for the primary calendar or specify another calendar ID
  const timeMin = start.toISOString()
  const timeMax = end.toISOString()
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events?q=${encodeURIComponent(searchQuery)}&timeMin=${encodeURIComponent(
    timeMin
  )}&timeMax=${encodeURIComponent(timeMax)}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching events: ${response.statusText}`)
  }

  const data = await response.json()
  return data.items // Assuming you want to return the list of events
}

// Availability will be defined by calendar events called (name)_CONTAINER
// sub events will take up event container time and have (name) in their summary or body
