import { redirect } from "next/navigation"
import slugs from "./pricing"

import ClientPage from "./ClientPage"
import { fetchData } from "@/lib/fetch/fetchData"

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: URLSearchParams
  params: { bookingSlug: string }
}) {
  const { bookingSlug } = params
  const { pricing } = slugs[bookingSlug as keyof typeof slugs] ?? false

  if (!pricing) {
    return redirect("/")
  }

  const { props } = await fetchData({ searchParams })
  return <ClientPage {...props} pricing={pricing} />
}
