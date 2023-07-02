import templates ,{ EventProps, detailsHelper } from "@/lib/messageTemplates/templates"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ApprovalEmail(props: EventProps & { approveUrl: string, dateSummary: string }) {
  const { name, email, location, dateSummary, timeZone, approveUrl } = props
  const SUBJECT = "Request for " + templates.eventSummary(props)

  let body = `<div dir="ltr">`
  body += [
    `<b>${name}</b> has requested a meeting on <b>${dateSummary}</b>, via <b>${location}</b>`,
    `<br>`,
    `Their local timezone is ${timeZone}`,
    `<br>`,
    `<br>`,
    `<b><a href=${approveUrl}>Accept the meeting</a></b>`,
    `<br>`,
    `<b><a href=${declineUrl}>Decline the meeting</a></b>`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
