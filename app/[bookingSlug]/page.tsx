import ClientPage from "./ClientPage"
import { fetchContainersByQuery } from "@/lib/fetch/fetchContainersByQuery"
import { applyReferral } from "@/lib/posthog/applyReferral"

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: URLSearchParams
  params: { bookingSlug: string }
}) {
  const { bookingSlug } = params
  const { props } = await fetchContainersByQuery({
    searchParams,
    query: bookingSlug,
  })

  applyReferral({ searchParams })
  return <ClientPage {...props} />
}
