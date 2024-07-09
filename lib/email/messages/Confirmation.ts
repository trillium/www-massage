import { EmailProps } from "@/lib/types"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ClientRequestEmail({
  duration,
  price,
  name,
  dateSummary,
}: Omit<EmailProps, "approveUrl">) {
  let body = `<div dir="ltr">`
  body += [
    `Hi there`,
    `<br>`,
    `Just confirming that your request for <b>${dateSummary}</b> has been received. 
I'll review it as soon as I can and get back to you with a confirmation.`,
    `<br>`,
    `Thanks!`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
