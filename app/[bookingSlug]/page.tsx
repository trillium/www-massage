import slugs from "./pricing"

import ClientPage from "./ClientPage"
import { fetchData } from "@/lib/fetch/fetchData"
import { applyReferral } from "@/lib/posthog/applyReferral"

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: URLSearchParams
  params: { bookingSlug: string }
}) {
  const { bookingSlug } = params
  const { pricing } = slugs[bookingSlug as keyof typeof slugs] ?? false

  const { props } = await fetchData({ searchParams })
  applyReferral({ searchParams })
  return <ClientPage {...props} pricing={pricing} />
}
