import type { EmailProps } from "@/lib/types"
import type { ReviewSnippetProps } from "@/components/ReviewCard"
import type { ReviewType } from "@/components/ReviewCard"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

type ReviewSubmissionEmailProps = Partial<EmailProps> &
  ReviewSnippetProps &
  Partial<ReviewType>

export default function ReviewSubmissionEmail({
  name,
  dateSummary,
  price,
  duration,
  rating,
  date,
  text,
  source,
  type,
}: ReviewSubmissionEmailProps) {
  const SUBJECT = `REVIEW SUBMISSION: ${name}, ${rating} Stars, ${date}`

  let body = `<div dir="ltr">`
  body += [
    `<b>{`,
    `<b>    rating: ${rating},`,
    `<b>    date: ${date},`,
    `<b>    comment: ${text},`,
    `<b>    name: ${name},`,
    `<b>    source: ${source},`,
    `<b>    type: ${type},`,
    `<b>}`,
    `<br>`,
    `<b>Name:</b> ${name}`,
    `<b>Date:</b> ${dateSummary}`,
    // `<b>Location:</b> ${location}`,
    `<b>Price:</b> $${price}`,
    `<b>Duration:</b> ${duration} minutes`,
    `<br>`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
