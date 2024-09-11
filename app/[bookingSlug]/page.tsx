import { redirect } from "next/navigation"
import slugs from "./pricing"

import ClientPage from "./ClientPage"
import { fetchDataByQuery } from "@/lib/fetch/fetchDataByQuery"
import { applyReferral } from "@/lib/posthog/applyReferral"

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: URLSearchParams
  params: { bookingSlug: string }
}) {
  const { bookingSlug } = params
  // const { pricing } = slugs[bookingSlug as keyof typeof slugs] ?? false

  // if (!pricing) {
  //   return redirect("/")
  // }

  const { props } = await fetchDataByQuery({ searchParams, query: bookingSlug })
  applyReferral({ searchParams })
  return <ClientPage {...props} />
}
